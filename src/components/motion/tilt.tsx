'use client'

import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'framer-motion'
import * as React from 'react'
import { cn } from '@/lib/utils'

/**
 * Tilt — the element leans toward the pointer in 3D with a soft spring and a
 * moving highlight. Fine pointers only; still under reduced motion.
 */
export function Tilt({
  children,
  className,
  max = 8,
}: {
  children: React.ReactNode
  className?: string
  max?: number
}) {
  const reduceMotion = useReducedMotion()
  const px = useMotionValue(0.5)
  const py = useMotionValue(0.5)
  const sx = useSpring(px, { stiffness: 220, damping: 22 })
  const sy = useSpring(py, { stiffness: 220, damping: 22 })
  const rotateY = useTransform(sx, [0, 1], [-max, max])
  const rotateX = useTransform(sy, [0, 1], [max, -max])
  const glareX = useTransform(sx, [0, 1], ['0%', '100%'])
  const glareY = useTransform(sy, [0, 1], ['0%', '100%'])
  const glare = useTransform(
    [glareX, glareY],
    ([x, y]) =>
      `radial-gradient(420px circle at ${x} ${y}, rgba(200,241,105,0.12), transparent 60%)`,
  )

  if (reduceMotion) return <div className={className}>{children}</div>

  return (
    <motion.div
      className={cn('group/tilt relative', className)}
      style={{ rotateX, rotateY, transformPerspective: 900 }}
      onPointerMove={(e) => {
        if (e.pointerType !== 'mouse') return
        const rect = e.currentTarget.getBoundingClientRect()
        px.set((e.clientX - rect.left) / rect.width)
        py.set((e.clientY - rect.top) / rect.height)
      }}
      onPointerLeave={() => {
        px.set(0.5)
        py.set(0.5)
      }}
    >
      {children}
      <motion.span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-[var(--radius-card)] opacity-0 transition-opacity duration-300 group-hover/tilt:opacity-100"
        style={{ background: glare }}
      />
    </motion.div>
  )
}
