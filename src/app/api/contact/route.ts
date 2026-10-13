import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { esc, isEmailConfigured, sendEmail } from '@/lib/email'
import { env } from '@/lib/env'
import { rateLimit } from '@/lib/rate-limit'
import { verifyTurnstile } from '@/lib/turnstile'

/**
 * POST /api/contact — contact form submissions.
 *
 * Validates with Zod, rate-limits by IP, verifies Turnstile, sends via
 * Resend, and logs the outcome. Returns 503 with a clear message when email
 * isn't configured (preview/local), never a silent drop.
 */

const contactSchema = z.object({
  name: z.string().trim().min(2, 'Please enter your name.').max(100),
  email: z.string().trim().email('Please enter a valid email address.').max(200),
  company: z.string().trim().max(150).optional().default(''),
  service: z.string().trim().max(100).optional().default(''),
  message: z.string().trim().min(20, 'Tell us a little more (20+ characters).').max(5000),
  // Honeypot — bots fill it, humans don't. Checked after validation.
  website: z.string().optional().default(''),
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
  const limited = rateLimit(`contact:${ip}`)
  if (!limited.allowed) {
    return NextResponse.json(
      { error: 'Too many messages. Please try again in a few minutes.' },
      { status: 429 },
    )
  }

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 })
  }

  const parsed = contactSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Please fix the highlighted fields.', fields: parsed.error.flatten().fieldErrors },
      { status: 400 },
    )
  }
  const data = parsed.data

  // Honeypot: pretend success, send nothing.
  if (data.website) {
    console.info('[contact] honeypot triggered', { ip })
    return NextResponse.json({ ok: true })
  }

  const turnstile = await verifyTurnstile(data.turnstileToken, ip)
  if (!turnstile.ok) {
    console.warn('[contact] turnstile failed', { ip })
    return NextResponse.json({ error: 'Bot check failed. Please try again.' }, { status: 400 })
  }

  if (!isEmailConfigured()) {
    console.error('[contact] email not configured — submission logged, not sent', {
      ip,
      name: data.name,
      email: data.email,
    })
    return NextResponse.json(
      { error: 'Messaging is not set up yet. Please call +1 (332) 287-0846 instead.' },
      { status: 503 },
    )
  }

  const inbox = env.CONTACT_INBOX_EMAIL ?? env.NEXT_PUBLIC_CONTACT_EMAIL
  if (!inbox) {
    console.error('[contact] no inbox configured')
    return NextResponse.json(
      { error: 'Messaging is not set up yet. Please call +1 (332) 287-0846 instead.' },
      { status: 503 },
    )
  }

  const subject = `Website inquiry from ${data.name}${data.service ? ` — ${data.service}` : ''}`
  const html = `
    <h2>New website inquiry</h2>
    <p><strong>Name:</strong> ${esc(data.name)}</p>
    <p><strong>Email:</strong> ${esc(data.email)}</p>
    ${data.company ? `<p><strong>Company:</strong> ${esc(data.company)}</p>` : ''}
    ${data.service ? `<p><strong>Service:</strong> ${esc(data.service)}</p>` : ''}
    <p><strong>Message:</strong></p>
    <p>${esc(data.message).replace(/\n/g, '<br>')}</p>
    <hr>
    <p style="color:#666;font-size:12px">Turnstile: ${turnstile.skipped ? 'skipped (not configured)' : 'verified'} · IP: ${esc(ip)}</p>
  `

  try {
    const { id } = await sendEmail({ to: inbox, subject, html, replyTo: data.email })
    console.info('[contact] sent', { id, ip, service: data.service || 'general' })
    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error('[contact] send failed', { ip, error: String(error) })
    return NextResponse.json(
      { error: 'Something went wrong sending your message. Please try again or call us.' },
      { status: 500 },
    )
  }
}
