// @vitest-environment jsdom
import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { expectNoAxeViolations } from '../a11y'

// ScrollTrigger pinning needs real layout; in jsdom we verify the DOM
// structure with gsap stubbed out.
vi.mock('gsap', () => ({
  default: {
    registerPlugin: vi.fn(),
    context: vi.fn(() => ({ revert: vi.fn() })),
    utils: { toArray: vi.fn(() => []) },
    timeline: vi.fn(),
  },
}))
vi.mock('gsap/ScrollTrigger', () => ({ ScrollTrigger: vi.fn() }))

describe('Handoff (animated path, gsap stubbed)', () => {
  it('renders the three panels, progress bar, and counters', async () => {
    const { Handoff } = await import('@/components/home/handoff')
    const { container } = render(<Handoff />)
    expect(screen.getByText('You log off.')).toBeInTheDocument()
    expect(screen.getByText('While you sleep, we ship.')).toBeInTheDocument()
    expect(screen.getByText('You wake up to finished work.')).toBeInTheDocument()
    expect(container.querySelector('[data-handoff-progress]')).toBeInTheDocument()
    expect(container.querySelector('[data-handoff-dot]')).toBeInTheDocument()
    expect(container.querySelectorAll('[data-counter]')).toHaveLength(2)
    expect(container.querySelectorAll('[data-handoff-panel]')).toHaveLength(3)
  })

  it('has no axe violations', async () => {
    const { Handoff } = await import('@/components/home/handoff')
    const { container } = render(<Handoff />)
    await expectNoAxeViolations(container)
  })
})
