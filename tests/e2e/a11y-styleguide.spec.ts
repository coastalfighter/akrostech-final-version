import AxeBuilder from '@axe-core/playwright'
import { expect, test } from '@playwright/test'

/**
 * Full-page axe scan of the design-system styleguide in a real browser
 * (real layout engine, so color-contrast IS checked here).
 * Runs in CI; skipped locally when the browser can't launch.
 */
test('styleguide has no axe violations', async ({ page }) => {
  await page.goto('/styleguide')
  await expect(page.getByRole('heading', { level: 1 }).first()).toBeVisible()

  const results = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22a', 'wcag22aa'])
    .analyze()

  expect(results.violations).toEqual([])
})
