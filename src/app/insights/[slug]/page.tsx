import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { MDXContent } from '@/components/mdx/mdx-content'
import { CtaBand } from '@/components/sections/cta-band'
import { PageHero } from '@/components/sections/page-hero'
import { JsonLd, articleJsonLd, breadcrumbJsonLd } from '@/components/seo/json-ld'
import { LinkCard } from '@/components/ui/card'
import { Container, Section } from '@/components/ui/layout'
import { SectionHeader } from '@/components/ui/typography'
import { cmsGetInsight, cmsInsightsByDate } from '@/lib/content'
import { env } from '@/lib/env'
import { formatDate, tagLabel } from '@/lib/format'

/**
 * Insight article pages — rendered from the CMS (Velite).
 * MDX is evaluated during prerendering on the server; no client eval.
 */

export function generateStaticParams() {
  return cmsInsightsByDate.map((i) => ({ slug: i.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const insight = cmsGetInsight(slug)
  if (!insight) return {}
  return {
    title: insight.title,
    description: insight.description,
    authors: [{ name: insight.author }],
  }
}

const AUTHORS: Record<string, { name: string; role: string; initials: string }> = {
  jennifer: { name: 'Jennifer', role: 'Sales Lead, Akrostech Consulting', initials: 'J' },
  'gaurang-shukla': {
    name: 'Gaurang Shukla',
    role: 'Founder, Akrostech Consulting',
    initials: 'GS',
  },
}

export default async function InsightArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const insight = cmsGetInsight(slug)
  if (!insight) notFound()

  const related = cmsInsightsByDate.filter((i) => i.slug !== slug).slice(0, 2)
  const author = AUTHORS[insight.author] ?? {
    name: insight.author,
    role: 'Akrostech Consulting',
    initials: insight.author.charAt(0).toUpperCase(),
  }
  const siteUrl = env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, '')

  return (
    <main>
      <JsonLd
        data={[
          articleJsonLd({
            siteUrl,
            slug: insight.slug,
            title: insight.title,
            description: insight.description,
            date: insight.date,
            authorName: author.name,
          }),
          breadcrumbJsonLd(siteUrl, [
            { label: 'Insights', href: '/insights' },
            { label: insight.title },
          ]),
        ]}
      />
      <PageHero
        eyebrow={tagLabel(insight.tags[0])}
        title={insight.title}
        lead={insight.excerpt}
        size="md"
        crumbs={[{ label: 'Insights', href: '/insights' }, { label: insight.title }]}
      >
        <div className="flex items-center gap-4">
          <span
            aria-hidden="true"
            className="bg-forest font-display text-lime flex size-12 items-center justify-center rounded-full text-lg"
          >
            {author.initials}
          </span>
          <div className="text-[15px]">
            <p>
              By <span className="text-cream font-medium">{author.name}</span>
              <span className="text-fog"> · {author.role}</span>
            </p>
            <time dateTime={insight.date} className="text-fog">
              {formatDate(insight.date)}
            </time>
          </div>
        </div>
      </PageHero>

      <Section tone="ink" padding="compact" className="pt-0 md:pt-0">
        <Container>
          <article className="border-line mx-auto max-w-[70ch] border-t pt-6">
            <MDXContent code={insight.body} />
          </article>
        </Container>
      </Section>

      {related.length > 0 && (
        <Section tone="raised" padding="compact">
          <Container>
            <SectionHeader
              eyebrow="Keep reading"
              title={
                <>
                  More <span className="accent">insights.</span>
                </>
              }
            />
            <div className="mt-12 grid gap-5 md:grid-cols-2">
              {related.map((article) => (
                <LinkCard
                  key={article.slug}
                  href={`/insights/${article.slug}`}
                  eyebrow={tagLabel(article.tags[0])}
                  title={article.title}
                  description={article.excerpt}
                />
              ))}
            </div>
          </Container>
        </Section>
      )}

      <CtaBand
        title={
          <>
            Turn reading <span className="accent">into doing.</span>
          </>
        }
        body="Thirty minutes. We’ll map what you read here onto your situation."
      />
    </main>
  )
}
