import type { MetadataRoute } from 'next'
import { env } from '@/lib/env'

/**
 * robots.txt — indexing follows NEXT_PUBLIC_ALLOW_INDEXING (false everywhere
 * except production). AI crawlers are allowed separately per the brief's
 * GEO readiness; flip NEXT_PUBLIC_ALLOW_AI_CRAWLERS to exclude them.
 */

export default function robots(): MetadataRoute.Robots {
  const base = env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, '')
  const allowIndexing = env.NEXT_PUBLIC_ALLOW_INDEXING
  const allowAi = env.NEXT_PUBLIC_ALLOW_AI_CRAWLERS

  const aiBots = ['GPTBot', 'ChatGPT-User', 'CCBot', 'anthropic-ai', 'ClaudeBot', 'PerplexityBot']

  return {
    rules: [
      {
        userAgent: '*',
        allow: allowIndexing ? '/' : undefined,
        disallow: allowIndexing ? ['/api/', '/book?*'] : '/',
      },
      ...(allowIndexing && !allowAi
        ? aiBots.map((bot) => ({ userAgent: bot, disallow: '/' as const }))
        : []),
    ],
    sitemap: `${base}/sitemap.xml`,
  }
}
