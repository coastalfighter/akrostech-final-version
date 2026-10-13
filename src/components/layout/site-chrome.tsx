'use client'

import { Phone } from '@phosphor-icons/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import * as React from 'react'
import { Wordmark } from '@/components/brand/wordmark'
import { Button } from '@/components/ui/button'
import { siteConfig } from '@/config/site'
import { cn } from '@/lib/utils'
import { MobileMenu } from './mobile-menu'
import { NAV } from './nav'

/**
 * Site chrome.
 *
 * - Desktop (lg+): a fixed vertical rail on the left — wordmark, menu
 *   button, and phone line — plus a floating top bar with the primary nav
 *   and the "Book a call" action.
 * - Mobile: a compact top bar with the wordmark and menu button.
 * The full-screen menu is shared by both.
 */

function MenuButton({
  onClick,
  open,
  className,
}: {
  onClick: () => void
  open: boolean
  className?: string
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Open menu"
      aria-expanded={open}
      aria-haspopup="dialog"
      className={cn(
        'group/menu border-cream/15 hover:border-lime inline-flex size-12 cursor-pointer flex-col items-center justify-center gap-[7px] rounded-full border transition-colors duration-200',
        className,
      )}
    >
      <span className="bg-cream group-hover/menu:bg-lime h-px w-5 transition-all duration-300 group-hover/menu:w-6" />
      <span className="bg-cream group-hover/menu:bg-lime h-px w-5 transition-all duration-300 group-hover/menu:w-3" />
    </button>
  )
}

export function SiteChrome() {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = React.useState(false)
  const [scrolled, setScrolled] = React.useState(false)
  const openMenu = React.useCallback(() => setMenuOpen(true), [])
  const closeMenu = React.useCallback(() => setMenuOpen(false), [])

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <a
        href="#main"
        className="bg-lime text-ink fixed top-3 left-3 z-[100] -translate-y-24 rounded-full px-5 py-3 text-sm font-medium transition-transform focus:translate-y-0"
      >
        Skip to content
      </a>

      {/* Desktop rail */}
      <aside
        aria-label="Site"
        className="border-line bg-ink/85 fixed inset-y-0 left-0 z-[70] hidden w-[88px] flex-col items-center justify-between border-r py-8 backdrop-blur-xl lg:flex"
      >
        <Link
          href="/"
          aria-label="Akrostech home"
          className="rotate-180 text-[1.65rem] leading-none [writing-mode:vertical-rl]"
        >
          <Wordmark />
        </Link>
        <MenuButton onClick={openMenu} open={menuOpen} />
        <a
          href={siteConfig.phoneHref}
          className="text-fog hover:text-lime flex rotate-180 items-center gap-3 text-xs tracking-[0.18em] uppercase transition-colors [writing-mode:vertical-rl]"
        >
          <Phone aria-hidden="true" weight="fill" className="size-3.5 rotate-90" />
          <span className="tnum">{siteConfig.phone}</span>
        </a>
      </aside>

      {/* Top bar */}
      <header
        className={cn(
          'fixed inset-x-0 top-0 z-[60] transition-[background-color,border-color] duration-300 lg:left-[88px]',
          scrolled
            ? 'border-line bg-ink/80 border-b backdrop-blur-xl'
            : 'border-b border-transparent',
        )}
      >
        <div className="flex h-[72px] items-center justify-between gap-6 px-5 md:px-10">
          <Link href="/" aria-label="Akrostech home" className="text-2xl lg:invisible">
            <Wordmark />
          </Link>

          <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
            {NAV.map((item) => {
              const active = pathname === item.href || pathname.startsWith(`${item.href}/`)
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? 'page' : undefined}
                  className={cn(
                    'relative rounded-full px-4 py-2 text-[15px] transition-colors duration-200',
                    active ? 'text-lime' : 'text-cream/80 hover:text-cream',
                  )}
                >
                  {item.label}
                </Link>
              )
            })}
          </nav>

          <div className="flex items-center gap-3">
            <Button asChild size="sm" className="hidden sm:inline-flex">
              <Link href="/book">Book a call</Link>
            </Button>
            <MenuButton onClick={openMenu} open={menuOpen} className="lg:hidden" />
          </div>
        </div>
      </header>

      <MobileMenu open={menuOpen} onClose={closeMenu} />
    </>
  )
}
