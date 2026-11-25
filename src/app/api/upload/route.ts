import { handleUpload, type HandleUploadBody } from '@vercel/blob/client'
import { NextResponse } from 'next/server'
import { UPLOAD_MAX_BYTES, UPLOAD_TYPES } from '@/lib/uploads'

/**
 * Issues short-lived tokens so the browser uploads enquiry files straight to
 * Vercel Blob (BLOB_READ_WRITE_TOKEN). The limits are enforced by Blob itself.
 */
export async function POST(request: Request): Promise<NextResponse> {
  try {
    const body = (await request.json()) as HandleUploadBody
    const result = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async (pathname) => {
        if (!pathname.startsWith('enquiries/')) throw new Error('Uploads go to enquiries/ only.')
        return { allowedContentTypes: UPLOAD_TYPES, maximumSizeInBytes: UPLOAD_MAX_BYTES, addRandomSuffix: true }
      },
    })
    return NextResponse.json(result)
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Upload failed' }, { status: 400 })
  }
}
