'use client'

import * as React from 'react'

/** Ticking clock, re-rendering every `intervalMs` (default 1s). */
export function useNow(intervalMs = 1000): Date {
  const [now, setNow] = React.useState(() => new Date())
  React.useEffect(() => {
    const id = setInterval(() => setNow(new Date()), intervalMs)
    return () => clearInterval(id)
  }, [intervalMs])
  return now
}

export function formatTime(date: Date, timeZone: string): string {
  return new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
    timeZone,
  }).format(date)
}

/** Wilmington, DE (HQ) and India (delivery) time zones. */
export const HQ_TIME_ZONE = 'America/New_York'
export const INDIA_TIME_ZONE = 'Asia/Kolkata'
