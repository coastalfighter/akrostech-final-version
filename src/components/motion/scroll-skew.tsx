'use client'

import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from 'framer-motion'
import * as React from 'react'

/**
 * ScrollSkew — leans its children with scroll velocity (fast scroll, more
 * lean), springing back upright when the page settles. Used on the marquee
 * bands so they feel connected to the scroll.
 */
export function ScrollSkew({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  const reduceMotion = useReducedMotion()
  const { scrollY } = useScroll()
  const velocity = useVelocity(scrollY)
  const smooth = useSpring(velocity, { stiffness: 300, damping: 50 })
  const skewX = useTransform(smooth, [-2500, 0, 2500], [8, 0, -8], { clamp: true })
  if (reduceMotion) return <div className={className}>{children}</div>
  return (
    <motion.div className={className} style={{ skewX }}>
      {children}
    </motion.div>
  )
}
