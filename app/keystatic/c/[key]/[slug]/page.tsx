import { getSectionByKey } from '@/lib/admin-schema'
import { readCollectionItem } from '@/app/keystatic/actions'
import CollectionItemForm from '@/components/admin/CollectionItemForm'
import { notFound } from 'next/navigation'
import Link from 'next/link'

interface Props {
  params: Promise<{ key: string; slug: string }>
}

export default async function CollectionItemPage({ params }: Props) {
  const { key, slug } = await params

  let section
  try {
    section = getSectionByKey(key)
  } catch {
    notFound()
  }

  if (section.kind !== 'collection') {
    notFound()
  }

  const isNew = slug === 'new'
  let initialData: Record<string, unknown> = {}

  if (!isNew) {
    try {
      initialData = await readCollectionItem(key, slug)
    } catch (err) {
      console.error('Failed to read collection item:', err)
      notFound()
    }
  }

  return (
    <div>
      <div className="mb-6">
        <p className="text-xs text-slate-400 uppercase tracking-widest font-semibold mb-1">
          <Link
            href={`/keystatic/c/${key}`}
            className="hover:text-slate-600 transition-colors"
          >
            {section.label}
          </Link>
          {' / '}
          {isNew ? 'New item' : slug}
        </p>
        <h1 className="text-2xl font-bold text-slate-900">
          {isNew ? `New ${section.label} item` : 'Edit item'}
        </h1>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6 max-w-2xl">
        <CollectionItemForm
          section={section}
          initialData={initialData}
          initialSlug={isNew ? '' : slug}
          isNew={isNew}
        />
      </div>
    </div>
  )
}
