// @vitest-environment jsdom
import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Checkbox, ConsentCheckbox } from '@/components/ui/checkbox'
import { Field, Input, Textarea } from '@/components/ui/field'
import { expectNoAxeViolations } from '../a11y'

describe('Field', () => {
  it('associates the label with the input', () => {
    render(
      <Field label="Full name">
        <Input />
      </Field>,
    )
    const input = screen.getByLabelText('Full name')
    expect(input.tagName).toBe('INPUT')
  })

  it('marks required fields and wires aria-invalid on error', () => {
    render(
      <Field label="Email" required error="Enter a valid email.">
        <Input type="email" />
      </Field>,
    )
    expect(screen.getByText('*')).toBeInTheDocument()
    expect(screen.getByLabelText(/email/i)).toHaveAttribute('aria-invalid', 'true')
  })

  it('announces errors with role=alert', () => {
    render(
      <Field label="Email" error="Enter a valid email.">
        <Input type="email" />
      </Field>,
    )
    const alert = screen.getByRole('alert')
    expect(alert).toHaveTextContent('Enter a valid email.')
  })

  it('shows hint text when there is no error', () => {
    render(
      <Field label="Name" hint="As it should appear.">
        <Input />
      </Field>,
    )
    expect(screen.getByText('As it should appear.')).toBeInTheDocument()
  })

  it('has no axe violations (valid and error states)', async () => {
    const { container } = render(
      <div>
        <Field label="Name" hint="Hint text">
          <Input />
        </Field>
        <Field label="Email" error="Bad email">
          <Input type="email" />
        </Field>
        <Field label="Details">
          <Textarea />
        </Field>
      </div>,
    )
    await expectNoAxeViolations(container)
  })
})

describe('Checkbox', () => {
  it('toggles on click; keyboard support comes from the native button', () => {
    render(<Checkbox aria-label="Subscribe" />)
    const box = screen.getByRole('checkbox', { name: /subscribe/i })
    expect(box.tagName).toBe('BUTTON')
    expect(box).toHaveAttribute('aria-checked', 'false')
    fireEvent.click(box)
    expect(box).toHaveAttribute('aria-checked', 'true')
    fireEvent.click(box)
    expect(box).toHaveAttribute('aria-checked', 'false')
  })

  it('has no axe violations', async () => {
    const { container } = render(<Checkbox aria-label="Subscribe" />)
    await expectNoAxeViolations(container)
  })
})

describe('ConsentCheckbox', () => {
  it('renders unchecked with consent copy', () => {
    render(<ConsentCheckbox label="I agree to the privacy policy." />)
    const box = screen.getByRole('checkbox', { name: /i agree to the privacy policy/i })
    expect(box).toHaveAttribute('aria-checked', 'false')
  })

  it('has no axe violations', async () => {
    const { container } = render(<ConsentCheckbox label="I agree to the processing of my data." />)
    await expectNoAxeViolations(container)
  })
})
