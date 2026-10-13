import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { MDXContent } from '@/components/mdx/mdx-content'
import { PageHero } from '@/components/sections/page-hero'
import { Container, Section } from '@/components/ui/layout'
import { cmsGetLegal, cmsLegalAll } from '@/lib/content'
import { formatDate } from '@/lib/format'

/**
 * Legal pages — privacy, terms, cookies, SMS — rendered from content/legal.
 * Only the known slugs exist; anything else at the root falls through to 404.
 */

export const dynamicParams = false

export function generateStaticParams() {
  return cmsLegalAll.map((l) => ({ legal: l.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ legal: string }>
}): Promise<Metadata> {
  const { legal } = await params
  const page = cmsGetLegal(legal)
  if (!page) return {}
  return { title: page.title, description: page.description }
}

export default async function LegalPage({ params }: { params: Promise<{ legal: string }> }) {
  const { legal } = await params
  const page = cmsGetLegal(legal)
  if (!page) notFound()

  return (
    <main>
      <PageHero
        eyebrow="Legal"
        title={page.title}
        lead={page.description}
        size="md"
        crumbs={[{ label: page.title }]}
      >
        <p className="text-fog text-sm">
          Last updated <time dateTime={page.updated}>{formatDate(page.updated)}</time>
        </p>
      </PageHero>
      <Section tone="ink" padding="compact" className="pt-0 md:pt-0">
        <Container>
          <article className="border-line mx-auto max-w-[70ch] border-t pt-6">
            <MDXContent code={page.body} />
          </article>
        </Container>
      </Section>
    </main>
  )
}
