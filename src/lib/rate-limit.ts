/**
 * In-memory rate limiter for form API routes.
 *
 * Single-instance and best-effort by design: it stops casual abuse and
 * double-submits, not distributed attacks. (Upstash Redis is configured in
 * env for a future upgrade; the interface here stays the same.)
 */

interface Bucket {
  hits: number[]
}

const buckets = new Map<string, Bucket>()

export interface RateLimitResult {
  allowed: boolean
  retryAfterMs: number
}

/**
 * Allow `maxHits` per `windowMs` for `key` (usually the client IP).
 */
export function rateLimit(key: string, maxHits = 5, windowMs = 10 * 60 * 1000): RateLimitResult {
  const now = Date.now()
  let bucket = buckets.get(key)
  if (!bucket) {
    bucket = { hits: [] }
    buckets.set(key, bucket)
  }
  // Drop expired hits and bound memory.
  bucket.hits = bucket.hits.filter((t) => now - t < windowMs)
  if (buckets.size > 10_000) {
    const oldest = [...buckets.keys()][0]
    if (oldest) buckets.delete(oldest)
  }
  if (bucket.hits.length >= maxHits) {
    const oldestHit = bucket.hits[0] ?? now
    return { allowed: false, retryAfterMs: windowMs - (now - oldestHit) }
  }
  bucket.hits.push(now)
  return { allowed: true, retryAfterMs: 0 }
}

/** Test hook: clear all buckets. */
export function clearRateLimits() {
  buckets.clear()
}
