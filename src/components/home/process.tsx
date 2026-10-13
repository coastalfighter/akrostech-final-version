import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Container, Section } from '@/components/ui/layout'
import { SectionHeader } from '@/components/ui/typography'

export const STEPS = [
  {
    title: 'Discover',
    body: 'A 30-minute call maps what you need and what “done” looks like. You get a written scope and a fixed quote.',
  },
  {
    title: 'Match',
    body: 'We shortlist vetted professionals against your tools and working style. You interview the finalists and choose.',
  },
  {
    title: 'Onboard',
    body: 'Your team learns your systems in week one, with daily check-ins until the rhythm is set.',
  },
  {
    title: 'Scale',
    body: 'Add hours, people or services as you grow — or scale back. Monthly reviews keep it honest.',
  },
]

/** How it works — four steps with oversized outline numerals. */
export function Process() {
  return (
    <Section tone="raised">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-8">
          <SectionHeader
            eyebrow="How it works"
            index="04"
            title={
              <>
                Hiring, <span className="accent">without the hiring.</span>
              </>
            }
            lead="You interview, you approve, you manage. We handle sourcing, vetting, payroll and backup coverage."
          />
          <Button asChild variant="secondary">
            <Link href="/how-it-works">The full process</Link>
          </Button>
        </div>
        <ol className="mt-20 grid gap-12 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {STEPS.map((step, i) => (
            <li key={step.title} className="relative">
              <span
                aria-hidden="true"
                className="text-outline tnum font-display block text-[7.5rem] leading-[0.8] tracking-[-0.05em]"
              >
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="font-display mt-6 flex items-center gap-3 text-3xl tracking-[-0.02em]">
                <span className="sr-only">{`Step ${i + 1}:`}</span> {step.title}
              </h3>
              <p className="text-fog mt-3 leading-relaxed">{step.body}</p>
            </li>
          ))}
        </ol>
      </Container>
    </Section>
  )
}
