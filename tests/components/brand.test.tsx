// @vitest-environment jsdom
import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Arcs, Orbit } from '@/components/brand/arcs'
import { Marquee } from '@/components/brand/marquee'
import { RoundCta } from '@/components/brand/round-cta'
import { Wordmark } from '@/components/brand/wordmark'
import { expectNoAxeViolations } from '../a11y'

describe('Marquee', () => {
  it('renders the list twice, announcing only the first copy', async () => {
    const { container } = render(<Marquee label="Services" items={['One', 'Two', 'Three']} />)
    const lists = container.querySelectorAll('ul')
    expect(lists).toHaveLength(2)
    expect(lists[0]).not.toHaveAttribute('aria-hidden')
    expect(lists[1]).toHaveAttribute('aria-hidden', 'true')
    expect(screen.getByRole('list', { name: 'Services' })).toBeInTheDocument()
    await expectNoAxeViolations(container)
  })

  it('scrolls in reverse when asked', () => {
    const { container } = render(<Marquee items={['A']} reverse />)
    expect(container.querySelector('.animate-marquee-reverse')).toBeInTheDocument()
  })
})

describe('RoundCta', () => {
  it('is a single link named by its label, with decorative ring text', async () => {
    const { container } = render(<RoundCta href="/book" label="Book a call" />)
    const link = screen.getByRole('link', { name: 'Book a call' })
    expect(link).toHaveAttribute('href', '/book')
    expect(container.querySelector('svg')).toHaveAttribute('aria-hidden', 'true')
    await expectNoAxeViolations(container)
  })
})

describe('Decorative art', () => {
  it('Arcs and Orbit are hidden from assistive tech', () => {
    const { container } = render(
      <>
        <Arcs bands={4} tone="lime" />
        <Orbit />
      </>,
    )
    const svgs = container.querySelectorAll('svg')
    expect(svgs).toHaveLength(2)
    svgs.forEach((svg) => expect(svg).toHaveAttribute('aria-hidden', 'true'))
    // One path per band
    expect(svgs[0]?.querySelectorAll('path')).toHaveLength(4)
  })
})

describe('Wordmark', () => {
  it('reads as the brand name', () => {
    render(<Wordmark />)
    expect(screen.getByText(/akrostech/)).toBeInTheDocument()
  })
})
