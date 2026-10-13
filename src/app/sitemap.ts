import type { MetadataRoute } from 'next'
import { env } from '@/lib/env'
import { cmsInsightsByDate, cmsServicesByOrder } from '@/lib/content'

/**
 * Sitemap — every public route, built from the CMS so new services and
 * articles appear automatically.
 */

const STATIC_ROUTES = [
  '',
  '/services',
  '/how-it-works',
  '/pricing',
  '/industries',
  '/about',
  '/careers',
  '/insights',
  '/faq',
  '/contact',
  '/book',
]

export default function sitemap(): MetadataRoute.Sitemap {
  const base = env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, '')

  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((route) => ({
    url: `${base}${route || '/'}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? 'weekly' : 'monthly',
    priority: route === '' ? 1 : route === '/services' ? 0.9 : 0.7,
  }))

  const serviceEntries: MetadataRoute.Sitemap = cmsServicesByOrder.map((s) => ({
    url: `${base}/services/${s.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.8,
  }))

  const insightEntries: MetadataRoute.Sitemap = cmsInsightsByDate.map((i) => ({
    url: `${base}/insights/${i.slug}`,
    lastModified: new Date(i.updated ?? i.date),
    changeFrequency: 'yearly',
    priority: 0.6,
  }))

  return [...staticEntries, ...serviceEntries, ...insightEntries]
}
