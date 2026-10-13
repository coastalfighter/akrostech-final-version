'use client'

import * as React from 'react'

const noopSubscribe = () => () => {}

/**
 * False on the server and during hydration, true afterwards. Scroll effects
 * only take over once mounted, so server-rendered HTML always shows content
 * in its final, readable state — nothing waits on JavaScript to appear.
 */
export function useMounted(): boolean {
  return React.useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false,
  )
}
