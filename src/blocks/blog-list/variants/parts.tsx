import type { ReactNode } from 'react'
import { postHref } from '@/lib/links'
import { cn } from '@/lib/utils'
import { loc } from '@/schemas/fields'
import { A, formatDate, Img, placeholderArt, T } from '../../_shared'
import type { BlockContext, PostSummary } from '../../types'

export interface PostsProps {
  ctx: BlockContext
  posts: PostSummary[]
}

/**
 * Posts are edited in the blog editor, not on this canvas: render their text and
 * covers through the kit in a non-editor context so they are never inline-editable.
 */
function view(ctx: BlockContext): BlockContext {
  return ctx.mode === 'editor' ? { ...ctx, mode: 'preview' } : ctx
}

export function PostLink({ ctx, post, className, children }: { ctx: BlockContext; post: PostSummary; className?: string; children: ReactNode }) {
  return (
    <A ctx={ctx} link={{ type: 'url', value: postHref(ctx.site, post.slug) }} className={className}>
      {children}
    </A>
  )
}

export function PostTitle({ ctx, post, className }: { ctx: BlockContext; post: PostSummary; className?: string }) {
  return <T ctx={view(ctx)} path="" value={post.title} as="h3" className={className} />
}

export function PostExcerpt({ ctx, post, className }: { ctx: BlockContext; post: PostSummary; className?: string }) {
  return <T ctx={view(ctx)} path="" value={post.excerpt} as="p" className={cn('site-muted', className)} />
}

export function PostDate({ ctx, post, className }: { ctx: BlockContext; post: PostSummary; className?: string }) {
  const label = post.publishedAt ? formatDate(ctx.locale, post.publishedAt, { year: 'numeric', month: 'short', day: 'numeric' }) : ''
  if (!label) return null
  return (
    <time dateTime={post.publishedAt} className={cn('site-small site-muted tabular-nums', className)}>
      {label}
    </time>
  )
}

/** Cover image, or deterministic placeholder art so a grid never collapses. */
export function PostCover({ ctx, post, sizes, className }: { ctx: BlockContext; post: PostSummary; sizes: string; className?: string }) {
  return (
    <div className={cn('site-media', className)}>
      <Img
        ctx={view(ctx)}
        path=""
        value={{ url: post.coverUrl || placeholderArt(post.id, 'cover') }}
        sizes={sizes}
        maxWidth={1200}
        decorative
        className="transition-transform duration-500 group-hover:scale-[1.03] motion-reduce:transition-none"
      />
    </div>
  )
}

/** Shown in the editor while the site has no posts yet. */
export const EXAMPLE_POSTS: PostSummary[] = [
  {
    id: 'example-1',
    slug: 'doha-indie-game-studios',
    title: loc("The quiet rise of Doha's indie game studios", 'الصعود الهادئ لاستوديوهات الألعاب المستقلة في الدوحة'),
    excerpt: loc(
      'Small teams, shared offices and a new generation of players who want stories from home.',
      'فرق صغيرة ومكاتب مشتركة وجيل جديد من اللاعبين يبحث عن قصص من بيئته.',
    ),
    coverUrl: '/stock/app-dusk.svg',
    tags: ['culture'],
    publishedAt: '2026-10-28T08:00:00.000Z',
  },
  {
    id: 'example-2',
    slug: 'arabic-ux-writing',
    title: loc('Why Arabic UX writing needs its own rules', 'لماذا تحتاج كتابة واجهات الاستخدام بالعربية إلى قواعدها الخاصة'),
    excerpt: loc(
      'Translating buttons is not enough. Tone, word order and plurals all change the experience.',
      'ترجمة الأزرار لا تكفي؛ فالنبرة وترتيب الكلمات وصيغ الجمع كلها تغيّر التجربة.',
    ),
    coverUrl: '/stock/workspace-sand.svg',
    tags: ['design'],
    publishedAt: '2026-09-30T08:00:00.000Z',
  },
  {
    id: 'example-3',
    slug: 'startup-weekend-48-hours',
    title: loc('Inside a 48-hour startup weekend', 'من داخل عطلة ريادة أعمال مدتها 48 ساعة'),
    excerpt: loc(
      'Forty strangers, nine ideas and one very long Saturday night in Manama.',
      'أربعون غريبًا وتسع أفكار وليلة سبت طويلة جدًا في المنامة.',
    ),
    coverUrl: '/stock/event-dusk.svg',
    tags: ['business'],
    publishedAt: '2026-08-17T08:00:00.000Z',
  },
  {
    id: 'example-4',
    slug: 'notes-on-slow-media',
    title: loc('Notes on slow media', 'ملاحظات عن الإعلام المتأنّي'),
    excerpt: loc(
      'What newsletters and long reads teach us about attention in a fast feed.',
      'ما تعلّمنا إياه النشرات البريدية والمقالات الطويلة عن الانتباه في زمن السرعة.',
    ),
    coverUrl: '/stock/nature-sand.svg',
    tags: ['culture'],
    publishedAt: '2026-07-05T08:00:00.000Z',
  },
]
