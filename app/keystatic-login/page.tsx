import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

async function login(formData: FormData) {
  'use server'
  const password = formData.get('password') as string

  if (!password || password !== process.env.KEYSTATIC_ADMIN_PASSWORD) {
    redirect('/keystatic-login?error=1')
  }

  const jar = await cookies()

  // Gate for our middleware — 7-day session
  jar.set('ks-auth', password, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24 * 7,
    path: '/',
  })

  // Pre-authorise Keystatic by injecting the GitHub PAT as the access-token cookie.
  // Keystatic reads this cookie on every API call instead of doing OAuth per user.
  if (process.env.KEYSTATIC_GITHUB_PAT) {
    jar.set('keystatic-gh-access-token', process.env.KEYSTATIC_GITHUB_PAT, {
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 365, // 1 year — refreshed on next password login
      path: '/',
    })
  }

  redirect('/keystatic')
}

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; from?: string }>
}) {
  const params = await searchParams
  const hasError = params.error === '1'

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#0d0b12',
        fontFamily: 'Inter, sans-serif',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: 360,
          padding: '48px 40px',
          border: '1px solid rgba(160,120,220,0.18)',
          background: '#110e18',
        }}
      >
        <p
          style={{
            fontSize: 11,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: '#8b5cf6',
            marginBottom: 24,
            fontWeight: 600,
          }}
        >
          Resume CMS
        </p>
        <h1
          style={{
            fontFamily: 'Georgia, serif',
            fontStyle: 'italic',
            fontWeight: 400,
            fontSize: '1.75rem',
            color: '#f2eeff',
            marginBottom: 32,
            lineHeight: 1.2,
          }}
        >
          Admin access
        </h1>

        <form action={login}>
          <div style={{ marginBottom: 24 }}>
            <input
              name="password"
              type="password"
              placeholder="Password"
              autoComplete="current-password"
              required
              style={{
                display: 'block',
                width: '100%',
                background: 'transparent',
                border: 'none',
                borderBottom: hasError
                  ? '1px solid #e07a5f'
                  : '1px solid rgba(160,120,220,0.35)',
                outline: 'none',
                fontFamily: 'Georgia, serif',
                fontSize: 16,
                color: '#f2eeff',
                padding: '10px 0',
                boxSizing: 'border-box',
              }}
            />
            {hasError && (
              <p
                style={{
                  marginTop: 8,
                  fontSize: 12,
                  color: '#e07a5f',
                  fontFamily: 'Inter, sans-serif',
                }}
              >
                Incorrect password.
              </p>
            )}
          </div>

          <button
            type="submit"
            style={{
              background: '#8b5cf6',
              color: '#f2eeff',
              border: 'none',
              padding: '10px 24px',
              fontFamily: 'Inter, sans-serif',
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              cursor: 'pointer',
              width: '100%',
            }}
          >
            Enter
          </button>
        </form>
      </div>
    </div>
  )
}
