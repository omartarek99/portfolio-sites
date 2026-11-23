import { defineManifest } from '../types'
import { richTextSchema, type RichTextContent } from './schema'

export const manifest = defineManifest<RichTextContent>({
  type: 'richText',
  name: { en: 'Rich text', ar: 'نص منسّق' },
  description: {
    en: 'Free-form writing: paragraphs, subheadings, lists and quotes.',
    ar: 'كتابة حرة: فقرات وعناوين فرعية وقوائم واقتباسات.',
  },
  icon: 'pencil',
  category: 'content',
  variants: [
    {
      id: 'single',
      name: { en: 'Single column', ar: 'عمود واحد' },
      description: { en: 'One comfortable reading column.', ar: 'عمود واحد مريح للقراءة.' },
      tier: 'free',
    },
    {
      id: 'two-column',
      name: { en: 'Two columns', ar: 'عمودان' },
      description: {
        en: 'Text flows across two columns on wide screens, one on phones.',
        ar: 'يتوزع النص على عمودين في الشاشات العريضة وعمود واحد في الهاتف.',
      },
      tier: 'free',
    },
  ],
  schema: richTextSchema,
  defaultContent: {
    eyebrow: { en: 'The problem', ar: 'المشكلة' },
    heading: {
      en: 'Most centers still run on WhatsApp groups and spreadsheets.',
      ar: 'ما زالت معظم المراكز تُدار عبر مجموعات واتساب وجداول البيانات.',
    },
    body: {
      en:
        '<p>We spoke to 60 tutoring centers across Dubai, Doha and Riyadh before writing a line of code. Almost all of them keep the timetable in one spreadsheet, payments in another, and talk to parents in a dozen WhatsApp groups that nobody can search.</p>' +
        '<h3>What it costs them</h3>' +
        '<ul><li>Around nine hours a week spent chasing late fees by hand.</li><li>Classes double-booked when two coordinators edit the same sheet.</li><li>Parents who only hear about a missed session a week later.</li></ul>' +
        '<p>The tools that exist were built for schools with an IT department, priced in dollars and available only in English. A center with three rooms and twelve teachers needs something it can set up in an afternoon.</p>' +
        '<blockquote>“I run a business, but most days it feels like I run a group chat.” — Owner of a center in Sharjah</blockquote>',
      ar:
        '<p>قبل أن نكتب سطرًا واحدًا من الشيفرة، تحدثنا مع 60 مركزًا للدروس الخصوصية في دبي والدوحة والرياض. يحتفظ معظمها بجدول الحصص في ملف، وبالمدفوعات في ملف آخر، ويتواصل مع أولياء الأمور عبر عشرات مجموعات واتساب التي يصعب البحث فيها.</p>' +
        '<h3>ماذا يكلّفهم ذلك؟</h3>' +
        '<ul><li>نحو تسع ساعات أسبوعيًا تضيع في ملاحقة الرسوم المتأخرة يدويًا.</li><li>حصص تُحجز مرتين حين يعدّل منسّقان الملف نفسه.</li><li>أولياء أمور لا يعلمون بغياب أبنائهم إلا بعد أسبوع.</li></ul>' +
        '<p>الأدوات المتاحة صُممت لمدارس لديها قسم تقنية معلومات، وتُسعَّر بالدولار ولا تتوفر إلا بالإنجليزية. أما مركز بثلاث قاعات واثني عشر معلمًا فيحتاج إلى أداة يجهّزها في ساعات.</p>' +
        '<blockquote>«أنا أدير مشروعًا تجاريًا، لكنني في أغلب الأيام أشعر أنني أدير مجموعة محادثة.» — صاحبة مركز في الشارقة</blockquote>',
    },
  },
  editableFields: [],
})
