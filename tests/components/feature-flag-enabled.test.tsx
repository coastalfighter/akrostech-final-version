// @vitest-environment jsdom
import { render, screen } from '@testing-library/react'
import { expect, it, vi } from 'vitest'
import { expectNoAxeViolations } from '../a11y'

// Enable the testimonials flag for this file only (vi.mock is per-file).
vi.mock('@/lib/env', async (importOriginal) => {
  const mod = await importOriginal<typeof import('@/lib/env')>()
  return {
    ...mod,
    env: { ...mod.env, NEXT_PUBLIC_FLAG_TESTIMONIALS: true },
  }
})

it('renders children when the flag is enabled', async () => {
  const { FeatureFlag } = await import('@/components/ui/feature-flag')
  const { container } = render(
    <FeatureFlag name="testimonials">
      <p>Social proof</p>
    </FeatureFlag>,
  )
  expect(screen.getByText('Social proof')).toBeInTheDocument()
  await expectNoAxeViolations(container)
})

it('still hides other flags that are off', async () => {
  const { FeatureFlag } = await import('@/components/ui/feature-flag')
  const { container } = render(
    <FeatureFlag name="stats">
      <p>Stats block</p>
    </FeatureFlag>,
  )
  expect(container).toBeEmptyDOMElement()
})
