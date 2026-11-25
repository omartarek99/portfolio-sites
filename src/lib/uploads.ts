/** What the enquiry form accepts (shared by the form and /api/upload). Isomorphic. */
export const UPLOAD_TYPES = [
  'image/*',
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/vnd.ms-powerpoint',
  'application/vnd.openxmlformats-officedocument.presentationml.presentation',
]
/** For the file picker's `accept`. */
export const UPLOAD_ACCEPT = ['image/*', '.pdf', '.doc', '.docx', '.ppt', '.pptx'].join(',')
export const UPLOAD_MAX_BYTES = 10 * 1024 * 1024
export const UPLOAD_MAX_FILES = 3
