'use client'

import { useState } from 'react'
import { toast } from 'sonner'
import { SectionDef } from '@/lib/admin-schema'
import { saveSingleton } from '@/app/keystatic/actions'
import FieldInput from './FieldInput'

interface SingletonFormProps {
  section: SectionDef
  initialData: Record<string, unknown>
}

export default function SingletonForm({ section, initialData }: SingletonFormProps) {
  const [values, setValues] = useState<Record<string, unknown>>(initialData)
  const [saving, setSaving] = useState(false)

  function handleChange(key: string, value: unknown) {
    setValues((prev) => ({ ...prev, [key]: value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    try {
      const result = await saveSingleton(section.key, values)
      if (result === 'no-change') {
        toast.info('Nothing changed — no commit needed.')
      } else {
        toast.success('Saved!')
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Failed to save')
    } finally {
      setSaving(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
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

      <div className="pt-2">
        <button
          type="submit"
          disabled={saving}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm font-medium disabled:opacity-50 transition-colors"
        >
          {saving ? 'Saving…' : 'Save changes'}
        </button>
      </div>
    </form>
  )
}
