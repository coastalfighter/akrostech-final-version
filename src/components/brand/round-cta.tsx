import { ArrowUpRight } from '@phosphor-icons/react/dist/ssr'
import Link from 'next/link'
import * as React from 'react'
import { cn } from '@/lib/utils'

/**
 * RoundCta — a circular link with its label set on a slowly spinning ring of
 * text. The visible ring is decorative; the link's accessible name is `label`.
 */
export function RoundCta({
  href,
  label,
  ring = 'Book a call · Book a call · ',
  className,
  tone = 'lime',
}: {
  href: string
  label: string
  ring?: string
  className?: string
  tone?: 'lime' | 'cream'
}) {
  const id = label.toLowerCase().replace(/[^a-z0-9]+/g, '-')
  return (
    <Link
      href={href}
      aria-label={label}
      className={cn(
        'group/round relative inline-flex size-40 shrink-0 items-center justify-center rounded-full md:size-48',
        className,
      )}
    >
      <svg
        viewBox="0 0 200 200"
        aria-hidden="true"
        className="animate-spin-slow text-cream/70 absolute inset-0 size-full"
      >
        <defs>
          <path id={`ring-${id}`} d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0" />
        </defs>
        <text className="fill-current text-[15px] font-medium tracking-[0.32em] uppercase">
          <textPath href={`#ring-${id}`}>{ring.toUpperCase()}</textPath>
        </text>
      </svg>
      <span
        aria-hidden="true"
        className={cn(
          'relative flex size-20 items-center justify-center rounded-full transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover/round:scale-110 md:size-24',
          tone === 'lime' ? 'bg-lime text-ink' : 'bg-cream text-ink',
        )}
      >
        <ArrowUpRight
          weight="bold"
          className="size-7 transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover/round:rotate-45"
        />
      </span>
    </Link>
  )
}
