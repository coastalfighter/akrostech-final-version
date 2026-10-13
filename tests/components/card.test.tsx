// @vitest-environment jsdom
import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Card, FeatureCard, ServiceCard } from '@/components/ui/card'
import { expectNoAxeViolations } from '../a11y'

const icon = (
  <span aria-hidden="true" className="size-6">
    ★
  </span>
)

describe('ServiceCard', () => {
  it('links the whole card to the service page', () => {
    render(
      <ServiceCard
        accent="web"
        icon={icon}
        title="Website Development"
        description="Sites and apps."
        href="/services/website-development"
      />,
    )
    const link = screen.getByRole('link', { name: /website development/i })
    expect(link).toHaveAttribute('href', '/services/website-development')
    expect(screen.getByRole('heading', { level: 3 })).toBeInTheDocument()
  })

  it('has no axe violations', async () => {
    const { container } = render(
      <ServiceCard
        accent="rpo"
        icon={icon}
        title="Recruitment Process Outsourcing"
        description="Hiring engine."
        href="/services/recruitment-process-outsourcing"
      />,
    )
    await expectNoAxeViolations(container)
  })
})

describe('FeatureCard', () => {
  it('renders title and body', () => {
    render(
      <FeatureCard icon={icon} title="Dedicated, not shared">
        Every professional works for one client.
      </FeatureCard>,
    )
    expect(screen.getByRole('heading', { level: 3, name: /dedicated/i })).toBeInTheDocument()
    expect(screen.getByText(/one client/)).toBeInTheDocument()
  })

  it('has no axe violations on light surface', async () => {
    const { container } = render(
      <div data-surface="light">
        <FeatureCard icon={icon} title="Measured quality">
          Reporting and reviews.
        </FeatureCard>
      </div>,
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
