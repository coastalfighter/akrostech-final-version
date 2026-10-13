// @vitest-environment jsdom
import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { PageHero, type HeroVariant } from '@/components/sections/page-hero'
import { expectNoAxeViolations } from '../a11y'

const VARIANTS: HeroVariant[] = [
  'prism',
  'dial',
  'sunrise',
  'open-line',
  'bridge',
  'constellation',
  'collage',
  'waveform',
  'default',
]

describe('PageHero', () => {
  it('renders every variant with an h1, eyebrow, and breadcrumbs', async () => {
    for (const variant of VARIANTS) {
      const { container, unmount } = render(
        <PageHero
          eyebrow="Eyebrow"
          title="Test title"
          lead="Test lead."
          variant={variant}
          crumbs={[{ label: 'Section', href: '/section' }, { label: 'Page' }]}
        />,
      )
      expect(screen.getByRole('heading', { level: 1, name: 'Test title' })).toBeInTheDocument()
      expect(screen.getByText('Eyebrow')).toBeInTheDocument()
      expect(screen.getByRole('navigation', { name: 'Breadcrumb' })).toBeInTheDocument()
      await expectNoAxeViolations(container)
      unmount()
    }
  })
})
