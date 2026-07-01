'use client'

import { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
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
  return `item-${Date.now()}`
}

export default function CollectionItemForm({
  section,
  initialData,
  initialSlug,
  isNew,
}: CollectionItemFormProps) {
  const router = useRouter()
  const [slug, setSlug] = useState(initialSlug)
  const [slugEdited, setSlugEdited] = useState(!isNew)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [deleting, setDeleting] = useState(false)

  const { control, handleSubmit, watch, formState: { isSubmitting } } =
    useForm<Record<string, unknown>>({
      defaultValues: initialData,
    })

  // Auto-generate slug from the first text field when creating
  const watchedValues = watch()
  if (isNew && !slugEdited) {
    const derived = deriveSlug(watchedValues)
    if (derived && derived !== slug) {
      setSlug(derived)
    }
  }

  async function onSubmit(data: Record<string, unknown>) {
    const finalSlug = slug || deriveSlug(data)
    if (!finalSlug) {
      toast.error('Could not determine a slug. Please fill in a title or heading.')
      return
    }

    try {
      await saveCollectionItem(section.key, finalSlug, data)
      toast.success(isNew ? 'Created!' : 'Saved!')
      if (isNew) {
        router.push(`/keystatic/c/${section.key}/${finalSlug}`)
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Failed to save')
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
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Slug field */}
      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-1.5">
          Slug
          {isNew && (
            <span className="text-slate-400 font-normal ml-2 text-xs">(auto-generated)</span>
          )}
        </label>
        <input
          type="text"
          className="border border-slate-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full bg-white text-slate-900"
          value={slug}
          onChange={(e) => {
            setSlug(e.target.value)
            setSlugEdited(true)
          }}
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
          <Controller
            name={field.key}
            control={control}
            render={({ field: { value, onChange } }) => (
              <FieldInput field={field} value={value} onChange={onChange} />
            )}
          />
        </div>
      ))}

      {/* Action buttons */}
      <div className="flex items-center justify-between pt-2">
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm font-medium disabled:opacity-50 transition-colors"
        >
          {isSubmitting ? 'Saving…' : isNew ? 'Create item' : 'Save changes'}
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
