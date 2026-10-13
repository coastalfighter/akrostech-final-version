import { defineCollection, defineConfig, s } from 'velite'

/**
 * Typed content collections (Section 13 of the brief).
 *
 * M1 delivers the copy itself; pages consume these collections in M3–M5.
 * Run `pnpm content` to build, `pnpm content:watch` while writing.
 * Output goes to .velite/ (gitignored).
 */

const shared = {
  title: s.string(),
  description: s.string(),
  keywords: s.array(s.string()).optional(),
}

const pages = defineCollection({
  name: 'Page',
  pattern: 'pages/**/*.mdx',
  schema: s.object({
    ...shared,
    // Explicit route slug ("/" for home, "pricing", "contact", …).
    slug: s.string(),
    body: s.mdx(),
    toc: s.toc(),
  }),
})

const services = defineCollection({
  name: 'Service',
  pattern: 'services/*.mdx',
  schema: s.object({
    ...shared,
    slug: s.string(),
    // The required service order: 1 = Website Development … 5 = Legal Process Outsourcing.
    order: s.number(),
    accent: s.enum(['web', 'rpo', 'va', 'acct', 'legal']),
    excerpt: s.string(),
    // M5 structured fields — the templates render these; the MDX body keeps
    // the long-form sections for search/GEO depth.
    name: s.string(),
    shortName: s.string(),
    tagline: s.string(),
    heroTitle: s.string(),
    heroLead: s.string(),
    intro: s.string(),
    problems: s.array(s.object({ before: s.string(), after: s.string() })).min(1),
    capabilities: s.array(s.object({ title: s.string(), body: s.string() })).min(1),
    process: s.array(s.object({ title: s.string(), body: s.string() })).min(1),
    models: s.array(s.object({ title: s.string(), body: s.string() })).min(1),
    toolsTitle: s.string(),
    tools: s.array(s.string()).min(1),
    extra: s.array(s.object({ title: s.string(), body: s.string() })).optional(),
    faqs: s
      .array(s.object({ question: s.string(), answer: s.string() }))
      .length(8, 'Each service page needs exactly 8 FAQs'),
    bestFor: s.string(),
    engagement: s.string(),
    firstWin: s.string(),
    body: s.mdx(),
    toc: s.toc(),
  }),
})

const insights = defineCollection({
  name: 'Insight',
  pattern: 'insights/*.mdx',
  schema: s.object({
    ...shared,
    slug: s.string(),
    date: s.isodate(),
    updated: s.isodate().optional(),
    author: s.string(),
    tags: s.array(s.string()),
    featured: s.boolean().default(false),
    excerpt: s.string(),
    body: s.mdx(),
    toc: s.toc(),
  }),
})

const authors = defineCollection({
  name: 'Author',
  pattern: 'authors/*.mdx',
  schema: s.object({
    name: s.string(),
    slug: s.string(),
    role: s.string(),
    credentials: s.string(),
    body: s.mdx(),
  }),
})

const industries = defineCollection({
  name: 'Industry',
  pattern: 'industries/*.mdx',
  schema: s.object({
    ...shared,
    slug: s.string(),
    blurb: s.string(),
    pains: s.array(s.string()).min(1),
    // Service slugs in the required service order.
    services: s.array(s.string()).min(1),
    body: s.mdx(),
  }),
})

const careers = defineCollection({
  name: 'Role',
  pattern: 'careers/*.mdx',
  schema: s.object({
    title: s.string(),
    slug: s.string(),
    department: s.string(),
    location: s.string(),
    type: s.string(),
    description: s.string(),
    posted: s.isodate(),
    body: s.mdx(),
  }),
})

const legal = defineCollection({
  name: 'Legal',
  pattern: 'legal/*.mdx',
  schema: s.object({
    title: s.string(),
    slug: s.string(),
    updated: s.isodate(),
    description: s.string(),
    body: s.mdx(),
    toc: s.toc(),
  }),
})

export default defineConfig({
  root: 'content',
  output: {
    data: '.velite',
    assets: 'public/static',
    base: '/static/',
    name: '[name]-[hash:6].[ext]',
    clean: true,
  },
  collections: { pages, services, insights, authors, industries, careers, legal },
})
