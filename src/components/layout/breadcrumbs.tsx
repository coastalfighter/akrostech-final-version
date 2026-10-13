import Link from 'next/link'
import * as React from 'react'
import { cn } from '@/lib/utils'

/** Breadcrumbs — Home / Section / Page. Pairs with breadcrumbJsonLd. */

export interface Crumb {
  label: string
  href?: string
}

export function Breadcrumbs({ items, className }: { items: Crumb[]; className?: string }) {
  return (
    <nav aria-label="Breadcrumb" className={cn('text-xs tracking-[0.18em] uppercase', className)}>
      <ol className="text-fog flex flex-wrap items-center gap-2">
        <li>
          <Link href="/" className="hover:text-lime transition-colors">
            Home
          </Link>
        </li>
        {items.map((item) => (
          <React.Fragment key={item.label}>
            <li aria-hidden="true" className="text-line-strong">
              /
            </li>
            <li className="max-w-[40ch] truncate">
              {item.href ? (
                <Link href={item.href} className="hover:text-lime transition-colors">
                  {item.label}
                </Link>
              ) : (
                <span aria-current="page" className="text-cream">
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
