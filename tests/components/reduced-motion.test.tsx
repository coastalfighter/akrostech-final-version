// @vitest-environment jsdom
import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { expectNoAxeViolations } from '../a11y'

// Force reduced motion for this file: the static fallbacks must render.
vi.mock('framer-motion', async (importOriginal) => {
  const mod = await importOriginal<typeof import('framer-motion')>()
  return { ...mod, useReducedMotion: () => true }
})

describe('Reduced-motion fallbacks', () => {
  it('LivingGlobe renders the static SVG under reduced motion', async () => {
    const { motionValue } = await import('framer-motion')
    const { LivingGlobe } = await import('@/components/three/living-globe')
    const { container } = render(<LivingGlobe scrollProgress={motionValue(0)} />)
    // Static fallback: SVG present, no CSS arc animation
    expect(container.querySelector('svg')).toBeInTheDocument()
    expect(container.querySelector('.globe-arc-draw')).not.toBeInTheDocument()
    await expectNoAxeViolations(container)
  })

  it('hero renders a static headline under reduced motion', async () => {
    const { Hero } = await import('@/components/home/hero')
    const { container } = render(<Hero />)
    expect(
      screen.getByRole('heading', { level: 1, name: /your team, across every hour/i }),
    ).toBeInTheDocument()
    await expectNoAxeViolations(container)
  })

  it('handoff renders the static panel stack', async () => {
    const { Handoff } = await import('@/components/home/handoff')
    const { container } = render(<Handoff />)
    expect(screen.getByText('You log off.')).toBeInTheDocument()
    expect(screen.getByText('While you sleep, we ship.')).toBeInTheDocument()
    expect(screen.getByText('You wake up to finished work.')).toBeInTheDocument()
    // No pinned-stage data attributes in the static version
    expect(container.querySelector('[data-handoff-panel]')).not.toBeInTheDocument()
    await expectNoAxeViolations(container)
  })
})
