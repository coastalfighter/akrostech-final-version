// @vitest-environment jsdom
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { ContactForm } from '@/components/forms/contact-form'
import { expectNoAxeViolations } from '../a11y'

describe('ContactForm', () => {
  beforeEach(() => {
    vi.restoreAllMocks()
  })

  it('shows validation errors for empty/invalid input', async () => {
    const user = userEvent.setup()
    render(<ContactForm />)
    await user.click(screen.getByRole('button', { name: /send message/i }))
    expect(await screen.findByText('Please enter your name.')).toBeInTheDocument()
    expect(screen.getByText('Please enter a valid email address.')).toBeInTheDocument()
    expect(screen.getByText(/20\+ characters/)).toBeInTheDocument()
    expect(screen.getByText('Please consent so we can reply.')).toBeInTheDocument()
  })

  it('submits and shows the success state', async () => {
    const user = userEvent.setup()
    vi.spyOn(global, 'fetch').mockResolvedValueOnce(
      new Response(JSON.stringify({ ok: true }), { status: 200 }),
    )
    render(<ContactForm />)
    await user.type(screen.getByPlaceholderText('Jane Smith'), 'Jane Smith')
    await user.type(screen.getByPlaceholderText('jane@company.com'), 'jane@company.com')
    await user.type(
      screen.getByPlaceholderText(/can’t hire fast enough/),
      'We need help with hiring, about 40 hours a week of sourcing work.',
    )
    await user.click(screen.getByRole('checkbox'))
    await user.click(screen.getByRole('button', { name: /send message/i }))

    expect(await screen.findByText('Message received')).toBeInTheDocument()
    expect(vi.mocked(fetch)).toHaveBeenCalledOnce()
    const [, init] = vi.mocked(fetch).mock.calls[0]!
    const body = JSON.parse((init?.body as string) ?? '{}')
    expect(body.name).toBe('Jane Smith')
    expect(body.turnstileToken).toBe('')
  })

  it('shows the server error message on failure', async () => {
    const user = userEvent.setup()
    vi.spyOn(global, 'fetch').mockResolvedValueOnce(
      new Response(JSON.stringify({ error: 'Too many messages.' }), { status: 429 }),
    )
    render(<ContactForm />)
    await user.type(screen.getByPlaceholderText('Jane Smith'), 'Jane Smith')
    await user.type(screen.getByPlaceholderText('jane@company.com'), 'jane@company.com')
    await user.type(
      screen.getByPlaceholderText(/can’t hire fast enough/),
      'We need help with hiring, about 40 hours a week of sourcing work.',
    )
    await user.click(screen.getByRole('checkbox'))
    await user.click(screen.getByRole('button', { name: /send message/i }))
    expect(await screen.findByText('Too many messages.')).toBeInTheDocument()
  })

  it('has no axe violations', async () => {
    const { container } = render(<ContactForm />)
    await expectNoAxeViolations(container)
  })
})
