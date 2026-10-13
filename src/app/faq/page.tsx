import type { Metadata } from 'next'
import { CtaBand } from '@/components/sections/cta-band'
import { FaqAccordion } from '@/components/sections/faq-accordion'
import { PageHero } from '@/components/sections/page-hero'
import { JsonLd, faqJsonLd } from '@/components/seo/json-ld'
import { Container, Section } from '@/components/ui/layout'
import { Eyebrow, Lead } from '@/components/ui/typography'
import { globalFaqs } from '@/data/site'

export const metadata: Metadata = {
  title: 'FAQ — Common Questions, Straight Answers',
  description:
    'How fast can we start? Who owns the work? Is my data secure? Straight answers to the questions every Akrostech prospect asks.',
}

export default function FaqPage() {
  return (
    <main>
      <JsonLd data={faqJsonLd(globalFaqs)} />
      <PageHero
        eyebrow="FAQ"
        title={
          <>
            Ask <span className="accent">anything.</span>
          </>
        }
        lead="The questions every prospect asks, answered the way we’d answer them on a call."
        crumbs={[{ label: 'FAQ' }]}
      />
      <Section tone="ink" className="pt-16 md:pt-24">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20">
            <div className="lg:sticky lg:top-32 lg:self-start">
              <Eyebrow>Working with us</Eyebrow>
              <Lead className="mt-6">
                Service-specific questions live on each service page. These are the ones about
                working with Akrostech, full stop.
              </Lead>
            </div>
            <FaqAccordion items={globalFaqs} />
          </div>
        </Container>
      </Section>
      <CtaBand
        title={
          <>
            Still <span className="accent">curious?</span>
          </>
        }
        body="Some questions deserve a human. Thirty minutes, no commitment."
      />
    </main>
  )
}
