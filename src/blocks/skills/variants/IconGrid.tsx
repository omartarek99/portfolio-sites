import { cn } from '@/lib/utils'
import { Icon, ICONS, itemAttrs, T } from '../../_shared'
import { SKILL_MAX_LEVEL, type SkillsProps } from '../schema'
import { t } from '../strings'
import { SkillGroups } from './Groups'

const STEPS = Array.from({ length: SKILL_MAX_LEVEL }, (_, i) => i + 1)

/** Icon + label cells. A level, when set, shows as filled and hollow dots with a spoken value. */
export function IconGrid({ content, ctx }: SkillsProps) {
  return (
    <SkillGroups ctx={ctx} items={content.items}>
      {(entries) => (
        <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 lg:gap-6">
          {entries.map(({ item, index }) => (
            <li
              key={item.id}
              {...itemAttrs(ctx, 'items', index)}
              data-reveal=""
              className="site-card flex flex-col items-center gap-3 p-5 text-center md:p-6"
            >
              <span className="bg-site-primary/10 text-site-primary rounded-site grid size-12 place-items-center">
                <Icon name={item.icon ?? ''} fallback={ICONS.sparkles} className="size-6" />
              </span>
              <T ctx={ctx} path={`items.${index}.name`} value={item.name} className="font-medium" placeholder="Skill" />
              {item.level ? (
                <span role="img" aria-label={t(ctx.locale, 'level', { level: item.level, max: SKILL_MAX_LEVEL })} className="flex gap-1.5">
                  {STEPS.map((step) => (
                    <span
                      key={step}
                      className={cn('size-2 rounded-full', step <= item.level! ? 'bg-site-primary' : 'border-site-muted border')}
                    />
                  ))}
                </span>
              ) : null}
            </li>
          ))}
        </ul>
      )}
    </SkillGroups>
  )
}
