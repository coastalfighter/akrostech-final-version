/**
 * Legacy URL handling.
 *
 * 301s: real pages from the old site → their new homes. Extend this list
 * from the client's redirect map before launch.
 *
 * 410s: URL patterns from the casino-affiliate spam injection found on the
 * compromised legacy site (October 2026 diligence). These patterns never
 * match real content; they exist only to tell search engines the spam is
 * gone. Genuinely unknown paths still render the branded 404 page.
 */

export interface Redirect {
  from: string
  to: string
  permanent: boolean
}

export const REDIRECTS: Redirect[] = [
  // Best-effort guesses at common legacy paths — confirm with the client.
  { from: '/home', to: '/', permanent: true },
  { from: '/contact-us', to: '/contact', permanent: true },
  { from: '/about-us', to: '/about', permanent: true },
  { from: '/services/web-development', to: '/services/website-development', permanent: true },
  { from: '/blog', to: '/insights', permanent: true },
  { from: '/blog/:slug', to: '/insights/:slug', permanent: true },
]

/**
 * Spam URL patterns → 410 Gone. Matched case-insensitively against the
 * pathname. These are the shapes casino/pharma spam injections take on
 * compromised WordPress sites; none collide with real Akrostech routes.
 */
const SPAM_PATTERNS: RegExp[] = [
  /casino/i,
  /slot-?gacor/i,
  /togel/i,
  /judi/i,
  /\bbet\b/i,
  /poker/i,
  /gambling/i,
  /viagra|cialis|pharma/i,
  /crypto-?giveaway/i,
  /\.php$/i,
  /\/wp-/i,
]

export function isSpamPath(pathname: string): boolean {
  return SPAM_PATTERNS.some((pattern) => pattern.test(pathname))
}

function matchRedirect(pathname: string): Redirect | undefined {
  return REDIRECTS.find((r) => {
    if (r.from.includes(':slug')) {
      const prefix = r.from.split(':slug')[0]!
      if (pathname.startsWith(prefix)) return true
      return false
    }
    return r.from === pathname
  })
}

export function resolveRedirect(pathname: string): string | undefined {
  const redirect = matchRedirect(pathname)
  if (!redirect) return undefined
  if (redirect.from.includes(':slug')) {
    const prefix = redirect.from.split(':slug')[0]!
    const slug = pathname.slice(prefix.length)
    return redirect.to.replace(':slug', slug)
  }
  return redirect.to
}
