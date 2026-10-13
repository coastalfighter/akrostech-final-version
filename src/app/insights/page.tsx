import type { Metadata } from 'next'
import { ArrowUpRight } from '@phosphor-icons/react/dist/ssr'
import Link from 'next/link'
import { CtaBand } from '@/components/sections/cta-band'
import { PageHero } from '@/components/sections/page-hero'
import { LinkCard } from '@/components/ui/card'
import { Container, Section } from '@/components/ui/layout'
import { cmsInsightsByDate } from '@/lib/content'
import { formatDate, tagLabel } from '@/lib/format'

export const metadata: Metadata = {
  title: 'Insights — Guides for Buyers',
  description:
    'Akrostech insights: plain-English guides on outsourcing costs, RPO, virtual assistants and websites. Signal, not noise.',
}

export default function InsightsPage() {
  const [featured, ...rest] = cmsInsightsByDate

  return (
    <main>
      <PageHero
        eyebrow="Insights"
        title={
          <>
            Signal, <span className="accent">not noise.</span>
          </>
        }
        lead="Guides for buyers, not brochureware. Every article answers one question completely — the question you’d ask on a sales call."
        word="Insights"
        crumbs={[{ label: 'Insights' }]}
      />

      <Section tone="ink" className="pt-16 md:pt-24">
        <Container>
          {featured && (
            <Link
              href={`/insights/${featured.slug}`}
              className="group/f bg-forest-deep relative grid overflow-hidden rounded-[var(--radius-card)] p-8 md:grid-cols-[1.3fr_1fr] md:gap-16 md:p-14"
            >
              <div>
                <p className="text-sage flex flex-wrap items-center gap-3 text-xs tracking-[0.22em] uppercase">
                  <span className="bg-lime text-ink rounded-full px-3 py-1">Featured</span>
                  {tagLabel(featured.tags[0])}
                </p>
                <h2 className="font-display group-hover/f:text-lime mt-10 text-4xl leading-[1.02] tracking-[-0.03em] text-balance transition-colors md:text-6xl">
                  {featured.title}
                </h2>
              </div>
              <div className="mt-8 flex flex-col justify-end md:mt-0">
                <p className="text-cream/80 text-lg leading-relaxed">{featured.excerpt}</p>
                <p className="border-cream/15 text-cream/70 mt-8 flex items-center justify-between gap-4 border-t pt-6 text-sm">
                  <time dateTime={featured.date}>{formatDate(featured.date)}</time>
                  <span className="bg-lime text-ink flex size-12 items-center justify-center rounded-full transition-transform duration-500 group-hover/f:rotate-45">
                    <ArrowUpRight aria-hidden="true" weight="bold" className="size-5" />
                  </span>
                </p>
              </div>
            </Link>
          )}

          <div className="mt-5 grid gap-5 md:grid-cols-2">
            {rest.map((article) => (
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

      <CtaBand
        title={
          <>
            Read less, <span className="accent">ask more.</span>
          </>
        }
        body="Articles answer the common questions. Your situation deserves a conversation."
      />
    </main>
  )
}
