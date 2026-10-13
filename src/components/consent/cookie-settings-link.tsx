'use client'

import { useConsent } from './consent-manager'

/** Footer link that re-opens the consent banner. */
export function CookieSettingsLink() {
  const { resetConsent } = useConsent()
  return (
    <button
      type="button"
      onClick={resetConsent}
      className="hover:text-paper-50 cursor-pointer text-sm text-mist-400 transition-colors duration-150"
    >
      Cookie settings
    </button>
  )
}
