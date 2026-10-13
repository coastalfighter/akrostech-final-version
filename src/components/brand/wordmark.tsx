import * as React from 'react'
import { cn } from '@/lib/utils'

/** Wordmark — "akrostech" set in the display serif with a lime full stop. */
export function Wordmark({ className }: { className?: string }) {
  return (
    <span className={cn('font-display tracking-[-0.03em] lowercase', className)}>
      akrostech<span className="text-lime">.</span>
    </span>
  )
}
