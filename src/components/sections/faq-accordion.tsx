'use client'

import { Plus } from '@phosphor-icons/react'
import * as Accordion from '@radix-ui/react-accordion'
import * as React from 'react'
import { cn } from '@/lib/utils'

/**
 * FAQ accordion system — accessible (Radix), single-expand on pages,
 * multiple-expand where it helps. Items can carry `id` anchors for
 * deep-linking from search results.
 */

export interface FaqItem {
  question: string
  answer: React.ReactNode
  id?: string
}

export function FaqAccordion({
  items,
  type = 'single',
  className,
}: {
  items: FaqItem[]
  type?: 'single' | 'multiple'
  className?: string
}) {
  return (
    <Accordion.Root
      type={type}
      collapsible={type === 'single' ? true : undefined}
      className={cn('divide-graphite-900/10 border-graphite-900/10 divide-y border-y', className)}
    >
      {items.map((item, i) => {
        const value = item.id ?? `faq-${i}`
        return (
          <Accordion.Item key={value} value={value} id={item.id} className="scroll-mt-32">
            <Accordion.Header>
              <Accordion.Trigger className="group flex w-full cursor-pointer items-center justify-between gap-6 py-5 text-left">
                <span className="font-display text-graphite-900 text-lg font-semibold">
                  {item.question}
                </span>
                <span className="border-graphite-900/15 text-graphite-900 flex size-9 shrink-0 items-center justify-center rounded-full border transition-transform duration-300 group-data-[state=open]:rotate-45">
                  <Plus aria-hidden="true" weight="bold" className="size-4" />
                </span>
              </Accordion.Trigger>
            </Accordion.Header>
            <Accordion.Content className="overflow-hidden data-[state=closed]:animate-[accordion-up_200ms] data-[state=open]:animate-[accordion-down_200ms]">
              <div className="max-w-[68ch] pb-6 leading-relaxed text-slate-600">{item.answer}</div>
            </Accordion.Content>
          </Accordion.Item>
        )
      })}
    </Accordion.Root>
  )
}
