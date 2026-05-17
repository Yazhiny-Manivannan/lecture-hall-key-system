import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../api/axios'
import Input from '../components/Input'
import Button from '../components/Button'

const styles = `
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --bg: #0A0A0A;
    --card: #111111;
    --surface: #181818;
    --border: #252525;
    --text: #F0EDE8;
    --text-muted: ##A0A0A0;
    --accent: #3B82F6;
    --danger: #FF5050;
    --font-display: 'Syne', sans-serif;
    --font-body: 'DM Sans', sans-serif;
    --font-mono: 'DM Mono', monospace;
  }

  body { background: var(--bg); color: var(--text); font-family: var(--font-body); }

  @keyframes spin { to { transform: rotate(360deg); } }
  @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
  @keyframes slideUp { from { transform: translateY(16px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }

  input:-webkit-autofill,
  input:-webkit-autofill:hover,
  input:-webkit-autofill:focus {
    -webkit-box-shadow: 0 0 0 1000px #181818 inset;
    -webkit-text-fill-color: #F0EDE8;
    caret-color: #F0EDE8;
    transition: background-color 5000s ease-in-out 0s;
  }

  ::-webkit-scrollbar { width: 4px; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb { background: var(--border); border-radius: 4px; }
`

export default function LoginPage() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', password: '' })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [apiError, setApiError] = useState('')

  const validate = () => {
    const e = {}
    if (!form.email.trim()) e.email = 'Email is required'
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Invalid email format'
    if (!form.password) e.password = 'Password is required'
    return e
  }

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    setErrors((prev) => ({ ...prev, [e.target.name]: '' }))
    setApiError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const v = validate()
    if (Object.keys(v).length > 0) { setErrors(v); return }

    setLoading(true)
    try {
      const res = await api.post('/api/auth/login', form)
      localStorage.setItem('token', res.data.token)
      localStorage.setItem('role', res.data.role)
      navigate('/dashboard')
    } catch (err) {
      setApiError(err.response?.data?.message || 'Login failed. Check your credentials.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <style>{styles}</style>
      <div
        style={{
          minHeight: '100vh',
          display: 'flex',
          background: 'var(--bg)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Background grid decoration */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage:
              'linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
            opacity: 0.4,
            pointerEvents: 'none',
          }}
        />

        {/* Left branding panel */}
        <div
          style={{
            flex: '0 0 45%',
            display: 'none',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: '48px',
            borderRight: '1px solid var(--border)',
            position: 'relative',
            background: 'linear-gradient(135deg, #0A0A0A 0%, #0F0F0F 100%)',
          }}
          className="left-panel"
        >
          {/* Logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div
              style={{
                width: '36px',
                height: '36px',
                background: 'var(--accent)',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '18px',
              }}
            >
              🔑
            </div>
            <span
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 800,
                fontSize: '18px',
                color: 'var(--text)',
                letterSpacing: '-0.02em',
              }}
            >
              KeyVault
            </span>
          </div>

          {/* Center content */}
          <div>
            <p
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                color: 'var(--accent)',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                marginBottom: '16px',
              }}
            >
              University System
            </p>
            <h1
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '44px',
                fontWeight: 800,
                lineHeight: 1.05,
                color: 'var(--text)',
                letterSpacing: '-0.03em',
                marginBottom: '20px',
              }}
            >
              Lecture Hall
              <br />
              Key
              <br />
              <span style={{ color: 'var(--accent)' }}>Management</span>
            </h1>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontWeight: 300,
                fontSize: '15px',
                color: 'var(--text-muted)',
                lineHeight: 1.6,
                maxWidth: '340px',
              }}
            >
              A centralized system for secure tracking and management of lecture hall keys across campus.
            </p>
          </div>

          {/* Stats */}
          <div style={{ display: 'flex', gap: '32px' }}>
            {[
              { n: '100%', label: 'Tracked' },
              { n: 'RBAC', label: 'Secured' },
              { n: 'Live', label: 'Status' },
            ].map((s) => (
              <div key={s.label}>
                <div
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '22px',
                    fontWeight: 800,
                    color: 'var(--accent)',
                  }}
                >
                  {s.n}
                </div>
                <div
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '11px',
                    color: 'var(--text-muted)',
                    letterSpacing: '0.08em',
                  }}
                >
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right login form */}
        <div
          style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '32px 24px',
            position: 'relative',
            zIndex: 1,
          }}
        >
          <div
            style={{
              width: '100%',
              maxWidth: '400px',
              animation: 'slideUp 0.35s ease',
            }}
          >
            {/* Mobile logo */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                marginBottom: '40px',
              }}
            >
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  background: 'var(--accent)',
                  borderRadius: '7px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '16px',
                }}
              >
                🔑
              </div>
              <span
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 800,
                  fontSize: '18px',
                  color: 'var(--text)',
                }}
              >
                KeyVault
              </span>
            </div>

            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '30px',
                fontWeight: 800,
                letterSpacing: '-0.02em',
                marginBottom: '6px',
              }}
            >
              Sign in
            </h2>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '14px',
                color: 'var(--text-muted)',
                marginBottom: '32px',
                fontWeight: 300,
              }}
            >
              Access the key management dashboard
            </p>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              {apiError && (
                <div
                  style={{
                    background: 'rgba(255,80,80,0.08)',
                    border: '1px solid rgba(255,80,80,0.3)',
                    borderRadius: '8px',
                    padding: '12px 16px',
                    color: 'var(--danger)',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '12px',
                    display: 'flex',
                    gap: '8px',
                    alignItems: 'flex-start',
                  }}
                >
                  <span>⚠</span>
                  <span>{apiError}</span>
                </div>
              )}

              <Input
                label="Email Address"
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="you@university.edu"
                error={errors.email}
                required
              />

              <Input
                label="Password"
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="••••••••"
                error={errors.password}
                required
              />

              <Button type="submit" fullWidth loading={loading} size="lg" style={{ marginTop: '8px' }}>
                {loading ? 'Authenticating' : 'Sign In'}
              </Button>
            </form>

            <p
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                color: 'var(--text-muted)',
                textAlign: 'center',
                marginTop: '32px',
                letterSpacing: '0.03em',
              }}
            >
              Contact your administrator to get access
            </p>
          </div>
        </div>
      </div>

      <style>{`
        @media (min-width: 768px) {
          .left-panel { display: flex !important; }
        }
      `}</style>
    </>
  )
}
