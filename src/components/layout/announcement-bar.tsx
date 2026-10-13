'use client'

import { X } from '@phosphor-icons/react'
import * as React from 'react'
import { Container } from '@/components/ui/layout'

/**
 * AnnouncementBar — dismissible strip above the header.
 * Controlled by NEXT_PUBLIC_ANNOUNCEMENT; hidden when unset.
 */

export function AnnouncementBar() {
  const [dismissed, setDismissed] = React.useState(false)
  const message = process.env.NEXT_PUBLIC_ANNOUNCEMENT

  if (!message || dismissed) return null

  return (
    <div className="bg-akros-indigo relative z-[85] px-4 py-2.5 text-center">
      <Container>
        <p className="pr-8 text-sm font-medium text-white">{message}</p>
      </Container>
      <button
        type="button"
        onClick={() => setDismissed(true)}
        aria-label="Dismiss announcement"
        className="absolute top-1/2 right-4 -translate-y-1/2 cursor-pointer rounded-full p-1 text-white/80 transition-colors hover:text-white"
      >
        <X aria-hidden="true" weight="bold" className="size-4" />
      </button>
    </div>
  )
}
