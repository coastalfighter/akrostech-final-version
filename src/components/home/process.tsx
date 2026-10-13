'use client'

import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from 'framer-motion'
import Link from 'next/link'
import * as React from 'react'
import { useMounted } from '@/components/motion/use-mounted'
import { Button } from '@/components/ui/button'
import { Container, Section } from '@/components/ui/layout'
import { SectionHeader } from '@/components/ui/typography'

export const STEPS = [
  {
    title: 'Discover',
    body: 'A 30-minute call maps what you need and what “done” looks like. You get a written scope and a fixed quote.',
  },
  {
    title: 'Match',
    body: 'We shortlist vetted professionals against your tools and working style. You interview the finalists and choose.',
  },
  {
    title: 'Onboard',
    body: 'Your team learns your systems in week one, with daily check-ins until the rhythm is set.',
  },
  {
    title: 'Scale',
    body: 'Add hours, people or services as you grow — or scale back. Monthly reviews keep it honest.',
  },
]

/**
 * One card in the stack. Each card sticks a little lower than the one
 * before; as later cards slide over it, it sinks back in 3D (scales down,
 * tips away, dims) — a deck being dealt as you scroll.
 */
function StackCard({
  step,
  index,
  progress,
  animated,
}: {
  step: (typeof STEPS)[number]
  index: number
  progress: MotionValue<number>
  animated: boolean
}) {
  // How many cards will land on top of this one.
  const covered = STEPS.length - 1 - index
  const start = index / STEPS.length
  const scale = useTransform(progress, [start, 1], [1, 1 - covered * 0.04])
  const rotateX = useTransform(progress, [start, 1], [0, covered * 4])
  const brightness = useTransform(progress, [start, 1], [1, 1 - covered * 0.15])
  const filter = useTransform(brightness, (b) => `brightness(${b})`)

  return (
    <li className="lg:sticky" style={{ top: `calc(7rem + ${index * 28}px)` }}>
      <motion.div
        style={animated ? { scale, rotateX, filter, transformPerspective: 1400 } : undefined}
        className="border-line bg-ink-3 grid origin-top gap-6 rounded-[var(--radius-card)] border p-8 shadow-[0_-20px_60px_-30px_rgba(0,0,0,0.9)] md:grid-cols-[200px_1fr_1.2fr] md:items-end md:p-12"
      >
        <span
          aria-hidden="true"
          className="text-outline tnum font-display block text-[6.5rem] leading-[0.8] tracking-[-0.05em] md:text-[8rem]"
        >
          {String(index + 1).padStart(2, '0')}
        </span>
        <h3 className="font-display text-4xl tracking-[-0.025em] md:text-5xl">
          <span className="sr-only">{`Step ${index + 1}:`}</span> {step.title}
        </h3>
        <p className="text-fog max-w-[44ch] text-lg leading-relaxed">{step.body}</p>
      </motion.div>
    </li>
  )
}

/** How it works — four steps dealt as a 3D card stack on scroll. */
export function Process() {
  const ref = React.useRef<HTMLOListElement>(null)
  const mounted = useMounted()
  const reduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  const animated = mounted && !reduceMotion

  return (
    <Section tone="raised">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-8">
          <SectionHeader
            eyebrow="How it works"
            index="04"
            title={
              <>
                Hiring, <span className="accent">without the hiring.</span>
              </>
            }
            lead="You interview, you approve, you manage. We handle sourcing, vetting, payroll and backup coverage."
          />
          <Button asChild variant="secondary">
            <Link href="/how-it-works">The full process</Link>
          </Button>
        </div>
        <ol ref={ref} className="mt-16 flex flex-col gap-5 lg:gap-10">
          {STEPS.map((step, i) => (
            <StackCard
              key={step.title}
              step={step}
              index={i}
              progress={scrollYProgress}
              animated={animated}
            />
          ))}
        </ol>
      </Container>
    </Section>
  )
}
