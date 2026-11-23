import { defineManifest } from '../types'
import { EMBED_PROVIDER_NAMES } from './allow-list'
import { embedSchema, type EmbedContent } from './schema'

const services = EMBED_PROVIDER_NAMES.join(', ')

export const manifest = defineManifest<EmbedContent>({
  type: 'embed',
  name: { en: 'Embed', ar: 'تضمين' },
  description: {
    en: `A map, player, booking page or design file from ${services}.`,
    ar: `خريطة أو مشغّل أو صفحة حجز أو ملف تصميم من ${services}.`,
  },
  icon: 'code',
  category: 'utility',
  variants: [
    {
      id: 'iframe',
      name: { en: 'Embed', ar: 'إطار مضمَّن' },
      description: {
        en: 'Paste a link or embed code from an allowed service.',
        ar: 'الصق رابطًا أو شيفرة تضمين من خدمة مسموح بها.',
      },
      tier: 'pro',
    },
    {
      id: 'code',
      name: { en: 'HTML snippet', ar: 'مقتطف HTML' },
      description: {
        en: 'Formatted HTML, cleaned of scripts and styles.',
        ar: 'نص HTML منسّق بعد تنظيفه من السكربتات والأنماط.',
      },
      tier: 'pro',
    },
  ],
  schema: embedSchema,
  defaultContent: {
    eyebrow: { en: 'Visit the studio', ar: 'زوروا المرسم' },
    heading: { en: 'Unit 14, Alserkal Avenue', ar: 'الوحدة 14، السركال أفنيو' },
    intro: {
      en: 'Open Saturday to Thursday, 11:00 – 19:00. Parking is behind Warehouse 70.',
      ar: 'نستقبلكم من السبت إلى الخميس، من 11:00 حتى 19:00. المواقف خلف المستودع 70.',
    },
    url: 'https://www.google.com/maps?q=Alserkal+Avenue,+Al+Quoz,+Dubai',
    aspect: '16:9',
    title: { en: 'Map to the studio in Alserkal Avenue', ar: 'خريطة الوصول إلى المرسم في السركال أفنيو' },
    caption: {
      en: 'Ring the bell at the green door; the studio is on the first floor.',
      ar: 'اضغطوا الجرس عند الباب الأخضر؛ المرسم في الطابق الأول.',
    },
    code: {
      en:
        '<h3>Studio visits</h3><p>Rania opens the studio to collectors and students on the last Saturday of each month.</p>' +
        '<ul><li>Small groups of up to eight</li><li>Ink and paper provided</li><li>Booking by email: <a href="mailto:studio@example.com">studio@example.com</a></li></ul>',
      ar:
        '<h3>زيارات المرسم</h3><p>تفتح رانيا مرسمها للمقتنين والطلاب في آخر سبت من كل شهر.</p>' +
        '<ul><li>مجموعات صغيرة لا تتجاوز ثمانية أشخاص</li><li>نوفّر الحبر والورق</li><li>الحجز عبر البريد: <a href="mailto:studio@example.com">studio@example.com</a></li></ul>',
    },
  },
  editableFields: [
    {
      kind: 'string',
      path: 'url',
      label: { en: 'Link or embed code', ar: 'الرابط أو شيفرة التضمين' },
      help: {
        en: `Allowed: ${services}. Anything else is refused.`,
        ar: `المسموح به: ${services}. يُرفض أي شيء آخر.`,
      },
      placeholder: 'https://www.youtube.com/watch?v=…',
      variants: ['iframe'],
    },
    {
      kind: 'select',
      path: 'aspect',
      label: { en: 'Shape', ar: 'الشكل' },
      variants: ['iframe'],
      options: [
        { value: 'auto', label: { en: 'Automatic', ar: 'تلقائي' } },
        { value: '16:9', label: { en: 'Wide (16:9)', ar: 'عريض (16:9)' } },
        { value: '21:9', label: { en: 'Panorama (21:9)', ar: 'بانورامي (21:9)' } },
        { value: '4:3', label: { en: 'Classic (4:3)', ar: 'كلاسيكي (4:3)' } },
        { value: '1:1', label: { en: 'Square (1:1)', ar: 'مربع (1:1)' } },
        { value: '3:4', label: { en: 'Portrait (3:4)', ar: 'طولي (3:4)' } },
        { value: '9:16', label: { en: 'Tall (9:16)', ar: 'طولي ممتد (9:16)' } },
      ],
    },
    {
      kind: 'text',
      path: 'title',
      label: { en: 'Title for screen readers', ar: 'عنوان لقارئات الشاشة' },
      variants: ['iframe'],
      maxLength: 120,
    },
    {
      kind: 'text',
      multiline: true,
      path: 'code',
      label: { en: 'HTML snippet', ar: 'مقتطف HTML' },
      help: {
        en: 'Scripts are refused; frames, styles and unknown tags are removed.',
        ar: 'تُرفض السكربتات، وتُزال الإطارات والأنماط والوسوم غير المعروفة.',
      },
      variants: ['code'],
    },
  ],
})
