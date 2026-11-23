import { loc } from '@/schemas/fields'
import { defineManifest } from '../types'
import { faqSchema, type FaqContent } from './schema'

const qa = (id: string, q: [string, string], a: [string, string]) => ({ id, question: loc(...q), answer: loc(...a) })

export const manifest = defineManifest<FaqContent>({
  type: 'faq',
  name: loc('FAQ', 'الأسئلة الشائعة'),
  description: loc('Answers to the questions people ask before they get in touch.', 'إجابات عن الأسئلة التي يطرحها الناس قبل التواصل معك.'),
  icon: 'message-circle',
  category: 'content',
  variants: [
    { id: 'accordion', name: loc('Accordion', 'قائمة قابلة للفتح'), description: loc('Questions that open to show the answer.', 'أسئلة تنفتح لتعرض الإجابة.'), tier: 'free' },
    { id: 'two-column', name: loc('Two columns', 'عمودان'), description: loc('Every question and answer visible in two columns.', 'كل الأسئلة والإجابات ظاهرة في عمودين.'), tier: 'free' },
  ],
  schema: faqSchema,
  defaultContent: {
    eyebrow: loc('FAQ', 'الأسئلة الشائعة'),
    heading: loc('Questions, answered', 'إجابات أسئلتك'),
    items: [
      qa('faq-timeline', ['How long does a website take?', 'كم يستغرق إنجاز الموقع؟'], [
        'Most landing pages are live in two to three weeks. A full site with several pages usually takes five to six weeks, depending on how quickly we agree on content.',
        'تنطلق معظم صفحات الهبوط خلال أسبوعين إلى ثلاثة. أما الموقع الكامل متعدد الصفحات فيستغرق عادةً من خمسة إلى ستة أسابيع، بحسب سرعة اعتماد المحتوى.',
      ]),
      qa('faq-revisions', ['How many revisions are included?', 'كم جولة تعديل يشمل العمل؟'], [
        'Every package includes two rounds of revisions on the design and the copy. Small fixes after launch are free for the first 30 days.',
        'تشمل كل باقة جولتين من التعديلات على التصميم والمحتوى، والتعديلات الصغيرة بعد الإطلاق مجانية خلال أول 30 يومًا.',
      ]),
      qa('faq-payment', ['How does payment work?', 'كيف يتم الدفع؟'], [
        'Half up front to book your start date and half on launch. I invoice in US dollars, Qatari riyals or UAE dirhams by bank transfer.',
        'نصف المبلغ مقدمًا لحجز موعد البدء والنصف الآخر عند الإطلاق. أُصدر الفواتير بالدولار الأمريكي أو الريال القطري أو الدرهم الإماراتي، ويكون الدفع بالتحويل البنكي.',
      ]),
      qa('faq-arabic', ['Can you build the site in Arabic too?', 'هل يمكنك بناء الموقع بالعربية أيضًا؟'], [
        'Yes. Every site I make works in Arabic and English, with proper right-to-left layouts and copy written for each language rather than translated word for word.',
        'نعم. كل موقع أبنيه يعمل بالعربية والإنجليزية، باتجاه صحيح من اليمين إلى اليسار، ومحتوى مكتوب لكل لغة بدلًا من ترجمته حرفيًا.',
      ]),
    ],
  },
  editableFields: [
    { kind: 'boolean', path: 'multiOpen', label: loc('Allow several answers open at once', 'السماح بفتح أكثر من إجابة معًا'), variants: ['accordion'] },
    {
      kind: 'list',
      path: 'items',
      label: loc('Questions', 'الأسئلة'),
      itemLabel: loc('Question', 'سؤال'),
      titlePath: 'question',
      max: 40,
      fields: [],
      defaultItem: { question: loc('New question?', 'سؤال جديد؟'), answer: loc('The answer.', 'الإجابة.') },
    },
  ],
})
