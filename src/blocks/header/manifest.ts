import { defineManifest } from '../types'
import { headerSchema, type HeaderContent } from './schema'

export const manifest = defineManifest<HeaderContent>({
  type: 'header',
  name: { en: 'Header', ar: 'الترويسة' },
  description: {
    en: 'Site name or logo, navigation, language switcher and a call to action.',
    ar: 'اسم الموقع أو شعاره، وروابط التنقل، ومبدّل اللغة، وزر دعوة لاتخاذ إجراء.',
  },
  icon: 'menu',
  category: 'utility',
  global: true,
  variants: [
    {
      id: 'top-bar',
      name: { en: 'Top bar', ar: 'شريط علوي' },
      description: { en: 'Name at the start, navigation at the end.', ar: 'الاسم في البداية والروابط في النهاية.' },
      tier: 'free',
    },
    {
      id: 'centered',
      name: { en: 'Centered', ar: 'في المنتصف' },
      description: { en: 'Name centered above a centered navigation.', ar: 'الاسم في المنتصف وتحته روابط التنقل.' },
      tier: 'free',
    },
    {
      id: 'side',
      name: { en: 'Side navigation', ar: 'تنقل جانبي' },
      description: {
        en: 'A vertical sidebar on desktop, a top bar on mobile.',
        ar: 'عمود جانبي على الشاشات الكبيرة وشريط علوي على الجوال.',
      },
      tier: 'free',
    },
    {
      id: 'floating-pill',
      name: { en: 'Floating pill', ar: 'كبسولة عائمة' },
      description: {
        en: 'A rounded bar that detaches from the top as you scroll.',
        ar: 'شريط مستدير ينفصل عن أعلى الصفحة عند التمرير.',
      },
      tier: 'free',
    },
    {
      id: 'minimal',
      name: { en: 'Minimal', ar: 'بسيط' },
      description: { en: 'Just the name and a menu button.', ar: 'الاسم وزر القائمة فقط.' },
      tier: 'free',
    },
    {
      id: 'tabs',
      name: { en: 'Editor tabs', ar: 'تبويبات المحرر' },
      description: {
        en: 'Navigation styled as code-editor tabs.',
        ar: 'روابط التنقل على هيئة تبويبات محرر الشيفرة.',
      },
      tier: 'free',
    },
  ],
  schema: headerSchema,
  defaultContent: {
    heading: { en: 'Noor Al-Mansoori', ar: 'نور المنصوري' },
    text: { en: 'Brand & product designer · Doha', ar: 'مصممة هوية ومنتجات رقمية · الدوحة' },
    cta: {
      label: { en: "Let's talk", ar: 'لنتحدث' },
      link: { type: 'anchor', value: 'contact' },
    },
    sticky: true,
    showLanguage: true,
  },
  editableFields: [
    {
      kind: 'image',
      path: 'logo',
      label: { en: 'Logo', ar: 'الشعار' },
      help: {
        en: 'Shown before the name. Clear the name to show the logo alone.',
        ar: 'يظهر قبل الاسم. احذف الاسم لعرض الشعار وحده.',
      },
    },
    { kind: 'button', path: 'cta', label: { en: 'Button', ar: 'الزر' } },
    {
      kind: 'boolean',
      path: 'sticky',
      label: { en: 'Stay at the top while scrolling', ar: 'البقاء في الأعلى عند التمرير' },
    },
    {
      kind: 'boolean',
      path: 'showLanguage',
      label: { en: 'Show the language switcher', ar: 'إظهار مبدّل اللغة' },
      help: {
        en: 'Only appears when the site has two languages.',
        ar: 'يظهر فقط عندما يكون الموقع بلغتين.',
      },
    },
  ],
})
