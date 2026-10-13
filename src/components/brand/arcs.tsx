import * as React from 'react'
import { cn } from '@/lib/utils'

/**
 * Arcs — the brand's signature graphic: concentric bands rising like a
 * horizon (the sun coming up over a team in another time zone). Decorative.
 */
export function Arcs({
  className,
  bands = 7,
  tone = 'forest',
}: {
  className?: string
  bands?: number
  tone?: 'forest' | 'lime' | 'cream'
}) {
  const stroke =
    tone === 'lime'
      ? 'var(--color-lime)'
      : tone === 'cream'
        ? 'color-mix(in oklab, var(--color-cream) 18%, transparent)'
        : 'var(--color-forest)'
  const radii = Array.from({ length: bands }, (_, i) => 120 + i * 46)
  return (
    <svg
      viewBox="0 0 800 420"
      aria-hidden="true"
      preserveAspectRatio="xMidYMax slice"
      className={cn('pointer-events-none', className)}
    >
      {radii.map((r, i) => (
        <path
          key={r}
          d={`M ${400 - r} 420 A ${r} ${r} 0 0 1 ${400 + r} 420`}
          fill="none"
          stroke={stroke}
          strokeWidth={22 - i * 1.5}
          strokeOpacity={1 - i * 0.1}
        />
      ))}
      <circle
        cx="400"
        cy="420"
        r="84"
        fill={tone === 'lime' ? 'var(--color-lime)' : 'var(--color-forest-bright)'}
      />
    </svg>
  )
}

/**
 * Orbit — a ring of dots, used as a small decorative accent.
 */
export function Orbit({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 200" aria-hidden="true" className={cn('pointer-events-none', className)}>
      <circle
        cx="100"
        cy="100"
        r="96"
        fill="none"
        stroke="var(--color-line-strong)"
        strokeDasharray="2 8"
      />
      <circle cx="100" cy="100" r="64" fill="none" stroke="var(--color-line)" />
      <circle cx="196" cy="100" r="5" fill="var(--color-lime)" />
      <circle cx="100" cy="36" r="3" fill="var(--color-sage)" />
    </svg>
  )
}
