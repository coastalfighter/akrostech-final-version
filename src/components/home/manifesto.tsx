import { Orbit } from '@/components/brand/arcs'
import { Container, Section } from '@/components/ui/layout'
import { Eyebrow } from '@/components/ui/typography'

const FACTS = [
  { k: 'Headquarters', v: 'Wilmington, Delaware' },
  { k: 'Delivery', v: 'Dedicated teams in India' },
  { k: 'Coverage', v: 'EST · CST · MST · PST' },
]

/** Who we are, in one big paragraph — plus three plain facts. */
export function Manifesto() {
  return (
    <Section tone="ink">
      <Orbit className="absolute top-24 right-[6%] hidden size-56 opacity-80 lg:block" />
      <Container>
        <Eyebrow>Who we are</Eyebrow>
        <p className="reveal font-display mt-10 max-w-6xl text-[2rem] leading-[1.15] tracking-[-0.025em] text-balance md:text-[3.4rem]">
          Akrostech gives U.S. businesses <span className="accent">dedicated professionals</span>{' '}
          who work like they&rsquo;re down the hall — in your tools, on your hours, held to your
          standards. Not a shared pool. Not a ticket queue.{' '}
          <span className="text-fog">Your people — working while you do, and while you sleep.</span>
        </p>
        <dl className="border-line bg-line mt-20 grid gap-px overflow-hidden rounded-[var(--radius-card)] border sm:grid-cols-3">
          {FACTS.map((f) => (
            <div key={f.k} className="bg-ink p-7 md:p-9">
              <dt className="text-sage text-xs tracking-[0.22em] uppercase">{f.k}</dt>
              <dd className="font-display mt-3 text-2xl">{f.v}</dd>
            </div>
          ))}
        </dl>
      </Container>
    </Section>
  )
}
