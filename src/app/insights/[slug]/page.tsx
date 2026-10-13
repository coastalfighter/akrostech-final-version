import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { MDXContent } from '@/components/mdx/mdx-content'
import { CtaBand } from '@/components/sections/cta-band'
import { PageHero } from '@/components/sections/page-hero'
import { JsonLd, articleJsonLd, breadcrumbJsonLd } from '@/components/seo/json-ld'
import { Card } from '@/components/ui/card'
import { Container, Section } from '@/components/ui/layout'
import { Eyebrow } from '@/components/ui/typography'
import { cmsGetInsight, cmsInsightsByDate } from '@/lib/content'
import { env } from '@/lib/env'

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

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

const AUTHOR_NAMES: Record<string, string> = {
  jennifer: 'Jennifer',
  'gaurang-shukla': 'Gaurang Shukla',
}

const AUTHOR_ROLES: Record<string, string> = {
  jennifer: 'Sales Lead, Akrostech Consulting',
  'gaurang-shukla': 'Founder, Akrostech Consulting',
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
  const authorName = AUTHOR_NAMES[insight.author] ?? insight.author
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
            authorName,
          }),
          breadcrumbJsonLd(siteUrl, [
            { label: 'Insights', href: '/insights' },
            { label: insight.title },
          ]),
        ]}
      />
      <PageHero
        eyebrow={insight.tags[0] ?? 'Insights'}
        title={insight.title}
        lead={insight.excerpt}
        variant="waveform"
        crumbs={[{ label: 'Insights', href: '/insights' }, { label: insight.title }]}
      >
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-[15px] text-mist-400">
          <span>
            By <span className="text-paper-50 font-medium">{authorName}</span>
            {AUTHOR_ROLES[insight.author] && (
              <span className="text-mist-400"> · {AUTHOR_ROLES[insight.author]}</span>
            )}
          </span>
          <time dateTime={insight.date}>{formatDate(insight.date)}</time>
        </div>
      </PageHero>

      <Section surface="dark" padding="compact">
        <Container>
          <article className="mx-auto max-w-[72ch]">
            <MDXContent code={insight.body} />
          </article>
        </Container>
      </Section>

      {related.length > 0 && (
        <Section surface="dark" padding="compact">
          <Container>
            <Eyebrow>Keep reading</Eyebrow>
            <div className="mt-8 grid gap-4 md:grid-cols-2">
              {related.map((article) => (
                <Card key={article.slug} className="flex flex-col">
                  <p className="text-aurora-teal font-mono text-xs tracking-[0.25em] uppercase">
                    {article.tags[0]}
                  </p>
                  <h2 className="font-display text-paper-50 mt-3 text-xl font-semibold">
                    <Link
                      href={`/insights/${article.slug}`}
                      className="hover:text-indigo-glow transition-colors"
                    >
                      {article.title}
                    </Link>
                  </h2>
                  <p className="mt-2 flex-1 leading-relaxed text-mist-400">{article.excerpt}</p>
                </Card>
              ))}
            </div>
          </Container>
        </Section>
      )}

      <CtaBand
        title="Turn reading into doing"
        body="Thirty minutes. We\u2019ll map what you read here onto your situation."
      />
    </main>
  )
}
