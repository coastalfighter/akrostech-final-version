'use client'

import Link from 'next/link'
import * as React from 'react'
import { env } from '@/lib/env'

/**
 * Calendly embed — renders the inline scheduling widget when
 * NEXT_PUBLIC_CALENDLY_URL is set, otherwise a graceful placeholder
 * with the direct contact paths.
 */

export function CalendlyEmbed() {
  const url = env.NEXT_PUBLIC_CALENDLY_URL
  const [failed, setFailed] = React.useState(false)

  if (!url || failed) {
    return (
      <div className="border-line bg-ink-2 rounded-[var(--radius-card)] border p-8 md:p-10">
        <p className="text-sage text-xs tracking-[0.22em] uppercase">Scheduling</p>
        <h2 className="font-display text-cream mt-6 text-4xl tracking-[-0.025em]">
          Book directly for now
        </h2>
        <p className="text-fog mt-3 leading-relaxed">
          Our scheduling calendar is being connected. The fastest path is a call or a message — we
          reply within one business day.
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <a
            href="tel:+13322870846"
            className="bg-lime text-ink hover:bg-cream inline-flex min-h-[52px] items-center justify-center rounded-full px-7 font-medium transition-colors"
          >
            +1 (332) 287-0846
          </a>
          <Link
            href="/contact"
            className="border-cream/25 text-cream hover:border-cream hover:bg-cream hover:text-ink inline-flex min-h-[52px] items-center justify-center rounded-full border px-7 font-medium transition-colors"
          >
            Send a message
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="border-line bg-ink-2 overflow-hidden rounded-[var(--radius-card)] border">
      <iframe
        title="Book a 30-minute call with Akrostech"
        src={`${url}?hide_gdpr_banner=1`}
        className="h-[700px] w-full"
        onError={() => setFailed(true)}
      />
    </div>
  )
}
