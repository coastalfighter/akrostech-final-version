'use client'

import { useConsent } from './consent-manager'

/** Footer link that re-opens the consent banner. */
export function CookieSettingsLink() {
  const { resetConsent } = useConsent()
  return (
    <button
      type="button"
      onClick={resetConsent}
      className="text-fog hover:text-lime cursor-pointer text-sm transition-colors duration-200"
    >
      Cookie settings
    </button>
  )
}
