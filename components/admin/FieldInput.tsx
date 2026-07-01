'use client'

import { useState, useRef, KeyboardEvent } from 'react'
import { uploadImageFile } from '@/app/keystatic/actions'
import { toast } from 'sonner'
import { FieldDef } from '@/lib/admin-schema'

const inputClass =
  'border border-slate-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full bg-white text-slate-900'

interface FieldInputProps {
  field: FieldDef
  value: unknown
  onChange: (value: unknown) => void
}

export default function FieldInput({ field, value, onChange }: FieldInputProps) {
  const { type } = field

  if (type === 'text') {
    return (
      <input
        type="text"
        className={inputClass}
        value={typeof value === 'string' ? value : ''}
        onChange={(e) => onChange(e.target.value)}
        required={field.required}
      />
    )
  }

  if (type === 'multiline') {
    return (
      <textarea
        className={inputClass}
        rows={4}
        value={typeof value === 'string' ? value : ''}
        onChange={(e) => onChange(e.target.value)}
        required={field.required}
      />
    )
  }

  if (type === 'integer') {
    return (
      <input
        type="number"
        className={inputClass}
        value={typeof value === 'number' ? value : typeof value === 'string' ? value : ''}
        onChange={(e) => onChange(e.target.value === '' ? '' : Number(e.target.value))}
        required={field.required}
      />
    )
  }

  if (type === 'select') {
    return (
      <select
        className={inputClass}
        value={typeof value === 'string' ? value : ''}
        onChange={(e) => onChange(e.target.value)}
        required={field.required}
      >
        <option value="">— select —</option>
        {field.options?.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    )
  }

  if (type === 'tags') {
    return <TagsInput value={value} onChange={onChange} />
  }

  if (type === 'image') {
    return <ImageInput field={field} value={value} onChange={onChange} />
  }

  return (
    <input
      type="text"
      className={inputClass}
      value={typeof value === 'string' ? value : ''}
      onChange={(e) => onChange(e.target.value)}
    />
  )
}

function TagsInput({ value, onChange }: { value: unknown; onChange: (v: unknown) => void }) {
  const tags = Array.isArray(value) ? (value as string[]) : []
  const [inputVal, setInputVal] = useState('')

  function addTag() {
    const trimmed = inputVal.trim()
    if (trimmed && !tags.includes(trimmed)) {
      onChange([...tags, trimmed])
    }
    setInputVal('')
  }

  function removeTag(tag: string) {
    onChange(tags.filter((t) => t !== tag))
  }

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      e.preventDefault()
      addTag()
    } else if (e.key === 'Backspace' && inputVal === '' && tags.length > 0) {
      removeTag(tags[tags.length - 1])
    }
  }

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap gap-1.5 min-h-[36px]">
        {tags.map((tag) => (
          <span
            key={tag}
            className="inline-flex items-center gap-1 bg-indigo-50 text-indigo-700 text-xs px-2 py-1 rounded-full font-medium"
          >
            {tag}
            <button
              type="button"
              onClick={() => removeTag(tag)}
              className="text-indigo-400 hover:text-indigo-700 leading-none"
              aria-label={`Remove ${tag}`}
            >
              ×
            </button>
          </span>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          type="text"
          className={inputClass}
          placeholder="Add tag and press Enter"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button
          type="button"
          onClick={addTag}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-2 rounded-md text-sm font-medium shrink-0"
        >
          Add
        </button>
      </div>
    </div>
  )
}

function ImageInput({
  field,
  value,
  onChange,
}: {
  field: FieldDef
  value: unknown
  onChange: (v: unknown) => void
}) {
  const [uploading, setUploading] = useState(false)
  const fileRef = useRef<HTMLInputElement>(null)

  async function handleUpload(file: File) {
    setUploading(true)
    try {
      const fd = new FormData()
      fd.append('file', file)
      const result = await uploadImageFile(fd)
      onChange(`/${result.filename}`)
      toast.success(`Uploaded ${result.filename}`)
    } catch (err) {
      toast.error(`Upload failed: ${err instanceof Error ? err.message : 'Unknown error'}`)
    } finally {
      setUploading(false)
    }
  }

  const currentFilename = typeof value === 'string' ? value : ''

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-3">
        <input
          type="text"
          className={inputClass}
          placeholder="/filename.jpg"
          value={currentFilename}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
      {field.description && (
        <p className="text-xs text-slate-400">{field.description}</p>
      )}
      <div>
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0]
            if (file) handleUpload(file)
          }}
        />
        <button
          type="button"
          disabled={uploading}
          onClick={() => fileRef.current?.click()}
          className="text-sm font-medium bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-1.5 rounded-md transition-colors disabled:opacity-50"
        >
          {uploading ? 'Uploading…' : 'Upload Image'}
        </button>
      </div>
    </div>
  )
}
