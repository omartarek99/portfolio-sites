import { defineManifest } from '../types'
import { announcementSchema, type AnnouncementContent } from './schema'

export const manifest = defineManifest<AnnouncementContent>({
  type: 'announcement',
  name: { en: 'Announcement bar', ar: 'شريط الإعلانات' },
  description: {
    en: 'A slim bar above the header for news, availability or an offer.',
    ar: 'شريط نحيف أعلى الترويسة للأخبار أو أوقات التفرّغ أو العروض.',
  },
  icon: 'megaphone',
  category: 'utility',
  global: true,
  variants: [
    {
      id: 'bar',
      name: { en: 'Bar', ar: 'شريط' },
      description: { en: 'One line with an optional link.', ar: 'سطر واحد مع رابط اختياري.' },
      tier: 'free',
    },
    {
      id: 'ticker',
      name: { en: 'Ticker', ar: 'شريط متحرك' },
      description: { en: 'Short messages that scroll across the bar.', ar: 'رسائل قصيرة تتحرك بعرض الشريط.' },
      tier: 'free',
    },
  ],
  schema: announcementSchema,
  defaultContent: {
    text: {
      en: 'Now booking brand projects for January 2027 — two places left.',
      ar: 'أستقبل الآن مشاريع الهوية لشهر يناير 2027 — بقي مكانان فقط.',
    },
    cta: {
      label: { en: 'Book a call', ar: 'احجز مكالمة' },
      link: { type: 'anchor', value: 'contact' },
      icon: 'arrow-right',
    },
    items: [
      { id: 'msg-booking', text: { en: 'Now booking January 2027', ar: 'الحجز متاح لشهر يناير 2027' } },
      { id: 'msg-call', text: { en: 'Free 20-minute intro call', ar: 'مكالمة تعارف مجانية لمدة 20 دقيقة' } },
      { id: 'msg-workshop', text: { en: 'New: brand strategy workshops', ar: 'جديد: ورش عمل في استراتيجية الهوية' } },
      { id: 'msg-gulf', text: { en: 'Based in Doha, working across the Gulf', ar: 'مقرّي الدوحة وأعمل مع عملاء في أنحاء الخليج' } },
    ],
    dismissible: true,
  },
  editableFields: [
    { kind: 'button', path: 'cta', label: { en: 'Link', ar: 'الرابط' }, variants: ['bar'] },
    {
      kind: 'list',
      path: 'items',
      label: { en: 'Messages', ar: 'الرسائل' },
      itemLabel: { en: 'Message', ar: 'رسالة' },
      titlePath: 'text',
      variants: ['ticker'],
      max: 12,
      fields: [{ kind: 'text', path: 'text', label: { en: 'Message', ar: 'الرسالة' }, maxLength: 80 }],
      defaultItem: { text: { en: 'New message', ar: 'رسالة جديدة' } },
    },
    {
      kind: 'boolean',
      path: 'dismissible',
      label: { en: 'Visitors can close it', ar: 'يمكن للزوار إغلاقه' },
      help: {
        en: 'It stays closed for a visitor until you change the message.',
        ar: 'يبقى مغلقًا لدى الزائر إلى أن تغيّر نص الرسالة.',
      },
    },
  ],
})
