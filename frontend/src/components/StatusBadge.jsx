import React from 'react'

const statusConfig = {
  available: {
    label: 'Available',
    bg: 'rgba(100, 220, 120, 0.12)',
    color: '#5DD87A',
    dot: '#5DD87A',
  },
  in_use: {
    label: 'In Use',
    bg: 'rgba(232, 178, 50, 0.12)',
    color: '#E8B232',
    dot: '#E8B232',
  },
  lost: {
    label: 'Lost',
    bg: 'rgba(255, 80, 80, 0.12)',
    color: '#FF5050',
    dot: '#FF5050',
  },
}

export default function StatusBadge({ status }) {
  const config = statusConfig[status] || {
    label: status?.replace('_', ' ') || 'Unknown',
    bg: 'rgba(150,150,150,0.12)',
    color: 'var(--text-muted)',
    dot: 'var(--text-muted)',
  }

  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '6px',
        padding: '4px 10px',
        borderRadius: '100px',
        background: config.bg,
        color: config.color,
        fontFamily: 'var(--font-mono)',
        fontSize: '11px',
        fontWeight: 500,
        letterSpacing: '0.06em',
        whiteSpace: 'nowrap',
      }}
    >
      <span
        style={{
          width: '6px',
          height: '6px',
          borderRadius: '50%',
          background: config.dot,
          flexShrink: 0,
        }}
      />
      {config.label}
    </span>
  )
}
