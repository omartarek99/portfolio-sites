import { FilterTabs } from '../../_shared'
import { PUBLICATION_TYPES, type Publication, type PublicationsProps } from '../schema'
import { t } from '../strings'
import { Entry } from './Entry'

export function ByYear({ content, ctx }: PublicationsProps) {
  const items = content.items ?? []
  const types = PUBLICATION_TYPES.filter((type) => items.some((item) => item.type === type))
  const categories = types.length > 1 ? types.map((type) => ({ value: type, label: t(ctx.locale, type) })) : []

  // Newest year first; undated items last, under no heading. Indexes stay the content indexes.
  const groups = new Map<number | undefined, { item: Publication; index: number }[]>()
  items.forEach((item, index) => groups.set(item.year, [...(groups.get(item.year) ?? []), { item, index }]))
  const years = [...groups.keys()].sort((a, b) => (b ?? -1) - (a ?? -1))

  return (
    <FilterTabs categories={categories} locale={ctx.locale} listClassName="flex max-w-4xl flex-col gap-12">
      {years.map((year) => {
        const entries = groups.get(year)!
        return (
          // Tagged with every type inside, so a year whose entries are all filtered out hides with them.
          <div key={year ?? 'undated'} data-category={[...new Set(entries.map(({ item }) => item.type ?? ''))].join(',')} className="grid gap-x-8 gap-y-4 md:grid-cols-[7rem_minmax(0,1fr)]">
            {year ? <h3 className="site-h2 text-site-primary tabular-nums md:sticky md:top-24 md:self-start">{year}</h3> : null}
            <ol className="border-site-border border-t pt-6 md:col-start-2">
              {entries.map(({ item, index }) => (
                <Entry key={item.id} ctx={ctx} item={item} index={index} />
              ))}
            </ol>
          </div>
        )
      })}
    </FilterTabs>
  )
}
