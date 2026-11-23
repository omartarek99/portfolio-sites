import { defineManifest } from '../types'
import { dividerSchema, type DividerContent } from './schema'

const sizeOptions = [
  { value: 'sm', label: { en: 'Small', ar: 'صغير' } },
  { value: 'md', label: { en: 'Medium', ar: 'متوسط' } },
  { value: 'lg', label: { en: 'Large', ar: 'كبير' } },
  { value: 'xl', label: { en: 'Extra large', ar: 'كبير جدًا' } },
]

export const manifest = defineManifest<DividerContent>({
  type: 'divider',
  name: { en: 'Divider', ar: 'فاصل' },
  description: {
    en: 'A line, a motif, a wave or plain space between two sections.',
    ar: 'خط أو زخرفة أو موجة أو مساحة فارغة تفصل بين قسمين.',
  },
  icon: 'minus',
  category: 'utility',
  variants: [
    {
      id: 'line',
      name: { en: 'Line', ar: 'خط' },
      description: { en: 'A hairline, with optional words in the middle.', ar: 'خط رفيع، مع كلمات اختيارية في وسطه.' },
      tier: 'free',
      bleed: true,
    },
    {
      id: 'shape',
      name: { en: 'Motif', ar: 'زخرفة' },
      description: { en: 'A small geometric ornament in the theme colours.', ar: 'زخرفة هندسية صغيرة بألوان القالب.' },
      tier: 'free',
      bleed: true,
    },
    {
      id: 'wave',
      name: { en: 'Wave', ar: 'موجة' },
      description: { en: 'A wavy edge that leads into the next section.', ar: 'حافة متموجة تمهّد للقسم التالي.' },
      tier: 'free',
      bleed: true,
    },
    {
      id: 'spacer',
      name: { en: 'Spacer', ar: 'مسافة' },
      description: { en: 'Empty space, nothing else.', ar: 'مساحة فارغة لا أكثر.' },
      tier: 'free',
      bleed: true,
    },
  ],
  schema: dividerSchema,
  defaultContent: {
    label: { en: 'Selected work', ar: 'أعمال مختارة' },
    shape: 'diamond',
    fill: 'surface',
    size: 'md',
  },
  editableFields: [
    {
      kind: 'select',
      path: 'shape',
      label: { en: 'Motif', ar: 'الزخرفة' },
      variants: ['shape'],
      options: [
        { value: 'diamond', label: { en: 'Diamonds', ar: 'معيّنات' } },
        { value: 'dots', label: { en: 'Dots', ar: 'نقاط' } },
        { value: 'geometric', label: { en: 'Geometric band', ar: 'شريط هندسي' } },
      ],
    },
    {
      kind: 'select',
      path: 'fill',
      label: { en: 'Wave colour', ar: 'لون الموجة' },
      help: {
        en: 'Match the background of the section that follows.',
        ar: 'اختر لون خلفية القسم الذي يلي الموجة.',
      },
      variants: ['wave'],
      options: [
        { value: 'surface', label: { en: 'Surface', ar: 'سطح' } },
        { value: 'primary', label: { en: 'Primary', ar: 'أساسي' } },
        { value: 'secondary', label: { en: 'Secondary', ar: 'ثانوي' } },
        { value: 'accent', label: { en: 'Accent', ar: 'مميّز' } },
        { value: 'text', label: { en: 'Text colour', ar: 'لون النص' } },
      ],
    },
    {
      kind: 'boolean',
      path: 'flip',
      label: { en: 'Flip upside down', ar: 'قلب الموجة رأسًا على عقب' },
      variants: ['wave'],
    },
    {
      kind: 'select',
      path: 'size',
      label: { en: 'Height', ar: 'الارتفاع' },
      variants: ['wave', 'spacer'],
      options: sizeOptions,
    },
  ],
})
