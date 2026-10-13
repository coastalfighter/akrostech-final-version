// @vitest-environment jsdom
import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Container, MeridianDivider, Section } from '@/components/ui/layout'
import { expectNoAxeViolations } from '../a11y'

describe('Container', () => {
  it('caps width at 1440px with responsive gutters', () => {
    const { container } = render(
      <Container>
        <p>content</p>
      </Container>,
    )
    const el = container.firstElementChild
    expect(el?.className).toContain('max-w-[1440px]')
    expect(el?.className).toContain('px-4')
    expect(el?.className).toContain('md:px-6')
  })
})

describe('Section', () => {
  it('renders dark and light surfaces with data-surface', () => {
    const { container } = render(
      <>
        <Section surface="dark">dark</Section>
        <Section surface="light">light</Section>
      </>,
    )
    const sections = container.querySelectorAll('section')
    expect(sections[0]).toHaveAttribute('data-surface', 'dark')
    expect(sections[0]?.className).toContain('bg-ink-950')
    expect(sections[1]).toHaveAttribute('data-surface', 'light')
    expect(sections[1]?.className).toContain('bg-paper-50')
  })

  it('has no axe violations on either surface', async () => {
    const { container } = render(
      <>
        <Section surface="dark">
          <p>Dark section text</p>
        </Section>
        <Section surface="light">
          <p>Light section text</p>
        </Section>
      </>,
    )
    await expectNoAxeViolations(container)
  })
})

describe('MeridianDivider', () => {
  it('renders a decorative divider hidden from assistive tech', () => {
    const { container } = render(<MeridianDivider />)
    const divider = container.querySelector('.meridian-line')
    expect(divider).toBeInTheDocument()
    expect(divider).toHaveAttribute('aria-hidden', 'true')
    expect(screen.queryByRole('separator')).not.toBeInTheDocument()
  })
})
