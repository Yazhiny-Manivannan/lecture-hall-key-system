import React, { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../api/axios'
import Button from '../components/Button'
import StatusBadge from '../components/StatusBadge'
import KeyFormModal from '../components/KeyFormModal'
import KeyDetailModal from '../components/KeyDetailModal'
import Modal from '../components/Modal'

const globalStyles = `
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --bg: #0A0A0A;
    --card: #111111;
    --surface: #141414;
    --border: #222222;
    --text: #F0EDE8;
    --text-muted: #A0A0A0;
    --accent: #3B82F6;
    --danger: #FF5050;
    --font-display: 'Syne', sans-serif;
    --font-body: 'DM Sans', sans-serif;
    --font-mono: 'DM Mono', monospace;
  }

  body { background: var(--bg); color: var(--text); font-family: var(--font-body); }

  @keyframes spin { to { transform: rotate(360deg); } }
  @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
  @keyframes slideUp { from { transform: translateY(14px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
  @keyframes shimmer {
    0% { background-position: -400px 0; }
    100% { background-position: 400px 0; }
  }

  .key-row:hover { background: var(--surface) !important; }
  .key-row { cursor: pointer; transition: background 0.12s ease; }

  select option { background: #181818; color: #F0EDE8; }

  ::-webkit-scrollbar { width: 4px; height: 4px; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb { background: var(--border); border-radius: 4px; }

  input:-webkit-autofill,
  input:-webkit-autofill:hover,
  input:-webkit-autofill:focus {
    -webkit-box-shadow: 0 0 0 1000px #181818 inset;
    -webkit-text-fill-color: #F0EDE8;
    caret-color: #F0EDE8;
  }
`

const STATUS_FILTERS = ['all', 'available', 'in_use', 'lost']

const SkeletonRow = () => (
  <tr>
    {[1, 2, 3, 4, 5].map((i) => (
      <td key={i} style={{ padding: '14px 16px' }}>
        <div
          style={{
            height: '14px',
            borderRadius: '4px',
            background:
              'linear-gradient(90deg, var(--surface) 25%, var(--border) 50%, var(--surface) 75%)',
            backgroundSize: '400px 100%',
            animation: 'shimmer 1.4s infinite',
            width: i === 1 ? '80px' : i === 2 ? '100px' : i === 3 ? '120px' : i === 4 ? '70px' : '60px',
          }}
        />
      </td>
    ))}
  </tr>
)

export default function Dashboard() {
  const navigate = useNavigate()
  const role = localStorage.getItem('role')
  const isAdmin = role === 'admin'

  const [keys, setKeys] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')

  const [formModal, setFormModal] = useState({ open: false, editKey: null })
  const [detailModal, setDetailModal] = useState({ open: false, key: null })
  const [deleteModal, setDeleteModal] = useState({ open: false, key: null })
  const [deleteLoading, setDeleteLoading] = useState(false)

  const fetchKeys = useCallback(async () => {
    setLoading(true)
    setError('')
    try {
      const res = await api.get('/api/keys/getallkeys')
      setKeys(Array.isArray(res.data) ? res.data : [])
    } catch (err) {
      if (err.response?.status === 404) {
        setKeys([])
      } else {
        setError(err.response?.data?.message || 'Failed to load keys.')
      }
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchKeys()
  }, [fetchKeys])

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('role')
    navigate('/login')
  }

  const handleDelete = async () => {
    if (!deleteModal.key) return
    setDeleteLoading(true)
    try {
      await api.delete(`/api/keys/delete/${deleteModal.key._id}`)
      setDeleteModal({ open: false, key: null })
      fetchKeys()
    } catch (err) {
      alert(err.response?.data?.message || 'Delete failed.')
    } finally {
      setDeleteLoading(false)
    }
  }

  // Filter + search
  const filtered = keys.filter((k) => {
    const matchSearch =
      !search ||
      k.keyNumber?.toLowerCase().includes(search.toLowerCase()) ||
      k.lectureHall?.toLowerCase().includes(search.toLowerCase()) ||
      k.building?.toLowerCase().includes(search.toLowerCase())
    const matchStatus = statusFilter === 'all' || k.status === statusFilter
    return matchSearch && matchStatus
  })

  // Stats
  const stats = {
    total: keys.length,
    available: keys.filter((k) => k.status === 'available').length,
    in_use: keys.filter((k) => k.status === 'in_use').length,
    lost: keys.filter((k) => k.status === 'lost').length,
  }

  return (
    <>
      <style>{globalStyles}</style>

      <div style={{ minHeight: '100vh', background: 'var(--bg)', display: 'flex', flexDirection: 'column' }}>
        {/* Top Nav */}
        <header
          style={{
            background: 'var(--card)',
            borderBottom: '1px solid var(--border)',
            padding: '0 24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: '60px',
            position: 'sticky',
            top: 0,
            zIndex: 100,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div
              style={{
                width: '28px',
                height: '28px',
                background: 'var(--accent)',
                borderRadius: '6px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '14px',
                flexShrink: 0,
              }}
            >
              🔑
            </div>
            <span
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 800,
                fontSize: '16px',
                letterSpacing: '-0.01em',
              }}
            >
              KeyVault
            </span>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '10px',
                color: 'var(--text-muted)',
                background: 'var(--surface)',
                border: '1px solid var(--border)',
                borderRadius: '4px',
                padding: '2px 7px',
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
              }}
            >
              {role}
            </span>
          </div>

          <button
            onClick={handleLogout}
            style={{
              background: 'none',
              border: '1.5px solid var(--border)',
              borderRadius: '6px',
              color: 'var(--text-muted)',
              cursor: 'pointer',
              fontFamily: 'var(--font-mono)',
              fontSize: '12px',
              padding: '6px 14px',
              letterSpacing: '0.04em',
              transition: 'all 0.15s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'var(--danger)'
              e.currentTarget.style.color = 'var(--danger)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'var(--border)'
              e.currentTarget.style.color = 'var(--text-muted)'
            }}
          >
            Sign Out
          </button>
        </header>

        {/* Main Content */}
        <main style={{ flex: 1, padding: '28px 24px', maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
          {/* Page header */}
          <div
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              justifyContent: 'space-between',
              marginBottom: '28px',
              gap: '16px',
              flexWrap: 'wrap',
            }}
          >
            <div>
              <h1
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '28px',
                  fontWeight: 800,
                  letterSpacing: '-0.02em',
                  marginBottom: '4px',
                }}
              >
                Key Dashboard
              </h1>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'var(--text-muted)', fontWeight: 300 }}>
                Manage and track all lecture hall keys across campus
              </p>
            </div>
            {isAdmin && (
              <Button onClick={() => setFormModal({ open: true, editKey: null })}>
                + Add Key
              </Button>
            )}
          </div>

          {/* Stats row */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
              gap: '12px',
              marginBottom: '24px',
            }}
          >
            {[
              { label: 'Total Keys', value: stats.total, color: 'var(--text)' },
              { label: 'Available', value: stats.available, color: '#5DD87A' },
              { label: 'In Use', value: stats.in_use, color: '#E8B232' },
              { label: 'Lost', value: stats.lost, color: '#FF5050' },
            ].map((s) => (
              <div
                key={s.label}
                style={{
                  background: 'var(--card)',
                  border: '1px solid var(--border)',
                  borderRadius: '10px',
                  padding: '16px 20px',
                }}
              >
                <div
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '28px',
                    fontWeight: 800,
                    color: s.color,
                    lineHeight: 1,
                    marginBottom: '4px',
                  }}
                >
                  {loading ? '—' : s.value}
                </div>
                <div
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '11px',
                    color: 'var(--text-muted)',
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                  }}
                >
                  {s.label}
                </div>
              </div>
            ))}
          </div>

          {/* Filters bar */}
          <div
            style={{
              display: 'flex',
              gap: '10px',
              marginBottom: '16px',
              flexWrap: 'wrap',
              alignItems: 'center',
            }}
          >
            {/* Search */}
            <div style={{ position: 'relative', flex: '1', minWidth: '200px' }}>
              <span
                style={{
                  position: 'absolute',
                  left: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: 'var(--text-muted)',
                  fontSize: '14px',
                  pointerEvents: 'none',
                }}
              >
                ⌕
              </span>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by key number, hall, building…"
                style={{
                  background: 'var(--card)',
                  border: '1.5px solid var(--border)',
                  borderRadius: '6px',
                  color: 'var(--text)',
                  fontFamily: 'var(--font-body)',
                  fontSize: '13px',
                  padding: '9px 14px 9px 34px',
                  outline: 'none',
                  width: '100%',
                  transition: 'border-color 0.15s',
                }}
                onFocus={(e) => (e.currentTarget.style.borderColor = 'var(--accent)')}
                onBlur={(e) => (e.currentTarget.style.borderColor = 'var(--border)')}
              />
            </div>

            {/* Status pills */}
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
              {STATUS_FILTERS.map((s) => (
                <button
                  key={s}
                  onClick={() => setStatusFilter(s)}
                  style={{
                    background: statusFilter === s ? 'var(--accent)' : 'var(--card)',
                    border: `1.5px solid ${statusFilter === s ? 'var(--accent)' : 'var(--border)'}`,
                    borderRadius: '100px',
                    color: statusFilter === s ? 'var(--bg)' : 'var(--text-muted)',
                    cursor: 'pointer',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '11px',
                    letterSpacing: '0.06em',
                    padding: '5px 13px',
                    transition: 'all 0.15s',
                    textTransform: 'capitalize',
                    fontWeight: statusFilter === s ? 600 : 400,
                  }}
                >
                  {s === 'in_use' ? 'In Use' : s.charAt(0).toUpperCase() + s.slice(1)}
                </button>
              ))}
            </div>

            {/* Refresh */}
            <button
              onClick={fetchKeys}
              disabled={loading}
              style={{
                background: 'none',
                border: '1.5px solid var(--border)',
                borderRadius: '6px',
                color: 'var(--text-muted)',
                cursor: 'pointer',
                fontSize: '14px',
                padding: '7px 12px',
                transition: 'all 0.15s',
                display: 'flex',
                alignItems: 'center',
              }}
              title="Refresh"
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'var(--text-muted)')}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'var(--border)')}
            >
              ↻
            </button>
          </div>

          {/* Table */}
          <div
            style={{
              background: 'var(--card)',
              border: '1px solid var(--border)',
              borderRadius: '10px',
              overflow: 'hidden',
            }}
          >
            {error ? (
              <div
                style={{
                  padding: '40px',
                  textAlign: 'center',
                  color: 'var(--danger)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '13px',
                }}
              >
                ⚠ {error}{' '}
                <span
                  onClick={fetchKeys}
                  style={{ textDecoration: 'underline', cursor: 'pointer', marginLeft: '8px' }}
                >
                  Retry
                </span>
              </div>
            ) : (
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid var(--border)' }}>
                      {['Key Number', 'Lecture Hall', 'Building', 'Status', isAdmin ? 'Actions' : ''].filter(Boolean).map((col) => (
                        <th
                          key={col}
                          style={{
                            padding: '11px 16px',
                            textAlign: col === 'Actions' ? 'right' : 'left',
                            fontFamily: 'var(--font-mono)',
                            fontSize: '10px',
                            fontWeight: 500,
                            letterSpacing: '0.1em',
                            textTransform: 'uppercase',
                            color: 'var(--text-muted)',
                            whiteSpace: 'nowrap',
                          }}
                        >
                          {col}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {loading ? (
                      Array.from({ length: 5 }).map((_, i) => <SkeletonRow key={i} />)
                    ) : filtered.length === 0 ? (
                      <tr>
                        <td
                          colSpan={isAdmin ? 5 : 4}
                          style={{
                            padding: '56px 20px',
                            textAlign: 'center',
                            color: 'var(--text-muted)',
                            fontFamily: 'var(--font-mono)',
                            fontSize: '13px',
                          }}
                        >
                          {keys.length === 0
                            ? isAdmin
                              ? 'No keys yet — click "Add Key" to create one'
                              : 'No keys found in the system'
                            : 'No results match your search or filter'}
                        </td>
                      </tr>
                    ) : (
                      filtered.map((key) => (
                        <tr
                          key={key._id}
                          className="key-row"
                          onClick={() => setDetailModal({ open: true, key })}
                          style={{ borderBottom: '1px solid var(--border)' }}
                        >
                          <td style={{ padding: '13px 16px' }}>
                            <span
                              style={{
                                fontFamily: 'var(--font-mono)',
                                fontSize: '13px',
                                fontWeight: 500,
                                color: 'var(--accent)',
                                letterSpacing: '0.03em',
                              }}
                            >
                              {key.keyNumber}
                            </span>
                          </td>
                          <td style={{ padding: '13px 16px' }}>
                            <span style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: 'var(--text)' }}>
                              {key.lectureHall}
                            </span>
                          </td>
                          <td style={{ padding: '13px 16px' }}>
                            <span style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'var(--text-muted)' }}>
                              {key.building}
                            </span>
                          </td>
                          <td style={{ padding: '13px 16px' }}>
                            <StatusBadge status={key.status} />
                          </td>
                          {isAdmin && (
                            <td
                              style={{ padding: '13px 16px', textAlign: 'right' }}
                              onClick={(e) => e.stopPropagation()}
                            >
                              <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                                <button
                                  onClick={() => setFormModal({ open: true, editKey: key })}
                                  style={{
                                    background: 'none',
                                    border: '1.5px solid var(--border)',
                                    borderRadius: '5px',
                                    color: 'var(--text-muted)',
                                    cursor: 'pointer',
                                    fontFamily: 'var(--font-mono)',
                                    fontSize: '11px',
                                    letterSpacing: '0.04em',
                                    padding: '5px 11px',
                                    transition: 'all 0.12s',
                                  }}
                                  onMouseEnter={(e) => {
                                    e.currentTarget.style.borderColor = 'var(--text-muted)'
                                    e.currentTarget.style.color = 'var(--text)'
                                  }}
                                  onMouseLeave={(e) => {
                                    e.currentTarget.style.borderColor = 'var(--border)'
                                    e.currentTarget.style.color = 'var(--text-muted)'
                                  }}
                                >
                                  Edit
                                </button>
                                <button
                                  onClick={() => setDeleteModal({ open: true, key })}
                                  style={{
                                    background: 'none',
                                    border: '1.5px solid transparent',
                                    borderRadius: '5px',
                                    color: 'var(--text-muted)',
                                    cursor: 'pointer',
                                    fontFamily: 'var(--font-mono)',
                                    fontSize: '11px',
                                    letterSpacing: '0.04em',
                                    padding: '5px 11px',
                                    transition: 'all 0.12s',
                                  }}
                                  onMouseEnter={(e) => {
                                    e.currentTarget.style.borderColor = 'var(--danger)'
                                    e.currentTarget.style.color = 'var(--danger)'
                                  }}
                                  onMouseLeave={(e) => {
                                    e.currentTarget.style.borderColor = 'transparent'
                                    e.currentTarget.style.color = 'var(--text-muted)'
                                  }}
                                >
                                  Delete
                                </button>
                              </div>
                            </td>
                          )}
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            )}

            {/* Table footer */}
            {!loading && !error && filtered.length > 0 && (
              <div
                style={{
                  padding: '10px 16px',
                  borderTop: '1px solid var(--border)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '11px',
                    color: 'var(--text-muted)',
                    letterSpacing: '0.04em',
                  }}
                >
                  {filtered.length} of {keys.length} keys
                </span>
                {(search || statusFilter !== 'all') && (
                  <button
                    onClick={() => { setSearch(''); setStatusFilter('all') }}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: 'var(--accent)',
                      cursor: 'pointer',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '11px',
                      letterSpacing: '0.04em',
                      padding: 0,
                    }}
                  >
                    Clear filters
                  </button>
                )}
              </div>
            )}
          </div>
        </main>
      </div>

      {/* Key Form Modal (Add / Edit) */}
      <KeyFormModal
        isOpen={formModal.open}
        onClose={() => setFormModal({ open: false, editKey: null })}
        onSuccess={fetchKeys}
        editKey={formModal.editKey}
      />

      {/* Key Detail Modal */}
      <KeyDetailModal
        isOpen={detailModal.open}
        onClose={() => setDetailModal({ open: false, key: null })}
        keyData={detailModal.key}
        isAdmin={isAdmin}
        onEdit={(key) => setFormModal({ open: true, editKey: key })}
        onDelete={(key) => setDeleteModal({ open: true, key })}
      />

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={deleteModal.open}
        onClose={() => setDeleteModal({ open: false, key: null })}
        title="Confirm Delete"
        width="400px"
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: 'var(--text-muted)', lineHeight: 1.6 }}>
            Are you sure you want to permanently delete key{' '}
            <strong style={{ color: 'var(--danger)', fontFamily: 'var(--font-mono)' }}>
              {deleteModal.key?.keyNumber}
            </strong>
            ? This action cannot be undone.
          </p>
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
            <Button
              variant="secondary"
              onClick={() => setDeleteModal({ open: false, key: null })}
              disabled={deleteLoading}
            >
              Cancel
            </Button>
            <Button variant="danger" onClick={handleDelete} loading={deleteLoading}>
              Delete Key
            </Button>
          </div>
        </div>
      </Modal>
    </>
  )
}
