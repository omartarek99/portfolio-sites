/**
 * Pieces every header variant shares: the brand, navigation lists, the
 * language switcher and the menu dialog. Server-safe (no hooks).
 */
import type { ReactNode } from 'react'
import { pick, plainText, type LinkRef, type Locale } from '@/schemas/fields'
import type { NavItem } from '@/schemas/site'
import { localeHref, pageHref, resolveLink } from '@/lib/links'
import { cn } from '@/lib/utils'
import { A, Btn, Icon, Img, SocialLinks, st, T } from '../_shared'
import type { BlockContext, BlockProps, SiteRuntime } from '../types'
import type { HeaderContent } from './schema'
import { MobileMenu } from './variants/MobileMenu.client'

export type HeaderProps = BlockProps<HeaderContent>
type Leaf = Omit<NavItem, 'children'>

/** Sticky is on unless switched off. Variants put this on their root element as `data-sticky`. */
export const stickyAttr = (content: HeaderContent) => (content.sticky === false ? undefined : '')

export function isCurrent(site: SiteRuntime, link: LinkRef): boolean {
  if (link.type !== 'page') return false
  const page = site.pages.find((p) => p.id === link.value) ?? site.pages.find((p) => p.slug === link.value)
  return page !== undefined && page.slug === site.currentSlug
}

/** Navigation items that have a label in this locale (the header's, unless given another list). */
export function navItems(ctx: BlockContext, items: NavItem[] = ctx.site.navigation.header): NavItem[] {
  const named = (item: Leaf) => pick(item.label, ctx.locale).trim() !== ''
  return items
    .filter(named)
    .map((item) => ({ ...item, children: item.children?.filter(named) }))
}

/* ── Brand ───────────────────────────────────────────────────────────────── */

export function Brand({
  ctx,
  content,
  className,
  nameClassName = 'text-lg',
  logoClassName = 'h-9',
}: {
  ctx: BlockContext
  content: HeaderContent
  className?: string
  nameClassName?: string
  logoClassName?: string
}) {
  const owner = plainText(pick(ctx.site.settings.ownerName, ctx.locale))
  const hasName = pick(content.heading, ctx.locale).trim() !== ''
  const hasLogo = Boolean(content.logo?.url)
  const nameClass = cn('font-site-heading leading-tight font-bold', nameClassName)
  return (
    <A
      ctx={ctx}
      link={{ type: 'url', value: pageHref(ctx.site, '') }}
      className={cn('text-site-text inline-flex min-w-0 items-center gap-3 no-underline', className)}
    >
      {hasLogo ? (
        <Img
          ctx={ctx}
          path="logo"
          value={content.logo}
          alt={plainText(pick(content.heading, ctx.locale)) || owner}
          maxWidth={320}
          sizes="160px"
          priority
          className={cn('w-auto max-w-40 shrink-0 object-contain', logoClassName)}
        />
      ) : null}
      {hasName || ctx.mode === 'editor' ? (
        <T ctx={ctx} path="heading" value={content.heading} className={nameClass} placeholder="Your name" />
      ) : !hasLogo && owner ? (
        <span className={nameClass}>{owner}</span>
      ) : null}
    </A>
  )
}

/* ── Links ───────────────────────────────────────────────────────────────── */

/**
 * One navigation link. Like the kit's `<A>`, plus `aria-current="page"`. Nav
 * labels live in `site.navigation`, not in the section, so they are not
 * inline-editable and do not go through `<T>`.
 */
export function NavLink({
  ctx,
  item,
  className,
  before,
  after,
  trigger,
}: {
  ctx: BlockContext
  item: Leaf
  className?: string
  before?: ReactNode
  after?: ReactNode
  /** Render a focusable button when the item has no target (a dropdown parent). */
  trigger?: boolean
}) {
  const body = (
    <>
      {before}
      <span>{plainText(pick(item.label, ctx.locale))}</span>
      {after}
    </>
  )
  const link = resolveLink(ctx.site, item.link)
  if (ctx.mode !== 'editor' && link.booking !== undefined) {
    return (
      <button type="button" data-booking={link.booking} className={className}>
        {body}
      </button>
    )
  }
  if (ctx.mode !== 'editor' && link.href) {
    return (
      <a
        href={link.href}
        target={link.target}
        rel={link.rel}
        download={link.download ? '' : undefined}
        aria-current={isCurrent(ctx.site, item.link) ? 'page' : undefined}
        className={className}
      >
        {body}
      </a>
    )
  }
  if (trigger && ctx.mode !== 'editor') {
    return (
      <button type="button" aria-haspopup="true" className={className}>
        {body}
      </button>
    )
  }
  return <span className={className}>{body}</span>
}

const BAR_ITEM =
  'text-site-muted hover:text-site-text aria-[current=page]:text-site-text decoration-site-primary py-2 text-[0.95rem] font-medium underline-offset-8 transition-colors aria-[current=page]:underline aria-[current=page]:decoration-2'

/**
 * Horizontal navigation with one level of dropdowns.
 * ponytail: dropdowns open on hover and on keyboard focus with CSS only (no
 * Escape-to-dismiss, no aria-expanded). Swap for a client disclosure menu if
 * that is ever needed.
 */
