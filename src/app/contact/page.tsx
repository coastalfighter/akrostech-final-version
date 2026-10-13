import type { Metadata } from 'next'
import { ArrowUpRight, CalendarBlank, LinkedinLogo, Phone } from '@phosphor-icons/react/dist/ssr'
import Link from 'next/link'
import { ContactForm } from '@/components/forms/contact-form'
import { CtaBand } from '@/components/sections/cta-band'
import { PageHero } from '@/components/sections/page-hero'
import { Container, Section } from '@/components/ui/layout'
import { Eyebrow } from '@/components/ui/typography'
import { siteConfig } from '@/config/site'

export const metadata: Metadata = {
  title: 'Contact Akrostech Consulting',
  description:
    'Contact Akrostech Consulting LLC: +1 (332) 287-0846, Wilmington, DE. Book a 30-minute call or send a message — a human replies.',
}

const CHANNELS = [
  {
    icon: CalendarBlank,
    title: 'Book a call',
    body: 'Thirty minutes with Jennifer. The fastest way to answers and a fixed quote.',
    action: { label: 'Pick a time', href: '/book' },
  },
  {
    icon: Phone,
    title: 'Call us',
    body: `${siteConfig.phone} — U.S. business hours. Miss us and we call back the same day.`,
    action: { label: 'Call now', href: siteConfig.phoneHref },
  },
  {
    icon: LinkedinLogo,
    title: 'LinkedIn',
    body: 'Follow Akrostech Consulting for updates, or message us directly.',
    action: { label: 'Connect', href: siteConfig.linkedin },
  },
]

export default function ContactPage() {
  return (
    <main>
      <PageHero
        eyebrow="Contact"
        title={
          <>
            The line is <span className="accent">open.</span>
          </>
        }
        lead="Call, book or write — a human answers. Messages go straight to our inbox and are usually answered within one business day."
        word="Hello"
        crumbs={[{ label: 'Contact' }]}
      />

      <Section tone="ink" className="pt-16 md:pt-24">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
            <div>
              <Eyebrow>Other ways in</Eyebrow>
              <ul className="mt-8 space-y-4">
                {CHANNELS.map((c) => {
                  const external = c.action.href.startsWith('http')
                  return (
                    <li key={c.title}>
                      <Link
                        href={c.action.href}
                        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                        className="group/c border-line bg-ink-2 hover:border-lime/60 flex gap-5 rounded-[var(--radius-card)] border p-6 transition-colors md:p-8"
                      >
                        <span className="bg-forest text-lime flex size-12 shrink-0 items-center justify-center rounded-full">
                          <c.icon aria-hidden="true" weight="fill" className="size-5" />
                        </span>
                        <span className="flex-1">
                          <span className="font-display block text-2xl">{c.title}</span>
                          <span className="text-fog mt-1 block leading-relaxed">{c.body}</span>
                          <span className="text-lime mt-3 inline-flex items-center gap-1.5 text-sm font-medium">
                            {c.action.label}
                            {external && <span className="sr-only"> (opens in a new tab)</span>}
                            <ArrowUpRight aria-hidden="true" weight="bold" className="size-4" />
                          </span>
                        </span>
                      </Link>
                    </li>
                  )
                })}
              </ul>
              <div className="bg-forest-deep mt-10 rounded-[var(--radius-card)] p-8">
                <p className="text-sage text-xs tracking-[0.22em] uppercase">Headquarters</p>
                <address className="font-display mt-4 text-2xl leading-snug not-italic">
                  {siteConfig.legalName}
                  <br />
                  {siteConfig.address.street}
                  <br />
                  {siteConfig.address.city}, {siteConfig.address.state} {siteConfig.address.zip}
                </address>
              </div>
            </div>
            <div>
              <h2 className="font-display mb-8 text-4xl tracking-[-0.025em] md:text-5xl">
                Send a <span className="accent">message.</span>
              </h2>
              <ContactForm />
            </div>
          </div>
        </Container>
      </Section>

      <Section tone="raised" padding="compact">
        <Container>
          <Eyebrow>What happens next</Eyebrow>
          <ol className="mt-10 grid gap-10 md:grid-cols-3">
            {[
              'You reach out — call, booking, message or LinkedIn.',
              'We reply fast, with answers — never a nurture sequence.',
              'A 30-minute call maps your needs; a fixed quote follows.',
            ].map((step, i) => (
              <li key={step} className="border-line border-l pl-6">
                <span className="tnum font-display text-sage text-5xl">{i + 1}</span>
                <p className="mt-4 text-lg leading-relaxed">{step}</p>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      <CtaBand
        title={
          <>
            Don&rsquo;t <span className="accent">overthink it.</span>
          </>
        }
        body="The worst case is a useful conversation. The best case is a team."
      />
    </main>
  )
}
