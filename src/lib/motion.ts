/**
 * Motion tokens (Section 7 of the brief) as code.
 *
 * Every animation either explains something or rewards attention; nothing moves
 * just to move. All motion respects prefers-reduced-motion: components should
 * use `useReducedMotion()` from framer-motion (or the MotionProvider below)
 * and fall back to simple opacity fades with no transforms, parallax, or autoplay.
 */
import type { Easing, Variants } from 'framer-motion'

export const EASE_OUT_EXPO: Easing = [0.16, 1, 0.3, 1]
export const EASE_IN_OUT_QUART: Easing = [0.76, 0, 0.24, 1]

export const SPRING_SOFT = { type: 'spring', stiffness: 260, damping: 30 } as const

export const DUR_FAST = 0.15 // 150ms — hover
export const DUR_BASE = 0.4 // 400ms — reveals
export const DUR_SLOW = 0.9 // 900ms — hero
export const STAGGER = 0.06 // 60ms — lists, grids, word reveals

/** CSS cubic-bezier strings matching the tokens above (for CSS transitions). */
export const easeOutExpoCss = 'cubic-bezier(0.16, 1, 0.3, 1)'
export const easeInOutQuartCss = 'cubic-bezier(0.76, 0, 0.24, 1)'

/**
 * Word-mask reveal variants for headlines: words rise from a mask, staggered,
 * run once when in view. Pair with `useReducedMotion()` — when reduced, render
 * a plain opacity fade instead (see Heading component).
 */
export const wordReveal: Variants = {
  hidden: {},
  show: (stagger: number = STAGGER) => ({
    transition: { staggerChildren: stagger },
  }),
}

export const wordChild: Variants = {
  hidden: { y: '110%' },
  show: {
    y: '0%',
    transition: { duration: DUR_BASE, ease: EASE_OUT_EXPO },
  },
}

/** Simple fade — the reduced-motion fallback for every reveal. */
export const fadeOnly: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: DUR_BASE, ease: 'easeOut' } },
}
