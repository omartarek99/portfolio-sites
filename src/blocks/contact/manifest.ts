import { loc } from '@/schemas/fields'
import { defaultContactForm, type FormDefinition } from '@/schemas/forms'
import { defineManifest } from '../types'
import { contactSchema, type ContactContent } from './schema'

const base = defaultContactForm()
const exampleForm: FormDefinition = {
  ...base,
  fields: [
    ...base.fields.slice(0, 2),
    {
      id: 'phone',
      type: 'phone',
      label: loc('Phone', 'الهاتف'),
      placeholder: loc('5550 0000', '5550 0000'),
      required: false,
      half: true,
    },
    {
      id: 'service',
      type: 'select',
      label: loc('What do you need?', 'ما الذي تحتاجه؟'),
      required: false,
      half: true,
      options: [
        { value: 'identity', label: loc('Brand identity', 'هوية بصرية') },
        { value: 'campaign', label: loc('Campaign design', 'تصميم حملة') },
        { value: 'other', label: loc('Something else', 'أمر آخر') },
      ],
    },
    {
      id: 'budget',
      type: 'budget',
      label: loc('Budget', 'الميزانية'),
      required: false,
      options: [
        { value: 'lt-10k', label: loc('Under QAR 10k', 'أقل من 10 آلاف ريال') },
        { value: '10-25k', label: loc('QAR 10–25k', '10–25 ألف ريال') },
        { value: '25-50k', label: loc('QAR 25–50k', '25–50 ألف ريال') },
        { value: 'gt-50k', label: loc('QAR 50k+', 'أكثر من 50 ألف ريال') },
      ],
    },
    ...base.fields.slice(2),
  ],
}

export const manifest = defineManifest<ContactContent>({
  type: 'contact',
  name: loc('Contact', 'تواصل'),
  description: loc('A contact form with your details, a map or just the essentials.', 'نموذج تواصل مع بياناتك، أو خريطة، أو الأساسيات فقط.'),
  icon: 'mail',
  category: 'contact',
  variants: [
    {
      id: 'form-details',
      name: loc('Form and details', 'نموذج وبيانات'),
      description: loc('The form beside your email, phone and social links.', 'النموذج بجانب بريدك وهاتفك وروابطك الاجتماعية.'),
      tier: 'free',
    },
    {
      id: 'split-map',
      name: loc('Form and map', 'نموذج وخريطة'),
      description: loc('The form beside your address — a live map only if you turn it on.', 'النموذج بجانب عنوانك، مع خريطة حيّة فقط إذا فعّلتها.'),
      tier: 'free',
    },
    {
      id: 'minimal',
      name: loc('Just the details', 'البيانات فقط'),
      description: loc('Your email large and clear, with your other channels. No form.', 'بريدك بخط كبير وواضح مع قنواتك الأخرى، دون نموذج.'),
      tier: 'free',
    },
  ],
  schema: contactSchema,
  defaultContent: {
    eyebrow: loc('Contact', 'تواصل'),
    heading: loc("Have a story to tell? Let's talk.", 'لديك قصة تودّ روايتها؟ لنتحدث.'),
    intro: loc(
      'Tell me a little about your brand and what you have in mind. I read every message myself.',
      'أخبرني قليلًا عن علامتك وما تفكر فيه. أقرأ كل رسالة بنفسي.',
    ),
    form: exampleForm,
    note: loc('I reply within two working days, Sunday to Thursday.', 'أردّ خلال يومَي عمل، من الأحد إلى الخميس.'),
    showDetails: true,
    showSocial: true,
    map: { enabled: false, query: '' },
  },
  editableFields: [
    { kind: 'form', path: 'form', label: loc('Form', 'النموذج'), variants: ['form-details', 'split-map'] },
    {
      kind: 'boolean',
      path: 'showDetails',
      label: loc('Show contact details', 'إظهار بيانات التواصل'),
      help: loc('Email, phone, WhatsApp and address come from Settings → Contact.', 'البريد والهاتف وواتساب والعنوان تأتي من الإعدادات ← التواصل.'),
    },
    { kind: 'boolean', path: 'showSocial', label: loc('Show social links', 'إظهار الروابط الاجتماعية') },
    {
      kind: 'boolean',
      path: 'map.enabled',
      label: loc('Embed a live map', 'تضمين خريطة حيّة'),
      help: loc(
        'Loads Google Maps for every visitor. Off: a drawn address card that loads nothing.',
        'تُحمَّل خرائط Google لكل زائر. عند الإيقاف: بطاقة عنوان مرسومة لا تُحمّل شيئًا.',
      ),
      variants: ['split-map'],
    },
    {
      kind: 'string',
      path: 'map.query',
      label: loc('Map location', 'موقع الخريطة'),
      help: loc('An address or "latitude,longitude". Empty uses your address.', 'عنوان أو «خط العرض,خط الطول». إذا تُرك فارغًا يُستخدم عنوانك.'),
      placeholder: 'West Bay, Doha',
      variants: ['split-map'],
    },
  ],
})
