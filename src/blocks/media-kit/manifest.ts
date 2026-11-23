import { loc, SOCIAL_PLATFORMS } from '@/schemas/fields'
import { SOCIAL_LABELS } from '@/lib/links'
import { defineManifest } from '../types'
import { mediaKitSchema, type MediaKitContent } from './schema'

export const manifest = defineManifest<MediaKitContent>({
  type: 'mediaKit',
  name: loc('Media kit', 'الملف الإعلامي'),
  description: loc('Audience numbers per platform, demographics and rates for brands.', 'أرقام الجمهور لكل منصة، والفئات الديموغرافية، والأسعار للعلامات التجارية.'),
  icon: 'bar-chart',
  category: 'sell',
  variants: [
    {
      id: 'stats',
      name: loc('Audience stats', 'إحصاءات الجمهور'),
      description: loc('Platforms, audience facts and rate cards.', 'المنصات وحقائق الجمهور وبطاقات الأسعار.'),
      tier: 'free',
    },
  ],
  schema: mediaKitSchema,
  defaultContent: {
    eyebrow: loc('Media kit', 'الملف الإعلامي'),
    heading: loc('Work with @reemcooks', 'تعاون مع ريم تطبخ'),
    intro: loc(
      'Over half a million home cooks across the Gulf follow my quick recipes every week.',
      'أكثر من نصف مليون محبٍّ للطبخ في الخليج يتابعون وصفاتي السريعة كل أسبوع.',
    ),
    platforms: [
      { id: 'm1', platform: 'instagram', handle: '@reemcooks', followers: loc('185K', '185 ألف'), engagement: loc('6.8%', '6.8%'), link: { type: 'url', value: 'https://instagram.com/reemcooks' } },
      { id: 'm2', platform: 'tiktok', handle: '@reemcooks', followers: loc('320K', '320 ألف'), engagement: loc('9.1%', '9.1%'), link: { type: 'url', value: 'https://tiktok.com/@reemcooks' } },
      { id: 'm3', platform: 'youtube', handle: '@reemcooks', followers: loc('64K', '64 ألف'), engagement: loc('4.2%', '4.2%'), link: { type: 'url', value: 'https://youtube.com/@reemcooks' } },
    ],
    audienceHeading: loc('Audience', 'الجمهور'),
    audience: [
      { id: 'a1', label: loc('Women', 'النساء'), value: loc('68%', '68%') },
      { id: 'a2', label: loc('Main age group', 'الفئة العمرية الأكبر'), value: loc('25–34', '\u206625–34\u2069') },
      { id: 'a3', label: loc('Top countries', 'أبرز الدول'), value: loc('Saudi Arabia, UAE, Kuwait', 'السعودية، الإمارات، الكويت') },
      { id: 'a4', label: loc('Monthly reach', 'الوصول الشهري'), value: loc('2.1M', '2.1 مليون') },
    ],
    ratesHeading: loc('Rates', 'الأسعار'),
    rates: [
      { id: 'r1', deliverable: loc('Instagram Reel', 'مقطع ريلز على إنستغرام'), price: loc('From $600', 'من 600$'), note: loc('Recipe filmed in my kitchen, one round of edits', 'وصفة تُصوَّر في مطبخي، مع جولة تعديل واحدة') },
      { id: 'r2', deliverable: loc('TikTok video', 'فيديو على تيك توك'), price: loc('From $750', 'من 750$') },
      { id: 'r3', deliverable: loc('YouTube integration', 'فقرة ضمن فيديو يوتيوب'), price: loc('From $1,200', 'من 1,200$'), note: loc('60–90 seconds inside a full recipe video', 'من 60 إلى 90 ثانية داخل فيديو وصفة كامل') },
      { id: 'r4', deliverable: loc('Story set (3 frames)', 'مجموعة قصص (3 إطارات)'), price: loc('$350', '350$') },
    ],
    download: {
      label: loc('Download media kit (PDF)', 'حمّل الملف الإعلامي (PDF)'),
      link: { type: 'url', value: 'https://example.com/reemcooks-media-kit.pdf' },
      icon: 'download',
    },
  },
  editableFields: [
    {
      kind: 'list',
      path: 'platforms',
      label: loc('Platforms', 'المنصات'),
      itemLabel: loc('Platform', 'منصة'),
      titlePath: 'followers',
      max: 8,
      fields: [
        {
          kind: 'select',
          path: 'platform',
          label: loc('Platform', 'المنصة'),
          options: SOCIAL_PLATFORMS.map((value) => ({ value, label: SOCIAL_LABELS[value] })),
        },
        { kind: 'string', path: 'handle', label: loc('Handle', 'اسم الحساب'), placeholder: '@yourname' },
        { kind: 'text', path: 'followers', label: loc('Followers', 'المتابعون') },
        { kind: 'text', path: 'engagement', label: loc('Engagement rate', 'نسبة التفاعل') },
        { kind: 'link', path: 'link', label: loc('Profile link', 'رابط الحساب') },
      ],
      defaultItem: { platform: 'instagram', handle: '', followers: loc('10K', '10 آلاف') },
    },
    {
      kind: 'list',
      path: 'audience',
      label: loc('Audience facts', 'حقائق الجمهور'),
      itemLabel: loc('Fact', 'معلومة'),
      titlePath: 'label',
      max: 12,
      fields: [
        { kind: 'text', path: 'label', label: loc('Label', 'العنوان') },
        { kind: 'text', path: 'value', label: loc('Value', 'القيمة') },
      ],
      defaultItem: { label: loc('Label', 'العنوان'), value: loc('Value', 'القيمة') },
    },
    {
      kind: 'list',
      path: 'rates',
      label: loc('Rate cards', 'بطاقات الأسعار'),
      itemLabel: loc('Rate', 'سعر'),
      titlePath: 'deliverable',
      max: 12,
      fields: [
        { kind: 'text', path: 'deliverable', label: loc('Deliverable', 'الخدمة') },
        { kind: 'text', path: 'price', label: loc('Price', 'السعر') },
        { kind: 'text', path: 'note', label: loc('Note', 'ملاحظة') },
      ],
      defaultItem: { deliverable: loc('Deliverable', 'الخدمة'), price: loc('From $500', 'من 500$') },
    },
    { kind: 'button', path: 'download', label: loc('Download button', 'زر التحميل') },
  ],
})
