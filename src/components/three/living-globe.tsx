'use client'

import { useReducedMotion } from 'framer-motion'
import type { MotionValue } from 'framer-motion'
import * as React from 'react'
import { GlobeFallback } from './globe-fallback'
import { LivingGlobeCanvas } from './living-globe-canvas'

/**
 * LivingGlobe — picks the right globe for the context:
 * - prefers-reduced-motion → static SVG (no autoplay, per Section 7)
 * - no WebGL → SVG with CSS-animated arcs
 * - otherwise → the R3F canvas
 *
 * Client-only (imported via next/dynamic ssr:false from the hero), so WebGL
 * detection can run in a state initializer with no hydration mismatch and
 * three.js stays in its own code-split chunk.
 */

function detectWebGL(): boolean {
  try {
    const canvas = document.createElement('canvas')
    return !!(
      canvas.getContext('webgl2') ||
      canvas.getContext('webgl') ||
      canvas.getContext('experimental-webgl')
    )
  } catch {
    return false
  }
}

export function LivingGlobe({ scrollProgress }: { scrollProgress: MotionValue<number> }) {
  const reduceMotion = useReducedMotion()
  const [webglAvailable] = React.useState(detectWebGL)

  if (reduceMotion) {
    return <GlobeFallback animated={false} />
  }
  if (!webglAvailable) {
    return <GlobeFallback animated />
  }
  return <LivingGlobeCanvas scrollProgress={scrollProgress} />
}
