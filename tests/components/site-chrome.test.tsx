// @vitest-environment jsdom
import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { expectNoAxeViolations } from '../a11y'

vi.mock('next/navigation', () => ({ usePathname: () => '/pricing' }))

describe('SiteChrome', () => {
  it('renders the primary nav and marks the current page', async () => {
    const { SiteChrome } = await import('@/components/layout/site-chrome')
    render(<SiteChrome />)
    const nav = screen.getByRole('navigation', { name: 'Primary' })
    expect(nav).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Pricing' })).toHaveAttribute('aria-current', 'page')
    expect(screen.getByRole('link', { name: 'Skip to content' })).toHaveAttribute('href', '#main')
  })

  it('opens the full-screen menu and closes it with Escape', async () => {
    const { SiteChrome } = await import('@/components/layout/site-chrome')
    render(<SiteChrome />)
    fireEvent.click(screen.getAllByRole('button', { name: 'Open menu' })[0]!)
    const dialog = await screen.findByRole('dialog', { name: 'Menu' })
    expect(dialog).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Close menu' })).toHaveFocus()
    expect(screen.getAllByRole('link', { name: 'Book a call' }).length).toBeGreaterThan(0)
    fireEvent.keyDown(document, { key: 'Escape' })
    await vi.waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument())
  })

  it('has no axe violations with the menu open', async () => {
    const { SiteChrome } = await import('@/components/layout/site-chrome')
    const { container } = render(<SiteChrome />)
    fireEvent.click(screen.getAllByRole('button', { name: 'Open menu' })[0]!)
    await screen.findByRole('dialog', { name: 'Menu' })
    await expectNoAxeViolations(container)
  })
})
