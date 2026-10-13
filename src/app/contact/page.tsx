import type { Metadata } from 'next'
import Link from 'next/link'
import { ContactForm } from '@/components/forms/contact-form'
import { CtaBand } from '@/components/sections/cta-band'
import { PageHero } from '@/components/sections/page-hero'
import { Container, Section } from '@/components/ui/layout'
import { Eyebrow, Heading } from '@/components/ui/typography'

export const metadata: Metadata = {
  title: 'Contact Akrostech Consulting',
  description:
    'Contact Akrostech Consulting LLC: +1 (332) 287-0846, Wilmington, DE. Book a 30-minute call or send a message — we reply fast.',
}

const CARDS = [
  {
    title: 'Book a call',
    body: 'Thirty minutes with Jennifer from sales. The fastest way to get answers and a fixed quote.',
    action: { label: 'Book a 30-min call', href: '/book' },
  },
  {
    title: 'Call us',
    body: '+1 (332) 287-0846. U.S. business hours — if we miss you, we call back the same day.',
    action: { label: 'Call now', href: 'tel:+13322870846' },
  },
  {
    title: 'LinkedIn',
    body: 'Follow Akrostech Consulting for updates, or message us directly.',
    action: {
      label: 'Connect on LinkedIn',
      href: 'https://www.linkedin.com/company/akrostech-consulting',
    },
  },
]

export default function ContactPage() {
  return (
    <main>
      <PageHero
        eyebrow="Contact"
        title={
          <>
            The line is <span className="font-serif-accent italic">open.</span>
          </>
        }
        lead="Call, book, or write — a human answers. Messages go straight to our inbox, usually answered within one business day."
        variant="open-line"
        crumbs={[{ label: 'Contact' }]}
      />
      <Section surface="light">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr]">
            <div>
              <Eyebrow>Write to us</Eyebrow>
              <Heading as="h2" className="mt-4">
                Send a message
              </Heading>
              <p className="mt-4 leading-relaxed text-slate-600">
                A few sentences about what hurts most is plenty. We read every message ourselves —
                no bots, no nurture sequences.
              </p>
              <div className="mt-8 grid gap-4">
                {CARDS.map((card) => (
                  <div
                    key={card.title}
                    className="border-graphite-900/10 rounded-[20px] border bg-white p-6"
                  >
                    <h3 className="font-display text-graphite-900 text-lg font-semibold">
                      {card.title}
                    </h3>
                    <p className="mt-1 text-[15px] leading-relaxed text-slate-600">{card.body}</p>
                    <Link
                      href={card.action.href}
                      {...(card.action.href.startsWith('http')
                        ? { target: '_blank', rel: 'noopener noreferrer' }
                        : {})}
                      className="text-akros-indigo mt-3 inline-block text-[15px] font-semibold hover:underline"
                    >
                      {card.action.label} →
                    </Link>
                  </div>
                ))}
              </div>
            </div>
            <ContactForm />
          </div>
        </Container>
      </Section>
      <Section surface="dark" padding="compact">
        <Container>
          <Eyebrow>Visit or write</Eyebrow>
          <div className="mt-6 grid gap-10 lg:grid-cols-2">
            <div>
              <Heading as="h2">Headquarters</Heading>
              <address className="mt-4 leading-relaxed text-mist-400 not-italic">
                Akrostech Consulting LLC
                <br />
                1207 Delaware Ave, Unit 2877
                <br />
                Wilmington, DE 19806, USA
              </address>
            </div>
            <div>
              <Heading as="h2">What happens next</Heading>
              <ol className="mt-4 space-y-3 leading-relaxed text-mist-400">
                <li>
                  <span className="tnum text-paper-50 font-semibold">1.</span> You reach out — call,
                  booking, or LinkedIn.
                </li>
                <li>
                  <span className="tnum text-paper-50 font-semibold">2.</span> We reply fast, with
                  answers — not a nurture sequence.
                </li>
                <li>
                  <span className="tnum text-paper-50 font-semibold">3.</span> A 30-minute call maps
                  your needs; a fixed quote follows.
                </li>
              </ol>
            </div>
          </div>
        </Container>
      </Section>
      <CtaBand
        title="Don\u2019t overthink it"
        body="The worst case is a useful conversation. The best case is a team."
        primary={{ label: 'Book a 30-min call', href: '/book' }}
      />
    </main>
  )
}
