import type { Metadata } from 'next'
import { CtaBand } from '@/components/sections/cta-band'
import { PageHero } from '@/components/sections/page-hero'
import { Container, Section } from '@/components/ui/layout'
import { SectionHeader } from '@/components/ui/typography'

export const metadata: Metadata = {
  title: 'How It Works — From First Call to Fully Ramped',
  description:
    'Discover, match, onboard, scale: how Akrostech sources, vets and embeds dedicated professionals in your team — on your U.S. hours.',
}

const STEPS = [
  {
    title: 'Discover',
    when: 'Day 1',
    body: 'A 30-minute call maps what you need and what “done” looks like. You get a written scope and a fixed quote — no hourly fog, no discovery fees.',
  },
  {
    title: 'Match',
    when: 'Days, not months',
    body: 'We shortlist vetted professionals against your tools and working style. You interview the finalists and pick. Nobody starts without your approval.',
  },
  {
    title: 'Onboard',
    when: 'Week one',
    body: 'Your team learns your systems in the first week, with daily check-ins until the rhythm is set. A supervisor watches quality from day one.',
  },
  {
    title: 'Scale',
    when: 'Every month',
    body: 'Add hours, people or services — up or down as you need. Monthly reviews keep quality measured and the engagement matched to reality.',
  },
]

const GATES = [
  {
    title: 'Domain skill',
    body: 'Tested, not claimed. Recruiters run live searches, developers ship code, bookkeepers close sample books.',
  },
  {
    title: 'English',
    body: 'Written and spoken — because your professional talks to you, and sometimes your customers, every day.',
  },
  {
    title: 'Reliability',
    body: 'Reference-checked, background-verified and managed. Only people we’d hire ourselves reach your shortlist.',
  },
]

export default function HowItWorksPage() {
  return (
    <main>
      <PageHero
        eyebrow="How it works"
        title={
          <>
            Hiring, <span className="accent">without the hiring.</span>
          </>
        }
        lead="Working with Akrostech feels like hiring — because it is. You interview, you approve, you manage. We handle sourcing, vetting, payroll and backup coverage."
        word="Process"
        crumbs={[{ label: 'How it works' }]}
      />

      <Section tone="ink" className="pt-16 md:pt-24">
        <Container>
          <ol className="border-line border-t">
            {STEPS.map((step, i) => (
              <li
                key={step.title}
                className="border-line grid gap-6 border-b py-12 md:grid-cols-[180px_1fr_1.2fr] md:gap-12 md:py-16"
              >
                <span
                  aria-hidden="true"
                  className="text-outline tnum font-display text-[7rem] leading-[0.8] tracking-[-0.05em] md:text-[9rem]"
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div>
                  <p className="text-lime text-xs tracking-[0.22em] uppercase">{step.when}</p>
                  <h2 className="font-display mt-4 text-5xl tracking-[-0.03em] md:text-6xl">
                    <span className="sr-only">{`Step ${i + 1}:`}</span> {step.title}
                  </h2>
                </div>
                <p className="text-fog max-w-[52ch] self-end text-lg leading-relaxed">
                  {step.body}
                </p>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      <Section tone="forest">
        <div aria-hidden="true" className="grain absolute inset-0" />
        <Container className="relative">
          <SectionHeader
            eyebrow="Vetting"
            title={
              <>
                Three gates. <span className="accent">No shortcuts.</span>
              </>
            }
            lead="Every professional passes all three before you ever see a résumé."
          />
          <div className="mt-16 grid gap-5 md:grid-cols-3">
            {GATES.map((g, i) => (
              <div
                key={g.title}
                className="border-cream/15 bg-ink/30 rounded-[var(--radius-card)] border p-8 md:p-10"
              >
                <span className="bg-lime font-display text-ink flex size-12 items-center justify-center rounded-full text-xl">
                  {i + 1}
                </span>
                <h3 className="font-display mt-10 text-3xl tracking-[-0.02em]">{g.title}</h3>
                <p className="text-cream/75 mt-3 leading-relaxed">{g.body}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section tone="ink">
        <Container>
          <div className="grid gap-5 lg:grid-cols-2">
            <div className="border-line bg-ink-2 rounded-[var(--radius-card)] border p-8 md:p-12">
              <p className="text-sage text-xs tracking-[0.22em] uppercase">Security</p>
              <h2 className="font-display mt-6 text-4xl tracking-[-0.025em] md:text-5xl">
                Secure <span className="accent">by default.</span>
              </h2>
              <p className="text-fog mt-6 text-lg leading-relaxed">
                NDAs, access controls and confidentiality protocols are standard in every engagement
                — deepest where data is most sensitive. Your professionals work in your systems,
                with the permissions you grant and nothing more.
              </p>
            </div>
            <div className="border-line bg-ink-2 rounded-[var(--radius-card)] border p-8 md:p-12">
              <p className="text-sage text-xs tracking-[0.22em] uppercase">Quality</p>
              <h2 className="font-display mt-6 text-4xl tracking-[-0.025em] md:text-5xl">
                Measured, <span className="accent">not promised.</span>
              </h2>
              <p className="text-fog mt-6 text-lg leading-relaxed">
                Weekly updates, monthly reviews and a supervisor accountable for quality. You’ll
                know what’s getting done because you’ll see it.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      <CtaBand
        title={
          <>
            Start with <span className="accent">a conversation.</span>
          </>
        }
        body="Thirty minutes. We’ll map your needs and tell you honestly whether we’re the right fix."
      />
    </main>
  )
}
