'use client'

import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion'
import * as React from 'react'
import { cn } from '@/lib/utils'
import { useMounted } from './use-mounted'

/**
 * Rings3D — a stack of concentric rings laid in 3D space (CSS transforms, no
 * WebGL), with a lime "sun" at the centre. Scrolling past it turns the stack
 * and changes its tilt; it also turns slowly on its own. Decorative.
 */
const RINGS = [
  { size: 100, z: 0, tone: 'border-lime/70' },
  { size: 82, z: 30, tone: 'border-sage/40' },
  { size: 64, z: 60, tone: 'border-cream/25' },
  { size: 46, z: 90, tone: 'border-sage/50' },
  { size: 28, z: 120, tone: 'border-lime/60' },
]

export function Rings3D({ className }: { className?: string }) {
  const ref = React.useRef<HTMLDivElement>(null)
  const mounted = useMounted()
  const reduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const p = useSpring(scrollYProgress, { stiffness: 80, damping: 25 })
  const rotateX = useTransform(p, [0, 1], [72, 48])
  const rotateZ = useTransform(p, [0, 1], [-40, 140])
  const animated = mounted && !reduceMotion

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={cn('pointer-events-none relative aspect-square [perspective:1200px]', className)}
    >
      <motion.div
        className="absolute inset-0 [transform-style:preserve-3d]"
        style={animated ? { rotateX, rotateZ } : { rotateX: 62, rotateZ: 20 }}
      >
        <div className="absolute inset-0 animate-[spin_40s_linear_infinite] [transform-style:preserve-3d]">
          {RINGS.map((ring) => (
            <div
              key={ring.size}
              className={cn('absolute rounded-full border-2', ring.tone)}
              style={{
                width: `${ring.size}%`,
                height: `${ring.size}%`,
                left: `${(100 - ring.size) / 2}%`,
                top: `${(100 - ring.size) / 2}%`,
                transform: `translateZ(${ring.z}px)`,
              }}
            >
              <span
                className="bg-lime absolute -top-1.5 left-1/2 size-3 -translate-x-1/2 rounded-full shadow-[0_0_24px_rgba(200,241,105,0.8)]"
                style={{ opacity: ring.z % 60 === 0 ? 1 : 0 }}
              />
            </div>
          ))}
          <div
            className="bg-lime absolute top-1/2 left-1/2 size-[16%] -translate-x-1/2 -translate-y-1/2 rounded-full shadow-[0_0_80px_rgba(200,241,105,0.55)]"
            style={{ transform: 'translate(-50%, -50%) translateZ(60px)' }}
          />
        </div>
      </motion.div>
    </div>
  )
}
