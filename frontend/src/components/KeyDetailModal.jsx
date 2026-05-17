import React from 'react'
import Modal from './Modal'
import StatusBadge from './StatusBadge'
import Button from './Button'

const Field = ({ label, value }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
    <span
      style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '10px',
        fontWeight: 500,
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
        color: 'var(--text-muted)',
      }}
    >
      {label}
    </span>
    <span
      style={{
        fontFamily: 'var(--font-body)',
        fontSize: '14px',
        color: 'var(--text)',
        fontWeight: 400,
      }}
    >
      {value || <span style={{ color: 'var(--text-muted)', fontStyle: 'italic' }}>—</span>}
    </span>
  </div>
)

const formatDate = (dateStr) => {
  if (!dateStr) return null
  return new Date(dateStr).toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export default function KeyDetailModal({ isOpen, onClose, keyData, onEdit, onDelete, isAdmin }) {
  if (!keyData) return null

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Key Details" width="520px">
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {/* Key ID chip */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div
            style={{
              width: '48px',
              height: '48px',
              borderRadius: '10px',
              background: 'var(--surface)',
              border: '1.5px solid var(--border)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '22px',
            }}
          >
            🔑
          </div>
          <div>
            <div
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '20px',
                fontWeight: 700,
                color: 'var(--text)',
              }}
            >
              {keyData.keyNumber}
            </div>
            <StatusBadge status={keyData.status} />
          </div>
        </div>

        {/* Detail grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '16px',
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: '8px',
            padding: '18px',
          }}
        >
          <Field label="Lecture Hall" value={keyData.lectureHall} />
          <Field label="Building" value={keyData.building} />
          <Field label="Opened Time" value={formatDate(keyData.openedTime)} />
          <Field label="Returned Time" value={formatDate(keyData.returnedTime)} />
        </div>

        {/* History */}
        {keyData.history && keyData.history.length > 0 && (
          <div>
            <p
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '10px',
                fontWeight: 500,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: 'var(--text-muted)',
                margin: '0 0 10px 0',
              }}
            >
              History ({keyData.history.length} events)
            </p>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '6px',
                maxHeight: '140px',
                overflowY: 'auto',
              }}
            >
              {[...keyData.history].reverse().map((h, i) => (
                <div
                  key={i}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '8px 12px',
                    background: 'var(--surface)',
                    border: '1px solid var(--border)',
                    borderRadius: '6px',
                    gap: '12px',
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '12px',
                      color: 'var(--accent)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                      flexShrink: 0,
                    }}
                  >
                    {h.action}
                  </span>
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '11px',
                      color: 'var(--text-muted)',
                    }}
                  >
                    {formatDate(h.time)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Actions */}
        <div
          style={{
            display: 'flex',
            gap: '10px',
            justifyContent: 'flex-end',
            paddingTop: '8px',
            borderTop: '1px solid var(--border)',
          }}
        >
          <Button variant="ghost" onClick={onClose}>
            Close
          </Button>
          {isAdmin && (
            <>
              <Button variant="secondary" onClick={() => { onClose(); onEdit(keyData) }}>
                Edit
              </Button>
              <Button variant="danger" onClick={() => { onClose(); onDelete(keyData) }}>
                Delete
              </Button>
            </>
          )}
        </div>
      </div>
    </Modal>
  )
}
