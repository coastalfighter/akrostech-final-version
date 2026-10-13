import { CountUp } from '@/components/motion/count-up'
import { Parallax } from '@/components/motion/parallax'
import { Reveal3D } from '@/components/motion/reveal-3d'
import { Container, Section } from '@/components/ui/layout'
import { Eyebrow } from '@/components/ui/typography'

/**
 * Why Akrostech — an oversized script-style headline, six principles, and a
 * strip of plain facts (no unconfirmed metrics: those stay behind the
 * `stats` feature flag until the client approves real numbers).
 */

const PRINCIPLES = [
  {
    title: 'Dedicated, not shared',
    body: 'Every professional works for one client: you. No pools, no fractional attention.',
  },
  {
    title: 'Your hours',
    body: 'Real-time overlap across EST, CST, MST and PST — plus an overnight shift when you want it.',
  },
  {
    title: 'Vetted three ways',
    body: 'Domain skill (tested, not claimed), written and spoken English, and reliability.',
  },
  {
    title: 'Secure by default',
    body: 'NDAs, access controls and confidentiality protocols — deepest where data is most sensitive.',
  },
  {
    title: 'Measured quality',
    body: 'Weekly updates, monthly reviews and KPIs you can read. Trust built on evidence.',
  },
  {
    title: 'Honest pricing',
    body: 'Per resource or per project, fixed in writing before work starts. The quote is the price.',
  },
]

const FACTS = [
  { value: 5, suffix: '', label: 'Services under one roof' },
  { value: 4, suffix: '', label: 'U.S. time zones covered' },
  { value: 1, suffix: '', label: 'Client per professional' },
  { value: 24, suffix: 'h', label: 'Follow-the-sun option' },
]

export function Why() {
  return (
    <Section tone="ink">
      <Container>
        <div className="text-center">
          <Eyebrow index="03">Why Akrostech</Eyebrow>
          <h2 className="reveal font-display mt-8 text-[3.4rem] leading-[0.95] tracking-[-0.04em] md:text-[9rem]">
            Why <span className="accent">choose</span> us?
          </h2>
        </div>

        <ol className="border-line bg-line mt-20 grid gap-px overflow-hidden rounded-[var(--radius-card)] border md:grid-cols-2 lg:grid-cols-3">
          {PRINCIPLES.map((p, i) => (
            <li
              key={p.title}
              className="group/p bg-ink hover:bg-ink-2 p-8 transition-colors duration-500 md:p-10"
            >
              <span className="tnum text-sage text-sm">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="font-display group-hover/p:text-lime mt-10 text-3xl tracking-[-0.02em] transition-colors">
                {p.title}
              </h3>
              <p className="text-fog mt-3 leading-relaxed">{p.body}</p>
            </li>
          ))}
        </ol>

        <dl className="mt-24 grid grid-cols-2 gap-y-14 lg:grid-cols-4">
          {FACTS.map((f) => (
            <div key={f.label} className="border-line flex flex-col-reverse border-l pl-6">
              <dt className="text-fog mt-4 max-w-[16ch]">{f.label}</dt>
              <dd className="tnum font-display text-7xl leading-none tracking-[-0.04em] md:text-8xl">
                <CountUp value={f.value} suffix={f.suffix} />
              </dd>
            </div>
          ))}
        </dl>
      </Container>
    </Section>
  )
}
