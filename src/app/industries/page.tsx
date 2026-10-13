import type { Metadata } from 'next'
import Link from 'next/link'
import { CtaBand } from '@/components/sections/cta-band'
import { PageHero } from '@/components/sections/page-hero'
import { Container, Section } from '@/components/ui/layout'
import { Eyebrow } from '@/components/ui/typography'
import { getService, services } from '@/data/services'
import { industries } from '@/data/site'

export const metadata: Metadata = {
  title: 'Industries We Serve',
  description:
    'Akrostech serves U.S. law firms, healthcare, staffing agencies, e-commerce, SaaS, and real estate — with services tuned to each industry\u2019s reality.',
}

export default function IndustriesPage() {
  return (
    <main>
      <PageHero
        eyebrow="Industries"
        title={
          <>
            Built for your industry\u2019s{' '}
            <span className="font-serif-accent italic">reality.</span>
          </>
        }
        lead="Outsourcing isn\u2019t one-size-fits-all. Here\u2019s how each service bends toward the work your industry actually does."
        variant="constellation"
        crumbs={[{ label: 'Industries' }]}
      />
      <Section surface="light" padding="compact">
        <Container>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {industries.map((industry) => (
              <article
                key={industry.slug}
                className="border-graphite-900/10 flex flex-col rounded-[24px] border bg-white p-8"
              >
                <Eyebrow>{industry.name}</Eyebrow>
                <p className="mt-3 flex-1 leading-relaxed text-slate-600">{industry.blurb}</p>
                <h3 className="mt-6 font-mono text-xs tracking-[0.2em] text-slate-600 uppercase">
                  Typical pains
                </h3>
                <ul className="mt-2 space-y-1.5 text-[15px] text-slate-600">
                  {industry.pains.map((pain) => (
                    <li key={pain} className="flex gap-2">
                      <span aria-hidden="true" className="text-akros-indigo">
                        →
                      </span>{' '}
                      {pain}
                    </li>
                  ))}
                </ul>
                <div className="mt-6 flex flex-wrap gap-2">
                  {industry.services.map((slug) => {
                    const s = getService(slug)
                    if (!s) return null
                    return (
                      <Link
                        key={slug}
                        href={`/services/${slug}`}
                        className="bg-graphite-900/[0.05] text-graphite-900 hover:bg-akros-indigo rounded-full px-4 py-1.5 text-sm font-medium transition-colors hover:text-white"
                      >
                        {s.shortName}
                      </Link>
                    )
                  })}
                </div>
              </article>
            ))}
          </div>
        </Container>
      </Section>
      <Section surface="dark" padding="compact">
        <Container>
          <Eyebrow>Don\u2019t see your industry?</Eyebrow>
          <p className="font-display text-paper-50 mt-4 max-w-3xl text-3xl font-bold">
            If the work is real, we can staff it.
          </p>
          <p className="mt-4 max-w-[68ch] leading-relaxed text-mist-400">
            These six are where we\u2019ve built the deepest playbooks. But the model — dedicated
            professionals, vetted three ways, on your hours — works anywhere the work is
            well-defined. Tell us what you do; we\u2019ll tell you honestly if we fit.
          </p>
          <div className="mt-8">
            <Link
              href="/book"
              className="text-indigo-glow hover:text-paper-50 text-lg font-medium transition-colors"
            >
              Book a 30-min call →
            </Link>
          </div>
        </Container>
      </Section>
      <CtaBand
        title="Your industry, your team"
        body="Thirty minutes to map your needs against the playbook we\u2019ve built for businesses like yours."
      />
    </main>
  )
}
