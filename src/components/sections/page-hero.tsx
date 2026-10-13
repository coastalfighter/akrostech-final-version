import * as React from 'react'
import { Breadcrumbs, type Crumb } from '@/components/layout/breadcrumbs'
import { Rings3D } from '@/components/motion/rings-3d'
import { Container } from '@/components/ui/layout'
import { Eyebrow } from '@/components/ui/typography'
import { cn } from '@/lib/utils'

/**
 * PageHero — the opener for every inner page. Copy on the left (breadcrumbs,
 * eyebrow, serif headline, lead, actions); the 3D rings graphic has its own
 * column on the right, so art and text never overlap. On small screens the
 * graphic drops out and the copy takes the full width.
 */
export function PageHero({
  eyebrow,
  title,
  lead,
  crumbs,
  size = 'lg',
  children,
  className,
}: {
  eyebrow: string
  title: React.ReactNode
  lead?: React.ReactNode
  crumbs?: Crumb[]
  /** `md` suits long titles (articles, legal pages). */
  size?: 'lg' | 'md'
  children?: React.ReactNode
  className?: string
}) {
  return (
    <section
      className={cn(
        'border-line bg-ink relative isolate overflow-hidden border-b pt-32 pb-16 md:pt-40 md:pb-24',
        className,
      )}
    >
      <div
        aria-hidden="true"
        className="grid-lines absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_at_80%_40%,black,transparent_70%)]"
      />
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-[1fr_minmax(0,400px)] lg:gap-16">
          <div>
            {crumbs && <Breadcrumbs items={crumbs} className="intro mb-10" />}
            <Eyebrow className="intro intro-1">{eyebrow}</Eyebrow>
            <h1
              className={cn(
                'intro intro-2 mt-6 max-w-4xl text-balance',
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
          </div>
          <Rings3D className="intro intro-3 mx-auto hidden w-full max-w-[400px] lg:block" />
        </div>
      </Container>
    </section>
  )
}
