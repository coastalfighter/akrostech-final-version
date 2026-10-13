import * as React from 'react'
import { cn } from '@/lib/utils'

/**
 * Marquee — an endless band of words. The list is rendered twice so the CSS
 * loop is seamless; the duplicate is hidden from assistive tech. Stops under
 * prefers-reduced-motion (global rule) and pauses on hover.
 */
export function Marquee({
  items,
  reverse = false,
  className,
  itemClassName,
  separator = '✦',
  label,
}: {
  items: string[]
  reverse?: boolean
  className?: string
  itemClassName?: string
  separator?: string
  /** Accessible label; the band is announced once as a list. */
  label?: string
}) {
  const row = (hidden: boolean) => (
    <ul
      aria-hidden={hidden || undefined}
      aria-label={!hidden ? label : undefined}
      className="flex shrink-0 items-center"
    >
      {items.map((item) => (
        <li key={item} className={cn('flex items-center whitespace-nowrap', itemClassName)}>
          <span>{item}</span>
          <span aria-hidden="true" className="text-lime px-8 text-[0.5em] md:px-12">
            {separator}
          </span>
        </li>
      ))}
    </ul>
  )

  return (
    <div className={cn('group/marquee flex overflow-hidden', className)}>
      <div
        className={cn(
          'flex w-max group-hover/marquee:[animation-play-state:paused]',
          reverse ? 'animate-marquee-reverse' : 'animate-marquee',
        )}
      >
        {row(false)}
        {row(true)}
      </div>
    </div>
  )
}
