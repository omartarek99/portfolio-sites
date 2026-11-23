import { defineConfig, globalIgnores } from 'eslint/config'
import nextVitals from 'eslint-config-next/core-web-vitals'
import nextTs from 'eslint-config-next/typescript'

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    rules: {
      // Sites render plain <img> with our own responsive srcset (src/lib/media-url.ts)
      // so the same markup works on live sites, in the editor iframe and in previews.
      '@next/next/no-img-element': 'off',
      // Sites link between their own pages with plain anchors (host- and basePath-aware).
      '@next/next/no-html-link-for-pages': 'off',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_', caughtErrorsIgnorePattern: '^_' },
      ],
      '@typescript-eslint/no-explicit-any': 'error',
    },
  },
  {
    files: ['tests/**/*.{ts,tsx}', 'scripts/**/*.ts'],
    rules: {
      // `useTestDb()` is a test-setup helper, not a React hook, but it matches the naming rule.
      'react-hooks/rules-of-hooks': 'off',
      'no-console': 'off',
    },
  },
  globalIgnores([
    '.next/**',
    '.next-e2e/**',
    'out/**',
    'build/**',
    'next-env.d.ts',
    '.data/**',
    '.db/**',
    'public/**',
    'playwright-report/**',
    'test-results/**',
    'coverage/**',
  ]),
])

export default eslintConfig
