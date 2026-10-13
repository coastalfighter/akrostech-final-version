import { z } from 'zod'

/**
 * Environment validation. Runs at build time (imported by the root layout),
 * so the build fails fast when a required variable is missing or malformed.
 *
 * Only the site URL is strictly required to build. Service credentials
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

export function parseEnv(input: unknown): Env {
  return envSchema.parse(input)
}

function formatError(error: z.ZodError): string {
  return error.issues.map((issue) => `  - ${issue.path.join('.')}: ${issue.message}`).join('\n')
}

let cached: Env | null = null

export function getEnv(): Env {
  if (cached) return cached
  const result = envSchema.safeParse(process.env)
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
