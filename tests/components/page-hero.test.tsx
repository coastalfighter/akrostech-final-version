// @vitest-environment jsdom
import { render, screen } from '@testing-library/react'
import Link from 'next/link'
import { describe, expect, it } from 'vitest'
import { PageHero } from '@/components/sections/page-hero'
import { expectNoAxeViolations } from '../a11y'

describe('PageHero', () => {
  it('renders an h1, eyebrow, lead, breadcrumbs, and actions', async () => {
    const { container } = render(
      <PageHero
        eyebrow="Eyebrow"
        title="Test title"
        lead="Test lead."
        word="Decor"
        crumbs={[{ label: 'Section', href: '/section' }, { label: 'Page' }]}
      >
        <Link href="/book">Book</Link>
      </PageHero>,
    )
    expect(screen.getByRole('heading', { level: 1, name: 'Test title' })).toBeInTheDocument()
    expect(screen.getByText('Eyebrow')).toBeInTheDocument()
    expect(screen.getByText('Test lead.')).toBeInTheDocument()
    expect(screen.getByRole('navigation', { name: 'Breadcrumb' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Book' })).toBeInTheDocument()
    // The decorative outline word is hidden from assistive tech.
    expect(screen.getByText('Decor')).toHaveAttribute('aria-hidden', 'true')
    await expectNoAxeViolations(container)
  })

  it('uses a smaller headline scale for long titles', () => {
    render(<PageHero eyebrow="Legal" title="Privacy Policy" size="md" />)
    const h1 = screen.getByRole('heading', { level: 1 })
    expect(h1.className).not.toContain('display-lg')
    expect(h1.className).toContain('md:text-6xl')
  })

  it('marks the current crumb with aria-current', () => {
    render(<PageHero eyebrow="E" title="T" crumbs={[{ label: 'Here' }]} />)
    expect(screen.getByText('Here')).toHaveAttribute('aria-current', 'page')
  })
})
