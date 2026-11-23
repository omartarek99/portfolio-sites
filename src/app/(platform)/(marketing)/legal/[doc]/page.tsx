import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getTranslations } from 'next-intl/server'

const DOCS = ['privacy', 'terms'] as const
type Doc = (typeof DOCS)[number]

async function resolve(params: Promise<{ doc: string }>): Promise<Doc> {
  const { doc } = await params
  if (!(DOCS as readonly string[]).includes(doc)) notFound()
  return doc as Doc
}

export async function generateMetadata({ params }: { params: Promise<{ doc: string }> }): Promise<Metadata> {
  const [doc, t] = await Promise.all([resolve(params), getTranslations('marketing')])
  return { title: t(`legal.${doc}.title`) }
}

export default async function LegalPage({ params }: { params: Promise<{ doc: string }> }) {
  const [doc, t] = await Promise.all([resolve(params), getTranslations('marketing')])
  return (
    <article className="mx-auto max-w-2xl px-5 py-20 md:py-28">
      <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">{t(`legal.${doc}.title`)}</h1>
      {(t.raw(`legal.${doc}.body`) as string[]).map((paragraph) => (
        <p key={paragraph} className="mt-5 leading-relaxed text-pretty text-fg/70">
          {paragraph}
        </p>
      ))}
    </article>
  )
}
