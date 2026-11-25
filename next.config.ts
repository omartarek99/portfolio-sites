import type { NextConfig } from 'next'
import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts')

const APP_NAME = process.env.APP_NAME ?? 'Vizo'
const ROOT_DOMAIN = process.env.ROOT_DOMAIN ?? 'localhost:3000'

const nextConfig: NextConfig = {
  // Next 16 caching model: data is dynamic by default, `'use cache'` opts in.
  // Public sites are cached and revalidated on publish; the platform
  // (dashboard, editor, admin) opts out with `export const instant = false`.
  cacheComponents: true,
  partialPrefetching: true,

  // End-to-end tests build into their own folder so they never collide with `npm run dev`.
  distDir: process.env.NEXT_DIST_DIR || '.next',

  // Exposed to the browser. APP_NAME is the single rename constant (SPEC §1).
  env: {
    NEXT_PUBLIC_APP_NAME: APP_NAME,
    NEXT_PUBLIC_ROOT_DOMAIN: ROOT_DOMAIN,
  },

  experimental: {
    // Several root layouts (platform, user sites, editor canvas) share one 404.
    globalNotFound: true,
    // The platform renders per request by design (session, locale). Only validate
    // "instant navigation" on segments that opt in with `export const instant = true`.
    instantInsights: { validationLevel: 'manual-warning' },
  },

  // Local data (dev database, uploads, screenshots) is never part of a deployment;
  // tracing into it also collides with MongoDB's lock files while the dev DB runs.
  outputFileTracingExcludes: { '*': ['.data/**', '.db/**', '.next-e2e/**', 'tests/**', 'docs/**'] },

  images: {
    // Widths used by `imageUrl()` in src/lib/media-url.ts — keep in sync.
    deviceSizes: [360, 480, 640, 828, 1080, 1280, 1600, 1920, 2400],
    imageSizes: [64, 96, 128, 192, 256],
    qualities: [60, 75, 85],
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'res.cloudinary.com' },
    ],
  },

  // Baseline security headers on every response (HSTS comes from Vercel).
  // No script-src CSP: Next's inline bootstrap and the theme script would need nonces.
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'Content-Security-Policy', value: "frame-ancestors 'self'; base-uri 'self'; object-src 'none'" },
          { key: 'Cross-Origin-Opener-Policy', value: 'same-origin-allow-popups' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), payment=()' },
        ],
      },
    ]
  },

  turbopack: {
    // Pin the workspace root to this project (a stray lockfile higher up would otherwise confuse it).
    root: __dirname,
    rules: {
      '*.css': {
        loaders: ['@tailwindcss/turbopack'],
        as: '*.css',
      },
    },
  },
}

export default withNextIntl(nextConfig)
