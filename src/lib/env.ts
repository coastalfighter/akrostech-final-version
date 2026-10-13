import { z } from 'zod'
import { resolveSiteUrl } from './site-url'

/**
 * Environment validation. Runs at build time (imported by the root layout),
 * so the build fails fast when a required variable is missing or malformed.
 *
 * Only the site URL is strictly required to build. On Vercel it falls back to
 * the deployment's system URL when NEXT_PUBLIC_SITE_URL is unset, so Preview
 * builds succeed without per-branch configuration. Service credentials
 * (Resend, Turnstile, Upstash, Blob, analytics) are validated lazily at
 * runtime by the code paths that use them, so Preview builds and local
 * development work before every integration is wired up.
 */
const booleanFromEnv = (fallback: boolean) =>
  z
    .union([z.boolean(), z.enum(['true', 'false', '1', '0'])])
    .default(fallback)
    .transform((value) => value === true || value === 'true' || value === '1')

/**
 * `.env.example` ships with empty values (`KEY=`), which dotenv parses as `''`.
 * Treat blank as unset so `cp .env.example .env.local` just works.
 */
const trimBlankToUndefined = (value: string | undefined): string | undefined => {
  if (value == null) return undefined
  const trimmed = value.trim()
  return trimmed === '' ? undefined : trimmed
}

const optionalUrl = z
  .string()
  .optional()
  .transform(trimBlankToUndefined)
  .pipe(z.string().url().optional())
const optionalEmail = z
  .string()
  .optional()
  .transform(trimBlankToUndefined)
  .pipe(z.string().email().optional())
const optionalString = z.string().optional().transform(trimBlankToUndefined)

const envSchema = z.object({
  // Site
  NEXT_PUBLIC_SITE_URL: z.string().url(),
  NEXT_PUBLIC_ALLOW_INDEXING: booleanFromEnv(false),
  NEXT_PUBLIC_ALLOW_AI_CRAWLERS: booleanFromEnv(true),

  // Contact & booking
  NEXT_PUBLIC_CALENDLY_URL: optionalUrl,
  NEXT_PUBLIC_CONTACT_EMAIL: optionalEmail,
  NEXT_PUBLIC_CONTACT_PHONE: z.string().default('+13322870846'),
  CONTACT_INBOX_EMAIL: optionalEmail,

  // Email (Resend)
  RESEND_API_KEY: optionalString,
  RESEND_FROM_EMAIL: optionalEmail,

  // Bot protection (Cloudflare Turnstile)
  NEXT_PUBLIC_TURNSTILE_SITE_KEY: optionalString,
  TURNSTILE_SECRET_KEY: optionalString,

  // Rate limiting (Upstash Redis)
  UPSTASH_REDIS_REST_URL: optionalUrl,
  UPSTASH_REDIS_REST_TOKEN: optionalString,

  // File uploads (Vercel Blob)
  BLOB_READ_WRITE_TOKEN: optionalString,

  // Analytics (loaded only after consent)
  NEXT_PUBLIC_GA_MEASUREMENT_ID: optionalString,
  NEXT_PUBLIC_LINKEDIN_PARTNER_ID: optionalString,
  NEXT_PUBLIC_META_PIXEL_ID: optionalString,

  // Feature flags — all default to false: no unconfirmed proof in production.
  NEXT_PUBLIC_FLAG_TESTIMONIALS: booleanFromEnv(false),
  NEXT_PUBLIC_FLAG_CASE_STUDIES: booleanFromEnv(false),
  NEXT_PUBLIC_FLAG_CLIENT_LOGOS: booleanFromEnv(false),
  NEXT_PUBLIC_FLAG_STATS: booleanFromEnv(false),
})

export type Env = z.infer<typeof envSchema>

type RawEnv = Record<string, string | undefined>

/**
 * Fill NEXT_PUBLIC_SITE_URL from Vercel's system variables when it is unset
 * (see resolveSiteUrl).
 */
