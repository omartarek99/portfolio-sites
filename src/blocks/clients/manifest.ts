import { loc } from '@/schemas/fields'
import { defineManifest } from '../types'
import { clientsSchema, type ClientsContent } from './schema'

const client = (id: string, en: string, ar: string) => ({ id, name: loc(en, ar) })

export const manifest = defineManifest<ClientsContent>({
  type: 'clients',
  name: loc('Clients & logos', 'العملاء والشعارات'),
  description: loc(
    'The brands and teams you have worked with, as logos or wordmarks.',
    'العلامات والفرق التي عملت معها، بشعاراتها أو بأسمائها.',
  ),
  icon: 'building',
  category: 'social-proof',
  variants: [
    {
      id: 'marquee',
      name: loc('Marquee', 'شريط متحرك'),
      description: loc('A slow, endless strip of logos.', 'شريط شعارات يتحرك ببطء بلا نهاية.'),
      tier: 'free',
    },
    {
      id: 'grid',
      name: loc('Grid', 'شبكة'),
      description: loc('Logos evenly spaced in rows.', 'شعارات موزعة بالتساوي في صفوف.'),
      tier: 'free',
    },
  ],
  schema: clientsSchema,
  defaultContent: {
    eyebrow: loc('Clients', 'العملاء'),
    heading: loc('Trusted by teams across the Gulf', 'فرق في أنحاء الخليج وثقت بعملي'),
    greyscale: true,
    items: [
      client('c1', 'Sahra Coffee', 'قهوة صحرا'),
      client('c2', 'Marsa Ventures', 'مرسى للاستثمار'),
      client('c3', 'Wadi Labs', 'مختبرات وادي'),
      client('c4', 'Qamar Hotels', 'فنادق قمر'),
      client('c5', 'Najma Studio', 'استوديو نجمة'),
      client('c6', 'Dar Falak', 'دار فلك'),
    ],
  },
  editableFields: [
    {
      kind: 'list',
      path: 'items',
      label: loc('Clients', 'العملاء'),
      itemLabel: loc('Client', 'عميل'),
      titlePath: 'name',
      fields: [
        { kind: 'text', path: 'name', label: loc('Name', 'الاسم') },
        {
          kind: 'image',
          path: 'logo',
          label: loc('Logo', 'الشعار'),
          help: loc('Without a logo, the name is shown as a wordmark.', 'عند غياب الشعار يظهر الاسم مكتوبًا بدلًا منه.'),
        },
      ],
      defaultItem: { name: loc('Client name', 'اسم العميل') },
    },
    { kind: 'boolean', path: 'greyscale', label: loc('Greyscale until hover', 'رمادي حتى المرور عليه') },
  ],
})
