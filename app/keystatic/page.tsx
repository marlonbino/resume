import { SECTIONS } from '@/lib/admin-schema'
import Link from 'next/link'

export default function KeystaticDashboard() {
  const roselineSections = SECTIONS.filter((s) => s.group === 'roseline')
  const marlonSections = SECTIONS.filter((s) => s.group === 'marlon')

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900 mb-2">Welcome to Resume CMS</h1>
      <p className="text-slate-500 text-sm mb-8">
        Manage content for both portfolio sites from one place.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Roseline column */}
        <div>
          <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">
            Roseline&apos;s Site
          </h2>
          <div className="flex flex-col gap-3">
            {roselineSections.map((section) => {
              const href =
                section.kind === 'singleton'
                  ? `/keystatic/s/${section.key}`
                  : `/keystatic/c/${section.key}`
              return (
                <div
                  key={section.key}
                  className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-4 flex items-center justify-between"
                >
                  <div>
                    <p className="font-semibold text-slate-900 text-sm">{section.label}</p>
                    <span
                      className={`inline-block mt-1 text-xs px-2 py-0.5 rounded-full font-medium ${
                        section.kind === 'singleton'
                          ? 'bg-indigo-50 text-indigo-600'
                          : 'bg-emerald-50 text-emerald-600'
                      }`}
                    >
                      {section.kind}
                    </span>
                  </div>
                  <Link
                    href={href}
                    className="text-sm font-medium text-indigo-600 hover:text-indigo-800 px-3 py-1.5 rounded-md hover:bg-indigo-50 transition-colors"
                  >
                    Edit
                  </Link>
                </div>
              )
            })}
          </div>
        </div>

        {/* Marlon column */}
        <div>
          <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">
            Marlon&apos;s Site
          </h2>
          <div className="flex flex-col gap-3">
            {marlonSections.map((section) => {
              const href =
                section.kind === 'singleton'
                  ? `/keystatic/s/${section.key}`
                  : `/keystatic/c/${section.key}`
              return (
                <div
                  key={section.key}
                  className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-4 flex items-center justify-between"
                >
                  <div>
                    <p className="font-semibold text-slate-900 text-sm">{section.label}</p>
                    <span
                      className={`inline-block mt-1 text-xs px-2 py-0.5 rounded-full font-medium ${
                        section.kind === 'singleton'
                          ? 'bg-indigo-50 text-indigo-600'
                          : 'bg-emerald-50 text-emerald-600'
                      }`}
                    >
                      {section.kind}
                    </span>
                  </div>
                  <Link
                    href={href}
                    className="text-sm font-medium text-indigo-600 hover:text-indigo-800 px-3 py-1.5 rounded-md hover:bg-indigo-50 transition-colors"
                  >
                    Edit
                  </Link>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
