import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  webServer: {
    command: 'pnpm start',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
  },
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        // Escape hatch for environments where the Playwright browser download
        // is unavailable: PLAYWRIGHT_EXECUTABLE_PATH=/path/to/chrome
        // (plus best-effort flags for proxied sandboxes).
        ...(process.env.PLAYWRIGHT_EXECUTABLE_PATH
          ? {
              launchOptions: {
                executablePath: process.env.PLAYWRIGHT_EXECUTABLE_PATH,
                args: ['--no-proxy-server', '--disable-features=LocalNetworkAccessChecks'],
              },
            }
          : {}),
      },
    },
  ],
})
