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
  h2: (props) => (
    <h2
      className="font-display text-paper-50 mt-12 text-3xl font-bold tracking-[-0.01em]"
      {...props}
    />
  ),
  h3: (props) => (
    <h3 className="font-display text-paper-50 mt-8 text-2xl font-semibold" {...props} />
  ),
  p: (props) => <p className="mt-5 leading-[1.75] text-mist-400" {...props} />,
  a: (props) => (
    <a
      className="text-indigo-glow decoration-indigo-glow/40 hover:text-paper-50 font-medium underline underline-offset-4 transition-colors"
      {...props}
    />
  ),
  ul: (props) => <ul className="mt-5 list-disc space-y-2.5 pl-6 text-mist-400" {...props} />,
  ol: (props) => <ol className="mt-5 list-decimal space-y-2.5 pl-6 text-mist-400" {...props} />,
  li: (props) => <li className="leading-[1.7]" {...props} />,
  blockquote: (props) => (
    <blockquote
      className="border-indigo-glow text-paper-50 mt-6 border-l-2 pl-5 text-lg leading-relaxed italic"
      {...props}
    />
  ),
  strong: (props) => <strong className="text-paper-50 font-semibold" {...props} />,
  code: (props) => (
    <code
      className="bg-ink-800 text-harvest-gold rounded px-1.5 py-0.5 font-mono text-[0.85em]"
      {...props}
    />
  ),
  hr: (props) => <hr aria-hidden="true" className="meridian-line my-10" {...props} />,
}

export function MDXContent({ code }: { code: string }) {
  const Component = getMDXComponent(code)
  // Component comes from a persistent registry (one evaluation per unique
  // content), so it is stable across renders — not recreated each time.
  // eslint-disable-next-line react-hooks/static-components
  return <Component components={components} />
}
