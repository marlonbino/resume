import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { deleteCollectionItem } from '@/app/keystatic/actions'

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ key: string }> }
) {
  // Auth check
  const jar = await cookies()
  if (jar.get('ks-auth')?.value !== process.env.KEYSTATIC_ADMIN_PASSWORD) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { key } = await params
  const slug = request.nextUrl.searchParams.get('slug')

  if (!slug) {
    return NextResponse.json({ error: 'Missing slug parameter' }, { status: 400 })
  }

  try {
    await deleteCollectionItem(key, slug)
    return NextResponse.json({ ok: true })
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Unknown error' },
      { status: 500 }
    )
  }
}
