import type { Metadata } from 'next'
import { CalendlyEmbed } from '@/components/booking/calendly-embed'
import { PageHero } from '@/components/sections/page-hero'
import { Container, Section } from '@/components/ui/layout'
import { Eyebrow, Heading } from '@/components/ui/typography'

export const metadata: Metadata = {
  title: 'Book a 30-Minute Call',
  description:
    'Book a 30-minute call with Akrostech Consulting. No commitment — tell us what hurts, we\u2019ll tell you honestly whether we\u2019re the right fix.',
}

const PREP = [
  {
    title: 'What hurts most',
    body: 'One or two sentences about the problem. \u201CWe can\u2019t hire fast enough\u201D beats a slide deck.',
  },
  {
    title: 'What \u201Cdone\u201D looks like',
    body: 'How will you know this worked? A number, a date, a feeling — all valid.',
  },
  {
    title: 'Your timeline',
    body: 'Yesterday, next quarter, or \u201Cjust exploring\u201D — we\u2019ll calibrate honestly.',
  },
]

export default function BookPage() {
  return (
    <main>
      <PageHero
        eyebrow="Book a call"
        title={
          <>
            Thirty minutes. <span className="font-serif-accent italic">No pitch.</span>
          </>
        }
        lead="Tell us what hurts most. We\u2019ll tell you honestly whether we\u2019re the right fix — and what it would cost."
        variant="default"
        crumbs={[{ label: 'Book a call' }]}
      />
      <Section surface="light">
        <Container>
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <Eyebrow>How to prepare</Eyebrow>
              <Heading as="h2" className="mt-4">
                Three things worth thinking about
              </Heading>
              <div className="mt-8 space-y-6">
                {PREP.map((item, i) => (
                  <div key={item.title} className="flex gap-5">
                    <span className="tnum font-display text-akros-indigo text-3xl font-bold">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <div>
                      <h3 className="font-display text-graphite-900 text-lg font-semibold">
                        {item.title}
                      </h3>
                      <p className="mt-1 leading-relaxed text-slate-600">{item.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <CalendlyEmbed />
          </div>
        </Container>
      </Section>
    </main>
  )
}
