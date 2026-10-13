import next from 'eslint-config-next'

const config = [
  ...next,
  {
    ignores: [
      '.next/**',
      '.velite/**',
      'node_modules/**',
      'coverage/**',
      'playwright-report/**',
      'test-results/**',
    ],
  },
]

export default config
