import { loc } from '@/schemas/fields'
import { defineManifest } from '../types'
import { ctaSchema, type CtaContent } from './schema'

export const manifest = defineManifest<CtaContent>({
  type: 'cta',
  name: loc('Call to action', 'دعوة لاتخاذ إجراء'),
  description: loc('A short, focused band that asks visitors to take the next step.', 'شريط قصير ومركّز يدعو الزائر إلى الخطوة التالية.'),
  icon: 'megaphone',
  category: 'sell',
  variants: [
    {
      id: 'simple',
      name: loc('Simple', 'بسيط'),
      description: loc('Heading, one line and a button on a soft surface.', 'عنوان وسطر وزر على خلفية هادئة.'),
      tier: 'free',
    },
    {
      id: 'with-image',
      name: loc('With image', 'مع صورة'),
      description: loc('A card with a picture that breaks out of its edge.', 'بطاقة بصورة تتجاوز حافتها.'),
      tier: 'free',
    },
    {
      id: 'gradient',
      name: loc('Gradient band', 'شريط متدرّج'),
      description: loc('A full-width band in your theme colours.', 'شريط بعرض الصفحة بألوان قالبك.'),
      tier: 'free',
      bleed: true,
    },
    {
      id: 'banner',
      name: loc('Sticky banner', 'شريط مثبّت'),
      description: loc('A slim bar; on phones it stays at the bottom until dismissed.', 'شريط نحيف يبقى أسفل الشاشة على الهاتف حتى يُخفى.'),
      tier: 'free',
    },
  ],
  schema: ctaSchema,
  defaultContent: {
    eyebrow: loc('Open for new projects', 'متاحة لمشاريع جديدة'),
    heading: loc("Have a story to tell? Let's talk.", 'لديك قصة تودّ روايتها؟ لنتحدث.'),
    intro: loc(
      'From a first logo to a full campaign — tell me where your brand is heading and I will reply within two days.',
      'من أول شعار حتى حملة كاملة، أخبرني إلى أين تتجه علامتك وسأردّ خلال يومين.',
    ),
    primaryCta: {
      label: loc('Start a project', 'ابدأ مشروعًا'),
      link: { type: 'page', value: 'contact' },
      icon: 'arrow-right',
    },
    secondaryCta: {
      label: loc('See my work', 'شاهد أعمالي'),
      link: { type: 'anchor', value: 'projects' },
      style: 'outline',
    },
    image: {
      url: '/stock/portrait-clay.svg',
      alt: loc('Layla Haddad in her studio', 'ليلى حداد في مرسمها'),
      width: 1200,
      height: 1600,
    },
  },
  editableFields: [],
})
