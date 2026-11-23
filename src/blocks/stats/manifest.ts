import { loc } from '@/schemas/fields'
import { defineManifest } from '../types'
import { statsSchema, type StatsContent } from './schema'

export const manifest = defineManifest<StatsContent>({
  type: 'stats',
  name: loc('Stats', 'الأرقام'),
  description: loc('A few numbers that sum up your work.', 'أرقام قليلة تلخّص عملك.'),
  icon: 'bar-chart',
  category: 'social-proof',
  variants: [
    {
      id: 'counters',
      name: loc('Animated counters', 'عدّادات متحركة'),
      description: loc('Numbers count up as they scroll into view.', 'تتصاعد الأرقام عند ظهورها في الشاشة.'),
      tier: 'free',
    },
    {
      id: 'row',
      name: loc('Row', 'صف'),
      description: loc('A compact row with thin separators.', 'صف مختصر تفصله خطوط رفيعة.'),
      tier: 'free',
    },
    {
      id: 'big-numbers',
      name: loc('Big numbers', 'أرقام كبيرة'),
      description: loc('Oversized numerals with labels beneath.', 'أرقام بحجم كبير وتحتها التسميات.'),
      tier: 'free',
    },
  ],
  schema: statsSchema,
  defaultContent: {
    eyebrow: loc('In numbers', 'بالأرقام'),
    heading: loc('Two decades of practice', 'عقدان من الممارسة'),
    intro: loc(
      'Advising ministries, universities and schools on education policy across the region.',
      'تقديم المشورة للوزارات والجامعات والمدارس في سياسات التعليم على مستوى المنطقة.',
    ),
    items: [
      {
        id: 's1',
        value: '20+',
        label: loc('Years of experience', 'عامًا من الخبرة'),
        description: loc('In policy, curriculum and leadership.', 'في السياسات والمناهج والقيادة.'),
        icon: 'calendar',
      },
      {
        id: 's2',
        value: '35',
        label: loc('National projects', 'مشروعًا وطنيًا'),
        description: loc('Delivered with public-sector partners.', 'نُفّذت مع شركاء من القطاع الحكومي.'),
        icon: 'flag',
      },
      {
        id: 's3',
        value: '12',
        label: loc('Research papers', 'ورقة بحثية'),
        description: loc('Published in peer-reviewed journals.', 'منشورة في مجلات محكّمة.'),
        icon: 'book-open',
      },
      {
        id: 's4',
        value: '96%',
        label: loc('Clients who return', 'من العملاء يعودون'),
        description: loc('For a second engagement or more.', 'لتعاون ثانٍ أو أكثر.'),
        icon: 'users',
      },
    ],
  },
  editableFields: [
    {
      kind: 'list',
      path: 'items',
      label: loc('Numbers', 'الأرقام'),
      itemLabel: loc('Number', 'رقم'),
      titlePath: 'label',
      max: 8,
      fields: [
        {
          kind: 'string',
          path: 'value',
          label: loc('Value', 'القيمة'),
          help: loc('Written as you want it shown: 40+, 3×, 96%.', 'اكتبها كما تريد أن تظهر: ‎40+‎ أو ‎3×‎ أو ‎96%‎.'),
          placeholder: '40+',
        },
        { kind: 'text', path: 'label', label: loc('Label', 'التسمية') },
        { kind: 'text', path: 'description', label: loc('Description', 'الوصف') },
        { kind: 'icon', path: 'icon', label: loc('Icon', 'الأيقونة') },
      ],
      defaultItem: { value: '10+', label: loc('Label', 'التسمية') },
    },
  ],
})
