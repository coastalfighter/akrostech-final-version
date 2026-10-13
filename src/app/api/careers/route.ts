import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { esc, isEmailConfigured, sendEmail } from '@/lib/email'
import { env } from '@/lib/env'
import { rateLimit } from '@/lib/rate-limit'
import { verifyTurnstile } from '@/lib/turnstile'

/**
 * POST /api/careers — job applications with CV upload.
 *
 * Accepts multipart form data, validates fields and the CV (type + size),
 * verifies Turnstile, and emails the application with the CV attached.
 */

const MAX_CV_BYTES = 4 * 1024 * 1024 // 4MB — under the serverless payload limit
const ALLOWED_CV_TYPES = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
]

const applicationSchema = z.object({
  name: z.string().trim().min(2, 'Please enter your name.').max(100),
  email: z.string().trim().email('Please enter a valid email address.').max(200),
  role: z.string().trim().min(2, 'Please choose a role.').max(150),
  linkedin: z.string().trim().max(300).optional().default(''),
  note: z.string().trim().max(3000).optional().default(''),
  website: z.string().optional().default(''), // honeypot — checked after validation
  turnstileToken: z.string().optional(),
})

function clientIp(request: NextRequest): string {
  return (
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    request.headers.get('x-real-ip') ??
    'unknown'
  )
}

export async function POST(request: NextRequest) {
  const ip = clientIp(request)
  const limited = rateLimit(`careers:${ip}`, 5, 60 * 60 * 1000)
  if (!limited.allowed) {
    return NextResponse.json(
      { error: 'Too many applications. Please try again later.' },
      { status: 429 },
    )
  }

  let form: FormData
  try {
    form = await request.formData()
  } catch {
    return NextResponse.json({ error: 'Invalid form submission.' }, { status: 400 })
  }

  const parsed = applicationSchema.safeParse({
    name: form.get('name'),
    email: form.get('email'),
    role: form.get('role'),
    linkedin: form.get('linkedin'),
    note: form.get('note'),
    website: form.get('website'),
    turnstileToken: form.get('turnstileToken'),
  })
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Please fix the highlighted fields.', fields: parsed.error.flatten().fieldErrors },
      { status: 400 },
    )
  }
  const data = parsed.data

  if (data.website) {
    console.info('[careers] honeypot triggered', { ip })
    return NextResponse.json({ ok: true })
  }

  const cv = form.get('cv')
  if (!(cv instanceof File) || cv.size === 0) {
    return NextResponse.json({ error: 'Please attach your CV.' }, { status: 400 })
  }
  if (!ALLOWED_CV_TYPES.includes(cv.type)) {
    return NextResponse.json({ error: 'Please upload a PDF or Word document.' }, { status: 400 })
  }
  if (cv.size > MAX_CV_BYTES) {
    return NextResponse.json({ error: 'Your CV must be under 4MB.' }, { status: 400 })
  }

  const turnstile = await verifyTurnstile(data.turnstileToken, ip)
  if (!turnstile.ok) {
    return NextResponse.json({ error: 'Bot check failed. Please try again.' }, { status: 400 })
  }

  if (!isEmailConfigured()) {
    console.error('[careers] email not configured — application logged, not sent', {
      ip,
      name: data.name,
      role: data.role,
    })
    return NextResponse.json(
      { error: 'Applications are not set up yet. Please email us via the contact page.' },
      { status: 503 },
    )
  }

  const inbox = env.CONTACT_INBOX_EMAIL ?? env.NEXT_PUBLIC_CONTACT_EMAIL
  if (!inbox) {
    return NextResponse.json(
      { error: 'Applications are not set up yet. Please email us via the contact page.' },
      { status: 503 },
    )
  }

  const cvBuffer = Buffer.from(await cv.arrayBuffer())
  const subject = `Job application: ${data.name} — ${data.role}`
  const html = `
    <h2>New job application</h2>
    <p><strong>Name:</strong> ${esc(data.name)}</p>
    <p><strong>Email:</strong> ${esc(data.email)}</p>
    <p><strong>Role:</strong> ${esc(data.role)}</p>
    ${data.linkedin ? `<p><strong>LinkedIn:</strong> ${esc(data.linkedin)}</p>` : ''}
    ${data.note ? `<p><strong>Note:</strong></p><p>${esc(data.note).replace(/\n/g, '<br>')}</p>` : ''}
    <p><strong>CV:</strong> ${esc(cv.name)} (${(cv.size / 1024).toFixed(0)} KB, attached)</p>
    <hr>
    <p style="color:#666;font-size:12px">Turnstile: ${turnstile.skipped ? 'skipped (not configured)' : 'verified'} · IP: ${esc(ip)}</p>
  `

  try {
    const { id } = await sendEmail({
      to: inbox,
      subject,
      html,
      replyTo: data.email,
      attachments: [{ filename: cv.name, content: cvBuffer }],
    })
    console.info('[careers] application sent', { id, ip, role: data.role })
    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error('[careers] send failed', { ip, error: String(error) })
    return NextResponse.json({ error: 'Something went wrong. Please try again.' }, { status: 500 })
  }
}
