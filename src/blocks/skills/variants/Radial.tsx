import { Icon, ICONS, itemAttrs, T } from '../../_shared'
import { SKILL_MAX_LEVEL, type SkillsProps } from '../schema'
import { levelText, meterAttrs, SkillGroups } from './Groups'

/**
 * Circular dials. With a level: a progress ring with the value written in the
 * middle, exposed as a meter. Without one: a plain ring around the skill's icon.
 */
export function Radial({ content, ctx }: SkillsProps) {
  return (
    <SkillGroups ctx={ctx} items={content.items}>
      {(entries) => (
        <ul className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-4">
          {entries.map(({ item, index }) => (
            <li key={item.id} {...itemAttrs(ctx, 'items', index)} data-reveal="" className="flex flex-col items-center gap-3 text-center">
              <div className="relative size-28" {...(item.level ? meterAttrs(ctx, item, item.level) : {})}>
                {/* Mirrored in RTL so the ring fills in the reading direction. */}
                <svg viewBox="0 0 100 100" aria-hidden="true" className="size-full rtl:-scale-x-100">
                  <circle cx="50" cy="50" r="44" fill="none" strokeWidth="6" className="stroke-site-border" />
                  {item.level ? (
                    <circle
                      cx="50"
                      cy="50"
                      r="44"
                      fill="none"
                      strokeWidth="6"
                      strokeLinecap="round"
                      pathLength={100}
                      strokeDasharray={`${(item.level / SKILL_MAX_LEVEL) * 100} 100`}
                      transform="rotate(-90 50 50)"
                      className="stroke-site-primary"
                    />
                  ) : null}
                </svg>
                <span className="absolute inset-0 grid place-items-center">
                  {item.level ? (
                    <span aria-hidden="true" className="font-site-heading text-xl font-bold tabular-nums">
                      {levelText(item.level)}
                    </span>
                  ) : (
                    <Icon name={item.icon ?? ''} fallback={ICONS.sparkles} className="text-site-primary size-7" />
                  )}
                </span>
              </div>
              <T ctx={ctx} path={`items.${index}.name`} value={item.name} className="font-medium" placeholder="Skill" />
            </li>
          ))}
        </ul>
      )}
    </SkillGroups>
  )
}
