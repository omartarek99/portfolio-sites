import { createStrings } from '../_shared'

export const ht = createStrings({
  en: {
    pauseSlides: 'Pause slideshow',
    playSlides: 'Play slideshow',
    terminal: 'Terminal',
    terminalInput: 'Type a command and press Enter',
    terminalHint: 'Try:',
    terminalRun: 'Run',
    terminalAvailable: 'Available commands: {list}',
    terminalNotFound: 'Command not found: {command}. Type help.',
  },
  ar: {
    pauseSlides: 'إيقاف عرض الصور',
    playSlides: 'تشغيل عرض الصور',
    terminal: 'الطرفية',
    terminalInput: 'اكتب أمرًا ثم اضغط Enter',
    terminalHint: 'جرّب:',
    terminalRun: 'تنفيذ',
    terminalAvailable: 'الأوامر المتاحة: {list}',
    terminalNotFound: 'أمر غير معروف: {command}. اكتب help.',
  },
})
