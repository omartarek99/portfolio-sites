import { loc } from '@/schemas/fields'
import { defineManifest } from '../types'
import { bookingSchema, type BookingContent } from './schema'

export const manifest = defineManifest<BookingContent>({
  type: 'booking',
  name: loc('Booking', 'الحجز'),
  description: loc('Let visitors pick a session, a day and a time.', 'دع الزوار يختارون الجلسة واليوم والوقت.'),
  icon: 'calendar-check',
  category: 'contact',
  variants: [
    {
      id: 'inline-calendar',
      name: loc('Inline calendar', 'تقويم في الصفحة'),
      description: loc('Sessions, a month view and available times, right on the page.', 'الجلسات وعرض الشهر والأوقات المتاحة مباشرة في الصفحة.'),
      tier: 'free',
    },
    {
      id: 'button-modal',
      name: loc('Button and window', 'زر ونافذة'),
      description: loc('Your sessions at a glance and a button that opens the calendar.', 'جلساتك في لمحة وزر يفتح التقويم.'),
      tier: 'free',
    },
  ],
  schema: bookingSchema,
  defaultContent: {
    eyebrow: loc('Free 20-min intro call', 'مكالمة تعارف مجانية لمدة 20 دقيقة'),
    heading: loc("Let's find your next step together", 'لنكتشف خطوتك التالية معًا'),
    intro: loc(
      'Pick a time that suits you. We will talk about where you are now, where you want to be and whether coaching is the right fit.',
      'اختر الوقت الذي يناسبك. سنتحدث عن وضعك الحالي وما تطمح إليه، وهل التدريب هو الخيار المناسب لك.',
    ),
    meetingTypeIds: [],
    buttonLabel: loc('Check my availability', 'اطّلع على مواعيدي المتاحة'),
    cta: {
      label: loc('Message me to book', 'راسلني لحجز موعد'),
      link: { type: 'page', value: 'contact' },
      icon: 'arrow-right',
    },
    note: loc('Sessions are held in English or Arabic, Sunday to Thursday.', 'تُعقد الجلسات بالعربية أو الإنجليزية، من الأحد إلى الخميس.'),
  },
  editableFields: [
    {
      kind: 'meetingTypes',
      path: 'meetingTypeIds',
      label: loc('Sessions to offer', 'الجلسات المعروضة'),
      help: loc('None selected shows all of them. Manage sessions in Bookings.', 'إذا لم تحدد شيئًا تظهر جميعها. أدِر الجلسات من صفحة الحجوزات.'),
    },
    {
      kind: 'button',
      path: 'cta',
      label: loc('Button when booking is not set up', 'الزر عند عدم إعداد الحجز'),
      help: loc('Shown instead of the calendar until you add a session, e.g. a link to your contact page.', 'يظهر بدل التقويم حتى تضيف جلسة، مثل رابط لصفحة التواصل.'),
    },
  ],
})
