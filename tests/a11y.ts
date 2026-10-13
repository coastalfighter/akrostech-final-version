import type { AxeResults } from 'axe-core'
import { expect } from 'vitest'
import { axe } from 'vitest-axe'

/**
 * Run axe-core on a rendered container.
 *
 * color-contrast is disabled: jsdom has no layout engine, so contrast
 * ratios can't be computed there. Contrast is verified by design (tokens
 * carry documented ratios) and by the Playwright axe spec on the real
 * styleguide page in CI.
 */
export async function runAxe(element: Element): Promise<AxeResults> {
  return axe(element, {
    rules: { 'color-contrast': { enabled: false } },
  })
}

export async function expectNoAxeViolations(element: Element): Promise<void> {
  const results = await runAxe(element)
  expect(results.violations).toEqual([])
}
