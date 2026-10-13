import { env } from './env'

/**
 * Cloudflare Turnstile verification (server side).
 * Returns true when the token is valid, or when Turnstile isn't configured
 * (local dev / preview) — the API route logs that case.
 */

interface TurnstileResponse {
  success: boolean
  'error-codes'?: string[]
}

export async function verifyTurnstile(
  token: string | undefined,
  ip?: string,
): Promise<{
  ok: boolean
  skipped: boolean
}> {
  const secret = env.TURNSTILE_SECRET_KEY
  if (!secret) return { ok: true, skipped: true }
  if (!token) return { ok: false, skipped: false }

  const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ secret, response: token, ...(ip ? { remoteip: ip } : {}) }),
  })
  if (!res.ok) return { ok: false, skipped: false }
  const data = (await res.json()) as TurnstileResponse
  return { ok: data.success === true, skipped: false }
}
