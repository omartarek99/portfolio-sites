import { createStrings } from '../_shared'

export const t = createStrings({
  en: {
    empty: 'Paste a link or embed code from {list}.',
    invalid: 'That does not look like a link or an embed code.',
    host: 'This service cannot be embedded. Allowed: {list}.',
    unsupported: 'This {provider} link cannot be embedded. Copy the link from its Share or Embed button.',
    script: 'Embed codes with scripts are not allowed. Use the iframe variant with a link instead.',
    codeEmpty: 'Paste an HTML snippet. Scripts, frames and styles are removed.',
    frameTitle: 'Embedded content from {provider}',
  },
  ar: {
    empty: 'الصق رابطًا أو شيفرة تضمين من {list}.',
    invalid: 'لا يبدو هذا رابطًا أو شيفرة تضمين.',
    host: 'لا يمكن تضمين هذه الخدمة. الخدمات المسموح بها: {list}.',
    unsupported: 'لا يمكن تضمين رابط {provider} هذا. انسخ الرابط من زر المشاركة أو التضمين.',
    script: 'لا يُسمح بشيفرات التضمين التي تحتوي على سكربتات. استخدم نمط الإطار مع رابط بدلًا منها.',
    codeEmpty: 'الصق مقتطف HTML. تُزال السكربتات والإطارات والأنماط.',
    frameTitle: 'محتوى مضمَّن من {provider}',
  },
})
