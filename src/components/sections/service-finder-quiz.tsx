'use client'

import { ArrowLeft, ArrowRight, Check } from '@phosphor-icons/react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import Link from 'next/link'
import * as React from 'react'
import { Button } from '@/components/ui/button'
import { Container, Section } from '@/components/ui/layout'
import { Eyebrow, Heading, Lead } from '@/components/ui/typography'
import { DUR_BASE, EASE_OUT_EXPO } from '@/lib/motion'
import { cn } from '@/lib/utils'

/**
 * ServiceFinderQuiz — three questions, one recommendation.
 * Maps a pain to the right service (in the required service order).
 */

interface Question {
  prompt: string
  options: { label: string; hint: string; service: string }[]
}

const QUESTIONS: Question[] = [
  {
    prompt: 'What hurts most right now?',
    options: [
      {
        label: 'Our website',
        hint: 'Slow, outdated, or embarrassing',
        service: 'website-development',
      },
      {
        label: 'Hiring',
        hint: 'Too slow, too expensive, too inconsistent',
        service: 'recruitment-process-outsourcing',
      },
      {
        label: 'My calendar',
        hint: 'Buried in admin, inbox, and follow-ups',
        service: 'virtual-assistance',
      },
      {
        label: 'Our books',
        hint: 'Messy, late, or a black box',
        service: 'accounting-outsourcing',
      },
      {
        label: 'Legal workload',
        hint: 'Contracts and discovery piling up',
        service: 'legal-process-outsourcing',
      },
    ],
  },
  {
    prompt: 'How do you want to work?',
    options: [
      {
        label: 'A dedicated person',
        hint: 'Full-time or part-time, on my hours',
        service: 'virtual-assistance',
      },
      {
        label: 'A project team',
        hint: 'Defined scope, defined timeline',
        service: 'website-development',
      },
      {
        label: 'An ongoing function',
        hint: 'Recruiting, books, or legal — handled',
        service: 'recruitment-process-outsourcing',
      },
      {
        label: 'Scale up and down',
        hint: 'Flex with demand, no fixed headcount',
        service: 'accounting-outsourcing',
      },
    ],
  },
  {
    prompt: 'What does success look like in 90 days?',
    options: [
      {
        label: 'A website that sells',
        hint: 'Launched, fast, and converting',
        service: 'website-development',
      },
      {
        label: 'A pipeline of hires',
        hint: 'Roles filled with vetted people',
        service: 'recruitment-process-outsourcing',
      },
      {
        label: 'Hours back weekly',
        hint: 'Admin off my plate for good',
        service: 'virtual-assistance',
      },
      {
        label: 'Clean, current books',
        hint: 'Numbers I can trust',
        service: 'accounting-outsourcing',
      },
      {
        label: 'Legal caught up',
        hint: 'Contracts reviewed, discovery done',
        service: 'legal-process-outsourcing',
      },
    ],
  },
]

const SERVICE_META: Record<string, { name: string; blurb: string }> = {
  'website-development': {
    name: 'Website Development',
    blurb:
      'A website that works as hard as you do — designed, built, and shipped by a dedicated team.',
  },
  'recruitment-process-outsourcing': {
    name: 'Recruitment Process Outsourcing',
    blurb: 'A dedicated recruiting engine: sourcing, screening, and shortlists on your timeline.',
  },
  'virtual-assistance': {
    name: 'Virtual Assistance',
    blurb: 'A dedicated assistant on your hours — inbox, calendar, and operations handled.',
  },
  'accounting-outsourcing': {
    name: 'Accounting Outsourcing',
    blurb: 'Clean books and current numbers, handled by professionals who live in the details.',
  },
  'legal-process-outsourcing': {
    name: 'Legal Process Outsourcing',
    blurb: 'Contract review, discovery support, and legal admin — precise and confidential.',
  },
}

