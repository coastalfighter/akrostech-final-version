import type { Metadata } from 'next'
import { CtaBand } from '@/components/sections/cta-band'
import { PageHero } from '@/components/sections/page-hero'
import { Container, Section } from '@/components/ui/layout'
import { Eyebrow, Heading, Lead } from '@/components/ui/typography'

export const metadata: Metadata = {
  title: 'How It Works — From First Call to Fully Ramped',
  description:
    'Discover, match, onboard, scale: how Akrostech sources, vets, and embeds dedicated professionals in your team — on your U.S. hours.',
}

const STEPS = [
  {
    n: '01',
    title: 'Discover',
    body: 'A 30-minute call maps what you need and what \u201Cdone\u201D looks like. You get a written scope and a fixed quote — no hourly fog, no discovery fees.',
  },
  {
    n: '02',
    title: 'Match',
    body: 'We shortlist vetted professionals against your tools and working style. You interview the finalists and pick. Nobody starts without your approval.',
  },
  {
    n: '03',
    title: 'Onboard',
    body: 'Your team trains on your systems in the first week, with daily check-ins until the rhythm is set. A supervisor watches quality from day one.',
  },
  {
    n: '04',
    title: 'Scale',
    body: 'Add hours, add people, add services — up or down as you need. Monthly reviews keep quality measured and the engagement matched to reality.',
  },
]

const VETTING = [
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
    body: 'Reference-checked, background-verified, and managed. Only people we\u2019d hire ourselves reach your shortlist.',
  },
]

export default function HowItWorksPage() {
  return (
    <main>
      <PageHero
        eyebrow="How it works"
        title={
          <>
            Hiring, without the <span className="font-serif-accent italic">hiring.</span>
          </>
        }
        lead="Working with Akrostech feels like hiring — because it is. You interview, you approve, you manage. We handle sourcing, vetting, payroll, and backup coverage."
        variant="bridge"
        crumbs={[{ label: 'How it works' }]}
      />
      <Section surface="light">
        <Container>
          <ol className="grid gap-4 md:grid-cols-2">
            {STEPS.map((step) => (
              <li
                key={step.n}
                className="border-graphite-900/10 rounded-[20px] border bg-white p-8"
              >
                <p className="tnum font-display text-akros-indigo text-5xl font-bold">{step.n}</p>
                <h2 className="font-display text-graphite-900 mt-4 text-2xl font-semibold">
                  {step.title}
                </h2>
                <p className="mt-2 leading-relaxed text-slate-600">{step.body}</p>
              </li>
            ))}
          </ol>
        </Container>
      </Section>
      <Section surface="dark">
        <Container>
          <Eyebrow>Vetting</Eyebrow>
          <Heading as="h2" className="mt-4 max-w-3xl">
            Three gates, no shortcuts
          </Heading>
          <Lead className="mt-4">
            Every professional passes all three before you ever see a r\u00E9sum\u00E9.
          </Lead>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {VETTING.map((v) => (
              <div key={v.title} className="border-line-dark bg-ink-800 rounded-[20px] border p-8">
                <h3 className="font-display text-paper-50 text-xl font-semibold">{v.title}</h3>
                <p className="mt-2 leading-relaxed text-mist-400">{v.body}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>
      <Section surface="light">
        <Container>
          <Eyebrow>Security & quality</Eyebrow>
          <div className="mt-4 grid gap-10 lg:grid-cols-2">
            <div>
              <Heading as="h2">Secure by default</Heading>
              <p className="mt-4 leading-relaxed text-slate-600">
                NDAs, access controls, and confidentiality protocols are standard in every
                engagement — deepest where data is most sensitive. Your professionals work in your
                systems, with the permissions you grant and nothing more.
              </p>
            </div>
            <div>
              <Heading as="h2">Measured, not promised</Heading>
              <p className="mt-4 leading-relaxed text-slate-600">
                Reporting, KPIs, and regular reviews. You\u2019ll know what\u2019s getting done
                because you\u2019ll see it — weekly updates, monthly reviews, and a supervisor
                accountable for quality.
              </p>
            </div>
          </div>
        </Container>
      </Section>
      <CtaBand
        title="Start with a conversation"
        body="Thirty minutes. We\u2019ll map your needs and tell you honestly whether we\u2019re the right fix."
      />
    </main>
  )
}
