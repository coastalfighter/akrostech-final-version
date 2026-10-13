'use client'

import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import * as React from 'react'
import { useMounted } from './use-mounted'

/**
 * Parallax — moves its children against the scroll. `speed` is the share of
 * the scroll distance (positive drifts up, negative drifts down); `rotate`
 * adds a slow turn across the same range.
 */
export function Parallax({
  children,
  className,
  speed = 0.2,
  rotate = 0,
}: {
  children: React.ReactNode
  className?: string
  speed?: number
  rotate?: number
}) {
  const ref = React.useRef<HTMLDivElement>(null)
  const mounted = useMounted()
  const reduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [`${speed * 100}%`, `${-speed * 100}%`])
  const r = useTransform(scrollYProgress, [0, 1], [-rotate, rotate])
  const animated = mounted && !reduceMotion
  return (
    <motion.div ref={ref} className={className} style={animated ? { y, rotate: r } : undefined}>
      {children}
    </motion.div>
  )
}
