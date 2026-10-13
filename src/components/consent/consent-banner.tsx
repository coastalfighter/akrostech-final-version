'use client'

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import * as React from 'react'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { useConsent } from './consent-manager'
import { DUR_BASE, EASE_OUT_EXPO } from '@/lib/motion'
import { cn } from '@/lib/utils'

/**
 * ConsentBanner — appears when the visitor hasn't chosen. Accept all,
 * reject all, or customize per category. Re-openable from the footer.
 */

export function ConsentBanner() {
  const { consent, setConsent } = useConsent()
  const [customizing, setCustomizing] = React.useState(false)
  const [analytics, setAnalytics] = React.useState(true)
  const [marketing, setMarketing] = React.useState(false)
  const reduceMotion = useReducedMotion()

  if (consent) return null

  return (
    <AnimatePresence>
      <motion.div
        role="dialog"
        aria-live="polite"
        aria-label="Cookie consent"
        className="fixed inset-x-4 bottom-4 z-[95] sm:right-auto sm:max-w-[440px] lg:left-[112px]"
        initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 24 }}
        animate={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
        exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 24 }}
        transition={{ duration: DUR_BASE, ease: EASE_OUT_EXPO }}
      >
        <div className="border-line bg-ink-3 rounded-[var(--radius-card)] border p-6 shadow-[0_24px_80px_-20px_rgba(0,0,0,0.7)]">
          <h2 className="font-display text-cream text-xl">A quick word on cookies</h2>
          <p className="text-fog mt-2 text-[15px] leading-relaxed">
            We use necessary cookies to run the site. With your permission, we&apos;ll also use
            analytics cookies to understand visits and marketing cookies for advertising. No choice
            is also a choice — the site works either way.
          </p>

          {customizing && (
            <div className="border-line mt-4 space-y-3 rounded-[12px] border p-4">
              <label className="flex cursor-pointer items-center justify-between gap-4">
                <span className="text-cream text-[15px]">
                  Necessary
                  <span className="text-fog block text-sm">Required for the site to work.</span>
                </span>
                <Checkbox checked disabled aria-label="Necessary cookies (always on)" />
              </label>
              <label className="flex cursor-pointer items-center justify-between gap-4">
                <span className="text-cream text-[15px]">
                  Analytics
                  <span className="text-fog block text-sm">Helps us understand visits.</span>
                </span>
                <Checkbox
                  checked={analytics}
                  onCheckedChange={(v) => setAnalytics(v === true)}
                  aria-label="Analytics cookies"
                />
              </label>
              <label className="flex cursor-pointer items-center justify-between gap-4">
                <span className="text-cream text-[15px]">
                  Marketing
                  <span className="text-fog block text-sm">Used for advertising.</span>
                </span>
                <Checkbox
                  checked={marketing}
                  onCheckedChange={(v) => setMarketing(v === true)}
                  aria-label="Marketing cookies"
                />
              </label>
            </div>
          )}

          <div className={cn('mt-6 flex flex-wrap items-center gap-3')}>
            <Button size="sm" onClick={() => setConsent({ analytics: true, marketing: true })}>
              Accept all
            </Button>
            <Button
              size="sm"
              variant="secondary"
              onClick={() => setConsent({ analytics: false, marketing: false })}
            >
              Reject all
            </Button>
            {customizing ? (
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setConsent({ analytics, marketing })}
              >
                Save choices
              </Button>
            ) : (
              <Button size="sm" variant="ghost" onClick={() => setCustomizing(true)}>
                Customize
              </Button>
            )}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
