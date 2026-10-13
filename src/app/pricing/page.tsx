import type { Metadata } from 'next'
import Link from 'next/link'
import { CtaBand } from '@/components/sections/cta-band'
import { PageHero } from '@/components/sections/page-hero'
import { Button } from '@/components/ui/button'
import { Container, Section } from '@/components/ui/layout'
import { Eyebrow, Heading, Lead } from '@/components/ui/typography'

export const metadata: Metadata = {
  title: 'Pricing — Honest, Fixed, In Writing',
  description:
    'Akrostech pricing: per-resource or per-project, quoted fixed before work starts. See the engagement models and what every quote includes.',
}

const MODELS = [
  {
    title: 'Dedicated resource',
    body: 'A full-time or part-time professional, dedicated to you. One monthly rate — management, backup coverage, and supervision included.',
    points: [
      'Your hours (EST\u2013PST + overnight)',
      'You interview and approve',
      'Backup coverage built in',
    ],
  },
  {
    title: 'Project-based',
    body: 'Defined scope, defined timeline, defined price. Websites, cleanups, hiring sprints, and discovery-heavy legal work.',
    points: ['Fixed quote in writing', 'Weekly demos or updates', 'You own everything'],
  },
  {
    title: 'Scalable team',
    body: 'Start with one, grow to a team. Capacity flexes with demand — ramp up for launches, down for quiet quarters.',
    points: ['Add or remove monthly', 'Consistent quality bar', 'One point of contact'],
  },
]

export default function PricingPage() {
  return (
    <main>
      <PageHero
        eyebrow="Pricing"
        title={
          <>
            Honest pricing, <span className="font-serif-accent italic">no mystery math.</span>
          </>
        }
        lead="Every quote shows its work: the benchmark, our rate, and what\u2019s included. Fixed in writing before work starts — never hourly fog."
        variant="dial"
        crumbs={[{ label: 'Pricing' }]}
      >
        <Button asChild size="lg">
          <Link href="/book">Get a custom quote</Link>
        </Button>
      </PageHero>
      <Section surface="light">
        <Container>
          <Eyebrow>Engagement models</Eyebrow>
          <Heading as="h2" className="mt-4 max-w-3xl">
            Three ways to work together
          </Heading>
          <div className="mt-10 grid gap-4 lg:grid-cols-3">
            {MODELS.map((model) => (
              <div
                key={model.title}
                className="border-graphite-900/10 flex flex-col rounded-[24px] border bg-white p-8"
              >
                <h3 className="font-display text-graphite-900 text-2xl font-semibold">
                  {model.title}
                </h3>
                <p className="mt-3 flex-1 leading-relaxed text-slate-600">{model.body}</p>
                <ul className="mt-6 space-y-2.5">
                  {model.points.map((point) => (
                    <li key={point} className="flex gap-3 text-[15px] text-slate-600">
                      <span
                        aria-hidden="true"
                        className="bg-akros-indigo mt-2 size-1.5 shrink-0 rounded-full"
                      />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Container>
      </Section>
      <Section surface="dark">
        <Container>
          <Eyebrow>What every quote includes</Eyebrow>
          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {[
              ['Vetting', 'Three-gate screening before you interview anyone.'],
              ['Management', 'A supervisor accountable for quality and coverage.'],
              ['Backup', 'A trained backup who knows your setup.'],
              ['Reporting', 'Weekly updates, monthly reviews, KPIs you can read.'],
            ].map(([title, body]) => (
              <div key={title} className="border-line-dark bg-ink-800 rounded-[20px] border p-6">
                <h3 className="font-display text-paper-50 text-lg font-semibold">{title}</h3>
                <p className="mt-2 text-mist-400">{body}</p>
              </div>
            ))}
          </div>
          <Lead className="mt-10 max-w-[68ch]">
            No setup fees hidden in footnotes. No \u201Cplatform charges.\u201D The quote is the
            price.
          </Lead>
        </Container>
      </Section>
      <CtaBand
        title="Get your number"
        body="Tell us the role or the project. We\u2019ll send a fixed quote with the math shown — usually within one business day."
        primary={{ label: 'Book a 30-min call', href: '/book' }}
      />
    </main>
  )
}
