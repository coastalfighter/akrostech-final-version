import { ArrowUpRight } from '@phosphor-icons/react/dist/ssr'
import Link from 'next/link'
import { Container, Section } from '@/components/ui/layout'
import { SectionHeader } from '@/components/ui/typography'
import { services } from '@/data/services'

/** Plain-English row titles; the full service name sits beside each. */
const ROW_TITLE: Record<string, string> = {
  'website-development': 'Websites',
  'recruitment-process-outsourcing': 'Recruiting',
  'virtual-assistance': 'Assistants',
  'accounting-outsourcing': 'Accounting',
  'legal-process-outsourcing': 'Legal support',
}

/**
 * Services — five oversized rows. Hover floods the row with forest green,
 * slides the name, and lights the arrow lime.
 */
export function ServicesList() {
  return (
    <Section tone="ink" className="pt-0 md:pt-0">
      <Container>
        <SectionHeader
          eyebrow="What we do"
          index="01"
          title={
            <>
              Five services. <span className="accent">One standard.</span>
            </>
          }
          lead="Every engagement runs the same way: a professional or team dedicated to you, vetted three ways, working your U.S. hours, measured on quality."
        />
        <ul className="border-line mt-16 border-t">
          {services.map((s, i) => (
            <li key={s.slug} className="border-line border-b">
              <Link
                href={`/services/${s.slug}`}
                className="group/row relative grid items-center gap-4 overflow-hidden py-8 md:grid-cols-[80px_1.2fr_1fr_auto] md:gap-8 md:py-10"
              >
                <span
                  aria-hidden="true"
                  className="bg-forest-deep absolute inset-0 -z-0 origin-bottom scale-y-0 transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover/row:scale-y-100"
                />
                <span className="tnum text-sage relative text-sm md:pl-4">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="font-display relative text-4xl leading-none tracking-[-0.03em] transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover/row:translate-x-3 md:text-6xl">
                  {ROW_TITLE[s.slug] ?? s.shortName}
                </span>
                <span className="relative max-w-[44ch]">
                  <span className="text-sage block text-xs tracking-[0.2em] uppercase">
                    {s.name}
                  </span>
                  <span className="text-fog group-hover/row:text-cream/85 mt-2 block leading-relaxed transition-colors">
                    {s.excerpt}
                  </span>
                </span>
                <span
                  aria-hidden="true"
                  className="border-line group-hover/row:border-lime group-hover/row:bg-lime group-hover/row:text-ink relative hidden size-14 items-center justify-center rounded-full border transition-[background-color,border-color,color,transform] duration-500 group-hover/row:rotate-45 md:mr-4 md:flex"
                >
                  <ArrowUpRight weight="bold" className="size-5" />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  )
}
