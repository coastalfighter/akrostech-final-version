import { Button } from '@/components/ui/button'
import { Container, Section } from '@/components/ui/layout'
import { Eyebrow, Heading, Lead } from '@/components/ui/typography'

/** "How it works" — the four steps. */

const STEPS = [
  {
    n: '01',
    title: 'Discover',
    body: 'A 30-minute call maps what you need and what “done” looks like. You get a written scope and a fixed quote.',
  },
  {
    n: '02',
    title: 'Match',
    body: 'We shortlist vetted professionals against your tools and working style. You interview the finalists and pick.',
  },
  {
    n: '03',
    title: 'Onboard',
    body: 'Your team trains on your systems in the first week, with daily check-ins until the rhythm is set.',
  },
  {
    n: '04',
    title: 'Scale',
    body: 'Add hours, add people, add services — up or down as you need. Monthly reviews keep quality measured.',
  },
]

export function HowItWorks() {
  return (
    <Section surface="dark">
      <Container>
        <Eyebrow>How it works</Eyebrow>
        <Heading as="h2" className="mt-4 max-w-3xl">
          From first call to fully ramped
        </Heading>
        <Lead className="mt-4">
          Working with Akrostech feels like hiring — because it is. You interview, you approve, you
          manage. We handle sourcing, vetting, payroll, and backup coverage.
        </Lead>
        <ol className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((step) => (
            <li
              key={step.n}
              className="border-line-dark bg-ink-800 rounded-[20px] border p-6 md:p-8"
            >
              <p className="tnum font-display text-indigo-glow text-4xl font-bold">{step.n}</p>
              <h3 className="font-display text-paper-50 mt-4 text-xl font-semibold">
                {step.title}
              </h3>
              <p className="mt-2 leading-relaxed text-mist-400">{step.body}</p>
            </li>
          ))}
        </ol>
        <div className="mt-10">
          <Button asChild variant="secondary">
            <a href="/how-it-works">How it works in detail</a>
          </Button>
        </div>
      </Container>
    </Section>
  )
}
