import { Button } from '@/components/ui/button'
import { Container, Section } from '@/components/ui/layout'
import { Eyebrow, Heading } from '@/components/ui/typography'

/** FAQ preview — five common questions, linking to the full FAQ page. */

const FAQS = [
  {
    q: 'How fast can we start?',
    a: 'Matching takes days; onboarding runs in the first week.',
  },
  {
    q: 'Who owns the work?',
    a: 'You do — records, code, and candidate data stay in your systems.',
  },
  {
    q: 'Is my data secure?',
    a: 'NDAs, access controls, and confidentiality protocols are standard in every engagement.',
  },
  {
    q: 'Do you work my hours?',
    a: 'Yes — overlap across all four U.S. time zones, plus overnight.',
  },
  {
    q: 'What does it cost?',
    a: 'Less than a comparable U.S. hire, priced per resource or project — quoted fixed in writing.',
  },
]

export function FaqPreview() {
  return (
    <Section surface="light">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr]">
          <div>
            <Eyebrow>Common questions</Eyebrow>
            <Heading as="h2" className="mt-4">
              Ask anything
            </Heading>
            <div className="mt-8">
              <Button asChild variant="secondary">
                <a href="/faq">All FAQs</a>
              </Button>
            </div>
          </div>
          <dl className="divide-graphite-900/10 divide-y">
            {FAQS.map((faq) => (
              <div key={faq.q} className="py-5 first:pt-0 last:pb-0">
                <dt className="font-display text-graphite-900 text-lg font-semibold">{faq.q}</dt>
                <dd className="mt-1 leading-relaxed text-slate-600">{faq.a}</dd>
              </div>
            ))}
          </dl>
        </div>
      </Container>
    </Section>
  )
}
