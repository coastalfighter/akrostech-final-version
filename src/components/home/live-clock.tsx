'use client'

import * as React from 'react'
import { HQ_TIME_ZONE, INDIA_TIME_ZONE, formatTime, useNow } from '@/lib/use-now'

/**
 * LiveClock — Wilmington and India side by side, ticking every 30s.
 * Renders a neutral placeholder on the server so hydration never mismatches.
 */
const noopSubscribe = () => () => {}

export function LiveClock() {
  const now = useNow(30_000)
  // false during SSR and hydration, true once running in the browser.
  const mounted = React.useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false,
  )

  const hq = mounted ? formatTime(now, HQ_TIME_ZONE) : '—:—'
  const india = mounted ? formatTime(now, INDIA_TIME_ZONE) : '—:—'

  return (
    <div className="border-cream/15 bg-ink/40 rounded-[var(--radius-card)] border p-6 backdrop-blur-md">
      <p className="text-sage flex items-center gap-2 text-xs tracking-[0.2em] uppercase">
        <span aria-hidden="true" className="relative flex size-2">
          <span className="bg-lime absolute inline-flex size-full animate-ping rounded-full opacity-60" />
          <span className="bg-lime relative inline-flex size-2 rounded-full" />
        </span>
        Team online now
      </p>
      <dl className="mt-5 grid grid-cols-2 gap-6">
        <div>
          <dt className="text-fog text-xs tracking-[0.18em] uppercase">Wilmington</dt>
          <dd className="tnum font-display mt-1 text-2xl whitespace-nowrap">{hq}</dd>
        </div>
        <div>
          <dt className="text-fog text-xs tracking-[0.18em] uppercase">India</dt>
          <dd className="tnum font-display mt-1 text-2xl whitespace-nowrap">{india}</dd>
        </div>
      </dl>
    </div>
  )
}
