'use client'

import { animate, useInView, useReducedMotion } from 'framer-motion'
import * as React from 'react'

/**
 * CountUp — counts to `value` the first time it scrolls into view. The
 * final value is server-rendered, so it is correct without JavaScript.
 */
export function CountUp({ value, suffix = '' }: { value: number; suffix?: string }) {
  const ref = React.useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-15% 0px' })
  const reduceMotion = useReducedMotion()

  React.useEffect(() => {
    const el = ref.current
    if (!el || !inView || reduceMotion) return
    const controls = animate(0, value, {
      duration: 1.6,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => {
        el.textContent = `${Math.round(v)}${suffix}`
      },
    })
    return () => controls.stop()
  }, [inView, reduceMotion, value, suffix])

  return (
    <span ref={ref}>
      {value}
      {suffix}
    </span>
  )
}