export function NavBar({
  ctx,
  className,
  listClassName = 'gap-x-7 gap-y-1',
  itemClassName = BAR_ITEM,
  before,
}: {
  ctx: BlockContext
  className?: string
  listClassName?: string
  itemClassName?: string
  /** Decoration before every top-level label (the `tabs` file icon). */
  before?: ReactNode
}) {
  const items = navItems(ctx)
  if (items.length === 0) return null
  return (
    <nav aria-label={st(ctx.locale, 'mainNavigation')} className={className}>
      <ul className={cn('flex flex-wrap items-center', listClassName)}>
        {items.map((item) => {
          const children = item.children ?? []
          return (
            <li key={item.id} className="group/nav relative flex">
              <NavLink
                ctx={ctx}
                item={item}
                trigger={children.length > 0}
                before={before}
                after={
                  children.length > 0 ? (
                    <Icon
                      name="chevron-down"
                      className="size-4 shrink-0 transition-transform group-focus-within/nav:rotate-180 group-hover/nav:rotate-180 motion-reduce:transition-none"
                    />
                  ) : null
                }
                className={cn('inline-flex cursor-pointer items-center gap-1.5 no-underline', itemClassName)}
              />
              {children.length > 0 ? (
                <div className="invisible absolute start-0 top-full z-10 pt-2 opacity-0 transition-opacity group-focus-within/nav:visible group-focus-within/nav:opacity-100 group-hover/nav:visible group-hover/nav:opacity-100 motion-reduce:transition-none">
                  <ul className="border-site-border bg-site-bg rounded-site-sm flex min-w-48 flex-col border p-1.5 shadow-lg">
                    {children.map((child) => (
                      <li key={child.id} className="flex">
                        <NavLink
                          ctx={ctx}
                          item={child}
                          className="text-site-text hover:bg-site-surface aria-[current=page]:text-site-primary rounded-site-sm w-full cursor-pointer px-3 py-2 text-start text-[0.95rem] no-underline transition-colors aria-[current=page]:font-semibold"
                        />
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

const TREE_ITEM =
  'text-site-muted hover:text-site-text aria-[current=page]:text-site-text aria-[current=page]:border-site-primary border-s-2 border-transparent py-1.5 ps-4 font-medium transition-colors'

/** Vertical navigation with children nested (sidebar and menu dialog). */
export function NavTree({
  ctx,
  className,
  itemClassName = TREE_ITEM,
}: {
  ctx: BlockContext
  className?: string
  itemClassName?: string
}) {
  const items = navItems(ctx)
  if (items.length === 0) return null
  const link = cn('inline-flex cursor-pointer items-center no-underline', itemClassName)
  return (
    <nav aria-label={st(ctx.locale, 'mainNavigation')} className={className}>
      <ul className="flex flex-col gap-1">
        {items.map((item) => (
          <li key={item.id}>
            <NavLink ctx={ctx} item={item} className={link} />
            {item.children && item.children.length > 0 ? (
              <ul className="mt-1 mb-2 flex flex-col gap-1 ps-5">
                {item.children.map((child) => (
                  <li key={child.id}>
                    <NavLink ctx={ctx} item={child} className={cn(link, 'text-[0.85em] font-normal')} />
                  </li>
                ))}
              </ul>
            ) : null}
          </li>
        ))}
      </ul>
    </nav>
  )
}

/* ── Language switcher ───────────────────────────────────────────────────── */

const LANGUAGE_NAMES: Record<Locale, string> = { en: 'English', ar: 'العربية' }

/** Links to the same page in the site's other language(s). Nothing on one-language sites. */
export function LangSwitch({
  ctx,
  content,
  className,
}: {
  ctx: BlockContext
  content: HeaderContent
  className?: string
}) {
  const others = ctx.site.locales.filter((l) => l !== ctx.locale)
  if (content.showLanguage === false || others.length === 0) return null
  const cls = cn(
    'text-site-muted hover:text-site-text inline-flex min-h-9 items-center gap-1.5 text-sm font-medium no-underline transition-colors',
    className,
  )
  return (
    <>
      {others.map((l) => {
        const body = (
          <>
            <Icon name="globe" className="size-4 shrink-0" />
            <span lang={l}>{LANGUAGE_NAMES[l]}</span>
          </>
        )
        return ctx.mode === 'editor' ? (
          <span key={l} className={cls}>
            {body}
          </span>
        ) : (
          <a key={l} href={localeHref(ctx.site, l)} hrefLang={l} title={st(ctx.locale, 'language')} className={cls}>
            {body}
          </a>
        )
      })}
    </>
  )
}

/* ── Menu (mobile, and the whole navigation of `minimal`) ────────────────── */

export function Menu({
  ctx,
  content,
  className,
  labelled,
}: {
  ctx: BlockContext
  content: HeaderContent
  className?: string
  /** Show the word "Menu" next to the icon. */
  labelled?: boolean
}) {
  return (
    <MobileMenu
      className={className}
      disabled={ctx.mode === 'editor'}
      openLabel={st(ctx.locale, 'openMenu')}
      closeLabel={st(ctx.locale, 'closeMenu')}
      title={st(ctx.locale, 'menu')}
      label={labelled ? st(ctx.locale, 'menu') : undefined}
      icon={<Icon name="menu" className="size-5" />}
      closeIcon={<Icon name="x" className="size-5" />}
    >
      <NavTree
        ctx={ctx}
        itemClassName="text-site-text hover:text-site-primary aria-[current=page]:text-site-primary font-site-heading py-1.5 text-2xl font-bold transition-colors"
      />
      <div className="mt-auto flex flex-col items-start gap-5 pt-8">
        <Btn ctx={ctx} path="cta" value={content.cta} block />
        <LangSwitch ctx={ctx} content={content} className="text-base" />
        <SocialLinks ctx={ctx} links={ctx.site.settings.social} />
      </div>
    </MobileMenu>
  )
}
