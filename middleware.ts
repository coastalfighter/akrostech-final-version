import { NextResponse, type NextRequest } from 'next/server'
import { isSpamPath, resolveRedirect } from './src/config/redirects'

/**
 * Content Security Policy plus indexing protection for preview /
 * non-production environments.
 *
 * script-src allows 'unsafe-inline' because Next.js App Router boots
 * hydration through inline flight-data scripts. The policy deliberately
 * carries NO nonce: browsers ignore 'unsafe-inline' whenever a nonce or hash
 * is present, and our pages are statically prerendered, so their inline
 * scripts can never carry a per-request nonce. A nonce here blocked
 * hydration on every static page (no interactivity, stuck animations).
 *
 * M6: legacy-URL handling added — 410 for spam-injection patterns from the
 * compromised legacy site, 301 for known legacy paths. Unknown paths fall
 * through to the branded 404.
 */
function buildCsp(): string {
  return [
    "default-src 'self'",
    // 'unsafe-inline' required: Next.js flight/hydration scripts are inline
    // and framework-controlled. Never add a nonce or hash (see note above).
    [
      "script-src 'self' 'unsafe-inline'",
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

  const response = NextResponse.next()
  response.headers.set('Content-Security-Policy', buildCsp())

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
