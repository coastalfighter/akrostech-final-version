'use client'

import { Moon, Sun, SunHorizon } from '@phosphor-icons/react'
import {
  motion,
  useMotionTemplate,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from 'framer-motion'
import * as React from 'react'
import { useMounted } from '@/components/motion/use-mounted'
import { Container } from '@/components/ui/layout'
import { SectionHeader } from '@/components/ui/typography'
import { cn } from '@/lib/utils'

/**
 * The 24-hour handoff — a pinned, scroll-scrubbed sequence.
 *
 * The section is three screens tall with a sticky stage. Scrolling moves a
 * sun along the arc (dusk → night → dawn), shifts the sky colour, and lights
 * each moment in turn. Under reduced motion (or before hydration) it is a
 * plain section with all three moments visible.
 */

const MOMENTS = [
  {
    icon: SunHorizon,
    time: '6:00 PM',
    place: 'Austin',
    title: 'You log off.',
    body: 'The brief, the priorities and the open threads hand off to a team that is just starting its day.',
  },
  {
    icon: Moon,
    time: 'Overnight',
    place: 'India',
    title: 'We get it done.',
    body: 'Candidates screened. Invoices reconciled. Pages shipped. The support inbox cleared — before your alarm.',
  },
  {
    icon: Sun,
    time: '8:00 AM',
    place: 'Austin',
    title: 'You wake up ahead.',
    body: 'A morning brief waits in Slack: what shipped, what needs you, what is next. No catching up.',
  },
]

// The arc the sun travels: a quadratic curve in a 1200×300 box.
const P0 = { x: 60, y: 280 }
const P1 = { x: 600, y: -160 }
const P2 = { x: 1140, y: 280 }
const ARC_PATH = `M ${P0.x} ${P0.y} Q ${P1.x} ${P1.y} ${P2.x} ${P2.y}`

function pointOnArc(t: number) {
  const u = 1 - t
  return {
    x: u * u * P0.x + 2 * u * t * P1.x + t * t * P2.x,
    y: u * u * P0.y + 2 * u * t * P1.y + t * t * P2.y,
  }
}

function Moment({
  moment,
  index,
  progress,
  animated,
}: {
  moment: (typeof MOMENTS)[number]
  index: number
  progress: MotionValue<number>
  animated: boolean
}) {
  const center = index / 2
  const opacity = useTransform(
    progress,
    [center - 0.35, center - 0.12, center + 0.12, center + 0.35],
    [0.25, 1, 1, index === 2 ? 1 : 0.25],
  )
  const y = useTransform(progress, [center - 0.3, center], [30, 0])
  const Icon = moment.icon
  return (
    <motion.li style={animated ? { opacity, y } : undefined}>
      <span className="bg-lime text-ink flex size-14 items-center justify-center rounded-full">
        <Icon aria-hidden="true" weight="fill" className="size-6" />
      </span>
      <p className="mt-8 flex items-baseline gap-3">
        <span className="tnum font-display text-4xl tracking-[-0.02em] md:text-5xl">
          {moment.time}
        </span>
        <span className="text-sage text-xs tracking-[0.2em] uppercase">{moment.place}</span>
      </p>
      <h3 className="font-display mt-4 text-2xl italic">{moment.title}</h3>
      <p className="text-cream/75 mt-3 max-w-[38ch] leading-relaxed">{moment.body}</p>
    </motion.li>
  )
}

export function Handoff() {
  const mounted = useMounted()
  const reduceMotion = useReducedMotion()
  const animated = mounted && !reduceMotion
  const ref = React.useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 26, mass: 0.4 })

  // The arc SVG stretches to the container, so the sun is an HTML dot placed
  // by percentage — it stays round at every width.
  const sunLeft = useTransform(progress, (t) => `${(pointOnArc(t).x / 1200) * 100}%`)
  const sunTop = useTransform(progress, (t) => `${(pointOnArc(t).y / 300) * 100}%`)
  const trail = useTransform(progress, [0, 1], [0, 1])
  // Dusk → night → dawn
  const sky = useTransform(progress, [0, 0.5, 1], ['#16382d', '#0b1612', '#1f4c3d'])
  const background = useMotionTemplate`radial-gradient(120% 90% at 50% 100%, ${sky}, #0a0b0a)`

  return (
    <section
      ref={ref}
      aria-label="The 24-hour handoff"
      className={cn('bg-forest-deep relative', animated && 'h-[300svh]')}
    >
      <motion.div
        style={animated ? { background } : undefined}
        className={cn(
          'overflow-hidden',
          animated
            ? 'sticky top-0 flex min-h-[100svh] flex-col justify-center py-20'
            : 'py-24 md:py-32',
        )}
      >
        <div aria-hidden="true" className="grain absolute inset-0" />
        <Container className="relative">
          <SectionHeader
            eyebrow="The 24-hour handoff"
            index="02"
            title={
              <>
                Your day ends. <span className="accent">Ours begins.</span>
              </>
            }
            lead="Real-time overlap during your working day, plus a follow-the-sun shift that hands finished work back by morning."
          />

          <div className="relative mt-12">
            <svg
              viewBox="0 0 1200 300"
              preserveAspectRatio="none"
              aria-hidden="true"
              className="absolute inset-x-0 -top-6 hidden h-44 w-full overflow-visible md:block"
            >
              <path
                d={ARC_PATH}
                fill="none"
                stroke="var(--color-sage)"
                strokeOpacity="0.35"
                strokeDasharray="4 10"
                strokeWidth="2"
                vectorEffect="non-scaling-stroke"
              />
              {animated && (
                <>
                  <motion.path
                    d={ARC_PATH}
                    fill="none"
                    stroke="var(--color-lime)"
                    strokeWidth="2.5"
                    vectorEffect="non-scaling-stroke"
                    style={{ pathLength: trail }}
                  />
                </>
              )}
            </svg>
            {animated && (
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 -top-6 hidden h-44 md:block"
              >
                <motion.span
                  className="bg-lime absolute size-7 -translate-x-1/2 -translate-y-1/2 rounded-full shadow-[0_0_0_14px_rgba(200,241,105,0.15),0_0_60px_rgba(200,241,105,0.6)]"
                  style={{ left: sunLeft, top: sunTop }}
                />
              </div>
            )}
            <ol className="relative grid gap-10 md:grid-cols-3 md:gap-10 md:pt-36">
              {MOMENTS.map((m, i) => (
                <Moment
                  key={m.title}
                  moment={m}
                  index={i}
                  progress={progress}
                  animated={animated}
                />
              ))}
            </ol>
          </div>
          <p className="text-cream/60 mt-10 text-sm">
            Illustration — what ships overnight depends on your scope.
          </p>
        </Container>
      </motion.div>
    </section>
  )
}
