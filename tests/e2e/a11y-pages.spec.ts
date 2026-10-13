import AxeBuilder from '@axe-core/playwright'
import { expect, test } from '@playwright/test'

/**
 * Full-page axe scans of key pages in a real browser (real layout engine, so
 * color contrast IS checked here). Runs in CI.
 */
const PAGES = ['/', '/services', '/services/website-development', '/contact', '/insights']

for (const path of PAGES) {
  test(`${path} has no axe violations`, async ({ page }) => {
    // Reduced motion: scan the settled page, not frames of an entrance animation.
    await page.emulateMedia({ reducedMotion: 'reduce' })
    await page.goto(path)
    await expect(page.getByRole('heading', { level: 1 }).first()).toBeVisible()

    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22a', 'wcag22aa'])
      .analyze()

    expect(results.violations).toEqual([])
  })
}
