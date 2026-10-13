// @vitest-environment jsdom
import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Container, Rule, Section } from '@/components/ui/layout'
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
    expect(el?.className).toContain('px-5')
    expect(el?.className).toContain('md:px-10')
  })
})

describe('Section', () => {
  it('renders each tone with data-tone and its background', () => {
    const { container } = render(
      <>
        <Section tone="ink">ink</Section>
        <Section tone="raised">raised</Section>
        <Section tone="forest">forest</Section>
      </>,
    )
    const [ink, raised, forest] = Array.from(container.querySelectorAll('section'))
    expect(ink).toHaveAttribute('data-tone', 'ink')
    expect(ink?.className).toContain('bg-ink')
    expect(raised?.className).toContain('bg-ink-2')
    expect(forest?.className).toContain('bg-forest-deep')
  })

  it('defaults to the ink tone and default padding', () => {
    const { container } = render(<Section>content</Section>)
    const section = container.querySelector('section')
    expect(section).toHaveAttribute('data-tone', 'ink')
    expect(section?.className).toContain('py-24')
  })

  it('has no axe violations', async () => {
    const { container } = render(
      <>
        <Section tone="ink">
          <p>Ink section text</p>
        </Section>
        <Section tone="forest">
          <p>Forest section text</p>
        </Section>
      </>,
    )
    await expectNoAxeViolations(container)
  })
})

describe('Rule', () => {
  it('is decorative and hidden from assistive tech', () => {
    const { container } = render(<Rule />)
    expect(container.querySelector('hr')).toHaveAttribute('aria-hidden', 'true')
  })
})
