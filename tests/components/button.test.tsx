// @vitest-environment jsdom
import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Button, IconButton } from '@/components/ui/button'
import { expectNoAxeViolations } from '../a11y'

describe('Button', () => {
  it('renders its label', () => {
    render(<Button>Book a 30-min call</Button>)
    expect(screen.getByRole('button', { name: /book a 30-min call/i })).toBeInTheDocument()
  })

  it('renders all variants and sizes without crashing', () => {
    const { container } = render(
      <>
        <Button variant="primary" size="sm">
          P
        </Button>
        <Button variant="secondary" size="md">
          S
        </Button>
        <Button variant="ghost" size="lg">
          G
        </Button>
      </>,
    )
    expect(container.querySelectorAll('button')).toHaveLength(3)
  })

  it('renders as a child element with asChild', () => {
    render(
      <Button asChild>
        <a href="/book">Book</a>
      </Button>,
    )
    const link = screen.getByRole('link', { name: /book/i })
    expect(link).toHaveAttribute('href', '/book')
    expect(link.className).toContain('bg-akros-indigo')
  })

  it('forwards the disabled state', () => {
    render(<Button disabled>Disabled</Button>)
    expect(screen.getByRole('button', { name: /disabled/i })).toBeDisabled()
  })

  it('has no axe violations (primary)', async () => {
    const { container } = render(<Button>Book a 30-min call</Button>)
    await expectNoAxeViolations(container)
  })

  it('has no axe violations (secondary, ghost)', async () => {
    const { container } = render(
      <div data-surface="light">
        <Button variant="secondary">Explore</Button>
        <Button variant="ghost">Learn more</Button>
      </div>,
    )
    await expectNoAxeViolations(container)
  })
})

describe('IconButton', () => {
  it('requires an accessible name', async () => {
    const { container } = render(<IconButton aria-label="Copy link">X</IconButton>)
    expect(screen.getByRole('button', { name: /copy link/i })).toBeInTheDocument()
    await expectNoAxeViolations(container)
  })

  it('meets the 44px touch target', () => {
    render(<IconButton aria-label="Close">X</IconButton>)
    const button = screen.getByRole('button', { name: /close/i })
    expect(button.className).toContain('min-h-[44px]')
    expect(button.className).toContain('min-w-[44px]')
  })
})
