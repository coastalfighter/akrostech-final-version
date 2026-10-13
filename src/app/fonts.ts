import { Bricolage_Grotesque, Geist, Geist_Mono, Instrument_Serif } from 'next/font/google'

/**
 * Typefaces (Section 6 of the brief). All free, self-hosted via next/font,
 * display: swap, subset to Latin.
 */

export const fontDisplay = Bricolage_Grotesque({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
})

export const fontSerifAccent = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  style: 'italic',
  variable: '--font-serif-accent',
  display: 'swap',
})

export const fontSans = Geist({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

export const fontMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
})

/** Apply to <html> or <body>: `fontDisplay.variable fontSerifAccent.variable …` */
export const fontVariables = [
  fontDisplay.variable,
  fontSerifAccent.variable,
  fontSans.variable,
  fontMono.variable,
].join(' ')
