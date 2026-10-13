import type { Metadata } from 'next'
import Link from 'next/link'
import { CtaBand } from '@/components/sections/cta-band'
import { PageHero } from '@/components/sections/page-hero'
import { Button } from '@/components/ui/button'
import { Container, Section } from '@/components/ui/layout'
import { getService } from '@/data/services'
import { industries } from '@/data/site'

export const metadata: Metadata = {
  title: 'Industries We Serve',
  description:
    'Akrostech serves U.S. law firms, healthcare, staffing agencies, e-commerce, SaaS and real estate — with services tuned to each industry’s reality.',
}

export default function IndustriesPage() {
  return (
    <main>
      <PageHero
        eyebrow="Industries"
        title={
          <>
            Built for your <span className="accent">industry’s reality.</span>
          </>
        }
        lead="Outsourcing isn’t one-size-fits-all. Here’s how each service bends toward the work your industry actually does."
        crumbs={[{ label: 'Industries' }]}
      />

      <Section tone="ink" className="pt-16 md:pt-24">
        <Container>
          <ol className="border-line border-t">
            {industries.map((industry, i) => (
              <li
                key={industry.slug}
                id={industry.slug}
                className="border-line grid scroll-mt-28 gap-8 border-b py-14 lg:grid-cols-[80px_1fr_1.1fr] lg:gap-12 lg:py-20"
              >
                <span className="tnum text-sage text-sm">{String(i + 1).padStart(2, '0')}</span>
                <div>
                  <h2 className="font-display text-5xl tracking-[-0.03em] md:text-6xl">
                    {industry.name}
                  </h2>
                  <p className="text-fog mt-6 max-w-[48ch] text-lg leading-relaxed">
                    {industry.blurb}
                  </p>
                  <div className="mt-8 flex flex-wrap gap-2">
                    {industry.services.map((slug) => {
                      const s = getService(slug)
                      if (!s) return null
                      return (
                        <Link
                          key={slug}
                          href={`/services/${slug}`}
                          className="border-line text-cream hover:border-lime hover:bg-lime hover:text-ink rounded-full border px-4 py-2 text-sm transition-colors"
                        >
                          {s.name}
                        </Link>
                      )
                    })}
                  </div>
                </div>
                <div className="bg-ink-2 rounded-[var(--radius-card)] p-8">
                  <h3 className="text-sage text-xs tracking-[0.22em] uppercase">Pains we fix</h3>
                  <ul className="mt-6 space-y-4">
                    {industry.pains.map((pain) => (
                      <li key={pain} className="font-display flex gap-4 text-xl leading-snug">
                        <span
                          aria-hidden="true"
                          className="bg-lime mt-2.5 size-1.5 shrink-0 rounded-full"
                        />
                        {pain}
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      <Section tone="forest" padding="compact">
        <Container className="relative">
          <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
            <div>
              <p className="text-sage text-xs tracking-[0.22em] uppercase">
                Don’t see your industry?
              </p>
              <h2 className="font-display mt-4 max-w-3xl text-4xl tracking-[-0.025em] md:text-5xl">
                If the work is real, <span className="accent">we can staff it.</span>
              </h2>
            </div>
            <Button asChild size="lg">
              <Link href="/book">Tell us what you do</Link>
            </Button>
          </div>
        </Container>
      </Section>

      <CtaBand
        title={
          <>
            Your industry, <span className="accent">your team.</span>
          </>
        }
        body="Thirty minutes to map your needs against the playbook we’ve built for businesses like yours."
      />
    </main>
  )
}
