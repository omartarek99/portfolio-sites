'use client'

import { usePathname } from 'next/navigation'
import { LOCALE_COOKIE } from '@/i18n/config'

/** Switches the public site's language: remembers the choice, then loads the same page in it. */
export function LangLink({ to, label, className }: { to: 'en' | 'ar'; label: string; className?: string }) {
  const path = usePathname().replace(/^\/ar(?=\/|$)/, '') || '/'
  const href = to === 'ar' ? `/ar${path === '/' ? '' : path}` : path
  return (
    <a
      href={href}
      lang={to}
      className={className}
      onClick={() => {
        document.cookie = `${LOCALE_COOKIE}=${to};path=/;max-age=31536000;samesite=lax`
      }}
    >
      {label}
    </a>
  )
}
