// @vitest-environment jsdom
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it } from 'vitest'
import { ConsentBanner } from '@/components/consent/consent-banner'
import { ConsentProvider } from '@/components/consent/consent-manager'
import { expectNoAxeViolations } from '../a11y'

function renderBanner() {
  return render(
    <ConsentProvider>
      <ConsentBanner />
    </ConsentProvider>,
  )
}

describe('ConsentBanner', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('shows until the visitor chooses, then stores the choice', async () => {
    const user = userEvent.setup()
    renderBanner()
    // Provider reads localStorage in an effect; banner appears on mount.
    expect(await screen.findByRole('dialog', { name: 'Cookie consent' })).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Accept all' }))
    expect(screen.queryByRole('dialog', { name: 'Cookie consent' })).not.toBeInTheDocument()
    const stored = JSON.parse(localStorage.getItem('akrostech-consent') ?? '{}')
    expect(stored.analytics).toBe(true)
    expect(stored.marketing).toBe(true)
    expect(stored.necessary).toBe(true)
  })

  it('reject all stores false for optional categories', async () => {
    const user = userEvent.setup()
    renderBanner()
    await screen.findByRole('dialog', { name: 'Cookie consent' })
    await user.click(screen.getByRole('button', { name: 'Reject all' }))
    const stored = JSON.parse(localStorage.getItem('akrostech-consent') ?? '{}')
    expect(stored.analytics).toBe(false)
    expect(stored.marketing).toBe(false)
  })

  it('customize allows granular choices', async () => {
    const user = userEvent.setup()
    renderBanner()
    await screen.findByRole('dialog', { name: 'Cookie consent' })
    await user.click(screen.getByRole('button', { name: 'Customize' }))
    // Analytics defaults on; turn marketing on, analytics off.
    await user.click(screen.getByRole('checkbox', { name: 'Analytics cookies' }))
    await user.click(screen.getByRole('checkbox', { name: 'Marketing cookies' }))
    await user.click(screen.getByRole('button', { name: 'Save choices' }))
    const stored = JSON.parse(localStorage.getItem('akrostech-consent') ?? '{}')
    expect(stored.analytics).toBe(false)
    expect(stored.marketing).toBe(true)
  })

  it('stays hidden when consent was already stored', async () => {
    localStorage.setItem(
      'akrostech-consent',
      JSON.stringify({ necessary: true, analytics: true, marketing: false, decidedAt: 'x' }),
    )
    renderBanner()
    await new Promise((r) => setTimeout(r, 50))
    expect(screen.queryByRole('dialog', { name: 'Cookie consent' })).not.toBeInTheDocument()
  })

  it('has no axe violations', async () => {
    const { container } = renderBanner()
    await screen.findByRole('dialog', { name: 'Cookie consent' })
    await expectNoAxeViolations(container)
  })
})
