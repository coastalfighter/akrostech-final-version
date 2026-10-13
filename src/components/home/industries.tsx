import Link from 'next/link'
import { Container, Section } from '@/components/ui/layout'
import { SectionHeader } from '@/components/ui/typography'
import { industries } from '@/data/site'

/** Industries — a cluster of round badges, each linking to its playbook. */
export function Industries() {
  return (
    <Section tone="ink">
      <Container>
        <SectionHeader
          eyebrow="Industries"
          index="05"
          align="center"
          title={
            <>
              Built for <span className="accent">the way you work.</span>
            </>
          }
          lead="Six industries where we’ve built the deepest playbooks — and the model travels anywhere the work is well defined."
        />
        <ul className="mx-auto mt-20 grid max-w-6xl grid-cols-2 place-items-center gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {industries.map((industry, i) => (
            <li key={industry.slug} className={i % 2 ? 'lg:translate-y-12' : ''}>
              <Link
                href={`/industries#${industry.slug}`}
                className="group/b border-line bg-ink-2 hover:border-lime hover:bg-lime flex size-40 flex-col items-center justify-center rounded-full border p-5 text-center transition-[background-color,border-color,transform] duration-500 ease-[var(--ease-out-expo)] hover:-translate-y-2 md:size-44"
              >
                <span className="tnum text-sage group-hover/b:text-ink/60 text-xs transition-colors">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="font-display group-hover/b:text-ink mt-2 text-xl leading-tight hyphens-none transition-colors">
                  {industry.name}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  )
}
