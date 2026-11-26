'use client'

import { usePathname } from 'next/navigation'

/**
 * Header tabs: each opens its own page. The current page's tab is marked
 * (aria-current, full-strength text). Arabic paths carry an /ar prefix.
 */
export function NavLinks({ links, variant }: { links: { href: string; label: string }[]; variant: 'bar' | 'menu' }) {
  const path = (usePathname() ?? '/').replace(/^\/ar(?=\/|$)/, '') || '/'
  const current = (href: string) => {
    const target = href.replace(/^\/ar(?=\/|$)/, '') || '/'
    return path === target || path.startsWith(`${target}/`)
  }
  return links.map((link) => {
    const active = current(link.href)
    return (
      <li key={link.href}>
        <a
          href={link.href}
          aria-current={active ? 'page' : undefined}
          className={
            variant === 'bar'
              ? `transition hover:text-fg ${active ? 'text-fg' : ''}`
              : `block rounded-lg px-3 py-2.5 text-base font-medium hover:bg-fg/5 ${active ? 'bg-fg/5 text-fg' : 'text-fg/80'}`
          }
        >
          {link.label}
        </a>
      </li>
    )
  })
}
