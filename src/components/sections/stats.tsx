'use client'

import { useReducedMotion } from 'framer-motion'
import * as React from 'react'
import { cn } from '@/lib/utils'

/**
 * StatBlock — animated counters.
 *
 * FLAGGED: do not render with real numbers until the client confirms them.
 * Every figure on the live site must come from the {{CONFIRM}} list.
 */

export interface Stat {
  value: number
  suffix?: string
  label: string
  decimals?: number
}

function useCountUp(target: number, active: boolean) {
  const [display, setDisplay] = React.useState(0)
  React.useEffect(() => {
    if (!active) return
    let raf = 0
    const start = performance.now()
    const duration = 1200
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration)
      const eased = 1 - Math.pow(1 - t, 3)
      setDisplay(target * eased)
      if (t < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [active, target])
  return display
}

function StatItem({ stat, active }: { stat: Stat; active: boolean }) {
  const reduced = useReducedMotion() ?? false
  const animated = useCountUp(stat.value, active && !reduced)
  // Reduced motion: show the final figure immediately, no count-up.
  const display = reduced ? stat.value : animated
  const formatted = display.toFixed(stat.decimals ?? 0)
  return (
    <div className="text-center">
      <p className="tnum font-display text-paper-50 text-5xl font-bold md:text-6xl">
        {formatted}
        {stat.suffix && <span className="text-indigo-glow">{stat.suffix}</span>}
      </p>
      <p className="mt-2 text-mist-400">{stat.label}</p>
    </div>
  )
}

export function Stats({ stats, className }: { stats: Stat[]; className?: string }) {
  const ref = React.useRef<HTMLDivElement>(null)
  const [active, setActive] = React.useState(false)

  React.useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setActive(true)
          observer.disconnect()
        }
      },
      { threshold: 0.4 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={ref} className={cn('grid grid-cols-2 gap-10 lg:grid-cols-4', className)}>
      {stats.map((stat) => (
        <StatItem key={stat.label} stat={stat} active={active} />
      ))}
    </div>
  )
}