export function ServiceFinderQuiz() {
  const [step, setStep] = React.useState(0)
  const [votes, setVotes] = React.useState<string[]>([])
  const reduceMotion = useReducedMotion()

  const done = step >= QUESTIONS.length
  const winner = React.useMemo(() => {
    if (!done) return null
    const counts = new Map<string, number>()
    for (const v of votes) counts.set(v, (counts.get(v) ?? 0) + 1)
    let best: string | null = null
    let bestCount = -1
    for (const [service, count] of counts) {
      if (count > bestCount) {
        best = service
        bestCount = count
      }
    }
    return best
  }, [done, votes])

  const choose = (service: string) => {
    setVotes((v) => [...v, service])
    setStep((s) => s + 1)
  }

  const restart = () => {
    setStep(0)
    setVotes([])
  }

  const question = QUESTIONS[step]

  return (
    <Section tone="raised">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <div>
            <Eyebrow>Not sure where to start?</Eyebrow>
            <Heading as="h2" className="mt-6">
              Three questions. <span className="accent">One answer.</span>
            </Heading>
            <Lead className="mt-6">
              Tell us what hurts. We&rsquo;ll point you at the service that fixes it — and if none
              of them do, we&rsquo;ll say so.
            </Lead>
          </div>

          <div className="border-line bg-ink min-h-[420px] rounded-[var(--radius-card)] border p-6 md:p-10">
            <AnimatePresence mode="wait" initial={false}>
              {!done && question ? (
                <motion.div
                  key={step}
                  initial={reduceMotion ? { opacity: 0 } : { opacity: 0, x: 32 }}
                  animate={reduceMotion ? { opacity: 1 } : { opacity: 1, x: 0 }}
                  exit={reduceMotion ? { opacity: 0 } : { opacity: 0, x: -32 }}
                  transition={{ duration: DUR_BASE, ease: EASE_OUT_EXPO }}
                >
                  <div className="flex items-center justify-between gap-4">
                    <p className="text-sage text-xs tracking-[0.22em] uppercase">
                      Question {step + 1} of {QUESTIONS.length}
                    </p>
                    <div aria-hidden="true" className="flex gap-1.5">
                      {QUESTIONS.map((_, i) => (
                        <span
                          key={i}
                          className={cn(
                            'h-1 w-8 rounded-full transition-colors',
                            i <= step ? 'bg-lime' : 'bg-line',
                          )}
                        />
                      ))}
                    </div>
                  </div>
                  <h3 className="font-display text-cream mt-6 text-3xl tracking-[-0.02em]">
                    {question.prompt}
                  </h3>
                  <div className="mt-6 grid gap-3">
                    {question.options.map((option) => (
                      <button
                        key={option.label}
                        type="button"
                        onClick={() => choose(option.service)}
                        className="group border-line hover:border-lime hover:bg-ink-2 flex cursor-pointer items-center justify-between gap-4 rounded-2xl border px-5 py-4 text-left transition-colors duration-200"
                      >
                        <span>
                          <span className="text-cream block font-medium">{option.label}</span>
                          <span className="text-fog block text-sm">{option.hint}</span>
                        </span>
                        <ArrowRight
                          aria-hidden="true"
                          className="group-hover:text-lime text-fog size-5 shrink-0 transition-transform duration-150 group-hover:translate-x-1"
                        />
                      </button>
                    ))}
                  </div>
                  {step > 0 && (
                    <button
                      type="button"
                      onClick={() => {
                        setVotes((v) => v.slice(0, -1))
                        setStep((s) => s - 1)
                      }}
                      className="hover:text-cream text-fog mt-6 inline-flex cursor-pointer items-center gap-2 text-sm transition-colors"
                    >
                      <ArrowLeft aria-hidden="true" className="size-4" /> Back
                    </button>
                  )}
                </motion.div>
              ) : (
                <motion.div
                  key="result"
                  initial={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.96 }}
                  animate={reduceMotion ? { opacity: 1 } : { opacity: 1, scale: 1 }}
                  transition={{ duration: DUR_BASE, ease: EASE_OUT_EXPO }}
                  className="text-center"
                >
                  <span className="bg-lime text-ink mx-auto flex size-14 items-center justify-center rounded-full">
                    <Check aria-hidden="true" weight="bold" className="size-6" />
                  </span>
                  <p className="text-fog mt-6 text-xs tracking-[0.25em] uppercase">Your match</p>
                  <h3 className="font-display text-cream mt-3 text-4xl tracking-[-0.02em]">
                    {winner ? SERVICE_META[winner]?.name : 'A conversation'}
                  </h3>
                  <p className="text-fog mx-auto mt-3 max-w-md leading-relaxed">
                    {winner
                      ? SERVICE_META[winner]?.blurb
                      : 'Tell us what hurts — we\u2019ll figure it out together.'}
                  </p>
                  <div className={cn('mt-8 flex flex-wrap items-center justify-center gap-4')}>
                    <Button asChild>
                      <Link href={winner ? `/services/${winner}` : '/services'}>
                        Explore {winner ? SERVICE_META[winner]?.name : 'services'}
                      </Link>
                    </Button>
                    <Button variant="secondary" onClick={restart}>
                      Retake
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </Container>
    </Section>
  )
}
