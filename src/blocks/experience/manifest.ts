import { loc } from '@/schemas/fields'
import { defineManifest } from '../types'
import { experienceSchema, type ExperienceContent } from './schema'

export const manifest = defineManifest<ExperienceContent>({
  type: 'experience',
  name: loc('Experience', 'الخبرات'),
  description: loc('Your roles, where you held them and what you did there.', 'مناصبك، وأين شغلتها، وما أنجزته فيها.'),
  icon: 'briefcase',
  category: 'about',
  variants: [
    {
      id: 'timeline',
      name: loc('Vertical timeline', 'خط زمني عمودي'),
      description: loc('Roles along a line that fills as the visitor scrolls.', 'المناصب على خط يمتلئ مع تمرير الصفحة.'),
      tier: 'free',
    },
    {
      id: 'cards',
      name: loc('Cards', 'بطاقات'),
      description: loc('One card per role.', 'بطاقة لكل منصب.'),
      tier: 'free',
    },
    {
      id: 'compact',
      name: loc('Compact CV list', 'قائمة سيرة ذاتية مختصرة'),
      description: loc('Role, organisation and dates on one line.', 'المنصب والجهة والتواريخ في سطر واحد.'),
      tier: 'free',
    },
  ],
  schema: experienceSchema,
  defaultContent: {
    eyebrow: loc('Experience', 'الخبرات'),
    heading: loc('Where I have worked', 'أين عملت'),
    intro: loc(
      'Seven years across studios, agencies and independent practice.',
      'سبع سنوات بين الاستوديوهات والوكالات والعمل المستقل.',
    ),
    items: [
      {
        id: 'x1',
        role: loc('Senior Brand Designer', 'مصممة هوية بصرية أولى'),
        organisation: loc('Nova Studio', 'نوفا ستوديو'),
        start: '2021',
        current: true,
        location: loc('Doha, Qatar', 'الدوحة، قطر'),
        description: loc(
          '<p>I lead identity projects for cultural and hospitality clients, from strategy workshops to launch. I also wrote the studio’s bilingual type guidelines, now used on every project.</p>',
          '<p>أقود مشاريع الهوية لعملاء في قطاعي الثقافة والضيافة، من ورش الاستراتيجية حتى الإطلاق. ووضعت دليل الخطوط باللغتين في الاستوديو، وهو معتمد اليوم في كل مشروع.</p>',
        ),
        logo: { url: '/stock/art-sand.svg', alt: loc('Nova Studio logo', 'شعار نوفا ستوديو'), width: 1400, height: 1400 },
        tags: ['Figma', 'Illustrator', 'After Effects'],
      },
      {
        id: 'x2',
        role: loc('Designer', 'مصممة'),
        organisation: loc('Pixel & Pine', 'بيكسل آند باين'),
        start: '2018',
        end: '2021',
        location: loc('Dubai, UAE', 'دبي، الإمارات'),
        description: loc(
          '<p>Designed campaigns and packaging for retail brands across the Gulf, and grew from supporting the team to leading client presentations.</p>',
          '<p>صمّمت حملات وعبوات لعلامات تجارية في قطاع التجزئة في الخليج، وتدرّجت من مساندة الفريق إلى تولّي العروض أمام العملاء.</p>',
        ),
        logo: { url: '/stock/art-blush.svg', alt: loc('Pixel & Pine logo', 'شعار بيكسل آند باين'), width: 1400, height: 1400 },
        tags: ['Photoshop', 'InDesign'],
      },
      {
        id: 'x3',
        role: loc('Junior Designer', 'مصممة مبتدئة'),
        organisation: loc('Freelance', 'عمل مستقل'),
        start: '2017',
        end: '2018',
        location: loc('Amman, Jordan', 'عمّان، الأردن'),
        description: loc(
          '<p>Logos, menus and social media kits for small businesses. The year I learned to write a brief and to send an invoice.</p>',
          '<p>شعارات وقوائم طعام ومواد لوسائل التواصل لمشاريع صغيرة. وهي السنة التي تعلمت فيها كتابة موجز المشروع وإرسال الفاتورة.</p>',
        ),
        tags: ['Illustrator'],
      },
    ],
    cta: {
      label: loc('Request my full CV', 'اطلب سيرتي الذاتية الكاملة'),
      link: { type: 'anchor', value: 'contact' },
      style: 'outline',
      icon: 'arrow-right',
    },
  },
  editableFields: [
    {
      kind: 'list',
      path: 'items',
      label: loc('Roles', 'المناصب'),
      itemLabel: loc('Role', 'منصب'),
      titlePath: 'role',
      fields: [
        { kind: 'text', path: 'role', label: loc('Role', 'المنصب') },
        { kind: 'text', path: 'organisation', label: loc('Organisation', 'الجهة') },
        { kind: 'string', path: 'start', label: loc('From', 'من'), placeholder: '2021' },
        { kind: 'string', path: 'end', label: loc('To', 'إلى'), placeholder: '2024' },
        { kind: 'boolean', path: 'current', label: loc('I work here now', 'أعمل هنا حاليًا') },
        { kind: 'text', path: 'location', label: loc('Location', 'المكان') },
        { kind: 'richtext', path: 'description', label: loc('Description', 'الوصف') },
        { kind: 'image', path: 'logo', label: loc('Logo', 'الشعار') },
        { kind: 'tags', path: 'tags', label: loc('Tools and skills', 'الأدوات والمهارات') },
      ],
      defaultItem: { role: loc('Role title', 'المسمى الوظيفي'), organisation: loc('Organisation', 'اسم الجهة'), start: '', end: '' },
    },
    { kind: 'button', path: 'cta', label: loc('Button', 'الزر') },
  ],
})
