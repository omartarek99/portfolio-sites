/**
 * Example content for the `bento` variant used as a whole home page (the
 * "Bento" template, docs/TEMPLATES.md §15): one card of every kind. Used by
 * the block's tests; the Bento template can start from it.
 */
import { loc } from '@/schemas/fields'
import type { ProjectsContent } from './schema'

export const bentoHomeContent: ProjectsContent = {
  items: [
    {
      id: 'intro',
      kind: 'intro',
      size: 'lg',
      label: loc('Hello, I’m', 'مرحبًا، أنا'),
      title: loc('Mona Al-Sayed', 'منى السيد'),
      description: loc(
        'Product manager. I turn messy problems into simple products.',
        'مديرة منتجات. أحوّل المشكلات المعقّدة إلى منتجات بسيطة.',
      ),
      image: { url: '/stock/portrait-sea.svg', width: 1200, height: 1600, alt: loc('Portrait of Mona Al-Sayed', 'صورة شخصية لمنى السيد') },
      tags: ['Product', 'Research', 'Travel tech'],
    },
    {
      id: 'photo',
      kind: 'photo',
      size: 'tall',
      title: loc('Weekends on the Corniche', 'عطلات نهاية الأسبوع على الكورنيش'),
      image: { url: '/stock/nature-sea.svg', width: 1600, height: 1067, alt: loc('Calm sea at the coast', 'بحر هادئ عند الساحل') },
    },
    {
      id: 'status',
      kind: 'status',
      label: loc('Currently', 'حاليًا'),
      title: loc('PM at Rahal Travel', 'مديرة منتج في «رحّال للسفر»'),
      description: loc('Leading the trip-planning team.', 'أقود فريق تخطيط الرحلات.'),
    },
    {
      id: 'location',
      kind: 'location',
      label: loc('Based in', 'أقيم في'),
      title: loc('Doha, Qatar', 'الدوحة، قطر'),
    },
    {
      id: 'latest',
      kind: 'project',
      size: 'md',
      label: loc('Latest', 'أحدث عمل'),
      title: loc('Launched trip-planner v2', 'إطلاق النسخة الثانية من مخطِّط الرحلات'),
      description: loc(
        'A weekend idea becomes a booked trip in under four minutes.',
        'فكرة عطلة نهاية الأسبوع تصبح رحلة محجوزة في أقل من أربع دقائق.',
      ),
      image: { url: '/stock/app-sea.svg', width: 1920, height: 1080, alt: loc('Trip planner dashboard', 'لوحة مخطِّط الرحلات') },
      link: { type: 'url', value: '#' },
      year: '2026',
    },
    {
      id: 'learning',
      kind: 'learning',
      label: loc('Now learning', 'أتعلّم الآن'),
      title: loc('Data analytics', 'تحليل البيانات'),
      description: loc('SQL and experiment design.', 'لغة SQL وتصميم التجارب.'),
    },
    { id: 'linkedin', kind: 'social', platform: 'linkedin', handle: 'mona-alsayed' },
    { id: 'x', kind: 'social', platform: 'x', handle: '@monaalsayed' },
    { id: 'github', kind: 'social', platform: 'github', handle: 'monaalsayed' },
    {
      id: 'contact',
      kind: 'contact',
      size: 'md',
      label: loc('Open to new ideas', 'أرحّب بالأفكار الجديدة'),
      title: loc('Say hi', 'قل مرحبًا'),
      description: loc('hello@monaalsayed.example', 'hello@monaalsayed.example'),
      link: { type: 'email', value: 'hello@monaalsayed.example' },
    },
  ],
}
