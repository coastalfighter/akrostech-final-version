'use client'

import { ArrowUpRight } from '@phosphor-icons/react'
import { motion, useReducedMotion } from 'framer-motion'
import * as React from 'react'
import { cn, stripNativeDragHandlers } from '@/lib/utils'

/**
 * Cards — every card ships in dark and light surface variants.
 *
 * - Spotlight: a radial glow follows the cursor inside the card; the border
 *   brightens under the pointer.
 * - Tilt: subtle 3D tilt (max 6°) on desktop pointers only; off under
 *   prefers-reduced-motion.
 */

/* ——— Spotlight behavior (shared) ——— */

function useSpotlight<T extends HTMLElement>() {
  const ref = React.useRef<T>(null)
  const reduceMotion = useReducedMotion()

  const onMouseMove = React.useCallback(
    (event: React.MouseEvent) => {
      const el = ref.current
      if (!el || reduceMotion) return
      const rect = el.getBoundingClientRect()
      el.style.setProperty('--spotlight-x', `${event.clientX - rect.left}px`)
      el.style.setProperty('--spotlight-y', `${event.clientY - rect.top}px`)
    },
    [reduceMotion],
  )

  return { ref, onMouseMove }
}

const spotlightClass =
  'group/card relative overflow-hidden before:pointer-events-none before:absolute before:inset-0 before:opacity-0 before:transition-opacity before:duration-300 hover:before:opacity-100 before:bg-[radial-gradient(320px_circle_at_var(--spotlight-x,50%)_var(--spotlight-y,50%),rgba(139,140,255,0.14),transparent_70%)]'

/* ——— Card: base surface ——— */

function Card({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'border-line-dark bg-ink-800 rounded-[20px] border p-6 md:p-8',
        'data-[surface=light]:border-graphite-900/10 data-[surface=light]:bg-white',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}

/* ——— ServiceCard: spotlight + tilt + accent icon ——— */

const accentText: Record<string, string> = {
  web: 'text-accent-web',
  rpo: 'text-accent-rpo',
  va: 'text-accent-va',
  acct: 'text-accent-acct',
  legal: 'text-accent-legal',
}

function ServiceCard({
  accent = 'web',
  icon,
  title,
  description,
  href,
  className,
  ...props
}: React.HTMLAttributes<HTMLElement> & {
  accent?: keyof typeof accentText
  icon: React.ReactNode
  title: string
  description: string
  href: string
}) {
  const { ref, onMouseMove } = useSpotlight<HTMLElement>()
  const reduceMotion = useReducedMotion()
  const [tilt, setTilt] = React.useState({ rx: 0, ry: 0 })

  const handleMove = (event: React.MouseEvent<HTMLElement>) => {
    onMouseMove(event)
    if (reduceMotion || !window.matchMedia('(pointer: fine)').matches) return
    const rect = event.currentTarget.getBoundingClientRect()
    const px = (event.clientX - rect.left) / rect.width - 0.5
    const py = (event.clientY - rect.top) / rect.height - 0.5
    setTilt({ rx: -py * 6, ry: px * 6 }) // max 6°
  }

  return (
    <motion.article
      ref={ref as React.Ref<HTMLElement>}
      className={cn(
        spotlightClass,
        'border-line-dark bg-ink-800 hover:border-indigo-glow/50 rounded-[20px] border p-6 transition-colors duration-150 md:p-8',
        'data-[surface=light]:border-graphite-900/10 data-[surface=light]:bg-white',
        className,
      )}
      onMouseMove={handleMove}
      onMouseLeave={() => setTilt({ rx: 0, ry: 0 })}
      animate={{ rotateX: tilt.rx, rotateY: tilt.ry }}
      transition={{ type: 'spring', stiffness: 260, damping: 30 }}
      style={{ transformPerspective: 800 }}
      {...stripNativeDragHandlers(props)}
    >
      <a href={href} className="block rounded-[12px] focus-visible:outline-2" aria-label={title}>
        <div
          className={cn(
            'border-line-dark mb-5 inline-flex rounded-[12px] border p-3',
            accentText[accent],
          )}
        >
          {icon}
        </div>
        <h3 className="font-display text-paper-50 data-[surface=light]:text-graphite-900 text-xl font-semibold">
          {title}
        </h3>
        <p className="mt-2 text-mist-400 data-[surface=light]:text-slate-600">{description}</p>
        <span className="text-indigo-glow mt-4 inline-flex items-center gap-1 text-sm font-medium">
          Explore
          <ArrowUpRight
            aria-hidden="true"
            weight="bold"
            className="size-4 transition-transform duration-150 group-hover/card:translate-x-0.5 group-hover/card:-translate-y-0.5"
          />
        </span>
      </a>
    </motion.article>
  )
}

/* ——— FeatureCard: simple icon + title + text ——— */

function FeatureCard({
  icon,
  title,
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { icon: React.ReactNode; title: string }) {
  const { ref, onMouseMove } = useSpotlight<HTMLDivElement>()
  return (
    <div
      ref={ref}
      onMouseMove={onMouseMove}
      className={cn(
        spotlightClass,
        'border-line-dark bg-ink-800 hover:border-indigo-glow/40 rounded-[20px] border p-6 transition-colors duration-150',
        'data-[surface=light]:border-graphite-900/10 data-[surface=light]:bg-white',
        className,
      )}
      {...props}
    >
      <div className="text-indigo-glow mb-4 [&_svg]:size-12">{icon}</div>
      <h3 className="font-display text-paper-50 data-[surface=light]:text-graphite-900 text-lg font-semibold">
        {title}
      </h3>
      <div className="mt-2 text-[15px] leading-relaxed text-mist-400 data-[surface=light]:text-slate-600">
        {children}
      </div>
    </div>
  )
}

export { Card, ServiceCard, FeatureCard }
