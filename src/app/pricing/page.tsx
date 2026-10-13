import type { Metadata } from 'next'
import { Check } from '@phosphor-icons/react/dist/ssr'
import Link from 'next/link'
import { CtaBand } from '@/components/sections/cta-band'
import { PageHero } from '@/components/sections/page-hero'
import { Button } from '@/components/ui/button'
import { Container, Section } from '@/components/ui/layout'
import { SectionHeader } from '@/components/ui/typography'
import { cn } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Pricing — Honest, Fixed, In Writing',
  description:
    'Akrostech pricing: per resource or per project, quoted fixed before work starts. See the engagement models and what every quote includes.',
}

const MODELS = [
  {
    title: 'Dedicated resource',
    tag: 'Most popular',
    body: 'A full-time or part-time professional, dedicated to you. One monthly rate with management, backup coverage and supervision included.',
    points: [
      'Your hours, EST to PST + overnight',
      'You interview and approve',
      'Backup coverage built in',
    ],
  },
  {
    title: 'Project-based',
    body: 'Defined scope, defined timeline, defined price. Websites, clean-ups, hiring sprints and discovery-heavy legal work.',
    points: ['Fixed quote in writing', 'Weekly demos or updates', 'You own everything'],
  },
  {
    title: 'Scalable team',
    body: 'Start with one, grow to a team. Capacity flexes with demand — ramp up for launches, down for quiet quarters.',
    points: ['Add or remove monthly', 'Consistent quality bar', 'One point of contact'],
  },
]

const INCLUDED = [
  ['Vetting', 'Three-gate screening before you interview anyone.'],
  ['Management', 'A supervisor accountable for quality and coverage.'],
  ['Backup', 'A trained backup who already knows your setup.'],
  ['Reporting', 'Weekly updates, monthly reviews, KPIs you can read.'],
]

export default function PricingPage() {
  return (
    <main>
      <PageHero
        eyebrow="Pricing"
        title={
          <>
            Honest pricing. <span className="accent">No mystery math.</span>
          </>
        }
        lead="Every quote shows its work: the benchmark, our rate and what’s included. Fixed in writing before work starts — never hourly fog."
        word="Pricing"
        crumbs={[{ label: 'Pricing' }]}
      >
        <Button asChild size="lg">
          <Link href="/book">Get a custom quote</Link>
        </Button>
      </PageHero>

      <Section tone="ink" className="pt-16 md:pt-24">
        <Container>
          <SectionHeader
            eyebrow="Engagement models"
            index="01"
            title={
              <>
                Three ways <span className="accent">to work together.</span>
              </>
            }
          />
          <div className="mt-16 grid gap-5 lg:grid-cols-3">
            {MODELS.map((m, i) => {
              const featured = i === 0
              return (
                <div
                  key={m.title}
                  className={cn(
                    'flex flex-col rounded-[var(--radius-card)] p-8 md:p-10',
                    featured ? 'bg-lime text-ink' : 'border-line bg-ink-2 border',
                  )}
                >
                  <div className="flex items-center justify-between gap-4">
                    <span className={cn('tnum text-sm', featured ? 'text-ink/60' : 'text-sage')}>
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    {m.tag && (
                      <span className="bg-ink text-lime rounded-full px-3 py-1 text-xs font-medium tracking-[0.12em] uppercase">
                        {m.tag}
                      </span>
                    )}
                  </div>
                  <h3 className="font-display mt-12 text-4xl tracking-[-0.025em]">{m.title}</h3>
                  <p
                    className={cn(
                      'mt-4 flex-1 leading-relaxed',
                      featured ? 'text-ink/75' : 'text-fog',
                    )}
                  >
                    {m.body}
                  </p>
                  <ul
                    className={cn(
                      'mt-8 space-y-3 border-t pt-8',
                      featured ? 'border-ink/15' : 'border-line',
                    )}
                  >
                    {m.points.map((point) => (
                      <li key={point} className="flex items-center gap-3 text-[15px]">
                        <Check
                          aria-hidden="true"
                          weight="bold"
                          className={cn('size-4 shrink-0', featured ? 'text-ink' : 'text-lime')}
                        />
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              )
            })}
          </div>
        </Container>
      </Section>

      <Section tone="raised">
        <Container>
          <SectionHeader
            eyebrow="In every quote"
            index="02"
            title={
              <>
                The quote <span className="accent">is the price.</span>
              </>
            }
            lead="No setup fees hidden in footnotes. No “platform charges.” Every engagement includes:"
          />
          <dl className="border-line bg-line mt-16 grid gap-px overflow-hidden rounded-[var(--radius-card)] border md:grid-cols-2 lg:grid-cols-4">
            {INCLUDED.map(([title, body]) => (
              <div key={title} className="bg-ink-2 p-8">
                <dt className="font-display text-2xl">{title}</dt>
                <dd className="text-fog mt-3 leading-relaxed">{body}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </Section>

      <CtaBand
        title={
          <>
            Get <span className="accent">your number.</span>
          </>
        }
        body="Tell us the role or the project. We’ll send a fixed quote with the math shown — usually within one business day."
      />
    </main>
  )
}
