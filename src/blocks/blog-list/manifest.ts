import { loc } from '@/schemas/fields'
import { defineManifest } from '../types'
import { blogListSchema, type BlogListContent } from './schema'

export const manifest = defineManifest<BlogListContent>({
  type: 'blogList',
  name: loc('Blog list', 'قائمة المقالات'),
  description: loc('Your latest blog posts, pulled in automatically.', 'أحدث مقالات مدوّنتك، تظهر تلقائيًا.'),
  icon: 'file-text',
  category: 'content',
  variants: [
    {
      id: 'grid',
      name: loc('Grid', 'شبكة'),
      description: loc('Cards with cover, title, excerpt and date.', 'بطاقات بصورة الغلاف والعنوان والمقتطف والتاريخ.'),
      tier: 'free',
    },
    {
      id: 'list',
      name: loc('List', 'قائمة'),
      description: loc('A compact list of titles and dates.', 'قائمة مختصرة بالعناوين والتواريخ.'),
      tier: 'free',
    },
    {
      id: 'featured',
      name: loc('Featured + list', 'مقال مميز وقائمة'),
      description: loc('One large featured post beside the rest.', 'مقال مميز كبير بجانب بقية المقالات.'),
      tier: 'free',
    },
  ],
  schema: blogListSchema,
  defaultContent: {
    eyebrow: loc('Journal', 'المدوّنة'),
    heading: loc('Latest writing', 'أحدث ما كتبت'),
    intro: loc(
      'Essays and notes on technology, culture and the creative economy of the Gulf.',
      'مقالات وملاحظات عن التقنية والثقافة والاقتصاد الإبداعي في الخليج.',
    ),
    showAll: true,
  },
  editableFields: [
    { kind: 'number', path: 'count', label: loc('Number of posts', 'عدد المقالات'), min: 1, max: 24, step: 1 },
    {
      kind: 'string',
      path: 'tag',
      label: loc('Only posts tagged', 'المقالات الموسومة فقط بـ'),
      help: loc('Leave empty to show every post.', 'اتركه فارغًا لعرض كل المقالات.'),
      placeholder: 'design',
    },
    { kind: 'boolean', path: 'showAll', label: loc('Link to all posts', 'رابط إلى كل المقالات') },
  ],
})
