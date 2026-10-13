import type { Metadata } from 'next'
import { FaqAccordion } from '@/components/sections/faq-accordion'
import { PageHero } from '@/components/sections/page-hero'
import { CtaBand } from '@/components/sections/cta-band'
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
            Ask <span className="font-serif-accent italic">anything.</span>
          </>
        }
        lead="The questions every prospect asks, answered the way we\u2019d answer them on a call."
        variant="default"
        crumbs={[{ label: 'FAQ' }]}
      />
      <Section surface="light">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1fr_1.6fr]">
            <div>
              <Eyebrow>Common questions</Eyebrow>
              <Lead className="mt-4">
                Service-specific questions live on each service page. These are the ones about
                working with us, full stop.
              </Lead>
            </div>
            <FaqAccordion
              items={globalFaqs.map((f) => ({ question: f.question, answer: f.answer }))}
            />
          </div>
        </Container>
      </Section>
      <CtaBand
        title="Still curious?"
        body="Some questions deserve a human. Thirty minutes, no commitment."
      />
    </main>
  )
}
