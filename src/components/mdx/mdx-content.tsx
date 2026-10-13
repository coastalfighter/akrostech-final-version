import * as React from 'react'
import { Fragment, jsx, jsxs } from 'react/jsx-runtime'

/**
 * MDXContent — renders Velite-compiled MDX on the SERVER.
 *
 * Velite's s.mdx() emits a function body that builds the content with the
 * jsx runtime. We evaluate it during prerendering (server only), so the
 * browser never runs eval — the CSP needs no 'unsafe-eval'. The MDX source
 * is our own CMS content, authored in this repo.
 */

type MDXComponents = Record<string, React.ComponentType<any>>

const cache = new Map<string, React.ComponentType<{ components?: MDXComponents }>>()

function getMDXComponent(code: string) {
  const cached = cache.get(code)
  if (cached) return cached
  // The compiled body reads the jsx runtime from arguments[0] and returns
  // { default: Component } — evaluate it and take the component.
  const fn = new Function(code) as (runtime: typeof import('react/jsx-runtime')) => {
    default: React.ComponentType<{ components?: MDXComponents }>
  }
  const { default: Component } = fn({ Fragment, jsx, jsxs })
  cache.set(code, Component)
  return Component
}

const components: MDXComponents = {
  // The page hero owns the single h1; drop any h1 inside the MDX body.
  h1: () => null,
  h2: (props) => (
    <h2
      className="font-display text-cream mt-16 text-3xl leading-[1.1] tracking-[-0.025em] md:text-4xl"
      {...props}
    />
  ),
  h3: (props) => (
    <h3 className="font-display text-cream mt-10 text-2xl tracking-[-0.015em]" {...props} />
  ),
  p: (props) => <p className="text-cream/80 mt-5 text-[18px] leading-[1.75]" {...props} />,
  a: (props) => (
    <a
      className="text-lime decoration-lime/40 hover:text-cream font-medium underline underline-offset-4 transition-colors"
      {...props}
    />
  ),
  ul: (props) => (
    <ul
      className="text-cream/80 marker:text-lime mt-5 list-disc space-y-2.5 pl-6 text-[18px]"
      {...props}
    />
  ),
  ol: (props) => (
    <ol
      className="text-cream/80 marker:text-lime mt-5 list-decimal space-y-2.5 pl-6 text-[18px]"
      {...props}
    />
  ),
  li: (props) => <li className="leading-[1.7]" {...props} />,
  blockquote: (props) => (
    <blockquote
      className="border-lime font-display text-cream mt-8 border-l-2 pl-6 text-2xl leading-snug italic"
      {...props}
    />
  ),
  strong: (props) => <strong className="text-cream font-semibold" {...props} />,
  code: (props) => (
    <code className="bg-ink-2 text-lime rounded px-1.5 py-0.5 text-[0.85em]" {...props} />
  ),
  hr: (props) => (
    <hr aria-hidden="true" className="border-line my-12 border-0 border-t" {...props} />
  ),
}

export function MDXContent({ code }: { code: string }) {
  const Component = getMDXComponent(code)
  // Component comes from a persistent registry (one evaluation per unique
  // content), so it is stable across renders — not recreated each time.
  // eslint-disable-next-line react-hooks/static-components
  return <Component components={components} />
}
