import { loc, type ImageRef } from '@/schemas/fields'
import { defineManifest } from '../types'
import { VIDEO_COLUMNS, videoSchema, type VideoContent, type VideoItem } from './schema'

function poster(id: string, en: string, ar: string): ImageRef {
  return { url: `/stock/${id}.svg`, width: 1920, height: 1080, alt: loc(en, ar) }
}

/**
 * Example videos have no URL: the bundled library has posters only, so the
 * section shows them until the owner pastes a link or uploads a file.
 */
function item(id: string, art: string, title: VideoItem['title'], description: VideoItem['description'], duration: string, category: string): VideoItem {
  return { id, video: { url: '', poster: poster(art, title?.en ?? '', title?.ar ?? '') }, title, description, duration, category }
}

export const manifest = defineManifest<VideoContent>({
  type: 'video',
  name: loc('Video', 'فيديو'),
  description: loc('A showreel, an embedded video or a grid of films that open full screen.', 'عرض أعمال أو فيديو مضمَّن أو شبكة أفلام تُفتح بملء الشاشة.'),
  icon: 'video',
  category: 'media',
  variants: [
    { id: 'embed', name: loc('Embed', 'فيديو مضمَّن'), description: loc('One YouTube, Vimeo or uploaded video.', 'فيديو واحد من يوتيوب أو فيميو أو مرفوع.'), tier: 'free' },
    { id: 'reel', name: loc('Showreel', 'عرض الأعمال'), description: loc('A large uploaded reel that can start muted.', 'عرض كبير مرفوع يمكن أن يبدأ دون صوت.'), tier: 'pro' },
    { id: 'grid', name: loc('Video grid', 'شبكة فيديو'), description: loc('Posters that preview on hover and open full screen.', 'ملصقات تُعرض لمحتها عند التمرير وتُفتح بملء الشاشة.'), tier: 'pro' },
  ],
  schema: videoSchema,
  defaultContent: {
    eyebrow: loc('Showreel 2026', 'عرض أعمال 2026'),
    heading: loc('Films that move people', 'أفلام تحرّك مشاعر الناس'),
    intro: loc(
      'Commercials, event films and motion graphics shot across the Gulf. Select a film to watch it full screen.',
      'إعلانات وأفلام مناسبات ورسوم متحركة صوّرتها في أنحاء الخليج. اختر فيلمًا لمشاهدته بملء الشاشة.',
    ),
    categories: [
      { id: 'commercials', label: loc('Commercials', 'إعلانات') },
      { id: 'events', label: loc('Event films', 'أفلام المناسبات') },
      { id: 'motion', label: loc('Motion graphics', 'رسوم متحركة') },
    ],
    items: [
      item(
        'v1',
        'city-dusk',
        loc('Corniche Run', 'جري الكورنيش'),
        loc('A dawn-to-dusk spot for a sports brand, shot along the Abu Dhabi Corniche.', 'إعلان لعلامة رياضية من الفجر حتى الغروب، صُوّر على امتداد كورنيش أبوظبي.'),
        '1:45',
        'commercials',
      ),
      item(
        'v2',
        'event-dusk',
        loc('Gala Night Highlights', 'أبرز لحظات ليلة الحفل'),
        loc('Three cameras, one evening: the annual gala of a Doha arts foundation.', 'ثلاث كاميرات وأمسية واحدة: الحفل السنوي لمؤسسة فنية في الدوحة.'),
        '3:20',
        'events',
      ),
      item(
        'v3',
        'app-slate',
        loc('Explainer: SmartGrid', 'فيلم تعريفي: سمارت غريد'),
        loc('A 60-second animated explainer for an energy start-up.', 'فيلم تعريفي متحرك مدته 60 ثانية لشركة ناشئة في الطاقة.'),
        '1:00',
        'motion',
      ),
      item(
        'v4',
        'nature-sand',
        loc('Liwa Rally', 'رالي ليوا'),
        loc('Drone and ground footage of four days in the dunes.', 'لقطات جوية وأرضية لأربعة أيام بين الكثبان.'),
        '2:10',
        'commercials',
      ),
      item(
        'v5',
        'event-blush',
        loc('A Wedding in Muscat', 'عرس في مسقط'),
        loc('A short film of a family celebration, told through its quiet moments.', 'فيلم قصير عن احتفال عائلي، يُروى من خلال لحظاته الهادئة.'),
        '4:05',
        'events',
      ),
      item(
        'v6',
        'workspace-dusk',
        loc('Title Sequence: Al Sail', 'شارة البداية: السَّيل'),
        loc('Opening titles for a drama series, built from hand-drawn Arabic letterforms.', 'شارة افتتاحية لمسلسل درامي مبنية من حروف عربية مرسومة يدويًا.'),
        '0:45',
        'motion',
      ),
    ],
    autoplay: true,
    columns: '3',
    cta: { label: loc('Start a project', 'ابدأ مشروعًا'), link: { type: 'anchor', value: 'contact' }, style: 'outline' },
  },
  editableFields: [
    {
      kind: 'boolean',
      path: 'autoplay',
      label: loc('Start muted and looping', 'بدء التشغيل دون صوت وبشكل متكرر'),
      help: loc('Uploaded videos only. Visitors get a “Play with sound” button.', 'للفيديوهات المرفوعة فقط. يظهر للزوار زر «تشغيل بالصوت».'),
      variants: ['reel'],
    },
    {
      kind: 'select',
      path: 'columns',
      label: loc('Columns on large screens', 'الأعمدة على الشاشات الكبيرة'),
      variants: ['grid'],
      options: VIDEO_COLUMNS.map((value) => ({ value, label: loc(value, value) })),
    },
    { kind: 'boolean', path: 'showFilter', label: loc('Show category filter', 'إظهار التصفية حسب الفئة'), variants: ['grid'] },
    {
      kind: 'list',
      path: 'categories',
      label: loc('Categories', 'الفئات'),
      itemLabel: loc('Category', 'فئة'),
      titlePath: 'label',
      max: 12,
      variants: ['grid'],
      fields: [
        { kind: 'text', path: 'label', label: loc('Name', 'الاسم') },
        { kind: 'string', path: 'id', label: loc('Id', 'المعرّف'), help: loc('Videos refer to a category by this id.', 'تشير الفيديوهات إلى الفئة بهذا المعرّف.') },
      ],
      defaultItem: { label: loc('New category', 'فئة جديدة') },
    },
    {
      kind: 'list',
      path: 'items',
      label: loc('Videos', 'الفيديوهات'),
      help: loc('Embed and showreel play the first video.', 'يعرض نمطا «مضمَّن» و«عرض الأعمال» الفيديو الأول فقط.'),
      itemLabel: loc('Video', 'فيديو'),
      titlePath: 'title',
      max: 24,
      fields: [
        { kind: 'video', path: 'video', label: loc('Video', 'الفيديو'), help: loc('A YouTube or Vimeo link, or an uploaded file.', 'رابط يوتيوب أو فيميو، أو ملف مرفوع.') },
        { kind: 'string', path: 'duration', label: loc('Duration label', 'مدة الفيديو'), placeholder: '1:45' },
        {
          kind: 'string',
          path: 'category',
          label: loc('Category id', 'معرّف الفئة'),
          help: loc('The id of one of the categories of this section.', 'معرّف إحدى فئات هذا القسم.'),
          variants: ['grid'],
        },
      ],
      defaultItem: { video: { url: '' }, title: loc('New video', 'فيديو جديد') },
    },
    { kind: 'button', path: 'cta', label: loc('Button under the videos', 'زر أسفل الفيديوهات') },
  ],
})
