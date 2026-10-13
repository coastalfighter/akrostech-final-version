'use client'

import { List, X } from '@phosphor-icons/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import * as React from 'react'
import { AnnouncementBar } from './announcement-bar'
import { Button, IconButton } from '@/components/ui/button'
import { Container } from '@/components/ui/layout'
import { cn } from '@/lib/utils'

/**
 * Site header — floating, frosted, shrinks on scroll, hides on scroll down
 * and returns on scroll up. Desktop nav + mobile menu trigger.
 */

const NAV = [
  { label: 'Services', href: '/services' },
  { label: 'How it works', href: '/how-it-works' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Industries', href: '/industries' },
  { label: 'About', href: '/about' },
  { label: 'Insights', href: '/insights' },
]

export function SiteHeader({ onOpenMenu }: { onOpenMenu: () => void }) {
  const pathname = usePathname()
  const [scrolled, setScrolled] = React.useState(false)
  const [hidden, setHidden] = React.useState(false)
  const lastY = React.useRef(0)

  React.useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      setScrolled(y > 24)
      // Hide on scroll down, show on scroll up; never hide at the very top.
      if (y > 400 && y > lastY.current + 4) setHidden(true)
      else if (y < lastY.current - 4 || y < 400) setHidden(false)
      lastY.current = y
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-[80] transition-transform duration-300',
        hidden && '-translate-y-full',
      )}
    >
      <AnnouncementBar />
      <Container>
        <div
          className={cn(
            'glass mt-4 flex items-center justify-between rounded-full pr-2 pl-6 transition-all duration-300',
            scrolled ? 'py-2' : 'py-3',
          )}
        >
          <Link
            href="/"
            className="font-display text-paper-50 text-lg font-bold tracking-tight"
            aria-label="Akrostech home"
          >
            Akrostech
            <span aria-hidden="true" className="text-indigo-glow">
              .
            </span>
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
                    'rounded-full px-4 py-2 text-[15px] transition-colors duration-150',
                    active ? 'text-paper-50' : 'hover:text-paper-50 text-mist-400',
                  )}
                >
                  {item.label}
                </Link>
              )
            })}
          </nav>

          <div className="flex items-center gap-2">
            <Button asChild size="sm" className="hidden sm:inline-flex">
              <Link href="/book">Book a call</Link>
            </Button>
            <IconButton
              aria-label="Open menu"
              aria-expanded="false"
              onClick={onOpenMenu}
              className="lg:hidden"
            >
              <List aria-hidden="true" />
            </IconButton>
          </div>
        </div>
      </Container>
    </header>
  )
}

export { NAV }
