'use client'

import { X } from '@phosphor-icons/react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import Link from 'next/link'
import * as React from 'react'
import { IconButton } from '@/components/ui/button'
import { Container } from '@/components/ui/layout'
import { DUR_BASE, EASE_OUT_EXPO, STAGGER } from '@/lib/motion'
import { NAV } from './site-header'

/**
 * Mobile menu — full-screen overlay with staggered links.
 * Traps focus while open; closes on Escape.
 */

export function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const reduceMotion = useReducedMotion()
  const closeRef = React.useRef<HTMLButtonElement>(null)

  React.useEffect(() => {
    if (!open) return
    closeRef.current?.focus()
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open, onClose])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="bg-ink-950/95 fixed inset-0 z-[90] flex flex-col backdrop-blur-xl"
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -16 }}
          animate={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
          exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -16 }}
          transition={{ duration: DUR_BASE, ease: EASE_OUT_EXPO }}
        >
          <Container>
            <div className="flex items-center justify-between py-6">
              <span className="font-display text-paper-50 text-lg font-bold">
                Akrostech
                <span aria-hidden="true" className="text-indigo-glow">
                  .
                </span>
              </span>
              <IconButton ref={closeRef} aria-label="Close menu" onClick={onClose}>
                <X aria-hidden="true" />
              </IconButton>
            </div>
          </Container>
          <nav aria-label="Mobile" className="flex flex-1 flex-col justify-center px-8">
            <ul className="space-y-2">
              {[...NAV, { label: 'Book a call', href: '/book' }].map((item, i) => (
                <motion.li
                  key={item.href}
                  initial={reduceMotion ? { opacity: 0 } : { opacity: 0, x: -24 }}
                  animate={reduceMotion ? { opacity: 1 } : { opacity: 1, x: 0 }}
                  transition={{
                    delay: 0.05 + i * STAGGER,
                    duration: DUR_BASE,
                    ease: EASE_OUT_EXPO,
                  }}
                >
                  <Link
                    href={item.href}
                    onClick={onClose}
                    className="font-display text-paper-50 hover:text-indigo-glow block py-2 text-4xl font-bold transition-colors"
                  >
                    {item.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </nav>
          <Container>
            <p className="pb-10 font-mono text-xs tracking-[0.2em] text-mist-400 uppercase">
              Wilmington, DE · +1 (332) 287-0846
            </p>
          </Container>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
