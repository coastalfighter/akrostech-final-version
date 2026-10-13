import { expect, test } from '@playwright/test'

/**
 * M4 route checks: every key page renders the approved copy,
 * the header/footer chrome is present, and key interactions work.
 */

const ROUTES: { path: string; h1: RegExp }[] = [
  { path: '/', h1: /your team, across every hour/i },
  { path: '/services', h1: /five services/i },
  { path: '/services/website-development', h1: /best salesperson/i },
  { path: '/services/recruitment-process-outsourcing', h1: /bottleneck/i },
  { path: '/services/virtual-assistance', h1: /could do better/i },
  { path: '/services/accounting-outsourcing', h1: /your cpa, happy/i },
  { path: '/services/legal-process-outsourcing', h1: /paralegal bench/i },
  { path: '/how-it-works', h1: /without the hiring/i },
  { path: '/pricing', h1: /no mystery math/i },
  { path: '/industries', h1: /industry.s reality/i },
  { path: '/about', h1: /the distance is ours/i },
  { path: '/careers', h1: /best work/i },
  { path: '/insights', h1: /signal, not noise/i },
  { path: '/faq', h1: /ask anything/i },
  { path: '/contact', h1: /the line is open/i },
  { path: '/book', h1: /no pitch/i },
  { path: '/insights/cost-hire-virtual-assistant-india', h1: /cost to hire a virtual assistant/i },
  {
    path: '/insights/what-is-recruitment-process-outsourcing',
    h1: /recruitment process outsourcing/i,
  },
]

for (const route of ROUTES) {
  test(`route ${route.path} renders its hero`, async ({ page }) => {
    const response = await page.goto(route.path)
    expect(response?.ok()).toBe(true)
    await expect(page.getByRole('heading', { level: 1 })).toContainText(route.h1)
  })
}

test('site chrome: header nav, footer NAP, and mobile menu', async ({ page }) => {
  await page.goto('/services')

  // Desktop nav
  const nav = page.getByRole('navigation', { name: 'Primary' })
  await expect(nav.getByRole('link', { name: 'Pricing' })).toBeVisible()

  // Footer NAP
  const footer = page.locator('footer')
  await expect(footer).toContainText('Akrostech Consulting LLC')
  await expect(footer).toContainText('1207 Delaware Ave')
  await expect(footer.getByRole('link', { name: /linkedin/i })).toBeVisible()

  // Mobile menu opens and closes
  await page.setViewportSize({ width: 390, height: 844 })
  await page.getByRole('button', { name: 'Open menu' }).click()
  const dialog = page.getByRole('dialog', { name: 'Menu' })
  await expect(dialog).toBeVisible()
  await expect(dialog.getByRole('link', { name: 'Book a call' })).toBeVisible()
  await page.keyboard.press('Escape')
  await expect(dialog).not.toBeVisible()
})

test('FAQ accordion expands and collapses', async ({ page }) => {
  await page.goto('/faq')
  const trigger = page.getByRole('button', { name: /how fast can we start/i })
  await expect(trigger).toHaveAttribute('aria-expanded', 'false')
  await trigger.click()
  await expect(trigger).toHaveAttribute('aria-expanded', 'true')
  await expect(page.getByText(/matching takes days, not months/i)).toBeVisible()
})

test('service finder quiz recommends a service', async ({ page }) => {
  await page.goto('/services')
  await page.locator('#quiz').scrollIntoViewIfNeeded()
  await page.getByRole('button', { name: /my calendar/i }).click()
  await page.getByRole('button', { name: /a dedicated person/i }).click()
  await page.getByRole('button', { name: /hours back weekly/i }).click()
  await expect(page.getByText('Your match')).toBeVisible()
  await expect(page.getByRole('heading', { name: 'Virtual Assistance' })).toBeVisible()
})

test('service pages link to each other in order', async ({ page }) => {
  await page.goto('/services/website-development')
  const related = page.getByRole('link', { name: /recruitment process outsourcing/i })
  await related.scrollIntoViewIfNeeded()
  await expect(related).toBeVisible()
  await related.click()
  await expect(page).toHaveURL(/recruitment-process-outsourcing/)
})

test('contact page has a working form', async ({ page }) => {
  await page.goto('/contact')
  await expect(page.getByPlaceholder('Jane Smith')).toBeVisible()
  await page.getByRole('button', { name: /send message/i }).click()
  await expect(page.getByText('Please enter your name.')).toBeVisible()
})

test('careers page has the application form with CV upload', async ({ page }) => {
  await page.goto('/careers')
  await expect(page.getByText('Send your application')).toBeVisible()
  await expect(page.getByLabel('Upload your CV')).toBeAttached()
})

test('book page shows scheduling (embed or graceful fallback)', async ({ page }) => {
  await page.goto('/book')
  const iframe = page.locator('iframe[title*="Book a 30-minute call"]')
  const fallback = page.getByText('Book directly for now')
  // Calendly URL is unset in test env, so the graceful fallback shows.
  if ((await iframe.count()) > 0) {
    await expect(iframe).toBeVisible()
  } else {
    await expect(fallback).toBeVisible()
  }
})

test('insights index links to CMS articles', async ({ page }) => {
  await page.goto('/insights')
  const link = page.getByRole('link', { name: /cost to hire a virtual assistant/i }).first()
  await expect(link).toBeVisible()
  await link.click()
  await expect(page).toHaveURL(/cost-hire-virtual-assistant-india/)
  await expect(page.getByText('Jennifer', { exact: true }).first()).toBeVisible()
})

test('legacy URLs: spam patterns 410, known paths 301, unknown paths 404', async ({
  request,
}) => {
  const spam = await request.get('/casino-royale-bonus')
  expect(spam.status()).toBe(410)

  const legacy = await request.get('/contact-us', { maxRedirects: 0 })
  expect([301, 308]).toContain(legacy.status())
  expect(legacy.headers()['location']).toContain('/contact')

  const unknown = await request.get('/definitely-not-a-page')
  expect(unknown.status()).toBe(404)
})

test('client runtime hydrates under the Content Security Policy', async ({ page }) => {
  const pageErrors: string[] = []
  page.on('pageerror', (error) => pageErrors.push(error.message))
  await page.goto('/')
  const flightChunks = await page.evaluate(() => (self as any).__next_f?.length ?? 0)
  expect(flightChunks).toBeGreaterThan(0)
  await page.waitForTimeout(1500)
  expect(pageErrors).toEqual([])
})

test('health endpoint responds', async ({ request }) => {
  const response = await request.get('/api/health')
  expect(response.ok()).toBe(true)
  const body = (await response.json()) as { status: string }
  expect(body.status).toBe('ok')
})

test('security headers are present and previews are not indexed', async ({ request }) => {
  const response = await request.get('/')
  const headers = response.headers()
  expect(headers['content-security-policy']).toContain("default-src 'self'")
  expect(headers['strict-transport-security']).toContain('max-age=63072000')
  expect(headers['x-content-type-options']).toBe('nosniff')
  expect(headers['referrer-policy']).toBe('strict-origin-when-cross-origin')
  expect(headers['x-robots-tag']).toContain('noindex')
})
