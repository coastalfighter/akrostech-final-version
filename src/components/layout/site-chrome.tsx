'use client'

import * as React from 'react'
import { MobileMenu } from './mobile-menu'
import { SiteHeader } from './site-header'

/**
 * SiteChrome — header + mobile menu with shared open state.
 * Rendered in the root layout above page content.
 */

export function SiteChrome() {
  const [menuOpen, setMenuOpen] = React.useState(false)

  return (
    <>
      <SiteHeader onOpenMenu={() => setMenuOpen(true)} />
      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  )
}
