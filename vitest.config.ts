import path from 'node:path'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  test: {
    environment: 'node',
    include: ['tests/unit/**/*.test.{ts,tsx}', 'tests/components/**/*.test.{ts,tsx}'],
    setupFiles: ['./tests/setup.ts'],
    // The app validates env at import time (build fails fast on bad config).
    // Unit tests get a minimal hermetic environment instead.
    env: {
      NEXT_PUBLIC_SITE_URL: 'http://localhost:3000',
    },
  },
})
