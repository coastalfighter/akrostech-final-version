'use client'

import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion'
import * as React from 'react'

/** Magnetic — the child drifts toward the pointer (max `strength` px). */
export function Magnetic({
  children,
  className,
  strength = 14,
}: {
  children: React.ReactNode
  className?: string
  strength?: number
}) {
  const reduceMotion = useReducedMotion()
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 200, damping: 15, mass: 0.4 })
  const sy = useSpring(y, { stiffness: 200, damping: 15, mass: 0.4 })
  if (reduceMotion) return <div className={className}>{children}</div>
  return (
    <motion.div
      className={className}
      style={{ x: sx, y: sy }}
      onPointerMove={(e) => {
        if (e.pointerType !== 'mouse') return
        const rect = e.currentTarget.getBoundingClientRect()
        const dx = e.clientX - (rect.left + rect.width / 2)
        const dy = e.clientY - (rect.top + rect.height / 2)
        x.set((dx / (rect.width / 2)) * strength)
        y.set((dy / (rect.height / 2)) * strength)
      }}
      onPointerLeave={() => {
        x.set(0)
        y.set(0)
      }}
    >
      {children}
    </motion.div>
  )
}
