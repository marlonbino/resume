'use client'

import { useState } from 'react'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { SectionDef } from '@/lib/admin-schema'
import { saveCollectionItem, deleteCollectionItem } from '@/app/keystatic/actions'
import FieldInput from './FieldInput'

interface CollectionItemFormProps {
  section: SectionDef
  initialData: Record<string, unknown>
  initialSlug: string
  isNew: boolean
}

function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 60)
}

function deriveSlug(data: Record<string, unknown>): string {
  const candidates = ['title', 'heading', 'org', 'role', 'degree', 'label']
  for (const c of candidates) {
    if (typeof data[c] === 'string' && data[c]) {
      return generateSlug(data[c] as string)
    }
  }
  return ''
}

export default function CollectionItemForm({
  section,
  initialData,
  initialSlug,
  isNew,
}: CollectionItemFormProps) {
  const router = useRouter()
  const [values, setValues] = useState<Record<string, unknown>>(initialData)
  const [slug, setSlug] = useState(initialSlug)
  const [slugEdited, setSlugEdited] = useState(!isNew)
  const [saving, setSaving] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [deleting, setDeleting] = useState(false)

  function handleChange(key: string, value: unknown) {
    setValues((prev) => {
      const next = { ...prev, [key]: value }
      // Auto-generate slug from content fields when creating a new item
      if (isNew && !slugEdited) {
        const derived = deriveSlug(next)
        if (derived) setSlug(derived)
      }
      return next
    })
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const finalSlug = slug || deriveSlug(values)
    if (!finalSlug) {
      toast.error('Enter a title or heading so a slug can be generated.')
      return
    }

    setSaving(true)
    try {
      const result = await saveCollectionItem(section.key, finalSlug, values)
      if (result === 'no-change') {
        toast.info('Nothing changed — no commit needed.')
      } else {
        toast.success(isNew ? 'Created!' : 'Saved!')
        if (isNew) {
          router.push(`/keystatic/c/${section.key}/${finalSlug}`)
        }
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Failed to save')
    } finally {
      setSaving(false)
    }
  }

  async function handleDelete() {
    if (!initialSlug) return
    setDeleting(true)
    try {
      await deleteCollectionItem(section.key, initialSlug)
      toast.success('Deleted')
      router.push(`/keystatic/c/${section.key}`)
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Failed to delete')
      setDeleting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Slug */}
      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-1.5">
          Slug
          {isNew && <span className="text-slate-400 font-normal ml-2 text-xs">(auto-generated)</span>}
        </label>
        <input
          type="text"
          className="border border-slate-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full bg-white text-slate-900"
          value={slug}
          onChange={(e) => { setSlug(e.target.value); setSlugEdited(true) }}
          placeholder="item-slug"
          required
        />
      </div>

      {/* Content fields */}
      {section.fields.map((field) => (
        <div key={field.key}>
          <label className="block text-sm font-semibold text-slate-700 mb-1.5">
            {field.label}
            {field.required && <span className="text-red-500 ml-1">*</span>}
          </label>
          {field.description && (
            <p className="text-xs text-slate-400 mb-1.5">{field.description}</p>
          )}
          <FieldInput
            field={field}
            value={values[field.key]}
            onChange={(v) => handleChange(field.key, v)}
          />
        </div>
      ))}

      {/* Actions */}
      <div className="flex items-center justify-between pt-2">
        <button
          type="submit"
          disabled={saving}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm font-medium disabled:opacity-50 transition-colors"
        >
          {saving ? 'Saving…' : isNew ? 'Create item' : 'Save changes'}
        </button>

        {!isNew && (
          <div>
            {showDeleteConfirm ? (
              <div className="flex items-center gap-2">
                <span className="text-sm text-slate-600">Are you sure?</span>
                <button
                  type="button"
                  onClick={handleDelete}
                  disabled={deleting}
                  className="bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 rounded-md text-sm font-medium disabled:opacity-50"
                >
                  {deleting ? 'Deleting…' : 'Yes, delete'}
                </button>
                <button
                  type="button"
                  onClick={() => setShowDeleteConfirm(false)}
                  className="text-slate-500 hover:text-slate-700 text-sm px-3 py-1.5"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setShowDeleteConfirm(true)}
                className="bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 px-3 py-1.5 rounded-md text-sm font-medium transition-colors"
              >
                Delete item
              </button>
            )}
          </div>
        )}
      </div>
    </form>
  )
}
