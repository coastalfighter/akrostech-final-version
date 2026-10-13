// @vitest-environment jsdom
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { FaqAccordion } from '@/components/sections/faq-accordion'
import { expectNoAxeViolations } from '../a11y'

const ITEMS = [
  { question: 'First question?', answer: 'First answer.' },
  { question: 'Second question?', answer: 'Second answer.' },
]

describe('FaqAccordion', () => {
  it('expands one item at a time (single mode)', async () => {
    const user = userEvent.setup()
    render(<FaqAccordion items={ITEMS} />)
    const first = screen.getByRole('button', { name: 'First question?' })
    const second = screen.getByRole('button', { name: 'Second question?' })

    expect(first).toHaveAttribute('aria-expanded', 'false')
    await user.click(first)
    expect(first).toHaveAttribute('aria-expanded', 'true')
    expect(screen.getByText('First answer.')).toBeVisible()

    await user.click(second)
    expect(second).toHaveAttribute('aria-expanded', 'true')
    expect(first).toHaveAttribute('aria-expanded', 'false')
  })

  it('has no axe violations', async () => {
    const { container } = render(<FaqAccordion items={ITEMS} />)
    await expectNoAxeViolations(container)
  })
})
