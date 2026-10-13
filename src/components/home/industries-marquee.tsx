import { Container, Section } from '@/components/ui/layout'
import { Eyebrow, Heading } from '@/components/ui/typography'

/**
 * Industries marquee — the six industries as an infinite CSS marquee.
 * Static (no animation) under prefers-reduced-motion.
 */

const INDUSTRIES = ['Legal', 'Healthcare', 'Staffing', 'E-commerce', 'SaaS', 'Real estate']

export function IndustriesMarquee() {
  const row = [...INDUSTRIES, ...INDUSTRIES]
  return (
    <Section surface="light" padding="compact">
      <Container>
        <Eyebrow>Industries we serve</Eyebrow>
        <Heading as="h2" className="mt-4">
          Built for your industry&apos;s reality
        </Heading>
      </Container>
      <div
        className="group mt-10 overflow-hidden"
        aria-label={`Industries: ${INDUSTRIES.join(', ')}`}
      >
        <div className="flex w-max animate-[marquee_28s_linear_infinite] motion-reduce:animate-none">
          {row.map((industry, i) => (
            <span
              key={i}
              aria-hidden={i >= INDUSTRIES.length}
              className="flex items-center gap-8 pr-8"
            >
              <span className="font-display text-graphite-900 text-4xl font-bold whitespace-nowrap md:text-5xl">
                {industry}
              </span>
              <span aria-hidden="true" className="bg-akros-indigo size-2 rounded-full" />
            </span>
          ))}
        </div>
      </div>
    </Section>
  )
}
