// @vitest-environment jsdom
import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { CountUp } from '@/components/motion/count-up'
import { Magnetic } from '@/components/motion/magnetic'
import { Parallax } from '@/components/motion/parallax'
import { Reveal3D } from '@/components/motion/reveal-3d'
import { Rings3D } from '@/components/motion/rings-3d'
import { ScrollSkew } from '@/components/motion/scroll-skew'
import { Tilt } from '@/components/motion/tilt'
import { GlobeFallback } from '@/components/three/globe-fallback'
import { expectNoAxeViolations } from '../a11y'

describe('motion wrappers', () => {
  it('render their children unchanged in the DOM', () => {
    render(
      <>
        <Reveal3D>
          <p>reveal</p>
        </Reveal3D>
        <Reveal3D as="li" variant="flip" index={2}>
          flip item
        </Reveal3D>
        <Parallax>
          <p>parallax</p>
        </Parallax>
        <Tilt>
          <p>tilt</p>
        </Tilt>
        <Magnetic>
          <p>magnetic</p>
        </Magnetic>
        <ScrollSkew>
          <p>skew</p>
        </ScrollSkew>
      </>,
    )
    for (const text of ['reveal', 'flip item', 'parallax', 'tilt', 'magnetic', 'skew']) {
      expect(screen.getByText(text)).toBeInTheDocument()
    }
    expect(screen.getByText('flip item').tagName).toBe('LI')
  })

  it('CountUp server-renders the final value (readable without JS)', () => {
    render(<CountUp value={24} suffix="h" />)
    expect(screen.getByText('24h')).toBeInTheDocument()
  })
})

describe('decorative 3D art', () => {
  it('Rings3D is hidden from assistive tech', () => {
    const { container } = render(<Rings3D />)
    expect(container.firstElementChild).toHaveAttribute('aria-hidden', 'true')
  })

  it('GlobeFallback is a labelled image', async () => {
    const { container } = render(<GlobeFallback />)
    expect(screen.getByRole('img', { name: /globe with flight paths/i })).toBeInTheDocument()
    await expectNoAxeViolations(container)
  })
})
