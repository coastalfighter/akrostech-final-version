'use client'

import { motion, useReducedMotion } from 'framer-motion'
import * as React from 'react'
import { cn, stripNativeDragHandlers } from '@/lib/utils'

/* ——— Container: 12-col grid shell, 1440px max, 24px/16px gutters ——— */

function Container({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('mx-auto w-full max-w-[1440px] px-4 md:px-6', className)} {...props}>
      {children}
    </div>
  )
}

/* ——— Section: dark/light surface with the 120–160 / 72–96 rhythm ——— */

const sectionPaddings = {
  default: 'py-[72px] md:py-[120px]',
  roomy: 'py-[96px] md:py-[160px]',
  compact: 'py-[48px] md:py-[72px]',
} as const

function Section({
  surface = 'dark',
  padding = 'default',
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLElement> & {
  surface?: 'dark' | 'light'
  padding?: keyof typeof sectionPaddings
}) {
  return (
    <section
      data-surface={surface}
      className={cn(
        sectionPaddings[padding],
        surface === 'dark' ? 'bg-ink-950 text-paper-50' : 'bg-paper-50 text-graphite-900',
        className,
      )}
      {...props}
    >
      {children}
    </section>
  )
}

/* ——— MeridianDivider: the brand's signature line ——— */

function MeridianDivider({
  className,
  animated = true,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { animated?: boolean }) {
  const reduceMotion = useReducedMotion()
  // The divider is decorative: hidden from assistive tech, no separator role.
  if (!animated || reduceMotion) {
    return <div aria-hidden="true" className={cn('meridian-line', className)} {...props} />
  }
  return (
    <motion.div
      aria-hidden="true"
      className={cn('meridian-line origin-left', className)}
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      {...stripNativeDragHandlers(props)}
    />
  )
}

export { Container, Section, MeridianDivider, sectionPaddings }
