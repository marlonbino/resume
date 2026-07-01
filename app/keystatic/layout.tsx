import { SECTIONS } from '@/lib/admin-schema'
import AdminSidebar from '@/components/admin/AdminSidebar'
import { Toaster } from 'sonner'

export default function KeystaticLayout({ children }: { children: React.ReactNode }) {
  const roselineSections = SECTIONS.filter((s) => s.group === 'roseline')
  const marlonSections = SECTIONS.filter((s) => s.group === 'marlon')

  return (
    <>
      <style>{`body { background: #f1f5f9 !important; color: #0f172a !important; }`}</style>
      <div style={{ display: 'flex', minHeight: '100vh' }}>
        <AdminSidebar
          roselineSections={roselineSections.map((s) => ({
            key: s.key,
            label: s.label,
            kind: s.kind,
          }))}
          marlonSections={marlonSections.map((s) => ({
            key: s.key,
            label: s.label,
            kind: s.kind,
          }))}
        />
        <main
          style={{
            marginLeft: 256,
            flex: 1,
            minHeight: '100vh',
            background: '#f1f5f9',
            overflowY: 'auto',
            padding: '32px',
          }}
        >
          {children}
        </main>
      </div>
      <Toaster position="bottom-right" richColors />
    </>
  )
}
