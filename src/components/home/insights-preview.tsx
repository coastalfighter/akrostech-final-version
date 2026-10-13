import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { LinkCard } from '@/components/ui/card'
import { Container, Section } from '@/components/ui/layout'
import { SectionHeader } from '@/components/ui/typography'
import { cmsInsightsByDate } from '@/lib/content'

/** Latest insights — the three most recent CMS articles. */
export function InsightsPreview() {
  const articles = cmsInsightsByDate.slice(0, 3)
  return (
    <Section tone="ink" className="pt-0 md:pt-0">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-8">
          <SectionHeader
            eyebrow="Insights"
            index="06"
            title={
              <>
                Signal, <span className="accent">not noise.</span>
              </>
            }
            lead="Plain-English guides for buyers. Every article answers one question completely."
          />
          <Button asChild variant="secondary">
            <Link href="/insights">All insights</Link>
          </Button>
        </div>
        <div className="mt-16 grid gap-5 md:grid-cols-3">
          {articles.map((a) => (
            <LinkCard
              key={a.slug}
              href={`/insights/${a.slug}`}
              eyebrow={a.tags[0]?.replace(/-/g, ' ')}
              title={a.title}
              description={a.excerpt}
            />
          ))}
        </div>
      </Container>
    </Section>
  )
}
