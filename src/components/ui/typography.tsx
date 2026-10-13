import * as React from 'react'
import { cn } from '@/lib/utils'

/* ——— Eyebrow: small uppercase label with a lime marker ——— */

function Eyebrow({
  className,
  children,
  index,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement> & { index?: string }) {
  return (
    <p
      className={cn(
        'text-sage inline-flex items-center gap-3 text-xs font-medium tracking-[0.22em] uppercase',
        className,
      )}
      {...props}
    >
      {index ? (
        <span className="tnum text-lime">{index}</span>
      ) : (
        <span aria-hidden="true" className="bg-lime size-1.5 rounded-full" />
      )}
      {children}
    </p>
  )
}

/* ——— Heading: display serif at four scales, revealed on scroll ——— */

type HeadingLevel = 'h1' | 'h2' | 'h3' | 'h4'

const headingSizes: Record<HeadingLevel, string> = {
  h1: 'display-lg',
  h2: 'font-display text-[2.5rem] leading-[1.02] tracking-[-0.025em] md:text-6xl',
  h3: 'font-display text-2xl leading-[1.1] tracking-[-0.015em] md:text-3xl',
  h4: 'font-display text-xl leading-[1.2]',
}

function Heading({
  as: Tag = 'h2',
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement> & { as?: HeadingLevel }) {
  return (
    <Tag className={cn(headingSizes[Tag], 'reveal text-balance', className)} {...props}>
      {children}
    </Tag>
  )
}

/* ——— Lead: intro paragraph, comfortable measure ——— */

function Lead({ className, children, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p className={cn('text-fog max-w-[62ch] text-lg leading-relaxed', className)} {...props}>
      {children}
    </p>
  )
}

/* ——— SectionHeader: eyebrow + headline + lead, the standard section opener ——— */

function SectionHeader({
  eyebrow,
  index,
  title,
  lead,
  align = 'left',
  className,
  children,
}: {
  eyebrow: string
  index?: string
  title: React.ReactNode
  lead?: React.ReactNode
  align?: 'left' | 'center'
  className?: string
  children?: React.ReactNode
}) {
  return (
    <div
      className={cn(
        'flex flex-col gap-6',
        align === 'center' && 'items-center text-center',
        className,
      )}
    >
      <Eyebrow index={index}>{eyebrow}</Eyebrow>
      <Heading as="h2" className={cn('max-w-4xl', align === 'center' && 'mx-auto')}>
        {title}
      </Heading>
      {lead && <Lead className={cn(align === 'center' && 'mx-auto')}>{lead}</Lead>}
      {children}
    </div>
  )
}

export { Eyebrow, Heading, Lead, SectionHeader }
