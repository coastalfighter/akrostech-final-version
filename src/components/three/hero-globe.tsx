'use client'

import { useReducedMotion, type MotionValue } from 'framer-motion'
import dynamic from 'next/dynamic'
import * as React from 'react'
import { GlobeFallback } from './globe-fallback'

/**
 * HeroGlobe — picks the WebGL globe when the browser can run it (and the
 * visitor hasn't asked for reduced motion), otherwise the static SVG. The
 * three.js bundle is code-split and never server-rendered.
 */

const GlobeScene = dynamic(() => import('./globe-scene'), {
  ssr: false,
  loading: () => <GlobeFallback />,
})

function supportsWebGL(): boolean {
  try {
    const canvas = document.createElement('canvas')
    return !!(canvas.getContext('webgl2') || canvas.getContext('webgl'))
  } catch {
    return false
  }
}

const noopSubscribe = () => () => {}

export function HeroGlobe({ progress }: { progress: MotionValue<number> }) {
  const reduceMotion = useReducedMotion()
  const webgl = React.useSyncExternalStore(noopSubscribe, supportsWebGL, () => false)
  const ref = React.useRef<HTMLDivElement>(null)
  const [visible, setVisible] = React.useState(true)

  React.useEffect(() => {
    const el = ref.current
    if (!el || typeof IntersectionObserver === 'undefined') return
    const observer = new IntersectionObserver(([entry]) => setVisible(!!entry?.isIntersecting))
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={ref} className="h-full w-full">
      {webgl && !reduceMotion ? (
        <GlobeScene progress={progress} active={visible} />
      ) : (
        <GlobeFallback />
      )}
    </div>
  )
}
