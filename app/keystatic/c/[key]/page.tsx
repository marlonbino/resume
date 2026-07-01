import { getSectionByKey } from '@/lib/admin-schema'
import { listCollection, deleteCollectionItem } from '@/app/keystatic/actions'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import DeleteItemButton from '@/components/admin/DeleteItemButton'

interface Props {
  params: Promise<{ key: string }>
}

export default async function CollectionListPage({ params }: Props) {
  const { key } = await params

  let section
  try {
    section = getSectionByKey(key)
  } catch {
    notFound()
  }

  if (section.kind !== 'collection') {
    notFound()
  }

  let items: Array<Record<string, unknown>> = []
  try {
    items = await listCollection(key)
  } catch (err) {
    console.error('Failed to list collection:', err)
  }

  // Determine the best display field for each item
  function getDisplayName(item: Record<string, unknown>): string {
    const candidates = ['title', 'heading', 'role', 'org', 'degree', 'label']
    for (const c of candidates) {
      if (typeof item[c] === 'string' && item[c]) return item[c] as string
    }
    return String(item.slug ?? '(unnamed)')
  }

  async function handleDelete(sectionKey: string, slug: string) {
    'use server'
    await deleteCollectionItem(sectionKey, slug)
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="text-xs text-slate-400 uppercase tracking-widest font-semibold mb-1">
            {section.group === 'roseline' ? "Roseline's Site" : "Marlon's Site"}
          </p>
          <h1 className="text-2xl font-bold text-slate-900">{section.label}</h1>
        </div>
        <Link
          href={`/keystatic/c/${key}/new`}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
        >
          + Add new
        </Link>
      </div>

      {items.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm p-12 text-center">
          <p className="text-slate-400 text-sm">No items yet.</p>
          <Link
            href={`/keystatic/c/${key}/new`}
            className="inline-block mt-4 text-sm font-medium text-indigo-600 hover:text-indigo-800"
          >
            Create the first one
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm divide-y divide-slate-100">
          {items.map((item) => {
            const slug = String(item.slug ?? item[section.slugField ?? 'slug'] ?? '')
            const displayName = getDisplayName(item)
            const order = item[section.orderField ?? 'order']

            return (
              <div
                key={slug}
                className="flex items-center justify-between px-4 py-3 hover:bg-slate-50"
              >
                <div className="flex items-center gap-3 min-w-0">
                  {typeof order === 'number' && (
                    <span className="text-xs text-slate-400 w-5 shrink-0 text-right">{order}</span>
                  )}
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-slate-900 truncate">{displayName}</p>
                    <p className="text-xs text-slate-400">{slug}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0 ml-4">
                  <Link
                    href={`/keystatic/c/${key}/${slug}`}
                    className="text-sm font-medium text-indigo-600 hover:text-indigo-800 px-3 py-1.5 rounded-md hover:bg-indigo-50 transition-colors"
                  >
                    Edit
                  </Link>
                  <DeleteItemButton
                    sectionKey={key}
                    slug={slug}
                    displayName={displayName}
                    deleteAction={handleDelete}
                  />
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
