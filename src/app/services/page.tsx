import type { Metadata } from 'next'
import { ArrowUpRight } from '@phosphor-icons/react/dist/ssr'
import Link from 'next/link'
import { ComparisonTable } from '@/components/sections/comparison-table'
import { CtaBand } from '@/components/sections/cta-band'
import { PageHero } from '@/components/sections/page-hero'
import { ServiceFinderQuiz } from '@/components/sections/service-finder-quiz'
import { SERVICE_ICONS } from '@/components/services/service-icons'
import { Container, Section } from '@/components/ui/layout'
import { services } from '@/data/services'

export const metadata: Metadata = {
  title: 'Services — Offshore Teams & Web Studio',
  description:
    'Five services, one model: dedicated professionals on your U.S. hours. Website development, recruiting, virtual assistance, accounting and legal process outsourcing.',
}

export default function ServicesIndexPage() {
  return (
    <main>
      <PageHero
        eyebrow="Services"
        title={
          <>
            Five services. <span className="accent">One way of working.</span>
          </>
        }
        lead="A professional or team dedicated to you, vetted three ways, working your U.S. hours, measured on quality — whatever the work."
        word="Services"
        crumbs={[{ label: 'Services' }]}
      />

      <Section tone="ink" padding="compact" className="pt-16 md:pt-24">
        <Container>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-6">
            {services.map((s, i) => (
              <Link
                key={s.slug}
                href={`/services/${s.slug}`}
                className={
                  'group/svc border-line bg-ink-2 hover:border-lime/60 relative flex min-h-[340px] flex-col overflow-hidden rounded-[var(--radius-card)] border p-8 transition-colors duration-500 md:p-10 ' +
                  (i < 2 ? 'lg:col-span-3' : 'lg:col-span-2')
                }
              >
                <span
                  aria-hidden="true"
                  className="bg-forest-deep absolute inset-0 origin-bottom scale-y-0 transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover/svc:scale-y-100"
                />
                <div className="relative flex items-start justify-between">
                  <span className="bg-lime text-ink flex size-14 items-center justify-center rounded-full [&_svg]:size-6">
                    {SERVICE_ICONS[s.accent]}
                  </span>
                  <span className="tnum text-sage text-sm">{String(i + 1).padStart(2, '0')}</span>
                </div>
                <h2 className="font-display relative mt-auto pt-14 text-3xl leading-[1.05] tracking-[-0.025em] md:text-4xl">
                  {s.name}
                </h2>
                <p className="text-fog group-hover/svc:text-cream/80 relative mt-4 max-w-[48ch] leading-relaxed">
                  {s.excerpt}
                </p>
                <span className="text-lime relative mt-6 inline-flex items-center gap-2 text-sm font-medium">
                  Explore
                  <ArrowUpRight
                    aria-hidden="true"
                    weight="bold"
                    className="size-4 transition-transform group-hover/svc:translate-x-0.5 group-hover/svc:-translate-y-0.5"
                  />
                </span>
              </Link>
            ))}
            <Link
              href="#quiz"
              className="group/svc bg-lime text-ink hover:bg-cream flex flex-col gap-6 rounded-[var(--radius-card)] p-8 transition-colors md:col-span-2 md:p-10 lg:col-span-6 lg:flex-row lg:items-center lg:justify-between"
            >
              <span className="text-xs font-medium tracking-[0.22em] uppercase">Not sure?</span>
              <span className="font-display text-4xl leading-[1.02] tracking-[-0.03em] md:text-5xl">
                Take the 3-question service finder.
              </span>
              <span className="inline-flex items-center gap-2 text-sm font-medium">
                Start
                <ArrowUpRight aria-hidden="true" weight="bold" className="size-4" />
              </span>
            </Link>
          </div>
        </Container>
      </Section>

      <ComparisonTable
        rows={services.map((s) => ({
          service: s.name,
          href: `/services/${s.slug}`,
          bestFor: s.bestFor,
          engagement: s.engagement,
          firstWin: s.firstWin,
          accent: s.accent,
        }))}
      />

      <div id="quiz" className="scroll-mt-24">
        <ServiceFinderQuiz />
      </div>

      <CtaBand
        title={
          <>
            Tell us what <span className="accent">hurts most.</span>
          </>
        }
        body="Thirty minutes. We’ll tell you honestly which service fits — or whether none of them do."
      />
    </main>
  )
}
