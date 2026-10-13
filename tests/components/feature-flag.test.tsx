// @vitest-environment jsdom
import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { expectNoAxeViolations } from '../a11y'

describe('FeatureFlag', () => {
  it('renders nothing when the flag is off (default)', async () => {
    const { FeatureFlag } = await import('@/components/ui/feature-flag')
    const { container } = render(
      <FeatureFlag name="testimonials">
        <p>Social proof</p>
      </FeatureFlag>,
    )
    expect(container).toBeEmptyDOMElement()
    expect(screen.queryByText('Social proof')).not.toBeInTheDocument()
  })

  it('isFeatureEnabled reflects the environment', async () => {
    const { isFeatureEnabled } = await import('@/components/ui/feature-flag')
    expect(isFeatureEnabled('testimonials')).toBe(false)
    expect(isFeatureEnabled('stats')).toBe(false)
  })
})
