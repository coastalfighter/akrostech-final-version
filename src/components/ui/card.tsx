import { ArrowUpRight } from '@phosphor-icons/react/dist/ssr'
import Link from 'next/link'
import * as React from 'react'
import { cn } from '@/lib/utils'

/**
 * Cards — quiet surfaces with a hairline border. Interactive cards lift their
 * border to lime and slide their arrow on hover.
 */

/* ——— Card: base surface ——— */

function Card({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'border-line bg-ink-2 rounded-[var(--radius-card)] border p-7 md:p-9',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}

/* ——— LinkCard: the whole card is one link ——— */

function LinkCard({
  href,
  eyebrow,
  title,
  description,
  className,
  external,
}: {
  href: string
  eyebrow?: string
  title: string
  description?: string
  className?: string
  external?: boolean
}) {
  return (
    <Link
      href={href}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      className={cn(
        'group/card border-line bg-ink-2 hover:border-lime/60 hover:bg-ink-3 flex h-full flex-col rounded-[var(--radius-card)] border p-7 transition-colors duration-300 md:p-9',
        className,
      )}
    >
      <div className="flex items-start justify-between gap-6">
        {eyebrow ? (
          <p className="text-sage text-xs font-medium tracking-[0.22em] uppercase">{eyebrow}</p>
        ) : (
          <span />
        )}
        <span
          aria-hidden="true"
          className="border-line text-cream group-hover/card:border-lime group-hover/card:bg-lime group-hover/card:text-ink flex size-10 shrink-0 items-center justify-center rounded-full border transition-colors duration-300"
        >
          <ArrowUpRight weight="bold" className="size-4" />
        </span>
      </div>
      <h3 className="font-display mt-8 text-2xl leading-[1.15] tracking-[-0.015em] text-balance md:text-[1.75rem]">
        {title}
      </h3>
      {description && <p className="text-fog mt-3 leading-relaxed">{description}</p>}
    </Link>
  )
}

/* ——— FeatureCard: numbered or iconed point ——— */

function FeatureCard({
  icon,
  index,
  title,
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  icon?: React.ReactNode
  index?: string
  title: string
}) {
  return (
    <div
      className={cn(
        'border-line bg-ink-2 flex flex-col rounded-[var(--radius-card)] border p-7 md:p-9',
        className,
      )}
      {...props}
    >
      {icon && <div className="text-lime mb-8 [&_svg]:size-9">{icon}</div>}
      {index && <p className="tnum font-display text-sage mb-8 text-5xl">{index}</p>}
      <h3 className="font-display text-2xl leading-[1.15] tracking-[-0.015em]">{title}</h3>
      <div className="text-fog mt-3 leading-relaxed">{children}</div>
    </div>
  )
}

export { Card, LinkCard, FeatureCard }
