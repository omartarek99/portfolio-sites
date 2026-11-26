import { ArrowUpRight } from 'lucide-react'
import { getTranslations } from 'next-intl/server'
import { ScoreRings } from './ScoreRings'
import { SectionHead, Wrap } from './site'

/**
 * Google PageSpeed Insights result for this site (mobile, Lighthouse).
 * Update the scores and link after re-running the test.
 */
const REPORT = {
  url: 'https://pagespeed.web.dev/analysis/https-portfolio-site-ten-tau-45-vercel-app/bwxcp6grsiyt2rk6me0tdi?form_factor=mobile',
  scores: { performance: 100, accessibility: 93, bestPractices: 100, seo: 100 },
}

/** "Fast by design": this site's PageSpeed scores, as proof of the work. */
export async function Performance() {
  const t = await getTranslations('marketing')
  const keys = Object.keys(REPORT.scores) as (keyof typeof REPORT.scores)[]
  return (
    <Wrap id="performance">
      <SectionHead title={t('perf.title')} subtitle={t('perf.subtitle')} />
      <div className="rounded-3xl border border-fg/10 bg-fg/[0.03] p-6 md:p-10">
        <ScoreRings scores={keys.map((key) => ({ label: t(`perf.scores.${key}`), score: REPORT.scores[key] }))} />
        <div className="mt-8 text-center">
          <a
            href={REPORT.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-vz-accent inline-flex items-center gap-1 text-sm font-medium hover:underline"
          >
            {t('perf.link')}
            <ArrowUpRight className="size-4 rtl:-scale-x-100" aria-hidden="true" />
          </a>
        </div>
      </div>
    </Wrap>
  )
}
