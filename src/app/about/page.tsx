import type { Metadata } from 'next'
import { Arcs } from '@/components/brand/arcs'
import { CtaBand } from '@/components/sections/cta-band'
import { PageHero } from '@/components/sections/page-hero'
import { Container, Section } from '@/components/ui/layout'
import { Eyebrow, SectionHeader } from '@/components/ui/typography'
import { siteConfig } from '@/config/site'

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
    body: 'Reporting, KPIs and reviews. Trust built on what you can see, updated every week.',
  },
  {
    title: 'Honest about fit',
    body: 'If we’re not the right fix, we’ll say so on the first call. We’d rather lose a deal than win a bad one.',
  },
  {
    title: 'Security is table stakes',
    body: 'NDAs, access controls and confidentiality protocols — not upsells. Just how we work.',
  },
]

const PEOPLE = [
  {
    name: 'Gaurang Shukla',
    role: 'Founder',
    initials: 'GS',
    body: 'Built Akrostech to give U.S. businesses offshore talent that works like in-house talent.',
  },
  {
    name: 'Jennifer',
    role: 'Sales Lead',
    initials: 'J',
    body: 'Runs every first call. The person you’ll talk to when you book.',
  },
]

export default function AboutPage() {
  return (
    <main>
      <PageHero
        eyebrow="About"
        title={
          <>
            The distance is ours. <span className="accent">The results are yours.</span>
          </>
        }
        lead="Akrostech Consulting LLC is a Wilmington, Delaware company with delivery teams in India — built on one belief: U.S. businesses deserve offshore talent that works like in-house talent."
        word="About"
        crumbs={[{ label: 'About' }]}
      />

      <Section tone="ink" className="pt-16 md:pt-24">
        <Container>
          <div className="grid gap-5 lg:grid-cols-2">
            <div className="border-line bg-ink-2 rounded-[var(--radius-card)] border p-8 md:p-12">
              <Eyebrow>Mission</Eyebrow>
              <h2 className="font-display mt-8 text-4xl leading-[1.05] tracking-[-0.025em] md:text-5xl">
                A team across every hour, <span className="accent">for every business.</span>
              </h2>
              <p className="text-fog mt-6 text-lg leading-relaxed">
                Small businesses and firms shouldn’t have to choose between affording help and
                trusting it. We built Akrostech to close that gap: dedicated professionals, vetted
                like in-house hires, working your hours from India — at a cost that makes sense.
              </p>
            </div>
            <div className="bg-forest-deep rounded-[var(--radius-card)] p-8 md:p-12">
              <Eyebrow>Vision</Eyebrow>
              <h2 className="font-display mt-8 text-4xl leading-[1.05] tracking-[-0.025em] md:text-5xl">
                Outsourcing you’d <span className="accent">recommend to a friend.</span>
              </h2>
              <p className="text-cream/80 mt-6 text-lg leading-relaxed">
                The industry has a trust problem, and it earned it. We’re building the
                counter-example: transparent pricing, real accountability, and professionals who
                stay — because they’re treated like the team members they are.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      <Section tone="raised">
        <Container>
          <SectionHeader
            eyebrow="Values"
            index="01"
            title={
              <>
                How we work, <span className="accent">in four lines.</span>
              </>
            }
          />
          <ol className="border-line mt-16 border-t">
            {VALUES.map((v, i) => (
              <li
                key={v.title}
                className="border-line grid gap-4 border-b py-10 md:grid-cols-[80px_1fr_1fr] md:items-baseline md:gap-10"
              >
                <span className="tnum text-sage text-sm">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="font-display text-3xl tracking-[-0.02em] md:text-4xl">{v.title}</h3>
                <p className="text-fog text-lg leading-relaxed">{v.body}</p>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      <Section tone="ink">
        <Container>
          <SectionHeader
            eyebrow="The people"
            index="02"
            title={
              <>
                At <span className="accent">the helm.</span>
              </>
            }
            lead="A small, senior team you’ll actually talk to. Full bios and photos are on their way."
          />
          <div className="mt-16 grid gap-10 sm:grid-cols-2 lg:max-w-4xl">
            {PEOPLE.map((p, i) => (
              <figure key={p.name} className={i % 2 ? 'sm:mt-20' : ''}>
                <div className="bg-forest-deep relative flex aspect-[4/5] items-end justify-center overflow-hidden rounded-[var(--radius-arch)]">
                  <Arcs className="absolute inset-x-0 bottom-0 h-2/3 w-full" />
                  <span
                    aria-hidden="true"
                    className="font-display text-cream relative mb-[22%] text-8xl tracking-[-0.04em]"
                  >
                    {p.initials}
                  </span>
                </div>
                <figcaption className="mt-6">
                  <p className="font-display text-3xl tracking-[-0.02em]">{p.name}</p>
                  <p className="text-sage mt-1 text-xs tracking-[0.22em] uppercase">{p.role}</p>
                  <p className="text-fog mt-3 leading-relaxed">{p.body}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </Container>
      </Section>

      <Section tone="raised" padding="compact">
        <Container>
          <dl className="border-line bg-line grid gap-px overflow-hidden rounded-[var(--radius-card)] border md:grid-cols-3">
            <div className="bg-ink-2 p-8">
              <dt className="text-sage text-xs tracking-[0.22em] uppercase">Company</dt>
              <dd className="font-display mt-3 text-2xl">{siteConfig.legalName}</dd>
            </div>
            <div className="bg-ink-2 p-8">
              <dt className="text-sage text-xs tracking-[0.22em] uppercase">Headquarters</dt>
              <dd className="font-display mt-3 text-2xl">
                {siteConfig.address.street}, {siteConfig.address.city}, {siteConfig.address.state}{' '}
                {siteConfig.address.zip}
              </dd>
            </div>
            <div className="bg-ink-2 p-8">
              <dt className="text-sage text-xs tracking-[0.22em] uppercase">Delivery</dt>
              <dd className="font-display mt-3 text-2xl">
                Teams in India, aligned to EST, CST, MST and PST
              </dd>
            </div>
          </dl>
        </Container>
      </Section>

      <CtaBand
        title={
          <>
            Come see <span className="accent">how we work.</span>
          </>
        }
        body="The fastest way to understand Akrostech is a conversation. Thirty minutes, no pitch decks."
      />
    </main>
  )
}
