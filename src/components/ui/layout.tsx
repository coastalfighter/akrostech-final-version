import * as React from 'react'
import { cn } from '@/lib/utils'

/* ——— Container: 1440px max with responsive gutters ——— */

function Container({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('mx-auto w-full max-w-[1440px] px-5 md:px-10', className)} {...props}>
      {children}
    </div>
  )
}

/* ——— Section: one of three tones, with a consistent vertical rhythm ——— */

const sectionPaddings = {
  default: 'py-24 md:py-36',
  roomy: 'py-28 md:py-48',
  compact: 'py-16 md:py-24',
  none: '',
} as const

const sectionTones = {
  ink: 'bg-ink text-cream',
  raised: 'bg-ink-2 text-cream',
  forest: 'bg-forest-deep text-cream',
} as const

export type SectionTone = keyof typeof sectionTones

function Section({
  tone = 'ink',
  padding = 'default',
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLElement> & {
  tone?: SectionTone
  padding?: keyof typeof sectionPaddings
}) {
  return (
    <section
      data-tone={tone}
      className={cn('relative', sectionPaddings[padding], sectionTones[tone], className)}
      {...props}
    >
      {children}
    </section>
  )
}

/* ——— Rule: a hairline divider, decorative ——— */

function Rule({ className }: { className?: string }) {
  return <hr aria-hidden="true" className={cn('border-line border-0 border-t', className)} />
}

/*
 * GridFill — empty cells that complete the last row of a hairline grid
 * (gap-px over bg-line), so odd counts never leave a bare line-coloured hole.
 * Pass the item count and the column counts used at md and lg.
 */
function GridFill({
  count,
  md = 2,
  lg = 3,
  className,
}: {
  count: number
  md?: number
  lg?: number
  className?: string
}) {
  const mdFill = (md - (count % md)) % md
  const lgFill = (lg - (count % lg)) % lg
  return (
    <>
      {Array.from({ length: Math.max(mdFill, lgFill) }, (_, i) => (
        <li
          key={i}
          aria-hidden="true"
          className={cn(
            'hidden',
            i < mdFill && 'md:block',
            i < lgFill ? 'lg:block' : 'lg:hidden',
            className,
          )}
        />
      ))}
    </>
  )
}

export { Container, Section, Rule, GridFill, sectionPaddings, sectionTones }
