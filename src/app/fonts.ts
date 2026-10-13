import { Fraunces, Space_Grotesk } from 'next/font/google'

/**
 * Typefaces — self-hosted via next/font, display: swap, Latin subset.
 *
 * - Fraunces: a soft, high-contrast display serif for headlines. Its SOFT and
 *   WONK axes give the editorial warmth the brand wants; italics carry accents.
 * - Space Grotesk: a geometric grotesk for body copy, UI, and labels.
 */

export const fontDisplay = Fraunces({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
  style: ['normal', 'italic'],
  axes: ['SOFT', 'WONK', 'opsz'],
})

export const fontSans = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

/** Apply to <html>: exposes --font-display and --font-sans. */
export const fontVariables = [fontDisplay.variable, fontSans.variable].join(' ')
