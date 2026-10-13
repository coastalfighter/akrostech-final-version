import { ArrowRight } from '@phosphor-icons/react/dist/ssr'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Container, Section } from '@/components/ui/layout'
import { Eyebrow, Heading, Lead } from '@/components/ui/typography'
import { cmsInsightsByDate } from '@/lib/content'

/** Latest insights preview — the three most recent CMS articles. */

export function InsightsPreview() {
  const articles = cmsInsightsByDate.slice(0, 3)

  return (
    <Section surface="dark">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <Eyebrow>Insights</Eyebrow>
            <Heading as="h2" className="mt-4">
              Signal, not noise
            </Heading>
            <Lead className="mt-4">
              Guides for buyers, not brochureware. Every article answers one question completely.
            </Lead>
          </div>
          <Button asChild variant="secondary">
            <Link href="/insights">
              All insights <ArrowRight aria-hidden="true" className="hidden" />
            </Link>
          </Button>
        </div>
        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {articles.map((article) => (
            <Card key={article.slug} className="flex flex-col">
              <p className="text-aurora-teal font-mono text-xs tracking-[0.25em] uppercase">
                {article.tags[0]}
              </p>
              <h3 className="font-display text-paper-50 mt-3 text-xl font-semibold">
                <Link
                  href={`/insights/${article.slug}`}
                  className="hover:text-indigo-glow transition-colors"
                >
                  {article.title}
                </Link>
              </h3>
              <p className="mt-2 flex-1 leading-relaxed text-mist-400">{article.excerpt}</p>
            </Card>
          ))}
        </div>
      </Container>
    </Section>
  )
}
