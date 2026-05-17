import React from 'react'

const variants = {
  primary: {
    background: 'var(--accent)',
    color: 'var(--bg)',
    border: '2px solid var(--accent)',
  },
  secondary: {
    background: 'transparent',
    color: 'var(--text)',
    border: '2px solid var(--border)',
  },
  danger: {
    background: 'transparent',
    color: 'var(--danger)',
    border: '2px solid var(--danger)',
  },
  ghost: {
    background: 'transparent',
    color: 'var(--text-muted)',
    border: '2px solid transparent',
  },
}

export default function Button({
  children,
  variant = 'primary',
  loading = false,
  disabled = false,
  fullWidth = false,
  size = 'md',
  onClick,
  type = 'button',
  style: extraStyle = {},
  ...props
}) { 
  const sizeStyles = {
    sm: { padding: '6px 14px', fontSize: '13px' },
    md: { padding: '10px 20px', fontSize: '14px' },
    lg: { padding: '13px 28px', fontSize: '15px' },
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      {...props}
      style={{
        ...variants[variant],
        ...sizeStyles[size],
        fontFamily: 'var(--font-mono)',
        fontWeight: 500,
        letterSpacing: '0.04em',
        borderRadius: '6px',
        cursor: disabled || loading ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.5 : 1,
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px',
        transition: 'all 0.15s ease',
        width: fullWidth ? '100%' : 'auto',
        justifyContent: 'center',
        whiteSpace: 'nowrap',
        ...extraStyle,
      }}
      onMouseEnter={(e) => {
        if (!disabled && !loading) {
          if (variant === 'primary') e.currentTarget.style.opacity = '0.88'
          if (variant === 'secondary') e.currentTarget.style.borderColor = 'var(--text-muted)'
          if (variant === 'danger') e.currentTarget.style.background = 'rgba(255,80,80,0.1)'
        }
      }}
      onMouseLeave={(e) => {
        if (!disabled && !loading) {
          e.currentTarget.style.opacity = '1'
          if (variant === 'secondary') e.currentTarget.style.borderColor = 'var(--border)'
          if (variant === 'danger') e.currentTarget.style.background = 'transparent'
        }
      }}
    >
      {loading && (
        <span
          style={{
            width: '14px',
            height: '14px',
            border: '2px solid currentColor',
            borderTopColor: 'transparent',
            borderRadius: '50%',
            animation: 'spin 0.7s linear infinite',
            display: 'inline-block',
            flexShrink: 0,
          }}
        />
      )}
      {children}
    </button>
  )
}
