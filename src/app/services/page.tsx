import type { Metadata } from 'next'
import { ComparisonTable } from '@/components/sections/comparison-table'
import { CtaBand } from '@/components/sections/cta-band'
import { PageHero } from '@/components/sections/page-hero'
import { ServiceFinderQuiz } from '@/components/sections/service-finder-quiz'
import { SERVICE_ICONS } from '@/components/services/service-icons'
import { ServiceCard } from '@/components/ui/card'
import { Container, Section } from '@/components/ui/layout'
import { Eyebrow, Lead } from '@/components/ui/typography'
import { services } from '@/data/services'

export const metadata: Metadata = {
  title: 'Services — Staffing & Web Studio',
  description:
    'Five services, one model: dedicated professionals on your U.S. hours. Website development, RPO, virtual assistance, accounting, and legal process outsourcing.',
}

export default function ServicesIndexPage() {
  return (
    <main>
      <PageHero
        eyebrow="Services"
        title={
          <>
            Five services. One model: <span className="font-serif-accent italic">dedicated.</span>
          </>
        }
        lead="Every service works the same way — a professional or team dedicated to you, vetted three ways, working your U.S. hours, measured on quality."
        variant="prism"
        crumbs={[{ label: 'Services' }]}
      />
      <Section surface="dark" padding="compact">
        <Container>
          <Eyebrow>What we do</Eyebrow>
          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => (
              <ServiceCard
                key={s.slug}
                accent={s.accent}
                icon={SERVICE_ICONS[s.accent]}
                title={s.name}
                description={s.excerpt}
                href={`/services/${s.slug}`}
              />
            ))}
            <ServiceCard
              accent="web"
              icon={SERVICE_ICONS.web}
              title="Not sure where to start?"
              description="Three questions, one recommendation — take the quiz below."
              href="#quiz"
            />
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
      <Section surface="light" padding="compact">
        <Container>
          <Eyebrow>The Akrostech model</Eyebrow>
          <Lead className="mt-4 max-w-[68ch]">
            Dedicated, not shared. Your hours, not ours. Vetted three ways: domain skill, written
            and spoken English, and reliability. Reporting, KPIs, and regular reviews. Security by
            default — NDAs, access controls, confidentiality protocols.
          </Lead>
        </Container>
      </Section>
      <CtaBand
        title="Tell us what hurts most"
        body="A 30-minute call. We\u2019ll tell you honestly which service fits — or whether none of them do."
      />
    </main>
  )
}
