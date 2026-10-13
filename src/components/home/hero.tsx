'use client'

import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion'
import Link from 'next/link'
import * as React from 'react'
import { HeroGlobe } from '@/components/three/hero-globe'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { LiveClock } from './live-clock'

/**
 * Home hero — a 3D scroll sequence.
 *
 * The section is taller than the screen with a sticky stage inside. As you
 * scroll through it the WebGL globe spins, tilts and grows toward you while
 * the copy tips back in perspective and fades — then the page continues.
 * Under reduced motion it is a normal, static full-height hero.
 */
export function Hero() {
  const reduceMotion = useReducedMotion()
  const ref = React.useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 })

  const copyRotate = useTransform(progress, [0, 0.6], [0, 22])
  const copyY = useTransform(progress, [0, 0.6], [0, -120])
  const copyOpacity = useTransform(progress, [0, 0.45, 0.6], [1, 0.6, 0])
  const globeScale = useTransform(progress, [0, 0.7], [1, 1.25])
  const globeX = useTransform(progress, [0, 0.7], ['0%', '-18%'])
  const veil = useTransform(progress, [0.55, 0.9], [0, 1])

  const animated = !reduceMotion

  return (
    <section
      ref={ref}
      aria-label="Introduction"
      className={cn('bg-forest-deep relative', animated && 'lg:h-[170svh]')}
    >
      {/* Pinned 3D sequence on large screens; phones scroll it normally. */}
      <div className="isolate flex min-h-[100svh] flex-col overflow-hidden pt-28 pb-10 md:pt-32 lg:sticky lg:top-0">
        <div
          aria-hidden="true"
          className="grid-lines absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_at_70%_45%,black,transparent_75%)] opacity-50"
        />
        <div aria-hidden="true" className="grain absolute inset-0 -z-10" />

        <div className="mx-auto grid w-full max-w-[1440px] flex-1 items-center gap-6 px-5 md:px-10 lg:grid-cols-[1.05fr_1fr] lg:gap-10">
          {/* Copy */}
          <motion.div
            style={
              animated
                ? {
                    rotateX: copyRotate,
                    y: copyY,
                    opacity: copyOpacity,
                    transformPerspective: 1200,
                  }
                : undefined
            }
            className="relative z-10 origin-bottom"
          >
            <p className="intro text-sage flex flex-wrap items-center gap-x-4 gap-y-2 text-xs tracking-[0.22em] uppercase">
              <span className="inline-flex items-center gap-3">
                <span aria-hidden="true" className="bg-lime size-1.5 rounded-full" />
                Offshore staffing &amp; web studio
              </span>
              <span>Wilmington, DE · Teams in India</span>
            </p>
            <h1 className="intro intro-1 font-display mt-8 text-[3.4rem] leading-[0.92] tracking-[-0.04em] md:text-[6.5rem] xl:text-[8rem]">
              Your team, <span className="accent">on your</span> clock.
            </h1>
            <p className="intro intro-2 text-cream/85 mt-8 max-w-[46ch] text-lg leading-relaxed md:text-xl">
              Dedicated recruiters, assistants, bookkeepers and paralegals in India — plus a web
              studio that ships. They work your U.S. hours, inside your tools, and answer to your
              standards.
            </p>
            <div className="intro intro-3 mt-10 flex flex-wrap gap-3">
              <Button asChild size="lg">
                <Link href="/book">Book a 30-min call</Link>
              </Button>
              <Button asChild size="lg" variant="secondary">
                <Link href="/services">Explore services</Link>
              </Button>
            </div>
            <div className="intro intro-4 mt-10 w-full max-w-[300px]">
              <LiveClock />
            </div>
          </motion.div>

          {/* Globe */}
          <motion.div
            style={animated ? { scale: globeScale, x: globeX } : undefined}
            className="intro intro-2 relative mx-auto aspect-square w-full max-w-[340px] sm:max-w-[460px] lg:max-w-[640px]"
          >
            <HeroGlobe progress={progress} />
          </motion.div>
        </div>

        {animated && (
          <motion.div
            aria-hidden="true"
            style={{ opacity: veil }}
            className="bg-ink pointer-events-none absolute inset-0 -z-[5]"
          />
        )}

        <div
          aria-hidden="true"
          className="intro intro-4 text-cream/50 mx-auto mt-6 flex w-full max-w-[1440px] items-center gap-3 px-5 text-xs tracking-[0.22em] uppercase md:px-10"
        >
          <span className="bg-cream/15 relative h-8 w-px overflow-hidden">
            <span className="bg-lime absolute inset-x-0 top-0 h-1/2 animate-[scroll-cue_1.8s_ease-in-out_infinite]" />
          </span>
          Scroll
        </div>
      </div>
    </section>
  )
}
