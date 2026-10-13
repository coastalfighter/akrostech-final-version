import { NextRequest } from 'next/server'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { POST } from '@/app/api/contact/route'
import { clearRateLimits } from '@/lib/rate-limit'

vi.mock('@/lib/email', () => ({
  isEmailConfigured: vi.fn(() => true),
  sendEmail: vi.fn(async () => ({ id: 'email-123' })),
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

function makeRequest(body: unknown, ip = '1.2.3.4'): NextRequest {
  return new NextRequest('http://localhost/api/contact', {
    method: 'POST',
    headers: { 'content-type': 'application/json', 'x-forwarded-for': ip },
    body: JSON.stringify(body),
  })
}

const valid = {
  name: 'Jane Smith',
  email: 'jane@company.com',
  company: 'Company Inc.',
  service: 'Virtual Assistance',
  message: 'We need help with our inbox and calendar, about 20 hours a week.',
  website: '',
  turnstileToken: 'token',
}

describe('POST /api/contact', () => {
  beforeEach(() => {
    clearRateLimits()
    vi.clearAllMocks()
  })

  it('accepts a valid submission and sends email', async () => {
    const res = await POST(makeRequest(valid))
    expect(res.status).toBe(200)
    expect(await res.json()).toEqual({ ok: true })
    const { sendEmail } = await import('@/lib/email')
    expect(sendEmail).toHaveBeenCalledOnce()
    const call = vi.mocked(sendEmail).mock.calls[0]![0]
    expect(call.to).toBe('inbox@example.com')
    expect(call.subject).toContain('Jane Smith')
    expect(call.replyTo).toBe('jane@company.com')
  })

  it('rejects invalid input with field errors', async () => {
    const res = await POST(makeRequest({ ...valid, email: 'not-an-email', message: 'short' }))
    expect(res.status).toBe(400)
    const body = (await res.json()) as { fields: Record<string, string[]> }
    expect(body.fields.email).toBeDefined()
    expect(body.fields.message).toBeDefined()
  })

  it('silently accepts honeypot submissions without sending', async () => {
    const res = await POST(makeRequest({ ...valid, website: 'http://spam.com' }))
    expect(res.status).toBe(200)
    expect(await res.json()).toEqual({ ok: true })
    const { sendEmail } = await import('@/lib/email')
    expect(sendEmail).not.toHaveBeenCalled()
  })

  it('rate-limits after 5 submissions from one IP', async () => {
    for (let i = 0; i < 5; i++) {
      const res = await POST(makeRequest(valid, '9.9.9.9'))
      expect(res.status).toBe(200)
    }
    const res = await POST(makeRequest(valid, '9.9.9.9'))
    expect(res.status).toBe(429)
  })

  it('rejects failed Turnstile verification', async () => {
    const { verifyTurnstile } = await import('@/lib/turnstile')
    vi.mocked(verifyTurnstile).mockResolvedValueOnce({ ok: false, skipped: false })
    const res = await POST(makeRequest(valid))
    expect(res.status).toBe(400)
  })

  it('returns 503 when email is not configured', async () => {
    const { isEmailConfigured } = await import('@/lib/email')
    vi.mocked(isEmailConfigured).mockReturnValueOnce(false)
    const res = await POST(makeRequest(valid))
    expect(res.status).toBe(503)
    const body = (await res.json()) as { error: string }
    expect(body.error).toContain('call')
  })
})
