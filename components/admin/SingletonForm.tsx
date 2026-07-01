'use client'

import { useForm, Controller } from 'react-hook-form'
import { toast } from 'sonner'
import { SectionDef } from '@/lib/admin-schema'
import { saveSingleton } from '@/app/keystatic/actions'
import FieldInput from './FieldInput'

interface SingletonFormProps {
  section: SectionDef
  initialData: Record<string, unknown>
}

export default function SingletonForm({ section, initialData }: SingletonFormProps) {
  const { control, handleSubmit, formState: { isSubmitting } } = useForm<Record<string, unknown>>({
    defaultValues: initialData,
  })

  async function onSubmit(data: Record<string, unknown>) {
    try {
      await saveSingleton(section.key, data)
      toast.success('Saved!')
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Failed to save')
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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

      <div className="pt-2">
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm font-medium disabled:opacity-50 transition-colors"
        >
          {isSubmitting ? 'Saving…' : 'Save changes'}
        </button>
      </div>
    </form>
  )
}
