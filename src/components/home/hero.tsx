'use client'

import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { ArrowDown } from '@phosphor-icons/react'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import * as React from 'react'
import { GlobeFallback } from '@/components/three/globe-fallback'
import { Button } from '@/components/ui/button'
import { Container } from '@/components/ui/layout'
import { DUR_BASE, EASE_OUT_EXPO, STAGGER, fadeOnly } from '@/lib/motion'
import { HQ_TIME_ZONE, INDIA_TIME_ZONE, formatTime, useNow } from '@/lib/use-now'
import { cn } from '@/lib/utils'

/**
 * Home hero — the Living Globe.
 *
 * 200vh section with a sticky 100vh stage: the globe scales down and the arcs
 * retrace as you scroll, then the section releases. Copy: eyebrow, H1 with a
 * serif-italic "across", dual live clock, status line, and the two CTAs.
 */

/**
 * The globe is client-only (WebGL detection + three.js) — code-split and
 * never server-rendered.
 */
const LivingGlobe = dynamic(
  () => import('@/components/three/living-globe').then((m) => m.LivingGlobe),
  { ssr: false, loading: () => <GlobeFallback animated /> },
)

const HEADLINE_WORDS = ['Your', 'team,', 'across', 'every', 'hour.']

function Headline() {
  const reduceMotion = useReducedMotion()
  if (reduceMotion) {
    return (
      <h1 className="display-fluid">
        Your team, <em className="accent-serif">across</em> every hour.
      </h1>
    )
  }
  return (
    <motion.h1
      className="display-fluid"
      initial="hidden"
      animate="show"
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: STAGGER, delayChildren: 0.2 } },
      }}
      aria-label="Your team, across every hour."
    >
      {HEADLINE_WORDS.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden pb-[0.08em] align-bottom">
          <motion.span
            className={cn(
              'inline-block will-change-transform',
              word === 'across' && 'accent-serif',
            )}
            variants={{
              hidden: { y: '110%' },
              show: { y: '0%', transition: { duration: DUR_BASE, ease: EASE_OUT_EXPO } },
            }}
          >
            {word}
            {i < HEADLINE_WORDS.length - 1 ? ' ' : ''}
          </motion.span>
        </span>
      ))}
    </motion.h1>
  )
}

function DualClock() {
  const now = useNow(1000)
  return (
    <div
      className="tnum flex items-center gap-4 text-xs tracking-[0.18em] text-mist-400 uppercase"
      aria-label={`Current time: ${formatTime(now, HQ_TIME_ZONE)} in Wilmington, ${formatTime(now, INDIA_TIME_ZONE)} in India`}
    >
      <span>
        Wilmington <span className="text-paper-50">{formatTime(now, HQ_TIME_ZONE)}</span>
      </span>
      <span aria-hidden="true" className="bg-line-dark h-3 w-px" />
      <span>
        India <span className="text-paper-50">{formatTime(now, INDIA_TIME_ZONE)}</span>
      </span>
    </div>
  )
}

export function Hero() {
  const sectionRef = React.useRef<HTMLElement>(null)
  const reduceMotion = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  })

  // Copy drifts up and fades as the globe shrinks beneath it.
  const copyOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])
  const copyY = useTransform(scrollYProgress, [0, 1], [0, -60])

  return (
    <section ref={sectionRef} className="relative h-[200vh]" aria-label="Introduction">
      <div className="sticky top-0 flex h-screen flex-col overflow-hidden">
        <LivingGlobe scrollProgress={scrollYProgress} />

        <motion.div
          className="relative z-10 flex h-full flex-col"
          style={reduceMotion ? undefined : { opacity: copyOpacity, y: copyY }}
        >
          <Container className="flex h-full flex-col justify-center">
            <motion.p
              className="text-aurora-teal font-mono text-xs font-medium tracking-[0.25em] uppercase"
              variants={fadeOnly}
              initial="hidden"
              animate="show"
            >
              Offshore staffing, on your hours
            </motion.p>

            <div className="mt-6 max-w-5xl">
              <Headline />
            </div>

            <motion.p
              className="mt-6 max-w-[62ch] text-lg leading-relaxed text-mist-400"
              variants={fadeOnly}
              initial="hidden"
              animate="show"
              transition={{ delay: 0.7 }}
            >
              Akrostech Consulting gives U.S. businesses dedicated professionals in India who work
              your hours. Recruiters, virtual assistants, bookkeepers, paralegals — plus a web
              studio that builds your site.
            </motion.p>

            <motion.div
              className="mt-10 flex flex-wrap items-center gap-4"
              variants={fadeOnly}
              initial="hidden"
              animate="show"
              transition={{ delay: 0.85 }}
            >
              <Button asChild size="lg">
                <Link href="/book">Book a 30-min call</Link>
              </Button>
              <Button asChild size="lg" variant="secondary">
                <Link href="/services">Explore services</Link>
              </Button>
            </motion.div>

            <motion.div
              className="mt-auto flex items-end justify-between pb-10"
              variants={fadeOnly}
              initial="hidden"
              animate="show"
              transition={{ delay: 1 }}
            >
              <p className="flex items-center gap-2 text-sm text-mist-400">
                <span className="relative flex size-2">
                  <span className="bg-aurora-teal absolute inline-flex h-full w-full animate-ping rounded-full opacity-60 motion-reduce:animate-none" />
                  <span className="bg-aurora-teal relative inline-flex size-2 rounded-full" />
                </span>
                Team online now
              </p>
              <DualClock />
            </motion.div>
          </Container>
        </motion.div>

        <motion.a
          href="#handoff"
          className="hover:text-paper-50 absolute bottom-6 left-1/2 z-10 -translate-x-1/2 text-mist-400 transition-colors"
          aria-label="Scroll to see how the 24-hour handoff works"
          variants={fadeOnly}
          initial="hidden"
          animate="show"
          transition={{ delay: 1.2 }}
        >
          <ArrowDown
            aria-hidden="true"
            weight="bold"
            className="size-5 animate-bounce motion-reduce:animate-none"
          />
        </motion.a>
      </div>
    </section>
  )
}
