import { itemAttrs, T } from '../../_shared'
import { SKILL_MAX_LEVEL, type SkillsProps } from '../schema'
import { levelText, meterAttrs, SkillGroups } from './Groups'

/**
 * Labelled bars. The value is always written next to the bar ("4/5") and
 * exposed as a meter, never colour alone. A skill without a level shows its
 * name over a hairline instead of an empty bar.
 */
export function Bars({ content, ctx }: SkillsProps) {
  return (
    <SkillGroups ctx={ctx} items={content.items}>
      {(entries) => (
        <ul className="grid gap-x-12 gap-y-6 md:grid-cols-2 lg:gap-x-20">
          {entries.map(({ item, index }) => (
            <li key={item.id} {...itemAttrs(ctx, 'items', index)} data-reveal="">
              <div className="flex items-baseline justify-between gap-4">
                <T ctx={ctx} path={`items.${index}.name`} value={item.name} className="font-medium" placeholder="Skill" />
                {item.level ? (
                  <span aria-hidden="true" className="site-small site-muted tabular-nums">
                    {levelText(item.level)}
                  </span>
                ) : null}
              </div>
              {item.level ? (
                <div {...meterAttrs(ctx, item, item.level)} className="bg-site-border mt-2 h-2 overflow-hidden rounded-full">
                  <div className="bg-site-primary h-full rounded-full" style={{ inlineSize: `${(item.level / SKILL_MAX_LEVEL) * 100}%` }} />
                </div>
              ) : (
                <div aria-hidden="true" className="bg-site-border mt-2 h-px" />
              )}
            </li>
          ))}
        </ul>
      )}
    </SkillGroups>
  )
}
