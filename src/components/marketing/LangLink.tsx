'use client'

import { usePathname } from 'next/navigation'
import { LOCALE_COOKIE } from '@/i18n/config'
import { Switch } from './Switch'

/** The language switch (Anees's 3D switch): remembers the choice, then loads the same page in the other language. */
export function LangLink({ to, label }: { to: 'en' | 'ar'; label: string }) {
  const path = usePathname().replace(/^\/ar(?=\/|$)/, '') || '/'
  const href = to === 'ar' ? `/ar${path === '/' ? '' : path}` : path
  const current = to === 'ar' ? 'en' : 'ar'
  return (
    <a
      href={href}
      lang={to}
      aria-label={label}
      title={label}
      className="switch-btn"
      onClick={() => {
        document.cookie = `${LOCALE_COOKIE}=${to};path=/;max-age=31536000;samesite=lax`
      }}
    >
      <Switch kind="flat" on={current === 'ar'}>
        {current === 'ar' ? 'ع' : 'EN'}
      </Switch>
    </a>
  )
}
