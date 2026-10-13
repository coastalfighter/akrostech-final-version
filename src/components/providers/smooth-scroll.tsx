'use client'

import Lenis from 'lenis'
import { usePathname } from 'next/navigation'
import * as React from 'react'

/**
 * Smooth scroll — Lenis drives the window's native scroll position with
 * easing, so framer-motion's useScroll, sticky positioning and CSS
 * scroll-driven animations all keep working. Off under
 * prefers-reduced-motion (native scroll takes over).
 *
 * The active instance is exposed through `getLenis()` so overlays (the
 * full-screen menu) can pause it while they lock the page.
 */

let instance: Lenis | null = null

export function getLenis(): Lenis | null {
  return instance
}

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  React.useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const lenis = new Lenis({
      lerp: 0.09,
      wheelMultiplier: 1,
      anchors: { offset: -96 },
      autoRaf: true,
    })
    instance = lenis
    document.documentElement.classList.add('lenis')

    return () => {
      lenis.destroy()
      instance = null
      document.documentElement.classList.remove('lenis')
    }
  }, [])

  // New page: start from the top without easing through the old one.
  React.useEffect(() => {
    instance?.scrollTo(0, { immediate: true })
  }, [pathname])

  return <>{children}</>
}
