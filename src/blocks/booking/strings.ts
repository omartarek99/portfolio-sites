import { createStrings } from '../_shared'

export const t = createStrings({
  en: {
    chooseType: 'Choose a session',
    chooseDay: 'Choose a day',
    times: 'Available times',
    prevMonth: 'Previous month',
    nextMonth: 'Next month',
    pickDayFirst: 'Pick a day to see the available times.',
    noTimes: 'No free times on this day. Try another one.',
    notSetUp: 'Online booking is not open yet. Please get in touch to arrange a time.',
    loadFailed: 'Times could not be loaded. Please try again.',
    yourTimezone: 'Times are shown in your timezone ({zone}).',
    video: 'Video call',
    phone: 'Phone call',
    in_person: 'In person',
  },
  ar: {
    chooseType: 'اختر الجلسة',
    chooseDay: 'اختر يومًا',
    times: 'الأوقات المتاحة',
    prevMonth: 'الشهر السابق',
    nextMonth: 'الشهر التالي',
    pickDayFirst: 'اختر يومًا لعرض الأوقات المتاحة.',
    noTimes: 'لا توجد أوقات متاحة في هذا اليوم. جرّب يومًا آخر.',
    notSetUp: 'الحجز عبر الإنترنت غير متاح بعد. تواصل معنا لترتيب موعد.',
    loadFailed: 'تعذّر تحميل الأوقات. حاول مرة أخرى.',
    yourTimezone: 'تُعرض الأوقات بحسب منطقتك الزمنية ({zone}).',
    video: 'مكالمة فيديو',
    phone: 'مكالمة هاتفية',
    in_person: 'حضوريًا',
  },
})
