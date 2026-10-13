import type { Metadata } from 'next'
import { CtaBand } from '@/components/sections/cta-band'
import { PageHero } from '@/components/sections/page-hero'
import { Container, Section } from '@/components/ui/layout'
import { Eyebrow, Heading, Lead } from '@/components/ui/typography'

export const metadata: Metadata = {
  title: 'About Akrostech Consulting',
  description:
    'Akrostech Consulting LLC — a Wilmington, DE outsourcing partner giving U.S. businesses dedicated professionals in India, on U.S. hours.',
}

const VALUES = [
  {
    title: 'Dedicated means dedicated',
    body: 'One professional, one client. No shared pools, no fractional attention, no exceptions.',
  },
  {
    title: 'Evidence over promises',
    body: 'Reporting, KPIs, and reviews. Trust built on what you can see, updated weekly.',
  },
  {
    title: 'Honest about fit',
    body: 'If we\u2019re not the right fix, we\u2019ll say so on the first call. We\u2019d rather lose a deal than win a bad one.',
  },
  {
    title: 'Security is table stakes',
    body: 'NDAs, access controls, confidentiality protocols — not upsells, just how we work.',
  },
]

export default function AboutPage() {
  return (
    <main>
      <PageHero
        eyebrow="About"
        title={
          <>
            The distance is ours.{' '}
            <span className="font-serif-accent italic">The results are yours.</span>
          </>
        }
        lead="Akrostech Consulting LLC is a Wilmington, Delaware company with delivery teams in India — built on one belief: U.S. businesses deserve offshore talent that works like in-house talent."
        variant="sunrise"
        crumbs={[{ label: 'About' }]}
      />
      <Section surface="light">
        <Container>
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <Eyebrow>Mission</Eyebrow>
              <Heading as="h2" className="mt-4">
                Give every U.S. business a team across every hour
              </Heading>
              <p className="mt-4 leading-relaxed text-slate-600">
                Small businesses and firms shouldn\u2019t have to choose between affording help and
                trusting it. We built Akrostech to close that gap: dedicated professionals, vetted
                like in-house hires, working your hours from India — at a cost that makes sense.
              </p>
            </div>
            <div>
              <Eyebrow>Vision</Eyebrow>
              <Heading as="h2" className="mt-4">
                Outsourcing you\u2019d recommend to a friend
              </Heading>
              <p className="mt-4 leading-relaxed text-slate-600">
                The industry has a trust problem, and it earned it. We\u2019re building the
                counter-example: transparent pricing, real accountability, and professionals who
                stay — because they\u2019re treated like the team members they are.
              </p>
            </div>
          </div>
        </Container>
      </Section>
      <Section surface="dark">
        <Container>
          <Eyebrow>Values</Eyebrow>
          <Heading as="h2" className="mt-4 max-w-3xl">
            How we work, in four lines
          </Heading>
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {VALUES.map((v) => (
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
          <Eyebrow>The company</Eyebrow>
          <Lead className="mt-4 max-w-[68ch]">
            Akrostech Consulting LLC · 1207 Delaware Ave, Unit 2877, Wilmington, DE 19806, USA · +1
            (332) 287-0846. Delivery teams in India, aligned to EST, CST, MST, and PST.
          </Lead>
          <p className="mt-4 max-w-[68ch] leading-relaxed text-slate-600">
            Founded to give U.S. startups, small businesses, staffing agencies, law firms, and
            enterprises a better way to build teams. Company details, leadership bios, and founding
            story are being confirmed with the client before launch.
          </p>
        </Container>
      </Section>
      <CtaBand
        title="Come see how we work"
        body="The fastest way to understand Akrostech is a conversation. Thirty minutes, no pitch decks."
      />
    </main>
  )
}
