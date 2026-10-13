// @vitest-environment jsdom
import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { expectNoAxeViolations } from '../a11y'

describe('Select', () => {
  function renderSelect() {
    return render(
      <Select>
        <SelectTrigger aria-label="Service needed">
          <SelectValue placeholder="Choose a service" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="web">Website Development</SelectItem>
          <SelectItem value="va">Virtual Assistance</SelectItem>
        </SelectContent>
      </Select>,
    )
  }

  it('renders a collapsed trigger with placeholder', () => {
    renderSelect()
    expect(screen.getByRole('combobox', { name: /service needed/i })).toBeInTheDocument()
    expect(screen.getByText('Choose a service')).toBeInTheDocument()
  })

  it('has no axe violations', async () => {
    const { container } = renderSelect()
    await expectNoAxeViolations(container)
  })
})
