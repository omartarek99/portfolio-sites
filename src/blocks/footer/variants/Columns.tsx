import { Container, SocialLinks, st, T } from '../../_shared'
import { NavLink } from '../../header/parts'
import { BottomBar, ContactList, footerNav, hasContact, LINK, Name, type FooterProps } from '../parts'
import { t } from '../strings'

const TITLE = 'text-site-text mb-4 text-sm font-semibold'
const LIST = 'flex flex-col gap-2.5'

/**
 * Link columns plus contact details and social accounts. A navigation item
 * with children becomes a titled column; items without children share one.
 */
export function Columns({ ctx, content, section }: FooterProps) {
  const items = footerNav(ctx)
  const loose = items.filter((item) => !item.children?.length)
  const groups = items.filter((item) => item.children?.length)
  return (
    <footer className="border-site-border bg-site-surface border-t">
      <Container section={section} className="py-12 lg:py-16">
        <div className="flex flex-col gap-x-16 gap-y-10 lg:flex-row lg:justify-between">
          <div className="flex max-w-xs flex-col gap-3">
            <Name ctx={ctx} content={content} className="site-h4" />
            <T
              ctx={ctx}
              path="text"
              value={content.text}
              as="p"
              className="site-small site-muted"
              placeholder="A short line about you"
            />
            <SocialLinks ctx={ctx} links={ctx.site.settings.social} className="mt-2" />
          </div>
          <div className="site-small flex flex-wrap gap-x-16 gap-y-10">
            {items.length > 0 ? (
              <nav aria-label={st(ctx.locale, 'footerNavigation')} className="flex flex-wrap gap-x-16 gap-y-10">
                {loose.length > 0 ? (
                  <div className="min-w-28">
                    <h2 className={TITLE}>{t(ctx.locale, 'links')}</h2>
                    <ul className={LIST}>
                      {loose.map((item) => (
                        <li key={item.id}>
                          <NavLink ctx={ctx} item={item} className={LINK} />
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}
                {groups.map((group) => (
                  <div key={group.id} className="min-w-28">
                    <h2 className={TITLE}>
                      <NavLink ctx={ctx} item={group} className="text-site-text no-underline" />
                    </h2>
                    <ul className={LIST}>
                      {group.children?.map((item) => (
                        <li key={item.id}>
                          <NavLink ctx={ctx} item={item} className={LINK} />
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </nav>
            ) : null}
            {hasContact(ctx) ? (
              <div className="max-w-72">
                <h2 className={TITLE}>{t(ctx.locale, 'contact')}</h2>
                <ContactList ctx={ctx} />
              </div>
            ) : null}
          </div>
        </div>
        <BottomBar ctx={ctx} content={content} className="border-site-border mt-12 border-t pt-6" />
      </Container>
    </footer>
  )
}