export function withSiteUrlFallback(input: RawEnv): RawEnv {
  const siteUrl = resolveSiteUrl(input)
  return siteUrl ? { ...input, NEXT_PUBLIC_SITE_URL: siteUrl } : input
}

/**
 * Read every variable by its literal name. In the browser, Next.js only
 * inlines `process.env.NEXT_PUBLIC_*` when written out literally — passing the
 * whole `process.env` object would leave every value undefined client-side.
 * Server-only secrets stay undefined in the browser, which the schema allows.
 */
function readProcessEnv(): RawEnv {
  return {
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
    NEXT_PUBLIC_ALLOW_INDEXING: process.env.NEXT_PUBLIC_ALLOW_INDEXING,
    NEXT_PUBLIC_ALLOW_AI_CRAWLERS: process.env.NEXT_PUBLIC_ALLOW_AI_CRAWLERS,
    NEXT_PUBLIC_CALENDLY_URL: process.env.NEXT_PUBLIC_CALENDLY_URL,
    NEXT_PUBLIC_CONTACT_EMAIL: process.env.NEXT_PUBLIC_CONTACT_EMAIL,
    NEXT_PUBLIC_CONTACT_PHONE: process.env.NEXT_PUBLIC_CONTACT_PHONE,
    CONTACT_INBOX_EMAIL: process.env.CONTACT_INBOX_EMAIL,
    RESEND_API_KEY: process.env.RESEND_API_KEY,
    RESEND_FROM_EMAIL: process.env.RESEND_FROM_EMAIL,
    NEXT_PUBLIC_TURNSTILE_SITE_KEY: process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY,
    TURNSTILE_SECRET_KEY: process.env.TURNSTILE_SECRET_KEY,
    UPSTASH_REDIS_REST_URL: process.env.UPSTASH_REDIS_REST_URL,
    UPSTASH_REDIS_REST_TOKEN: process.env.UPSTASH_REDIS_REST_TOKEN,
    BLOB_READ_WRITE_TOKEN: process.env.BLOB_READ_WRITE_TOKEN,
    NEXT_PUBLIC_GA_MEASUREMENT_ID: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID,
    NEXT_PUBLIC_LINKEDIN_PARTNER_ID: process.env.NEXT_PUBLIC_LINKEDIN_PARTNER_ID,
    NEXT_PUBLIC_META_PIXEL_ID: process.env.NEXT_PUBLIC_META_PIXEL_ID,
    NEXT_PUBLIC_FLAG_TESTIMONIALS: process.env.NEXT_PUBLIC_FLAG_TESTIMONIALS,
    NEXT_PUBLIC_FLAG_CASE_STUDIES: process.env.NEXT_PUBLIC_FLAG_CASE_STUDIES,
    NEXT_PUBLIC_FLAG_CLIENT_LOGOS: process.env.NEXT_PUBLIC_FLAG_CLIENT_LOGOS,
    NEXT_PUBLIC_FLAG_STATS: process.env.NEXT_PUBLIC_FLAG_STATS,
    VERCEL_ENV: process.env.VERCEL_ENV,
    VERCEL_URL: process.env.VERCEL_URL,
    VERCEL_BRANCH_URL: process.env.VERCEL_BRANCH_URL,
    VERCEL_PROJECT_PRODUCTION_URL: process.env.VERCEL_PROJECT_PRODUCTION_URL,
  }
}

export function parseEnv(input: RawEnv): Env {
  return envSchema.parse(withSiteUrlFallback(input))
}

function formatError(error: z.ZodError): string {
  return error.issues.map((issue) => `  - ${issue.path.join('.')}: ${issue.message}`).join('\n')
}

let cached: Env | null = null

export function getEnv(): Env {
  if (cached) return cached
  const result = envSchema.safeParse(withSiteUrlFallback(readProcessEnv()))
  if (!result.success) {
    throw new Error(
      `Invalid environment configuration. Check .env.local against .env.example:\n${formatError(result.error)}`,
    )
  }
  cached = result.data
  return cached
}

/** Validated environment. Importing this module validates at build time. */
export const env: Env = getEnv()
