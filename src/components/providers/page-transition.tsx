'use client'

import { useReducedMotion } from 'framer-motion'
import { motion, useAnimationControls } from 'framer-motion'
import { usePathname } from 'next/navigation'
import * as React from 'react'
import { EASE_IN_OUT_QUART } from '@/lib/motion'

/**
 * Route transition: a Meridian-gradient wipe.
 * 400ms in (from the bottom), 600ms out (to the top). Decorative overlay —
 * content swaps immediately, so scroll restoration and history stay native.
 * Skipped under prefers-reduced-motion.
 */
export function PageTransition() {
  const pathname = usePathname()
  const reduceMotion = useReducedMotion()
  const controls = useAnimationControls()
  const firstRender = React.useRef(true)

  React.useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false
      return
    }
    if (reduceMotion) return
    let cancelled = false
    const run = async () => {
      await controls.start({
        scaleY: 1,
        originY: 1,
        transition: { duration: 0.4, ease: EASE_IN_OUT_QUART },
      })
      if (cancelled) return
      await controls.start({
        scaleY: 0,
        originY: 0,
        transition: { duration: 0.6, ease: EASE_IN_OUT_QUART },
      })
    }
    run()
    return () => {
      cancelled = true
    }
  }, [pathname, controls, reduceMotion])

  if (reduceMotion) return null

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[100]"
      style={{ background: 'var(--meridian-gradient)' }}
      initial={{ scaleY: 0, originY: 1 }}
      animate={controls}
    />
  )
}
