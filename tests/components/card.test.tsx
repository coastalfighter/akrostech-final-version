// @vitest-environment jsdom
import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Card, FeatureCard, LinkCard } from '@/components/ui/card'
import { expectNoAxeViolations } from '../a11y'

describe('LinkCard', () => {
  it('links the whole card and renders a level-3 title', () => {
    render(
      <LinkCard
        href="/services/website-development"
        eyebrow="Web Studio"
        title="Website Development"
        description="Sites and apps."
      />,
    )
    const link = screen.getByRole('link', { name: /website development/i })
    expect(link).toHaveAttribute('href', '/services/website-development')
    expect(
      screen.getByRole('heading', { level: 3, name: 'Website Development' }),
    ).toBeInTheDocument()
  })

  it('opens external links in a new tab safely', () => {
    render(<LinkCard href="https://example.com" title="External" external />)
    const link = screen.getByRole('link', { name: /external/i })
    expect(link).toHaveAttribute('target', '_blank')
    expect(link).toHaveAttribute('rel', 'noopener noreferrer')
  })

  it('has no axe violations', async () => {
    const { container } = render(
      <LinkCard href="/insights/a" eyebrow="Pricing" title="An article" description="Excerpt." />,
    )
    await expectNoAxeViolations(container)
  })
})

describe('FeatureCard', () => {
  it('renders title, index, and body', () => {
    render(
      <FeatureCard index="01" title="Dedicated, not shared">
        Every professional works for one client.
      </FeatureCard>,
    )
    expect(screen.getByRole('heading', { level: 3, name: /dedicated/i })).toBeInTheDocument()
    expect(screen.getByText('01')).toBeInTheDocument()
    expect(screen.getByText(/one client/)).toBeInTheDocument()
  })

  it('has no axe violations', async () => {
    const { container } = render(
      <FeatureCard title="Measured quality">Reporting and reviews.</FeatureCard>,
    )
    await expectNoAxeViolations(container)
  })
})

describe('Card', () => {
  it('renders a base surface', async () => {
    const { container } = render(
      <Card>
        <p>Custom content</p>
      </Card>,
    )
    expect(screen.getByText('Custom content')).toBeInTheDocument()
    await expectNoAxeViolations(container)
  })
})
