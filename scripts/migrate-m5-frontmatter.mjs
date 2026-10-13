/**
 * M5 migration: move structured fields from src/data/*.ts into MDX frontmatter,
 * making content/ the single source of truth. Run once.
 */
import { readFileSync, writeFileSync } from 'node:fs'
import { createRequire } from 'node:module'
import { services } from '../src/data/services.ts'
import { industries } from '../src/data/site.ts'

// yaml is a transitive dep (via velite); resolve it from the pnpm store.
const require = createRequire(import.meta.url)
const { parse, stringify } = require(
  '../node_modules/.pnpm/yaml@2.9.1/node_modules/yaml/dist/index.js',
)

function splitFrontmatter(text) {
  const m = text.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/)
  if (!m) throw new Error('No frontmatter found')
  return { front: m[1], body: m[2] }
}

for (const service of services) {
  const path = `content/services/${service.slug}.mdx`
  const { front, body } = splitFrontmatter(readFileSync(path, 'utf8'))
  const original = parse(front)

  const merged = {
    title: original.title,
    description: original.description,
    keywords: original.keywords,
    slug: service.slug,
    order: service.order,
    accent: service.accent,
    excerpt: service.excerpt,
    shortName: service.shortName,
    tagline: service.tagline,
    heroTitle: service.heroTitle,
    heroLead: service.heroLead,
    intro: service.intro,
    problems: service.problems,
    capabilities: service.capabilities,
    process: service.process,
    models: service.models,
    toolsTitle: service.toolsTitle,
    tools: service.tools,
    ...(service.extra ? { extra: service.extra } : {}),
    faqs: service.faqs,
    bestFor: service.bestFor,
    engagement: service.engagement,
    firstWin: service.firstWin,
  }

  writeFileSync(path, `---\n${stringify(merged)}---\n${body}`)
  console.log('migrated', path)
}

const industrySlugs = {
  'law-firms': 'legal',
  healthcare: 'healthcare',
  staffing: 'staffing',
  ecommerce: 'e-commerce',
  saas: 'saas',
  'real-estate': 'real-estate',
}

for (const industry of industries) {
  const file = industrySlugs[industry.slug]
  const path = `content/industries/${file}.mdx`
  const { front, body } = splitFrontmatter(readFileSync(path, 'utf8'))
  const original = parse(front)

  const merged = {
    title: original.title,
    description: original.description,
    keywords: original.keywords,
    slug: original.slug,
    blurb: industry.blurb,
    pains: industry.pains,
    services: industry.services,
  }

  writeFileSync(path, `---\n${stringify(merged)}---\n${body}`)
  console.log('migrated', path)
}
