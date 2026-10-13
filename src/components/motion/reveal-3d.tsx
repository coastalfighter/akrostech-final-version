'use client'

import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion'
import * as React from 'react'
import { cn } from '@/lib/utils'
import { useMounted } from './use-mounted'

/**
 * Reveal3D — content swings up out of the page in perspective as it scrolls
 * into view (rotateX + rise + fade), scrubbed by scroll position rather than
 * fired once, so it feels physically attached to the scroll.
 *
 * `variant`:
 * - "tilt" (default): hinges up from the bottom edge.
 * - "flip": turns in around the vertical axis — for grids of cards; `index`
 *   staggers neighbours.
 * - "zoom": pushes in from depth.
 */
export function Reveal3D({
  children,
  className,
  variant = 'tilt',
  index = 0,
  as = 'div',
}: {
  children: React.ReactNode
  className?: string
  variant?: 'tilt' | 'flip' | 'zoom'
  index?: number
  as?: 'div' | 'li'
}) {
  const ref = React.useRef<HTMLDivElement>(null)
  const mounted = useMounted()
  const reduceMotion = useReducedMotion()
  const stagger = (index % 3) * 0.06
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', `start ${62 - index * 2}%`],
  })
  const p = useSpring(scrollYProgress, { stiffness: 140, damping: 28, mass: 0.35 })
  const t = useTransform(p, [stagger, 1], [0, 1], { clamp: true })

  const rotateX = useTransform(t, [0, 1], [variant === 'tilt' ? 38 : 0, 0])
  const rotateY = useTransform(t, [0, 1], [variant === 'flip' ? (index % 2 ? -32 : 32) : 0, 0])
  const y = useTransform(t, [0, 1], [variant === 'zoom' ? 0 : 90, 0])
  const z = useTransform(t, [0, 1], [variant === 'zoom' ? -260 : 0, 0])
  const opacity = useTransform(t, [0, 0.6], [0, 1])

  const Tag = as === 'li' ? motion.li : motion.div
  const animated = mounted && !reduceMotion

  return (
    <Tag
      ref={ref as React.Ref<HTMLDivElement & HTMLLIElement>}
      className={cn(variant === 'tilt' && 'origin-bottom', className)}
      style={animated ? { rotateX, rotateY, y, z, opacity, transformPerspective: 1100 } : undefined}
    >
      {children}
    </Tag>
  )
}
