'use client'

import { usePathname } from 'next/navigation'
import {
  User,
  BookOpen,
  Mail,
  BarChart2,
  Briefcase,
  GraduationCap,
  FolderOpen,
  Footprints,
  Brain,
  Rocket,
  LayoutDashboard,
} from 'lucide-react'

interface NavSection {
  key: string
  label: string
  kind: 'singleton' | 'collection'
}

interface AdminSidebarProps {
  roselineSections: NavSection[]
  marlonSections: NavSection[]
}

const ICON_MAP: Record<string, React.ReactNode> = {
  hero: <User size={15} />,
  about: <BookOpen size={15} />,
  contact: <Mail size={15} />,
  impact: <BarChart2 size={15} />,
  experience: <Briefcase size={15} />,
  education: <GraduationCap size={15} />,
  projects_roseline: <FolderOpen size={15} />,
  steps: <Footprints size={15} />,
  expertise: <Brain size={15} />,
  projects_marlon: <Rocket size={15} />,
}

function getIcon(key: string): React.ReactNode {
  if (key.includes('hero')) return ICON_MAP.hero
  if (key.includes('about')) return ICON_MAP.about
  if (key.includes('contact')) return ICON_MAP.contact
  if (key.includes('impact')) return ICON_MAP.impact
  if (key.includes('experience')) return ICON_MAP.experience
  if (key.includes('education')) return ICON_MAP.education
  if (key.includes('steps')) return ICON_MAP.steps
  if (key.includes('expertise')) return ICON_MAP.expertise
  if (key.startsWith('marlon') && key.includes('projects')) return ICON_MAP.projects_marlon
  if (key.includes('projects')) return ICON_MAP.projects_roseline
  return <FolderOpen size={15} />
}

function NavLink({
  href,
  label,
  icon,
  active,
}: {
  href: string
  label: string
  icon: React.ReactNode
  active: boolean
}) {
  return (
    <a
      href={href}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        padding: '7px 12px',
        borderRadius: 6,
        fontSize: 13,
        fontWeight: 500,
        color: active ? '#ffffff' : '#94a3b8',
        background: active ? '#1e40af' : 'transparent',
        textDecoration: 'none',
        transition: 'background 0.15s, color 0.15s',
      }}
      onMouseEnter={(e) => {
        if (!active) {
          ;(e.currentTarget as HTMLAnchorElement).style.background = 'rgba(148,163,184,0.1)'
          ;(e.currentTarget as HTMLAnchorElement).style.color = '#e2e8f0'
        }
      }}
      onMouseLeave={(e) => {
        if (!active) {
          ;(e.currentTarget as HTMLAnchorElement).style.background = 'transparent'
          ;(e.currentTarget as HTMLAnchorElement).style.color = '#94a3b8'
        }
      }}
    >
      <span style={{ flexShrink: 0, opacity: active ? 1 : 0.7 }}>{icon}</span>
      {label}
    </a>
  )
}

export default function AdminSidebar({ roselineSections, marlonSections }: AdminSidebarProps) {
  const pathname = usePathname()

  function isActive(key: string, kind: 'singleton' | 'collection'): boolean {
    const prefix = kind === 'singleton' ? `/keystatic/s/${key}` : `/keystatic/c/${key}`
    return pathname.startsWith(prefix)
  }

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: 256,
        height: '100vh',
        background: '#0f172a',
        display: 'flex',
        flexDirection: 'column',
        zIndex: 50,
        overflowY: 'auto',
      }}
    >
      {/* Brand */}
      <div style={{ padding: '20px 16px 16px', borderBottom: '1px solid rgba(148,163,184,0.1)' }}>
        <a
          href="/keystatic"
          style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8 }}
        >
          <span
            style={{
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: '#6366f1',
            }}
          >
            Resume CMS
          </span>
        </a>
      </div>

      {/* Dashboard link */}
      <div style={{ padding: '8px 8px 0' }}>
        <NavLink
          href="/keystatic"
          label="Dashboard"
          icon={<LayoutDashboard size={15} />}
          active={pathname === '/keystatic'}
        />
      </div>

      {/* Roseline group */}
      <div style={{ padding: '16px 8px 8px' }}>
        <p
          style={{
            fontSize: 10,
            fontWeight: 700,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: '#475569',
            padding: '0 4px',
            marginBottom: 6,
          }}
        >
          Roseline&apos;s Site
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          {roselineSections.map((s) => {
            const href = s.kind === 'singleton' ? `/keystatic/s/${s.key}` : `/keystatic/c/${s.key}`
            return (
              <NavLink
                key={s.key}
                href={href}
                label={s.label}
                icon={getIcon(s.key)}
                active={isActive(s.key, s.kind)}
              />
            )
          })}
        </div>
      </div>

      {/* Marlon group */}
      <div style={{ padding: '16px 8px 8px' }}>
        <p
          style={{
            fontSize: 10,
            fontWeight: 700,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: '#475569',
            padding: '0 4px',
            marginBottom: 6,
          }}
        >
          Marlon&apos;s Site
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          {marlonSections.map((s) => {
            const href = s.kind === 'singleton' ? `/keystatic/s/${s.key}` : `/keystatic/c/${s.key}`
            return (
              <NavLink
                key={s.key}
                href={href}
                label={s.label}
                icon={getIcon(s.key)}
                active={isActive(s.key, s.kind)}
              />
            )
          })}
        </div>
      </div>

      {/* Spacer */}
      <div style={{ flex: 1 }} />

      {/* Logout */}
      <div style={{ padding: '12px 8px 16px', borderTop: '1px solid rgba(148,163,184,0.1)' }}>
        <a
          href="/keystatic-login"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            padding: '7px 12px',
            borderRadius: 6,
            fontSize: 13,
            fontWeight: 500,
            color: '#94a3b8',
            textDecoration: 'none',
          }}
          onMouseEnter={(e) => {
            ;(e.currentTarget as HTMLAnchorElement).style.color = '#e2e8f0'
            ;(e.currentTarget as HTMLAnchorElement).style.background = 'rgba(148,163,184,0.1)'
          }}
          onMouseLeave={(e) => {
            ;(e.currentTarget as HTMLAnchorElement).style.color = '#94a3b8'
            ;(e.currentTarget as HTMLAnchorElement).style.background = 'transparent'
          }}
        >
          <svg
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
            <polyline points="16 17 21 12 16 7" />
            <line x1="21" y1="12" x2="9" y2="12" />
          </svg>
          Log out
        </a>
      </div>
    </div>
  )
}
