import type { Metadata } from 'next'
import { ApplicationForm } from '@/components/forms/application-form'
import { CtaBand } from '@/components/sections/cta-band'
import { PageHero } from '@/components/sections/page-hero'
import { Container, Section } from '@/components/ui/layout'
import { Eyebrow, Lead, SectionHeader } from '@/components/ui/typography'
import { cmsRolesByDate } from '@/lib/content'

export const metadata: Metadata = {
  title: 'Careers — Join the Akrostech Team',
  description:
    'Careers at Akrostech Consulting: join the India delivery team serving U.S. businesses. Dedicated roles, real growth, U.S.-hours alignment.',
}

const PERKS = [
  {
    title: 'Dedicated roles',
    body: 'You work with one client, deeply — not a ticket queue of strangers.',
  },
  {
    title: 'U.S.-hours alignment',
    body: 'Shifts mapped to EST through PST, with structure that respects your time.',
  },
  {
    title: 'Growth paths',
    body: 'Recruiters become leads, assistants become operations managers, developers become architects.',
  },
  {
    title: 'Real accountability',
    body: 'Clear KPIs, regular reviews, and managers who invest in your craft.',
  },
]

export default function CareersPage() {
  return (
    <main>
      <PageHero
        eyebrow="Careers"
        title={
          <>
            Do the best work <span className="accent">of your career.</span>
          </>
        }
        lead="Join the India delivery team behind U.S. businesses: dedicated roles, real clients, and growth you can plan around."
        word="Careers"
        crumbs={[{ label: 'Careers' }]}
      />

      <Section tone="ink" className="pt-16 md:pt-24">
        <Container>
          <ul className="border-line bg-line grid gap-px overflow-hidden rounded-[var(--radius-card)] border md:grid-cols-2 lg:grid-cols-4">
            {PERKS.map((perk, i) => (
              <li key={perk.title} className="bg-ink-2 p-8">
                <span className="tnum text-sage text-sm">{String(i + 1).padStart(2, '0')}</span>
                <h2 className="font-display mt-10 text-2xl tracking-[-0.015em]">{perk.title}</h2>
                <p className="text-fog mt-3 leading-relaxed">{perk.body}</p>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <Section tone="raised">
        <Container>
          <SectionHeader
            eyebrow="Open roles"
            index="01"
            title={
              <>
                Where you <span className="accent">could fit.</span>
              </>
            }
            lead="Sample openings — they show the shape of our roles while live postings are confirmed."
          />
          <ul className="border-line mt-14 border-t">
            {cmsRolesByDate.map((role) => (
              <li
                key={role.slug}
                className="border-line grid gap-4 border-b py-10 md:grid-cols-[1.2fr_1fr_auto] md:items-center md:gap-10"
              >
                <div>
                  <p className="text-sage text-xs tracking-[0.22em] uppercase">{role.department}</p>
                  <h3 className="font-display mt-3 text-3xl tracking-[-0.02em] md:text-4xl">
                    {role.title}
                  </h3>
                </div>
                <p className="text-fog leading-relaxed">{role.description}</p>
                <p className="flex flex-wrap gap-2 text-sm">
                  <span className="border-line rounded-full border px-3 py-1">{role.type}</span>
                  <span className="border-line rounded-full border px-3 py-1">{role.location}</span>
                </p>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <Section tone="ink" id="apply">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
            <div className="lg:sticky lg:top-32 lg:self-start">
              <Eyebrow index="02">Apply</Eyebrow>
              <h2 className="font-display mt-6 text-4xl tracking-[-0.025em] md:text-6xl">
                Send your <span className="accent">application.</span>
              </h2>
              <Lead className="mt-6">
                Attach your CV and tell us which role fits. We review every application ourselves —
                no ATS black hole.
              </Lead>
            </div>
            <ApplicationForm />
          </div>
        </Container>
      </Section>

      <CtaBand
        eyebrow="Hiring us instead?"
        title={
          <>
            Looking for a team, <span className="accent">not a job?</span>
          </>
        }
        body="If you’re a U.S. business, start here: thirty minutes, no commitment."
      />
    </main>
  )
}
