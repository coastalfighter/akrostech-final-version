'use client'

import { ArrowUpRight, X } from '@phosphor-icons/react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import Link from 'next/link'
import * as React from 'react'
import { Arcs } from '@/components/brand/arcs'
import { Wordmark } from '@/components/brand/wordmark'
import { siteConfig } from '@/config/site'
import { EASE_OUT_EXPO } from '@/lib/motion'
import { NAV, SECONDARY_NAV, SERVICE_NAV } from './nav'

/**
 * Full-screen menu — forest-green overlay with oversized numbered links,
 * the five services, and direct contact. Focus moves to the close button on
 * open, Tab is trapped inside, Escape closes, and focus returns to the
 * element that opened it.
 */

export function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const reduceMotion = useReducedMotion()
  const panelRef = React.useRef<HTMLDivElement>(null)
  const closeRef = React.useRef<HTMLButtonElement>(null)

  React.useEffect(() => {
    if (!open) return
    const opener = document.activeElement as HTMLElement | null
    closeRef.current?.focus()

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
        return
      }
      if (e.key !== 'Tab' || !panelRef.current) return
      const focusables = panelRef.current.querySelectorAll<HTMLElement>('a[href], button')
      const first = focusables[0]
      const last = focusables[focusables.length - 1]
      if (!first || !last) return
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
      opener?.focus?.()
    }
  }, [open, onClose])

  const links = [...NAV, { label: 'Book a call', href: '/book' }]

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          className="bg-forest-deep fixed inset-0 z-[90] flex flex-col overflow-y-auto"
          initial={reduceMotion ? { opacity: 0 } : { clipPath: 'inset(0 0 100% 0)' }}
          animate={reduceMotion ? { opacity: 1 } : { clipPath: 'inset(0 0 0% 0)' }}
          exit={reduceMotion ? { opacity: 0 } : { clipPath: 'inset(0 0 100% 0)' }}
          transition={{ duration: 0.7, ease: EASE_OUT_EXPO }}
        >
          <Arcs className="absolute inset-x-0 bottom-0 h-[55vh] w-full opacity-60" />

          <div className="relative flex h-[72px] shrink-0 items-center justify-between px-5 md:px-10">
            <Link href="/" onClick={onClose} className="text-2xl" aria-label="Akrostech home">
              <Wordmark />
            </Link>
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              aria-label="Close menu"
              className="border-cream/20 text-cream hover:border-lime hover:text-lime inline-flex size-12 cursor-pointer items-center justify-center rounded-full border transition-colors"
            >
              <X aria-hidden="true" className="size-5" />
            </button>
          </div>

          <div className="relative grid flex-1 gap-14 px-5 py-10 md:px-10 lg:grid-cols-[1.4fr_1fr] lg:gap-20 lg:px-[120px] lg:py-16">
            <nav aria-label="Menu links">
              <ul>
                {links.map((item, i) => (
                  <motion.li
                    key={item.href}
                    initial={reduceMotion ? false : { opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 + i * 0.05, duration: 0.7, ease: EASE_OUT_EXPO }}
                    className="border-cream/10 border-b"
                  >
                    <Link
                      href={item.href}
                      onClick={onClose}
                      className="group/link flex items-baseline gap-5 py-3 md:py-4"
                    >
                      <span className="tnum text-sage w-8 text-xs">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span className="font-display group-hover/link:text-lime text-4xl tracking-[-0.03em] transition-[color,transform] duration-500 ease-[var(--ease-out-expo)] group-hover/link:translate-x-3 md:text-6xl">
                        {item.label}
                      </span>
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </nav>

            <div className="flex flex-col gap-12 lg:pt-4">
              <div>
                <p className="text-sage text-xs tracking-[0.22em] uppercase">Services</p>
                <ul className="mt-5 space-y-3">
                  {SERVICE_NAV.map((s) => (
                    <li key={s.href}>
                      <Link
                        href={s.href}
                        onClick={onClose}
                        className="group/s text-cream/85 hover:text-lime inline-flex items-center gap-2 text-lg transition-colors"
                      >
                        {s.label}
                        <ArrowUpRight
                          aria-hidden="true"
                          className="size-4 opacity-0 transition-opacity group-hover/s:opacity-100"
                        />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-sage text-xs tracking-[0.22em] uppercase">More</p>
                <ul className="mt-5 flex flex-wrap gap-x-6 gap-y-3">
                  {SECONDARY_NAV.map((s) => (
                    <li key={s.href}>
                      <Link
                        href={s.href}
                        onClick={onClose}
                        className="text-cream/85 hover:text-lime text-lg transition-colors"
                      >
                        {s.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-sage text-xs tracking-[0.22em] uppercase">Talk to a human</p>
                <a
                  href={siteConfig.phoneHref}
                  className="tnum font-display hover:text-lime mt-4 block text-3xl transition-colors"
                >
                  {siteConfig.phone}
                </a>
                <p className="text-fog mt-2">Wilmington, Delaware · Teams in India</p>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
