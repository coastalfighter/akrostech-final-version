import { describe, expect, it } from 'vitest'
import { parseEnv } from '@/lib/env'

describe('parseEnv', () => {
  it('parses a minimal valid environment', () => {
    const env = parseEnv({ NEXT_PUBLIC_SITE_URL: 'https://www.akrosstech.com' })
    expect(env.NEXT_PUBLIC_SITE_URL).toBe('https://www.akrosstech.com')
  })

  it('defaults every feature flag to false', () => {
    const env = parseEnv({ NEXT_PUBLIC_SITE_URL: 'http://localhost:3000' })
    expect(env.NEXT_PUBLIC_FLAG_TESTIMONIALS).toBe(false)
    expect(env.NEXT_PUBLIC_FLAG_CASE_STUDIES).toBe(false)
    expect(env.NEXT_PUBLIC_FLAG_CLIENT_LOGOS).toBe(false)
    expect(env.NEXT_PUBLIC_FLAG_STATS).toBe(false)
  })

  it('coerces boolean-like strings correctly', () => {
    const env = parseEnv({
      NEXT_PUBLIC_SITE_URL: 'http://localhost:3000',
      NEXT_PUBLIC_ALLOW_INDEXING: 'false',
      NEXT_PUBLIC_ALLOW_AI_CRAWLERS: 'true',
      NEXT_PUBLIC_FLAG_STATS: '1',
    })
    expect(env.NEXT_PUBLIC_ALLOW_INDEXING).toBe(false)
    expect(env.NEXT_PUBLIC_ALLOW_AI_CRAWLERS).toBe(true)
    expect(env.NEXT_PUBLIC_FLAG_STATS).toBe(true)
  })

  it('treats empty optional URLs as undefined', () => {
    const env = parseEnv({
      NEXT_PUBLIC_SITE_URL: 'http://localhost:3000',
      NEXT_PUBLIC_CALENDLY_URL: '',
    })
    expect(env.NEXT_PUBLIC_CALENDLY_URL).toBeUndefined()
  })

  it('rejects an invalid site URL', () => {
    expect(() => parseEnv({ NEXT_PUBLIC_SITE_URL: 'not-a-url' })).toThrow()
  })

  it('rejects a malformed contact email', () => {
    expect(() =>
      parseEnv({
        NEXT_PUBLIC_SITE_URL: 'http://localhost:3000',
        NEXT_PUBLIC_CONTACT_EMAIL: 'not-an-email',
      }),
    ).toThrow()
  })

  it('falls back to the Vercel production domain when the site URL is unset', () => {
    const env = parseEnv({
      VERCEL_ENV: 'production',
      VERCEL_PROJECT_PRODUCTION_URL: 'www.akrosstech.com',
      VERCEL_URL: 'akrostech-abc123.vercel.app',
    })
    expect(env.NEXT_PUBLIC_SITE_URL).toBe('https://www.akrosstech.com')
  })

  it('falls back to the Vercel branch URL on preview builds', () => {
    const env = parseEnv({
      NEXT_PUBLIC_SITE_URL: '',
      VERCEL_ENV: 'preview',
      VERCEL_BRANCH_URL: 'akrostech-git-feature.vercel.app',
      VERCEL_URL: 'akrostech-abc123.vercel.app',
    })
    expect(env.NEXT_PUBLIC_SITE_URL).toBe('https://akrostech-git-feature.vercel.app')
  })

  it('prefers an explicit site URL over Vercel system variables', () => {
    const env = parseEnv({
      NEXT_PUBLIC_SITE_URL: 'https://www.akrosstech.com',
      VERCEL_ENV: 'preview',
      VERCEL_URL: 'akrostech-abc123.vercel.app',
    })
    expect(env.NEXT_PUBLIC_SITE_URL).toBe('https://www.akrosstech.com')
  })

  it('still rejects a missing site URL outside Vercel', () => {
    expect(() => parseEnv({})).toThrow()
  })
})
