import type { Metadata } from 'next'
import { FaqPreview } from '@/components/home/faq-preview'
import { Handoff } from '@/components/home/handoff'
import { Hero } from '@/components/home/hero'
import { HowItWorks } from '@/components/home/how-it-works'
import { IndustriesMarquee } from '@/components/home/industries-marquee'
import { InsightsPreview } from '@/components/home/insights-preview'
import { SavingsTeaser } from '@/components/home/savings-teaser'
import { ServicesBento } from '@/components/home/services-bento'
import { WhyAkrostech } from '@/components/home/why-akrostech'
import { CtaBand } from '@/components/sections/cta-band'

/**
 * Home — assembled from the M1 copy deck with M2 components and the M3
 * signature pieces (Living Globe hero, 24-hour handoff).
 * M5 wires these sections to the Velite CMS layer.
 */
export const metadata: Metadata = {
  title: 'Offshore Staffing Company for US Businesses',
  description:
    'Akrostech gives U.S. businesses dedicated offshore professionals and a web studio in India — working your hours, measured on quality, at a fraction of U.S. cost.',
}

export default function HomePage() {
  return (
    <main>
      <Hero />
      <ServicesBento />
      <Handoff />
      <SavingsTeaser />
      <HowItWorks />
      <WhyAkrostech />
      <IndustriesMarquee />
      <InsightsPreview />
      <FaqPreview />
      <CtaBand
        title={
          <>
            Let&apos;s build your team{' '}
            <span className="font-serif-accent italic">across every hour</span>
          </>
        }
        body="A 30-minute call. No commitment. Tell us what hurts most — we'll tell you honestly whether we're the right fix."
      />
    </main>
  )
}
