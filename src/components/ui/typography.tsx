'use client'

import { motion, useReducedMotion } from 'framer-motion'
import * as React from 'react'
import { DUR_BASE, EASE_OUT_EXPO, STAGGER, fadeOnly, wordChild, wordReveal } from '@/lib/motion'
import { cn, stripNativeDragHandlers } from '@/lib/utils'

/* ——— Eyebrow: small mono uppercase label ——— */

function Eyebrow({ className, children, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn(
        'text-aurora-teal font-mono text-xs font-medium tracking-[0.25em] uppercase',
        className,
      )}
      {...props}
    >
      {children}
    </p>
  )
}

/* ——— Heading: word-mask reveal, once in view ——— */

type HeadingLevel = 'h1' | 'h2' | 'h3' | 'h4'

const headingSizes: Record<HeadingLevel, string> = {
  h1: 'display-fluid',
  h2: 'font-display text-4xl md:text-5xl font-bold tracking-[-0.02em] leading-[1.05]',
  h3: 'font-display text-2xl md:text-3xl font-semibold tracking-[-0.01em] leading-[1.1]',
  h4: 'font-display text-xl font-semibold leading-[1.2]',
}

function Heading({
  as: Tag = 'h2',
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement> & { as?: HeadingLevel }) {
  const reduceMotion = useReducedMotion()
  const MotionTag = motion[Tag]

  if (typeof children !== 'string' || reduceMotion) {
    return (
      <MotionTag
        className={cn(headingSizes[Tag], className)}
        variants={fadeOnly}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-80px' }}
        {...stripNativeDragHandlers(props)}
      >
        {children}
      </MotionTag>
    )
  }

  const words = children.split(' ')
  return (
    <MotionTag
      className={cn(headingSizes[Tag], className)}
      // Words are split into masked spans for the reveal; the full string
      // stays the accessible name.
      aria-label={children}
      variants={wordReveal}
      custom={STAGGER}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-80px' }}
      {...stripNativeDragHandlers(props)}
    >
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden pb-[0.08em] align-bottom">
          <motion.span
            className="inline-block will-change-transform"
            variants={wordChild}
            transition={{ duration: DUR_BASE, ease: EASE_OUT_EXPO }}
          >
            {word}
            {i < words.length - 1 ? ' ' : ''}
          </motion.span>
        </span>
      ))}
    </MotionTag>
  )
}

/* ——— Lead: answer-first / intro paragraph, 65–72ch ——— */

function Lead({ className, children, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn(
        'max-w-[68ch] text-lg leading-relaxed text-mist-400 data-[surface=light]:text-slate-600',
        className,
      )}
      {...props}
    >
      {children}
    </p>
  )
}

export { Eyebrow, Heading, Lead }
