import { ArrowUpRight } from 'lucide-react'
import { getTranslations } from 'next-intl/server'
import { btn } from './site'

/**
 * Hand-picked client projects, shown first on the showcase and on the home page,
 * each linking straight to the real site. Add one: an entry here, a 1440×900
 * screenshot in public/showcase/, and its copy under
 * `showcase.featured.<key>` in both marketing.json files.
 */
export const FEATURED: { key: string; url: string; image: string }[] = [
  { key: 'anees', url: 'https://anees-qa.site/', image: '/showcase/anees.jpg' },
  { key: 'datebook', url: 'https://doha-datebook.hanaabotaleb9.chatgpt.site/', image: '/showcase/datebook.jpg' },
]

export async function FeaturedProjects() {
  const t = await getTranslations('marketing')
  return (
    <ul className="grid gap-6">
      {FEATURED.map((project) => (
        <li
          key={project.key}
          className="border-fg/10 bg-fg/[0.03] grid overflow-hidden rounded-3xl border md:grid-cols-[3fr_2fr]"
        >
          <a href={project.url} target="_blank" rel="noopener noreferrer" className="group block overflow-hidden">
            <img
              src={project.image}
              alt=""
              width={1440}
              height={900}
              loading="lazy"
              className="aspect-[16/10] size-full object-cover transition duration-500 group-hover:scale-[1.03]"
            />
          </a>
          <div className="flex flex-col justify-center gap-4 p-6 md:p-10">
            <p className="text-vz-accent text-sm font-medium">{t(`showcase.featured.${project.key}.tag`)}</p>
            <h3 className="text-3xl font-semibold tracking-tight">{t(`showcase.featured.${project.key}.name`)}</h3>
            <p className="text-fg/70 text-pretty">{t(`showcase.featured.${project.key}.body`)}</p>
            <a href={project.url} target="_blank" rel="noopener noreferrer" className={`${btn.primary} self-start`}>
              {t('showcase.featured.visit')}
              <ArrowUpRight className="size-4 rtl:-scale-x-100" aria-hidden="true" />
            </a>
          </div>
        </li>
      ))}
    </ul>
  )
}
