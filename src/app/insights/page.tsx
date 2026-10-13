import type { Metadata } from 'next'
import Link from 'next/link'
import { CtaBand } from '@/components/sections/cta-band'
import { PageHero } from '@/components/sections/page-hero'
import { Card } from '@/components/ui/card'
import { Container, Section } from '@/components/ui/layout'
import { Eyebrow } from '@/components/ui/typography'
import { cmsInsightsByDate } from '@/lib/content'

/**
 * Insights index — rendered from the CMS (Velite).
 */

export const metadata: Metadata = {
  title: 'Insights — Guides for Buyers',
  description:
    'Akrostech insights: plain-English guides on outsourcing costs, RPO, virtual assistants, and websites. Signal, not noise.',
}

export default function InsightsPage() {
  const articles = cmsInsightsByDate
  const [featured, ...rest] = articles

  return (
    <main>
      <PageHero
        eyebrow="Insights"
        title={
          <>
            Signal, <span className="font-serif-accent italic">not noise.</span>
          </>
        }
        lead="Guides for buyers, not brochureware. Every article answers one question completely — the question you\u2019d ask on a sales call."
        variant="waveform"
        crumbs={[{ label: 'Insights' }]}
      />
      <Section surface="dark" padding="compact">
        <Container>
          {featured && (
            <>
              <Eyebrow>Featured</Eyebrow>
              <Card className="border-indigo-glow/30 mt-8">
                <p className="text-aurora-teal font-mono text-xs tracking-[0.25em] uppercase">
                  {featured.tags[0]}
                </p>
                <h2 className="font-display text-paper-50 mt-3 text-2xl font-semibold md:text-3xl">
                  <Link
                    href={`/insights/${featured.slug}`}
                    className="hover:text-indigo-glow transition-colors"
                  >
                    {featured.title}
                  </Link>
                </h2>
                <p className="mt-3 max-w-[68ch] text-lg leading-relaxed text-mist-400">
                  {featured.excerpt}
                </p>
              </Card>
            </>
          )}
          <div className="mt-12">
            <Eyebrow>All articles</Eyebrow>
            <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {rest.map((article) => (
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
          </div>
        </Container>
      </Section>
      <CtaBand
        title="Read less, ask more"
        body="Articles answer the common questions. Your situation gets a conversation."
      />
    </main>
  )
}
