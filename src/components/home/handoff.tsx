'use client'

import { useReducedMotion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import * as React from 'react'
import { Container } from '@/components/ui/layout'
import { Eyebrow } from '@/components/ui/typography'
import { cn } from '@/lib/utils'

/**
 * The 24-hour handoff — a pinned, scrubbed story (300vh).
 *
 * A dot travels the Meridian line as three panels crossfade:
 *   1. 6 PM, Austin — you log off.
 *   2. Overnight — while you sleep, we ship (animated counters).
 *   3. 8 AM, Austin — you wake up to finished work.
 * A thin gold progress bar tracks the scrub. Under reduced motion the
 * panels render as a simple static stack — no pinning, no scrub.
 */

gsap.registerPlugin(ScrollTrigger)

const PANELS = [
  {
    time: '6 PM, Austin',
    title: 'You log off.',
    body: 'Your day ends. The brief, the priorities, and the open threads hand off to a team that is just starting theirs.',
  },
  {
    time: 'Overnight',
    title: 'While you sleep, we ship.',
    body: 'Twelve candidates screened. Invoices reconciled. The homepage deployed. The support inbox cleared — all before your alarm.',
  },
  {
    time: '8 AM, Austin',
    title: 'You wake up to finished work.',
    body: 'A morning brief in your Slack: what shipped, what needs you, what is next. You start the day ahead, not behind.',
  },
]

function Counter({ to, suffix, label }: { to: number; suffix: string; label: string }) {
  const numRef = React.useRef<HTMLSpanElement>(null)
  return (
    <div>
      <p className="tnum font-display text-paper-50 text-5xl font-bold md:text-6xl">
        <span ref={numRef} data-counter={to}>
          0
        </span>
        <span className="text-sunrise-amber">{suffix}</span>
      </p>
      <p className="mt-1 text-sm text-mist-400">{label}</p>
    </div>
  )
}

function StaticHandoff() {
  return (
    <section className="bg-ink-950 py-[72px] md:py-[120px]" aria-label="The 24-hour handoff">
      <Container>
        <Eyebrow>How it works</Eyebrow>
        <h2 className="font-display mt-4 text-4xl font-bold tracking-[-0.02em] md:text-5xl">
          Your day ends. <em className="accent-serif">Ours</em> continues.
        </h2>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {PANELS.map((panel) => (
            <div
              key={panel.time}
              className="border-line-dark bg-ink-800 rounded-[20px] border p-6 md:p-8"
            >
              <p className="text-aurora-teal font-mono text-xs tracking-[0.25em] uppercase">
                {panel.time}
              </p>
              <h3 className="font-display mt-3 text-2xl font-semibold">{panel.title}</h3>
              <p className="mt-2 leading-relaxed text-mist-400">{panel.body}</p>
            </div>
          ))}
        </div>
        <p className="mt-8 text-sm text-mist-400">
          Illustration — your real numbers depend on your scope.
        </p>
      </Container>
    </section>
  )
}

export function Handoff() {
  const reduceMotion = useReducedMotion()
  const sectionRef = React.useRef<HTMLElement>(null)

  React.useEffect(() => {
    if (reduceMotion || !sectionRef.current) return
    const ctx = gsap.context(() => {
      const panels = gsap.utils.toArray<HTMLElement>('[data-handoff-panel]')
      const [panel1, panel2, panel3] = panels
      if (!panel1 || !panel2 || !panel3) return
      const counters = gsap.utils.toArray<HTMLElement>('[data-counter]')
      const counterState = counters.map(() => ({ value: 0 }))

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=300%',
          pin: true,
          scrub: 1,
        },
      })

      // Progress bar + travelling dot ride the whole timeline.
      tl.to('[data-handoff-progress]', { scaleX: 1, ease: 'none', duration: 1 }, 0)
      tl.to('[data-handoff-dot]', { left: '100%', ease: 'none', duration: 1 }, 0)

      // Panel 1 → 2
      tl.to(panel1, { opacity: 0, y: -48, ease: 'power2.in', duration: 0.22 }, 0.28)
      tl.fromTo(
        panel2,
        { opacity: 0, y: 48 },
        { opacity: 1, y: 0, ease: 'power2.out', duration: 0.22 },
        0.34,
      )
      // Counters run while panel 2 is up.
      counters.forEach((el, i) => {
        const state = counterState[i]
        if (!state) return
        const to = Number(el.dataset.counter ?? 0)
        tl.to(
          state,
          {
            value: to,
            duration: 0.18,
            ease: 'none',
            onUpdate: () => {
              el.textContent = String(Math.round(state.value))
            },
          },
          0.4,
        )
      })
      // Panel 2 → 3
      tl.to(panel2, { opacity: 0, y: -48, ease: 'power2.in', duration: 0.22 }, 0.66)
      tl.fromTo(
        panel3,
        { opacity: 0, y: 48 },
        { opacity: 1, y: 0, ease: 'power2.out', duration: 0.22 },
        0.72,
      )
      // City lights: Austin dims as India lights, then back.
      tl.to('[data-city-austin]', { opacity: 0.25, duration: 0.2 }, 0.3)
      tl.to('[data-city-india]', { opacity: 1, duration: 0.2 }, 0.3)
      tl.to('[data-city-austin]', { opacity: 1, duration: 0.2 }, 0.68)
      tl.to('[data-city-india]', { opacity: 0.25, duration: 0.2 }, 0.68)
    }, sectionRef)
    return () => ctx.revert()
  }, [reduceMotion])

  if (reduceMotion) {
    return <StaticHandoff />
  }

  return (
    <section
      ref={sectionRef}
      id="handoff"
      className="bg-ink-950 relative flex h-screen flex-col justify-center overflow-hidden"
      aria-label="The 24-hour handoff"
    >
      {/* Gold progress bar */}
      <div className="bg-line-dark absolute top-0 right-0 left-0 h-[2px]">
        <div data-handoff-progress className="bg-sunrise-amber h-full origin-left scale-x-0" />
      </div>

      <Container className="relative">
        <Eyebrow>How it works</Eyebrow>
        <h2 className="font-display mt-4 max-w-3xl text-4xl font-bold tracking-[-0.02em] md:text-5xl">
          Your day ends. <em className="accent-serif">Ours</em> continues.
        </h2>

        {/* Meridian line with travelling dot */}
        <div className="bg-line-dark relative mt-10 h-px" aria-hidden="true">
          <div className="meridian-line absolute inset-0" />
          <div
            data-handoff-dot
            className="bg-sunrise-amber absolute top-1/2 size-3 -translate-x-1/2 -translate-y-1/2 rounded-full shadow-[0_0_16px_rgba(255,181,71,0.9)]"
            style={{ left: '0%' }}
          />
        </div>
        <div
          className="mt-3 flex justify-between font-mono text-xs tracking-[0.2em] text-mist-400 uppercase"
          aria-hidden="true"
        >
          <span data-city-austin className="flex items-center gap-2">
            <span className="bg-aurora-teal inline-block size-2 rounded-full" /> Austin
          </span>
          <span data-city-india className="flex items-center gap-2 opacity-25">
            <span className="bg-sunrise-amber inline-block size-2 rounded-full" /> India
          </span>
        </div>

        {/* Panels */}
        <div className="relative mt-10 h-[320px] md:h-[280px]">
          {PANELS.map((panel, i) => (
            <div
              key={panel.time}
              data-handoff-panel
              className={cn('absolute inset-0', i !== 0 && 'opacity-0')}
            >
              <p className="text-aurora-teal font-mono text-xs tracking-[0.25em] uppercase">
                {panel.time}
              </p>
              <h3 className="font-display mt-3 text-3xl font-semibold md:text-4xl">
                {panel.title}
              </h3>
              <p className="mt-3 max-w-[62ch] text-lg leading-relaxed text-mist-400">
                {panel.body}
              </p>
              {i === 1 && (
                <div className="mt-8 flex gap-10 md:gap-16">
                  <Counter to={12} suffix="" label="candidates screened" />
                  <Counter to={8} suffix="h" label="of focused work overnight" />
                </div>
              )}
            </div>
          ))}
        </div>
        <p className="mt-6 text-sm text-mist-400">
          Illustration — your real numbers depend on your scope.
        </p>
      </Container>
    </section>
  )
}
