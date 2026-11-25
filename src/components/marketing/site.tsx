import { ArrowUpRight, Mail } from 'lucide-react'
import { getLocale, getTranslations } from 'next-intl/server'
import type { ReactNode } from 'react'
import { siWhatsapp } from 'simple-icons'
import { Logo } from '@/components/brand/Logo'
import { APP_NAME } from '@/lib/config'
import { whatsappUrl } from '@/lib/links'
import { cn } from '@/lib/utils'
import { HeaderMenu } from './HeaderMenu'
import { LangLink } from './LangLink'
import { ThemeToggle } from './ThemeToggle'

/** Vizo's WhatsApp — the one contact channel of the public site. */
export const WHATSAPP = '97477418054'
export const WHATSAPP_DISPLAY = '+974 7741 8054'
export const EMAIL = 'omartarekesmat@gmail.com'

export async function waHref(): Promise<string> {
  const t = await getTranslations('marketing')
  return whatsappUrl(WHATSAPP, t('whatsappMessage'))
}

/** Internal link that keeps the visitor in their language (`/ar/...` for Arabic). */
export function localePath(locale: string, path: string): string {
  if (locale !== 'ar') return path
  return path === '/' ? '/ar' : path.startsWith('/#') ? `/ar${path.slice(1)}` : `/ar${path}`
}

export const btn = {
  primary:
    'inline-flex items-center justify-center gap-2 rounded-lg bg-fg px-5 py-2.5 text-sm font-medium text-vz-bg transition hover:bg-fg/85',
  ghost:
    'inline-flex items-center justify-center gap-2 rounded-lg border border-fg/15 px-5 py-2.5 text-sm font-medium text-fg transition hover:bg-fg/5',
}

export function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={cn('size-4 fill-current', className)}>
      <path d={siWhatsapp.path} />
    </svg>
  )
}

export function SectionHead({ eyebrow, title, subtitle }: { eyebrow: string; title: string; subtitle?: string }) {
  return (
    <div className="mx-auto mb-12 max-w-2xl text-center">
      <p className="text-vz-accent text-sm font-medium">{eyebrow}</p>
      <h2 className="mt-3 text-3xl font-semibold tracking-tight text-balance md:text-4xl">{title}</h2>
      {subtitle ? <p className="mt-4 text-pretty text-fg/60">{subtitle}</p> : null}
    </div>
  )
}

export function Wrap({ id, className, children }: { id?: string; className?: string; children: ReactNode }) {
  return (
    <section id={id} className={cn('mx-auto w-full max-w-6xl scroll-mt-24 px-5 py-16 md:py-24', className)}>
      {children}
    </section>
  )
}

export async function SiteHeader() {
  const [t, locale] = await Promise.all([getTranslations('nav'), getLocale()])
  const links = [
    { href: localePath(locale, '/#work'), label: t('links.services') },
    { href: localePath(locale, '/showcase'), label: t('links.work') },
    { href: localePath(locale, '/#about'), label: t('links.about') },
    { href: localePath(locale, '/#faq'), label: t('links.faq') },
  ]

  return (
    <header className="bg-vz-bg/70 sticky top-0 z-40 border-b border-fg/5 backdrop-blur-lg">
      <nav className="mx-auto flex h-16 max-w-6xl items-center gap-6 px-5">
        <a href={localePath(locale, '/')} className="rounded-md">
          <Logo className="text-fg" size={30} />
        </a>
        <ul className="hidden items-center gap-6 text-sm text-fg/70 md:flex">
          {links.map((link) => (
            <li key={link.href}>
              <a href={link.href} className="transition hover:text-fg">
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="ms-auto flex shrink-0 items-center gap-2">
          <HeaderMenu label={t('options')}>
            <ul className="mb-2 border-b border-fg/10 pb-2 md:hidden">
              {links.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="block rounded-lg px-3 py-2 text-fg/80 hover:bg-fg/5">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
            <div className="space-y-2 p-2">
              <div className="flex min-h-11 items-center justify-between gap-4">
                <span>{t('languageLabel')}</span>
                <LangLink to={locale === 'ar' ? 'en' : 'ar'} label={t('language')} />
              </div>
              <div className="flex min-h-11 items-center justify-between gap-4">
                <span>{t('theme.label')}</span>
                <ThemeToggle labels={{ light: t('theme.light'), dark: t('theme.dark') }} />
              </div>
            </div>
          </HeaderMenu>
        </div>
      </nav>
    </header>
  )
}

export async function SiteFooter() {
  const [t, locale, wa] = await Promise.all([getTranslations('nav'), getLocale(), waHref()])
  return (
    <footer className="border-t border-fg/5">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-5 py-12 md:flex-row md:items-start md:justify-between">
        <div className="max-w-xs">
          <Logo className="text-fg" size={28} />
          <p className="mt-3 text-sm text-fg/65">{t('footer.tagline')}</p>
        </div>
        <div className="flex flex-col gap-3 text-sm" dir="ltr">
          <a
            href={wa}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-fg/80 transition hover:text-fg"
          >
            <WhatsAppIcon className="text-[#25D366]" />
            {WHATSAPP_DISPLAY}
            <ArrowUpRight className="size-3.5 opacity-60" aria-hidden="true" />
          </a>
          <a href={`mailto:${EMAIL}`} className="inline-flex items-center gap-2 text-fg/80 transition hover:text-fg">
            <Mail className="text-vz-accent size-4" aria-hidden="true" />
            {EMAIL}
          </a>
        </div>
      </div>
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 border-t border-fg/5 px-5 py-6 text-xs text-fg/60">
        <p>
          © {APP_NAME}. {t('footer.rights')}
        </p>
        <div className="flex gap-5">
          <a href={localePath(locale, '/legal/privacy')} className="hover:text-fg/70">
            {t('footer.privacy')}
          </a>
          <a href={localePath(locale, '/legal/terms')} className="hover:text-fg/70">
            {t('footer.terms')}
          </a>
        </div>
      </div>
    </footer>
  )
}

/** Floating WhatsApp button on every public page. */
export async function WhatsAppFab() {
  const [t, wa] = await Promise.all([getTranslations('nav'), waHref()])
  return (
    <a
      href={wa}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t('whatsapp')}
      className="fixed end-5 bottom-5 z-50 grid size-14 place-items-center rounded-full bg-[#25D366] text-white shadow-lg shadow-black/40 transition hover:scale-105"
    >
      <WhatsAppIcon className="size-7" />
    </a>
  )
}
