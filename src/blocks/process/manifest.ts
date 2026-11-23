import { loc } from '@/schemas/fields'
import { defineManifest } from '../types'
import { processSchema, type ProcessContent } from './schema'

const step = (id: string, icon: string, title: [string, string], body: [string, string]) => ({
  id,
  icon,
  title: loc(...title),
  body: loc(...body),
})

export const manifest = defineManifest<ProcessContent>({
  type: 'process',
  name: loc('Process', 'خطوات العمل'),
  description: loc('How you work, step by step, from first call to launch.', 'طريقة عملك خطوة بخطوة، من أول مكالمة حتى الإطلاق.'),
  icon: 'layers',
  category: 'sell',
  variants: [
    { id: 'numbered', name: loc('Numbered steps', 'خطوات مرقّمة'), description: loc('Big numbers and titles; each step opens to show more.', 'أرقام كبيرة وعناوين، وتنفتح كل خطوة لعرض تفاصيلها.'), tier: 'free' },
    { id: 'flow', name: loc('Flow', 'مسار متصل'), description: loc('Steps side by side joined by connectors; stacked on phones.', 'خطوات متجاورة تربطها خطوط، وتتراصّ عموديًا على الهاتف.'), tier: 'free' },
  ],
  schema: processSchema,
  defaultContent: {
    eyebrow: loc('Process', 'طريقة العمل'),
    heading: loc('From first call to launch day', 'من أول مكالمة حتى يوم الإطلاق'),
    intro: loc(
      'Four clear steps, with a check-in at the end of each, so you always know what happens next.',
      'أربع خطوات واضحة، مع مراجعة في نهاية كل منها، لتعرف دائمًا ما الذي سيحدث بعدها.',
    ),
    steps: [
      step('step-discover', 'search', ['Discover', 'الاكتشاف'], [
        'A 45-minute call and a short questionnaire about your customers, your offer and what the site has to achieve.',
        'مكالمة مدتها 45 دقيقة واستبيان قصير عن عملائك وعرضك وما يجب أن يحققه الموقع.',
      ]),
      step('step-design', 'pen-tool', ['Design', 'التصميم'], [
        'I write the copy and design every page in Arabic and English, then we refine it together over two rounds.',
        'أكتب المحتوى وأصمّم كل صفحة بالعربية والإنجليزية، ثم نحسّنها معًا على جولتين.',
      ]),
      step('step-launch', 'rocket', ['Launch', 'الإطلاق'], [
        'The site goes live on your domain with forms, analytics and booking connected and tested.',
        'ينطلق الموقع على نطاقك مع ربط النماذج والتحليلات والحجز واختبارها.',
      ]),
      step('step-grow', 'line-chart', ['Grow', 'النمو'], [
        'After 30 days we review the numbers and I make the changes that bring in more enquiries.',
        'بعد 30 يومًا نراجع الأرقام وأجري التعديلات التي تزيد طلبات التواصل.',
      ]),
    ],
  },
  editableFields: [
    {
      kind: 'list',
      path: 'steps',
      label: loc('Steps', 'الخطوات'),
      itemLabel: loc('Step', 'خطوة'),
      titlePath: 'title',
      max: 12,
      fields: [{ kind: 'icon', path: 'icon', label: loc('Icon', 'الأيقونة'), variants: ['flow'] }],
      defaultItem: { title: loc('New step', 'خطوة جديدة'), body: loc('What happens in this step.', 'ما يحدث في هذه الخطوة.') },
    },
  ],
})
