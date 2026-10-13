import type { Metadata } from 'next'
import { FaqPreview } from '@/components/home/faq-preview'
import { Handoff } from '@/components/home/handoff'
import { Hero } from '@/components/home/hero'
import { Industries } from '@/components/home/industries'
import { InsightsPreview } from '@/components/home/insights-preview'
import { Manifesto } from '@/components/home/manifesto'
import { Process } from '@/components/home/process'
import { ServicesList } from '@/components/home/services-list'
import { Ticker } from '@/components/home/ticker'
import { Why } from '@/components/home/why'
import { CtaBand } from '@/components/sections/cta-band'

export const metadata: Metadata = {
  title: { absolute: 'Akrostech — Offshore Teams That Work Your U.S. Hours' },
  description:
    'Dedicated recruiters, assistants, bookkeepers, paralegals and a web studio in India — working your U.S. hours, inside your tools, measured on quality.',
}

export default function HomePage() {
  return (
    <main>
      <Hero />
      <Ticker />
      <Manifesto />
      <ServicesList />
      <Handoff />
      <Why />
      <Process />
      <Industries />
      <InsightsPreview />
      <FaqPreview />
      <CtaBand
        title={
          <>
            Let&rsquo;s build your team, <span className="accent">together.</span>
          </>
        }
        body="Thirty minutes, no commitment. Tell us what hurts most — we’ll tell you honestly whether we’re the right fix."
      />
    </main>
  )
}
