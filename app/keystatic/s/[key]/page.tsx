import { getSectionByKey } from '@/lib/admin-schema'
import { readSingleton } from '@/app/keystatic/actions'
import SingletonForm from '@/components/admin/SingletonForm'
import { notFound } from 'next/navigation'

interface Props {
  params: Promise<{ key: string }>
}

export default async function SingletonPage({ params }: Props) {
  const { key } = await params

  let section
  try {
    section = getSectionByKey(key)
  } catch {
    notFound()
  }

  if (section.kind !== 'singleton') {
    notFound()
  }

  let initialData: Record<string, unknown> = {}
  try {
    initialData = await readSingleton(key)
  } catch (err) {
    console.error('Failed to read singleton:', err)
  }

  return (
    <div>
      <div className="mb-6">
        <p className="text-xs text-slate-400 uppercase tracking-widest font-semibold mb-1">
          {section.group === 'roseline' ? "Roseline's Site" : "Marlon's Site"}
        </p>
        <h1 className="text-2xl font-bold text-slate-900">{section.label}</h1>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6 max-w-2xl">
        <SingletonForm section={section} initialData={initialData} />
      </div>
    </div>
  )
}
