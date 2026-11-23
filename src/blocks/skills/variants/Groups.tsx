import type { ReactNode } from 'react'
import { pick, plainText, type Locale } from '@/schemas/fields'
import type { BlockContext } from '../../types'
import { SKILL_MAX_LEVEL, type SkillItem } from '../schema'
import { t } from '../strings'

/** A skill with its index in `content.items` (for editor paths). */
export interface SkillEntry {
  item: SkillItem
  index: number
}

/** Items sharing a group label in this locale, in first-seen order. Ungrouped items have label ''. */
export function groupSkills(items: SkillItem[], locale: Locale): { label: string; entries: SkillEntry[] }[] {
  const groups = new Map<string, SkillEntry[]>()
  items.forEach((item, index) => {
    const label = plainText(pick(item.group, locale))
    const entries = groups.get(label) ?? []
    entries.push({ item, index })
    groups.set(label, entries)
  })
  return [...groups].map(([label, entries]) => ({ label, entries }))
}

/**
 * Renders `children` once per group, under the group's label. With no groups
 * at all it renders the items alone, with no heading.
 *
 * The label is derived from the items (it is each item's `group` field), so it
 * is edited per skill in the side panel rather than inline.
 */
export function SkillGroups({
  ctx,
  items,
  children,
}: {
  ctx: BlockContext
  items: SkillItem[] | undefined
  children: (entries: SkillEntry[]) => ReactNode
}) {
  const groups = groupSkills(items ?? [], ctx.locale)
  if (groups.length === 0) return null
  if (groups.length === 1 && !groups[0].label) return <>{children(groups[0].entries)}</>
  return (
    <div className="flex flex-col gap-10 md:gap-12">
      {groups.map((group) => (
        <div key={group.label}>
          {group.label ? <h3 className="site-h4 mb-4 md:mb-5">{group.label}</h3> : null}
          {children(group.entries)}
        </div>
      ))}
    </div>
  )
}

/** "4/5", the visible value. */
export function levelText(level: number): string {
  return `${level}/${SKILL_MAX_LEVEL}`
}

/** ARIA attributes that expose a level as a meter with a spoken value ("4 of 5"). */
export function meterAttrs(ctx: BlockContext, item: SkillItem, level: number) {
  return {
    role: 'meter',
    'aria-label': plainText(pick(item.name, ctx.locale)),
    'aria-valuemin': 0,
    'aria-valuemax': SKILL_MAX_LEVEL,
    'aria-valuenow': level,
    'aria-valuetext': t(ctx.locale, 'level', { level, max: SKILL_MAX_LEVEL }),
  } as const
}
