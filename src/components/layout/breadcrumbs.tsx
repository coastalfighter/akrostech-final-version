import { CaretRight } from '@phosphor-icons/react/dist/ssr'
import Link from 'next/link'
import * as React from 'react'
import { cn } from '@/lib/utils'

/**
 * Breadcrumbs — Home / Section / Page, with structured data hooks for M6.
 */

export interface Crumb {
  label: string
  href?: string
}

export function Breadcrumbs({ items, className }: { items: Crumb[]; className?: string }) {
  return (
    <nav
      aria-label="Breadcrumb"
      className={cn('font-mono text-xs tracking-[0.18em] uppercase', className)}
    >
      <ol className="flex flex-wrap items-center gap-2 text-mist-400">
        <li>
          <Link href="/" className="hover:text-paper-50 transition-colors">
            Home
          </Link>
        </li>
        {items.map((item) => (
          <React.Fragment key={item.label}>
            <li aria-hidden="true">
              <CaretRight className="size-3" />
            </li>
            <li>
              {item.href ? (
                <Link href={item.href} className="hover:text-paper-50 transition-colors">
                  {item.label}
                </Link>
              ) : (
                <span aria-current="page" className="text-paper-50">
                  {item.label}
                </span>
              )}
            </li>
          </React.Fragment>
        ))}
      </ol>
    </nav>
  )
}
