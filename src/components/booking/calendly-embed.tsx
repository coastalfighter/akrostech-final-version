'use client'

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
      <div className="border-graphite-900/10 rounded-[24px] border bg-white p-8 md:p-10">
        <p className="font-mono text-xs tracking-[0.25em] text-slate-600 uppercase">Scheduling</p>
        <h2 className="font-display text-graphite-900 mt-4 text-2xl font-semibold">
          Book directly for now
        </h2>
        <p className="mt-3 leading-relaxed text-slate-600">
          Our scheduling calendar is being connected. The fastest path is a call or a message — we
          reply within one business day.
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <a
            href="tel:+13322870846"
            className="bg-akros-indigo inline-flex min-h-[48px] items-center justify-center rounded-full px-7 font-semibold text-white transition-colors hover:bg-[#4a4de0]"
          >
            +1 (332) 287-0846
          </a>
          <a
            href="/contact"
            className="border-graphite-900/20 text-graphite-900 hover:border-akros-indigo inline-flex min-h-[48px] items-center justify-center rounded-full border px-7 font-semibold transition-colors"
          >
            Send a message
          </a>
        </div>
      </div>
    )
  }

  return (
    <div className="border-graphite-900/10 overflow-hidden rounded-[24px] border bg-white">
      <iframe
        title="Book a 30-minute call with Akrostech"
        src={`${url}?hide_gdpr_banner=1`}
        className="h-[700px] w-full"
        onError={() => setFailed(true)}
      />
    </div>
  )
}
