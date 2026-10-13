// @vitest-environment jsdom
import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { MDXContent } from '@/components/mdx/mdx-content'
import { expectNoAxeViolations } from '../a11y'

/**
 * MDXContent renders Velite-compiled MDX. We test with a minimal hand-built
 * compiled snippet in the same shape (arguments[0] runtime + {default} return).
 */
const COMPILED = [
  'const{Fragment:e,jsx:n,jsxs:r}=arguments[0];',
  'function _createMdxContent(t){',
  'return r(e,{children:[n("h2",{children:"Hello"}),n("p",{children:"World"})]});',
  '}',
  'return{default:function(e={}){return _createMdxContent(e)}};',
].join('')

describe('MDXContent', () => {
  it('renders headings and paragraphs from compiled MDX', () => {
    const { container } = render(<MDXContent code={COMPILED} />)
    expect(screen.getByRole('heading', { level: 2, name: 'Hello' })).toBeInTheDocument()
    expect(container.querySelector('p')).toHaveTextContent('World')
  })

  it('has no axe violations', async () => {
    const { container } = render(<MDXContent code={COMPILED} />)
    await expectNoAxeViolations(container)
  })
})
