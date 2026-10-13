// @vitest-environment jsdom
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { ServiceFinderQuiz } from '@/components/sections/service-finder-quiz'
import { expectNoAxeViolations } from '../a11y'

describe('ServiceFinderQuiz', () => {
  it('walks three questions and recommends virtual assistance', async () => {
    const user = userEvent.setup()
    render(<ServiceFinderQuiz />)

    expect(screen.getByText('Question 1 of 3')).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: /my calendar/i }))
    // AnimatePresence waits for the exit animation before mounting the next.
    expect(await screen.findByText('Question 2 of 3')).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: /a dedicated person/i }))
    expect(await screen.findByText('Question 3 of 3')).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: /hours back weekly/i }))

    expect(await screen.findByText('Your match')).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Virtual Assistance' })).toBeInTheDocument()
  })

  it('back button returns to the previous question', async () => {
    const user = userEvent.setup()
    render(<ServiceFinderQuiz />)
    await user.click(screen.getByRole('button', { name: /my calendar/i }))
    expect(await screen.findByText('Question 2 of 3')).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: /back/i }))
    expect(await screen.findByText('Question 1 of 3')).toBeInTheDocument()
  })

  it('has no axe violations', async () => {
    const { container } = render(<ServiceFinderQuiz />)
    await expectNoAxeViolations(container)
  })
})
