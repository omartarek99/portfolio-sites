import { defineManifest } from '../types'
import { footerSchema, type FooterContent } from './schema'

export const manifest = defineManifest<FooterContent>({
  type: 'footer',
  name: { en: 'Footer', ar: 'التذييل' },
  description: {
    en: 'Site name, links, social accounts, contact details and the copyright line.',
    ar: 'اسم الموقع، والروابط، وحسابات التواصل، وبيانات الاتصال، وسطر حقوق النشر.',
  },
  icon: 'layout-grid',
  category: 'utility',
  global: true,
  variants: [
    {
      id: 'simple',
      name: { en: 'Simple', ar: 'بسيط' },
      description: {
        en: 'Name, links, social accounts and copyright.',
        ar: 'الاسم والروابط وحسابات التواصل وحقوق النشر.',
      },
      tier: 'free',
    },
    {
      id: 'columns',
      name: { en: 'Columns', ar: 'أعمدة' },
      description: {
        en: 'Link columns with contact details and social accounts.',
        ar: 'أعمدة روابط مع بيانات الاتصال وحسابات التواصل.',
      },
      tier: 'free',
    },
    {
      id: 'big-name',
      name: { en: 'Big name', ar: 'اسم كبير' },
      description: {
        en: 'An oversized name across the page with small links beneath.',
        ar: 'اسم بحجم كبير يمتد بعرض الصفحة وتحته روابط صغيرة.',
      },
      tier: 'free',
    },
  ],
  schema: footerSchema,
  defaultContent: {
    heading: { en: 'Noor Al-Mansoori', ar: 'نور المنصوري' },
    text: {
      en: 'Brand and product design for companies across the Gulf.',
      ar: 'تصميم الهويات والمنتجات الرقمية لشركات في أنحاء الخليج.',
    },
    copyright: {
      en: '© 2026 Noor Al-Mansoori. All rights reserved.',
      ar: '© 2026 نور المنصوري. جميع الحقوق محفوظة.',
    },
    showBackToTop: true,
  },
  editableFields: [
    {
      kind: 'boolean',
      path: 'showBackToTop',
      label: { en: 'Show the back-to-top link', ar: 'إظهار رابط العودة إلى الأعلى' },
    },
  ],
})
