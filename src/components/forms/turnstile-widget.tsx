'use client'

import * as React from 'react'
import { env } from '@/lib/env'

/**
 * Cloudflare Turnstile widget. Renders nothing when the site key isn't
 * configured (the API route logs the skip). Calls onToken with the token.
 */

declare global {
  interface Window {
    turnstile?: {
      render: (el: HTMLElement, opts: Record<string, unknown>) => string
      reset: (id: string) => void
    }
  }
}

export function TurnstileWidget({ onToken }: { onToken: (token: string) => void }) {
  const siteKey = env.NEXT_PUBLIC_TURNSTILE_SITE_KEY
  const ref = React.useRef<HTMLDivElement>(null)
  const widgetId = React.useRef<string | null>(null)

  React.useEffect(() => {
    if (!siteKey || !ref.current) return
    let cancelled = false

    const render = () => {
      if (cancelled || !window.turnstile || !ref.current || widgetId.current) return
      widgetId.current = window.turnstile.render(ref.current, {
        sitekey: siteKey,
        callback: onToken,
        'expired-callback': () => {
          widgetId.current = null
          onToken('')
        },
      })
    }

    if (window.turnstile) {
      render()
    } else {
      const script = document.createElement('script')
      script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js'
      script.async = true
      script.defer = true
      script.onload = render
      document.head.appendChild(script)
    }
    return () => {
      cancelled = true
    }
  }, [siteKey, onToken])

  if (!siteKey) return null
  return <div ref={ref} className="mt-4" aria-label="Bot verification" />
}
