import { loc } from '@/schemas/fields'
import { defineManifest } from '../types'
import { newsletterSchema, type NewsletterContent } from './schema'

export const manifest = defineManifest<NewsletterContent>({
  type: 'newsletter',
  name: loc('Newsletter', 'النشرة البريدية'),
  description: loc('Collect email subscribers, with double opt-in.', 'اجمع مشتركين عبر البريد، مع تأكيد مزدوج للاشتراك.'),
  icon: 'send',
  category: 'contact',
  variants: [
    {
      id: 'inline',
      name: loc('Inline', 'سطر واحد'),
      description: loc('A heading beside one row: email and button.', 'عنوان بجانب سطر واحد: البريد والزر.'),
      tier: 'free',
    },
    {
      id: 'card',
      name: loc('Card with incentive', 'بطاقة مع هدية'),
      description: loc('A card with a heading, a line of copy and something free for subscribing.', 'بطاقة بعنوان وسطر تعريفي وهدية مجانية للمشتركين.'),
      tier: 'free',
    },
  ],
  schema: newsletterSchema,
  defaultContent: {
    eyebrow: loc('Free guide', 'دليل مجاني'),
    heading: loc('Get my weekly letter', 'اشترك في رسالتي الأسبوعية'),
    intro: loc(
      'One short email every Sunday with a practical tip for your career — and my interview guide as a welcome gift.',
      'رسالة قصيرة كل أحد فيها نصيحة عملية لمسيرتك المهنية، ودليلي للمقابلات هدية ترحيب.',
    ),
    buttonLabel: loc('Send me the guide', 'أرسل لي الدليل'),
    note: loc('No spam. Unsubscribe with one click.', 'بلا رسائل مزعجة. ألغِ الاشتراك بنقرة واحدة.'),
    incentive: {
      title: loc('10 ways to stand out in your next interview', '10 طرق لتتميّز في مقابلتك القادمة'),
      description: loc('A 12-page PDF with the questions teachers and graduates are asked most.', 'ملف PDF من 12 صفحة بأكثر الأسئلة التي يُسألها المعلمون والخريجون.'),
      image: {
        url: '/stock/art-sand.svg',
        alt: loc('Cover of the interview guide', 'غلاف دليل المقابلات'),
        width: 1400,
        height: 1400,
        attribution: { name: 'Showcase', source: 'bundled' },
      },
    },
  },
  editableFields: [],
})
