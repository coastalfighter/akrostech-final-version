import { Check } from '@phosphor-icons/react/dist/ssr'
import { FeatureCard } from '@/components/ui/card'
import { Container, Section } from '@/components/ui/layout'
import { Eyebrow, Heading } from '@/components/ui/typography'

/** "Why Akrostech" — the six differentiators. */

const REASONS = [
  {
    title: 'Dedicated, not shared',
    body: 'Every professional works for one client: you. No shared pools, no fractional attention.',
  },
  {
    title: 'Your hours',
    body: 'Real-time overlap across EST, CST, MST, and PST — plus an overnight follow-the-sun shift.',
  },
  {
    title: 'Vetted three ways',
    body: 'Domain skill (tested, not claimed), written and spoken English, and reliability.',
  },
  {
    title: 'Security by default',
    body: 'NDAs, access controls, and confidentiality protocols — deepest where data is most sensitive.',
  },
  {
    title: 'Measured quality',
    body: 'Reporting, KPIs, and regular reviews. Trust built on evidence, updated weekly.',
  },
  {
    title: 'Serious savings',
    body: 'Offshore cost with in-house accountability — quoted fixed, in writing, before work starts.',
  },
]

export function WhyAkrostech() {
  return (
    <Section surface="dark" padding="compact">
      <Container>
        <Eyebrow>Why Akrostech</Eyebrow>
        <Heading as="h2" className="mt-4 max-w-3xl">
          The distance is ours. The results are yours.
        </Heading>
        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {REASONS.map((reason) => (
            <FeatureCard key={reason.title} icon={<Check weight="duotone" />} title={reason.title}>
              {reason.body}
            </FeatureCard>
          ))}
        </div>
      </Container>
    </Section>
  )
}
