import { NextRequest } from 'next/server'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { POST } from '@/app/api/careers/route'
import { clearRateLimits } from '@/lib/rate-limit'

vi.mock('@/lib/email', () => ({
  isEmailConfigured: vi.fn(() => true),
  sendEmail: vi.fn(async () => ({ id: 'email-456' })),
  esc: (s: string) => s,
}))

vi.mock('@/lib/turnstile', () => ({
  verifyTurnstile: vi.fn(async () => ({ ok: true, skipped: false })),
}))

vi.mock('@/lib/env', () => ({
  env: {
    CONTACT_INBOX_EMAIL: 'inbox@example.com',
    NEXT_PUBLIC_CONTACT_EMAIL: undefined,
    RESEND_API_KEY: 'test',
    RESEND_FROM_EMAIL: 'noreply@example.com',
    TURNSTILE_SECRET_KEY: undefined,
  },
}))

function makeForm(fields: Record<string, string>, cv?: File, ip = '1.2.3.4'): NextRequest {
  const form = new FormData()
  for (const [k, v] of Object.entries(fields)) form.set(k, v)
  if (cv) form.set('cv', cv)
  return new NextRequest('http://localhost/api/careers', {
    method: 'POST',
    headers: { 'x-forwarded-for': ip },
    body: form,
  })
}

const validFields = {
  name: 'Priya Sharma',
  email: 'priya@example.com',
  role: 'Executive Virtual Assistant',
  linkedin: 'https://linkedin.com/in/priya',
  note: 'Five years supporting founders.',
  website: '',
  turnstileToken: 'token',
}

const pdfCv = new File(['%PDF fake'], 'cv.pdf', { type: 'application/pdf' })

describe('POST /api/careers', () => {
  beforeEach(() => {
    clearRateLimits()
    vi.clearAllMocks()
  })

  it('accepts a valid application with CV attached', async () => {
    const res = await POST(makeForm(validFields, pdfCv))
    expect(res.status).toBe(200)
    expect(await res.json()).toEqual({ ok: true })
    const { sendEmail } = await import('@/lib/email')
    expect(sendEmail).toHaveBeenCalledOnce()
    const call = vi.mocked(sendEmail).mock.calls[0]![0]
    expect(call.subject).toContain('Priya Sharma')
    expect(call.attachments).toHaveLength(1)
    expect(call.attachments![0]!.filename).toBe('cv.pdf')
  })

  it('requires a CV', async () => {
    const res = await POST(makeForm(validFields))
    expect(res.status).toBe(400)
    expect(((await res.json()) as { error: string }).error).toContain('CV')
  })

  it('rejects non-document file types', async () => {
    const exe = new File(['MZ'], 'evil.exe', { type: 'application/x-msdownload' })
    const res = await POST(makeForm(validFields, exe))
    expect(res.status).toBe(400)
    expect(((await res.json()) as { error: string }).error).toContain('PDF or Word')
  })

  it('rejects oversized CVs', async () => {
    const big = new File([new Uint8Array(5 * 1024 * 1024)], 'big.pdf', {
      type: 'application/pdf',
    })
    const res = await POST(makeForm(validFields, big))
    expect(res.status).toBe(400)
    expect(((await res.json()) as { error: string }).error).toContain('4MB')
  })

  it('rejects invalid fields', async () => {
    const res = await POST(makeForm({ ...validFields, email: 'bad' }, pdfCv))
    expect(res.status).toBe(400)
  })
})
