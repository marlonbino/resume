export default function KeystaticLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <style>{`
        body { background: #fff !important; color: #000 !important; }
      `}</style>
      {children}
    </>
  )
}
