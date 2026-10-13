// @vitest-environment jsdom
import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Handoff } from '@/components/home/handoff'
import { Hero } from '@/components/home/hero'
import { Process } from '@/components/home/process'
import { Why } from '@/components/home/why'
import { expectNoAxeViolations } from '../a11y'

describe('Home hero', () => {
  it('renders the headline, both CTAs, and the dual clock', async () => {
    const { container } = render(<Hero />)
    expect(
      screen.getByRole('heading', { level: 1, name: /your team, on your clock/i }),
    ).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /book a 30-min call/i })).toHaveAttribute(
      'href',
      '/book',
    )
    expect(screen.getByRole('link', { name: /explore services/i })).toHaveAttribute(
      'href',
      '/services',
    )
    expect(screen.getByText('Wilmington')).toBeInTheDocument()
    expect(screen.getByText('India')).toBeInTheDocument()
    expect(screen.getByText(/team online now/i)).toBeInTheDocument()
    // Without WebGL (jsdom) the static globe stands in for the 3D scene.
    expect(screen.getByRole('img', { name: /globe with flight paths/i })).toBeInTheDocument()
    await expectNoAxeViolations(container)
  })
})

describe('Handoff', () => {
  it('tells the three-moment story', async () => {
    const { container } = render(<Handoff />)
    expect(screen.getByText('You log off.')).toBeInTheDocument()
    expect(screen.getByText('We get it done.')).toBeInTheDocument()
    expect(screen.getByText('You wake up ahead.')).toBeInTheDocument()
    expect(container.querySelectorAll('ol > li')).toHaveLength(3)
    await expectNoAxeViolations(container)
  })
})

describe('Why', () => {
  it('lists six principles and only factual figures', async () => {
    const { container } = render(<Why />)
    expect(container.querySelectorAll('ol > li')).toHaveLength(6)
    expect(screen.getByText('U.S. time zones covered')).toBeInTheDocument()
    // No unconfirmed marketing metrics (those stay behind the stats flag).
    expect(container.textContent).not.toMatch(/%/)
    await expectNoAxeViolations(container)
  })
})

describe('Process', () => {
  it('gives each step an accessible step number', () => {
    render(<Process />)
    expect(screen.getByRole('heading', { level: 3, name: /step 1: discover/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 3, name: /step 4: scale/i })).toBeInTheDocument()
  })
})
