import type { Metadata } from 'next'
import { CalendlyEmbed } from '@/components/booking/calendly-embed'
import { PageHero } from '@/components/sections/page-hero'
import { Container, Section } from '@/components/ui/layout'
import { Eyebrow } from '@/components/ui/typography'

export const metadata: Metadata = {
  title: 'Book a 30-Minute Call',
  description:
    'Book a 30-minute call with Akrostech Consulting. No commitment — tell us what hurts, and we’ll tell you honestly whether we’re the right fix.',
}

const PREP = [
  {
    title: 'What hurts most',
    body: 'One or two sentences about the problem. “We can’t hire fast enough” beats a slide deck.',
  },
  {
    title: 'What “done” looks like',
    body: 'How will you know this worked? A number, a date, a feeling — all valid.',
  },
  {
    title: 'Your timeline',
    body: 'Yesterday, next quarter or “just exploring” — we’ll calibrate honestly.',
  },
]

export default function BookPage() {
  return (
    <main>
      <PageHero
        eyebrow="Book a call"
        title={
          <>
            Thirty minutes. <span className="accent">No pitch.</span>
          </>
        }
        lead="Tell us what hurts most. We’ll tell you honestly whether we’re the right fix — and what it would cost."
        word="Let's talk"
        crumbs={[{ label: 'Book a call' }]}
      />
      <Section tone="ink" className="pt-16 md:pt-24">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
            <div>
              <Eyebrow>How to prepare</Eyebrow>
              <h2 className="font-display mt-6 text-4xl tracking-[-0.025em] md:text-5xl">
                Three things <span className="accent">worth a thought.</span>
              </h2>
              <ol className="mt-10 space-y-8">
                {PREP.map((item, i) => (
                  <li key={item.title} className="border-line flex gap-6 border-t pt-8">
                    <span className="tnum font-display text-lime text-4xl">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <div>
                      <h3 className="font-display text-2xl">{item.title}</h3>
                      <p className="text-fog mt-2 leading-relaxed">{item.body}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
            <CalendlyEmbed />
          </div>
        </Container>
      </Section>
    </main>
  )
}
