import * as React from 'react'
import { Arcs } from '@/components/brand/arcs'
import { Breadcrumbs, type Crumb } from '@/components/layout/breadcrumbs'
import { Container } from '@/components/ui/layout'
import { Eyebrow } from '@/components/ui/typography'
import { cn } from '@/lib/utils'

/**
 * PageHero — the opener for every inner page: breadcrumbs, eyebrow, an
 * oversized serif headline, a lead, and optional actions. The rising-arcs
 * motif sits low on the right; `word` closes the hero with a giant outline word.
 */
export function PageHero({
  eyebrow,
  title,
  lead,
  crumbs,
  word,
  size = 'lg',
  children,
  className,
}: {
  eyebrow: string
  title: React.ReactNode
  lead?: React.ReactNode
  crumbs?: Crumb[]
  /** Oversized decorative outline word behind the hero. */
  word?: string
  /** `md` suits long titles (articles, legal pages). */
  size?: 'lg' | 'md'
  children?: React.ReactNode
  className?: string
}) {
  return (
    <section
      className={cn(
        'bg-ink relative isolate overflow-hidden pt-36 md:pt-44',
        word ? 'pb-0' : 'pb-20 md:pb-28',
        className,
      )}
    >
      <div
        aria-hidden="true"
        className="grid-lines absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_at_top_right,black,transparent_70%)]"
      />
      <Arcs className="absolute -right-40 bottom-0 -z-10 h-[340px] w-[700px] opacity-70 md:h-[460px] md:w-[900px]" />
      <Container>
        {crumbs && <Breadcrumbs items={crumbs} className="intro mb-10" />}
        <Eyebrow className="intro intro-1">{eyebrow}</Eyebrow>
        <h1
          className={cn(
            'intro intro-2 mt-6 max-w-5xl text-balance',
            size === 'lg'
              ? 'display-lg'
              : 'font-display text-4xl leading-[1.05] tracking-[-0.03em] md:text-6xl',
          )}
        >
          {title}
        </h1>
        {lead && (
          <p className="intro intro-3 text-fog mt-8 max-w-[58ch] text-lg leading-relaxed md:text-xl">
            {lead}
          </p>
        )}
        {children && <div className="intro intro-4 mt-10">{children}</div>}
      </Container>
      {word && (
        <p
          aria-hidden="true"
          className="text-outline font-display pointer-events-none mt-16 -mb-[0.12em] overflow-hidden px-3 text-right text-[20vw] leading-[0.8] tracking-[-0.05em] whitespace-nowrap select-none md:mt-20 lg:text-[16vw]"
        >
          {word}
        </p>
      )}
    </section>
  )
}
