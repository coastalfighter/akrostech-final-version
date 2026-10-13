// @vitest-environment jsdom
import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Eyebrow, Heading, Lead } from '@/components/ui/typography'
import { expectNoAxeViolations } from '../a11y'

describe('Eyebrow', () => {
  it('renders uppercase mono label text', () => {
    render(<Eyebrow>Website Development</Eyebrow>)
    const el = screen.getByText('Website Development')
    expect(el.tagName).toBe('P')
    expect(el.className).toContain('uppercase')
  })
})

describe('Heading', () => {
  it('renders the requested heading level', () => {
    render(
      <>
        <Heading as="h1">Page title</Heading>
        <Heading as="h2">Section title</Heading>
        <Heading as="h3">Subsection</Heading>
      </>,
    )
    expect(screen.getByRole('heading', { level: 1, name: 'Page title' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 2, name: 'Section title' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 3, name: 'Subsection' })).toBeInTheDocument()
  })

  it('has no axe violations', async () => {
    const { container } = render(
      <>
        <Eyebrow>Test</Eyebrow>
        <Heading as="h2">A revealed headline</Heading>
        <Lead>Lead paragraph text.</Lead>
      </>,
    )
    await expectNoAxeViolations(container)
  })
})

describe('Lead', () => {
  it('constrains line length', () => {
    render(<Lead>Some intro text.</Lead>)
    expect(screen.getByText('Some intro text.').className).toContain('max-w-[68ch]')
  })
})
