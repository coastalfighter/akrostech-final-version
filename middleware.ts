import { NextResponse, type NextRequest } from 'next/server'
import { isSpamPath, resolveRedirect } from './src/config/redirects'

/**
 * Per-request Content Security Policy plus indexing protection for
 * preview / non-production environments.
 *
 * A fresh nonce is generated per request and exposed to the app as the
 * `x-nonce` request header, so first-party inline scripts added in later
 * milestones (analytics snippets, etc.) can carry it via next/script.
 *
 * NOTE: script-src also allows 'unsafe-inline'. Next.js App Router boots
 * hydration through inline flight-data scripts that the framework does not
 * expose nonces for, so a nonce-only policy would silently break hydration.
 * Re-audited in M6: the finding stands — removing 'unsafe-inline' kills
 * hydration (Playwright asserts __next_f populates with zero page errors).
 *
 * M6: legacy-URL handling added — 410 for spam-injection patterns from the
 * compromised legacy site, 301 for known legacy paths. Unknown paths fall
 * through to the branded 404.
 */
function buildCsp(nonce: string): string {
  return [
    "default-src 'self'",
    // 'unsafe-inline' required: Next.js flight/hydration scripts are inline
    // and framework-controlled (see note above). `nonce-${nonce}` remains
    // for first-party inline scripts via the x-nonce header.
    [
      "script-src 'self' 'unsafe-inline'",
      `'nonce-${nonce}'`,
      'https://challenges.cloudflare.com', // Turnstile (M5 forms)
      'https://www.googletagmanager.com', // GA4 (after consent, M5)
      'https://connect.facebook.net', // Meta Pixel (after consent, M5)
      'https://snap.licdn.com', // LinkedIn Insight (after consent, M5)
      'https://calendly.com', // booking embed
    ].join(' '),
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: blob: https:",
    "font-src 'self' data:",
    [
      "connect-src 'self'",
      'https://challenges.cloudflare.com',
      'https://www.googletagmanager.com',
    ].join(' '),
    // Calendly embed on /book; Turnstile renders its checkbox in an iframe.
    'frame-src https://calendly.com https://challenges.cloudflare.com',
    "frame-ancestors 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "object-src 'none'",
    'upgrade-insecure-requests',
  ].join('; ')
}

export function middleware(request: NextRequest): NextResponse {
  const { pathname } = request.nextUrl

  // Legacy URLs first: spam patterns are gone (410), known paths moved (301).
  if (isSpamPath(pathname)) {
    return new NextResponse('Gone', { status: 410 })
  }
  const redirectTo = resolveRedirect(pathname)
  if (redirectTo) {
    const url = request.nextUrl.clone()
    url.pathname = redirectTo
    return NextResponse.redirect(url, 301)
  }

  const nonce = Buffer.from(crypto.randomUUID()).toString('base64')

  const requestHeaders = new Headers(request.headers)
  requestHeaders.set('x-nonce', nonce)

  const response = NextResponse.next({ request: { headers: requestHeaders } })
  response.headers.set('Content-Security-Policy', buildCsp(nonce))

  // Preview deployments (and any build without explicit opt-in) must never be indexed.
  if (process.env.VERCEL_ENV === 'preview' || process.env.NEXT_PUBLIC_ALLOW_INDEXING !== 'true') {
    response.headers.set('X-Robots-Tag', 'noindex, nofollow')
  }

  return response
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|avif|ico|txt|xml)$).*)',
  ],
}
