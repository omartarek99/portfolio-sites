import type { Metadata } from 'next'
import { Space_Grotesk } from 'next/font/google'
import { APP_NAME } from '@/lib/config'
import './globals.css'

/**
 * 404 for URLs that match no route at all. The app has several root layouts
 * (platform, user sites, editor canvas), so this page brings its own document.
 */
const font = Space_Grotesk({ subsets: ['latin'], variable: '--font-platform', display: 'swap' })

export const metadata: Metadata = {
  title: `Page not found — ${APP_NAME}`,
  robots: { index: false },
}

export default function GlobalNotFound() {
  return (
    <html lang="en" className={font.variable}>
      <body className="platform bg-white text-ink antialiased">
        <main className="mx-auto flex min-h-screen max-w-xl flex-col items-start justify-center gap-6 px-6">
          <p className="text-display-m md:text-display font-medium">
            <span className="label-lime">404</span>
          </p>
          <h1 className="text-h3 font-medium">Page not found</h1>
          <p className="text-body text-ink-muted">The page you are looking for does not exist or has moved.</p>
          <a
            href="/"
            className="rounded-btn bg-ink inline-flex items-center px-[35px] py-5 text-[1.25rem] leading-7 text-white"
          >
            Back to home
          </a>
        </main>
      </body>
    </html>
  )
}
