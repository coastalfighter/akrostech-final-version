// @vitest-environment jsdom
import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Hero } from '@/components/home/hero'
import { expectNoAxeViolations } from '../a11y'

describe('Hero', () => {
  it('renders the headline, CTAs, clock, and status', () => {
    render(<Hero />)
    expect(
      screen.getByRole('heading', { level: 1, name: /your team, across every hour/i }),
    ).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /book a 30-min call/i })).toHaveAttribute(
      'href',
      '/book',
    )
    expect(screen.getByRole('link', { name: /explore services/i })).toHaveAttribute(
      'href',
      '/services',
    )
    expect(screen.getByText(/offshore staffing, on your hours/i)).toBeInTheDocument()
    expect(screen.getByText(/team online now/i)).toBeInTheDocument()
    // Dual clock labels
    expect(screen.getByText('Wilmington')).toBeInTheDocument()
    expect(screen.getByText('India')).toBeInTheDocument()
  })

  it('falls back to the SVG globe without WebGL (jsdom)', () => {
    const { container } = render(<Hero />)
    expect(container.querySelector('[aria-label*="Stylized globe"]')).toBeInTheDocument()
  })

  it('has no axe violations', async () => {
    const { container } = render(<Hero />)
    await expectNoAxeViolations(container)
  })
})
