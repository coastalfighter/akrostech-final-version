import { describe, expect, it, beforeEach } from 'vitest'
import { clearRateLimits, rateLimit } from '@/lib/rate-limit'

describe('rateLimit', () => {
  beforeEach(() => clearRateLimits())

  it('allows up to maxHits within the window', () => {
    for (let i = 0; i < 5; i++) {
      expect(rateLimit('test-key', 5, 60_000).allowed).toBe(true)
    }
    const sixth = rateLimit('test-key', 5, 60_000)
    expect(sixth.allowed).toBe(false)
    expect(sixth.retryAfterMs).toBeGreaterThan(0)
  })

  it('tracks keys independently', () => {
    for (let i = 0; i < 5; i++) rateLimit('a', 5, 60_000)
    expect(rateLimit('a', 5, 60_000).allowed).toBe(false)
    expect(rateLimit('b', 5, 60_000).allowed).toBe(true)
  })

  it('expires old hits', async () => {
    expect(rateLimit('exp', 1, 30).allowed).toBe(true)
    expect(rateLimit('exp', 1, 30).allowed).toBe(false)
    await new Promise((r) => setTimeout(r, 40))
    expect(rateLimit('exp', 1, 30).allowed).toBe(true)
  })
})
