import { hasIcon, Icon, itemAttrs, T } from '../../_shared'
import type { SkillsProps } from '../schema'
import { SkillGroups } from './Groups'

/** Pill cloud. Levels are not shown here. */
export function Tags({ content, ctx }: SkillsProps) {
  return (
    <SkillGroups ctx={ctx} items={content.items}>
      {(entries) => (
        <ul className="flex flex-wrap gap-2.5 md:gap-3">
          {entries.map(({ item, index }) => (
            <li key={item.id} {...itemAttrs(ctx, 'items', index)} data-reveal="" className="site-tag px-4 py-2 text-[0.9375rem]">
              {item.icon && hasIcon(item.icon) ? <Icon name={item.icon} className="size-4 shrink-0 opacity-70" /> : null}
              <T ctx={ctx} path={`items.${index}.name`} value={item.name} placeholder="Skill" />
            </li>
          ))}
        </ul>
      )}
    </SkillGroups>
  )
}
