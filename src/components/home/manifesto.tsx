import { Reveal3D } from '@/components/motion/reveal-3d'
import { Rings3D } from '@/components/motion/rings-3d'
import { Container, Section } from '@/components/ui/layout'
import { Eyebrow } from '@/components/ui/typography'

const FACTS = [
  { k: 'Headquarters', v: 'Wilmington, Delaware' },
  { k: 'Delivery', v: 'Dedicated teams in India' },
  { k: 'Coverage', v: 'EST · CST · MST · PST' },
]

/**
 * Who we are — the graphic holds its own column (sticky beside the text on
 * desktop), the statement fills the other, and three plain facts close it.
 */
export function Manifesto() {
  return (
    <Section tone="ink">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[minmax(0,340px)_1fr] lg:gap-20">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <Eyebrow>Who we are</Eyebrow>
            <Rings3D className="mt-10 hidden w-full max-w-[320px] lg:block" />
            <p className="text-fog mt-10 hidden max-w-[28ch] lg:block">
              One partner for the work that keeps a U.S. business running — staffed from India,
              aligned to your clock.
            </p>
          </div>
          <div>
            <Reveal3D>
              <p className="font-display text-[2rem] leading-[1.15] tracking-[-0.025em] text-balance md:text-[3.2rem]">
                Akrostech gives U.S. businesses{' '}
                <span className="accent">dedicated professionals</span> who work like they&rsquo;re
                down the hall — in your tools, on your hours, held to your standards.
              </p>
            </Reveal3D>
            <Reveal3D className="mt-10">
              <p className="font-display text-fog text-[2rem] leading-[1.15] tracking-[-0.025em] text-balance md:text-[3.2rem]">
                Not a shared pool. Not a ticket queue. Your people — working while you do, and while
                you sleep.
              </p>
            </Reveal3D>
            <dl className="mt-16 grid gap-4 sm:grid-cols-3">
              {FACTS.map((f, i) => (
                <Reveal3D
                  key={f.k}
                  variant="flip"
                  index={i}
                  className="border-line bg-ink-2 rounded-[var(--radius-card)] border p-7"
                >
                  <dt className="text-sage text-xs tracking-[0.22em] uppercase">{f.k}</dt>
                  <dd className="font-display mt-3 text-2xl">{f.v}</dd>
                </Reveal3D>
              ))}
            </dl>
          </div>
        </div>
      </Container>
    </Section>
  )
}
