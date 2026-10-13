/**
 * Services data — M5.
 *
 * Content now loads from the CMS layer (Velite → content/services/*.mdx).
 * This module adapts CMS records to the template shape; templates are
 * unchanged from M4.
 */
import { cmsGetService, cmsServicesByOrder } from '@/lib/content'
import type { Service } from '@/lib/content'

export interface ServiceFaq {
  question: string
  answer: string
}

export interface ServiceData {
  slug: string
  order: number
  name: string
  shortName: string
  accent: 'web' | 'rpo' | 'va' | 'acct' | 'legal'
  tagline: string
  excerpt: string
  heroTitle: string
  heroLead: string
  intro: string
  problems: { before: string; after: string }[]
  capabilities: { title: string; body: string }[]
  process: { title: string; body: string }[]
  models: { title: string; body: string }[]
  toolsTitle: string
  tools: string[]
  extra?: { title: string; body: string }[]
  faqs: ServiceFaq[]
  bestFor: string
  engagement: string
  firstWin: string
}

function toServiceData(s: Service): ServiceData {
  return {
    slug: s.slug,
    order: s.order,
    name: s.name,
    shortName: s.shortName,
    accent: s.accent,
    tagline: s.tagline,
    excerpt: s.excerpt,
    heroTitle: s.heroTitle,
    heroLead: s.heroLead,
    intro: s.intro,
    problems: s.problems,
    capabilities: s.capabilities,
    process: s.process,
    models: s.models,
    toolsTitle: s.toolsTitle,
    tools: s.tools,
    extra: s.extra ?? undefined,
    faqs: s.faqs,
    bestFor: s.bestFor,
    engagement: s.engagement,
    firstWin: s.firstWin,
  }
}

export const SERVICE_ORDER = [
  'website-development',
  'recruitment-process-outsourcing',
  'virtual-assistance',
  'accounting-outsourcing',
  'legal-process-outsourcing',
] as const

export const services: ServiceData[] = cmsServicesByOrder.map(toServiceData)

export function getService(slug: string): ServiceData | undefined {
  const s = cmsGetService(slug)
  return s ? toServiceData(s) : undefined
}
