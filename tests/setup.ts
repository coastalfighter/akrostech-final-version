import '@testing-library/jest-dom/vitest'
import { cleanup } from '@testing-library/react'
import { afterEach } from 'vitest'
import { vi } from 'vitest'

// RTL's auto-cleanup needs globals; with explicit vitest imports we
// register it ourselves.
afterEach(() => {
  cleanup()
})

/**
 * jsdom lacks several browser APIs our components touch. Mock the minimum.
 * These only run when a DOM exists (component tests); unit tests run in
 * the node environment and skip them.
 * - matchMedia (used by framer-motion's useReducedMotion and our pointer checks)
 * - IntersectionObserver (used by framer-motion's whileInView)
 * - ResizeObserver (used by Radix primitives like Select)
 * - scrollTo (used by some Radix primitives)
 */

if (typeof window !== 'undefined') {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn().mockImplementation((query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  })

  class MockIntersectionObserver implements IntersectionObserver {
    readonly root: Element | null = null
    readonly rootMargin = ''
    readonly thresholds: ReadonlyArray<number> = []
    observe() {}
    unobserve() {}
    disconnect() {}
    takeRecords(): IntersectionObserverEntry[] {
      return []
    }
  }
  vi.stubGlobal('IntersectionObserver', MockIntersectionObserver)

  class MockResizeObserver implements ResizeObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
  }
  vi.stubGlobal('ResizeObserver', MockResizeObserver)

  window.scrollTo = vi.fn() as unknown as typeof window.scrollTo
}
