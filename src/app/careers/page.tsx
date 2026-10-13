import type { Metadata } from 'next'
import Link from 'next/link'
import { ApplicationForm } from '@/components/forms/application-form'
import { CtaBand } from '@/components/sections/cta-band'
import { PageHero } from '@/components/sections/page-hero'
import { Button } from '@/components/ui/button'
import { Container, Section } from '@/components/ui/layout'
import { Eyebrow, Heading, Lead } from '@/components/ui/typography'

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
    body: 'Shifts mapped to EST\u2013PST, with structure that respects your time.',
  },
  {
    title: 'Growth paths',
    body: 'Recruiters become leads, VAs become operations managers, developers become architects.',
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
            Do the best work of <span className="font-serif-accent italic">your career.</span>
          </>
        }
        lead="Join the India delivery team behind U.S. businesses: dedicated roles, real clients, and growth you can plan around."
        variant="collage"
        crumbs={[{ label: 'Careers' }]}
      />
      <Section surface="light">
        <Container>
          <Eyebrow>Why Akrostech</Eyebrow>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {PERKS.map((perk) => (
              <div
                key={perk.title}
                className="border-graphite-900/10 rounded-[20px] border bg-white p-8"
              >
                <h3 className="font-display text-graphite-900 text-xl font-semibold">
                  {perk.title}
                </h3>
                <p className="mt-2 leading-relaxed text-slate-600">{perk.body}</p>
              </div>
            ))}
          </div>
          <p className="mt-6 text-sm text-slate-600">
            Benefits and compensation bands are being confirmed with the client before launch.
          </p>
        </Container>
      </Section>
      <Section surface="dark">
        <Container>
          <Eyebrow>Open roles</Eyebrow>
          <Heading as="h2" className="mt-4">
            Sample openings
          </Heading>
          <Lead className="mt-4">
            Real postings are being confirmed with the client. These samples show the shape of our
            roles.
          </Lead>
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {[
              {
                title: 'Senior Recruiter (RPO)',
                meta: 'Full-time · U.S. hours (EST overlap) · Remote (India)',
                body: 'Run full-cycle recruiting for U.S. clients: sourcing, screening, and shortlists against real scorecards.',
              },
              {
                title: 'Executive Virtual Assistant',
                meta: 'Full-time · U.S. hours (PST overlap) · Remote (India)',
                body: 'Own inbox, calendar, and operations for U.S. founders. Impeccable English, total reliability.',
              },
            ].map((role) => (
              <article
                key={role.title}
                className="border-line-dark bg-ink-800 rounded-[24px] border p-8"
              >
                <p className="font-mono text-xs tracking-[0.2em] text-mist-400 uppercase">
                  {role.meta}
                </p>
                <h3 className="font-display text-paper-50 mt-3 text-2xl font-semibold">
                  {role.title}
                </h3>
                <p className="mt-2 leading-relaxed text-mist-400">{role.body}</p>
                <p className="mt-4 text-sm text-mist-400 italic">
                  Sample posting — real roles confirmed before launch.
                </p>
              </article>
            ))}
          </div>
          <div className="mt-10">
            <Button asChild size="lg">
              <Link href="/contact">Get in touch about roles</Link>
            </Button>
          </div>
        </Container>
      </Section>
      <Section surface="light">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr]">
            <div>
              <Eyebrow>Apply</Eyebrow>
              <Heading as="h2" className="mt-4">
                Send your application
              </Heading>
              <Lead className="mt-4">
                Attach your CV and tell us which role fits. We review every application ourselves —
                no ATS black hole.
              </Lead>
            </div>
            <ApplicationForm />
          </div>
        </Container>
      </Section>
      <CtaBand
        title="Want to work with us?"
        body="Tell us what you do best. If there\u2019s a fit — now or later — we\u2019ll be in touch."
        primary={{ label: 'Contact us', href: '/contact' }}
        secondary={{ label: 'How we work', href: '/how-it-works' }}
      />
    </main>
  )
}
