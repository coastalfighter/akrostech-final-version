/**
 * Site URL resolution, shared by the env loader and next.config.ts.
 *
 * NEXT_PUBLIC_SITE_URL wins when set. On Vercel it otherwise falls back to the
 * deployment's system URL: the production domain for Production builds, the
 * branch/deployment URL for everything else.
 */

type RawEnv = Record<string, string | undefined>

function blankToUndefined(value: string | undefined): string | undefined {
  const trimmed = value?.trim()
  return trimmed ? trimmed : undefined
}

export function resolveSiteUrl(input: RawEnv): string | undefined {
  const explicit = blankToUndefined(input.NEXT_PUBLIC_SITE_URL)
  if (explicit) return explicit
  const host =
    input.VERCEL_ENV === 'production'
      ? blankToUndefined(input.VERCEL_PROJECT_PRODUCTION_URL)
      : (blankToUndefined(input.VERCEL_BRANCH_URL) ?? blankToUndefined(input.VERCEL_URL))
  return host ? `https://${host}` : undefined
}
