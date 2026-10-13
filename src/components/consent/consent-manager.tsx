'use client'

import * as React from 'react'

/**
 * Consent state — granular, stored in localStorage, never sent anywhere.
 * Analytics and marketing scripts load only after explicit opt-in.
 */

export interface ConsentState {
  necessary: true
  analytics: boolean
  marketing: boolean
  decidedAt: string
}

const STORAGE_KEY = 'akrostech-consent'

const ConsentContext = React.createContext<{
  consent: ConsentState | null
  setConsent: (c: Omit<ConsentState, 'necessary' | 'decidedAt'>) => void
  resetConsent: () => void
}>({
  consent: null,
  setConsent: () => {},
  resetConsent: () => {},
})

export function useConsent() {
  return React.useContext(ConsentContext)
}

export function ConsentProvider({ children }: { children: React.ReactNode }) {
  const [consent, setConsentState] = React.useState<ConsentState | null>(null)

  // Read localStorage after mount: reading during render would cause a
  // hydration mismatch (SSR has no localStorage), and useSyncExternalStore
  // can't notify this tab of its own writes.
  React.useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (raw) setConsentState(JSON.parse(raw) as ConsentState)
    } catch {
      // Corrupt storage: treat as undecided.
    }
  }, [])

  const setConsent = React.useCallback((c: Omit<ConsentState, 'necessary' | 'decidedAt'>) => {
    const next: ConsentState = {
      necessary: true,
      analytics: c.analytics,
      marketing: c.marketing,
      decidedAt: new Date().toISOString(),
    }
    setConsentState(next)
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
    } catch {
      // Storage unavailable: consent applies to this session only.
    }
  }, [])

  const resetConsent = React.useCallback(() => {
    setConsentState(null)
    try {
      localStorage.removeItem(STORAGE_KEY)
    } catch {
      // ignore
    }
  }, [])

  const value = React.useMemo(
    () => ({ consent, setConsent, resetConsent }),
    [consent, setConsent, resetConsent],
  )
  return <ConsentContext.Provider value={value}>{children}</ConsentContext.Provider>
}
