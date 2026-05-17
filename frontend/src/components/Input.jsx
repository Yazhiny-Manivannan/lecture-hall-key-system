import React from 'react'

export default function Input({
  label,
  type = 'text',
  value,
  onChange,
  placeholder,
  error,
  disabled = false,
  required = false,
  name,
  style: extraStyle = {},
}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', ...extraStyle }}>
      {label && (
        <label
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '11px',
            fontWeight: 500,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: 'var(--text-muted)',
          }}
        >
          {label}
          {required && <span style={{ color: 'var(--accent)', marginLeft: '4px' }}>*</span>}
        </label>
      )}
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
        style={{
          background: 'var(--surface)',
          border: `1.5px solid ${error ? 'var(--danger)' : 'var(--border)'}`,
          borderRadius: '6px',
          color: 'var(--text)',
          fontFamily: 'var(--font-body)',
          fontSize: '14px',
          padding: '10px 14px',
          outline: 'none',
          transition: 'border-color 0.15s ease',
          width: '100%',
          boxSizing: 'border-box',
          opacity: disabled ? 0.6 : 1,
          cursor: disabled ? 'not-allowed' : 'text',
        }}
        onFocus={(e) => {
          if (!error) e.currentTarget.style.borderColor = 'var(--accent)'
        }}
        onBlur={(e) => {
          if (!error) e.currentTarget.style.borderColor = 'var(--border)'
        }}
      />
      {error && (
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '11px',
            color: 'var(--danger)',
          }}
        >
          {error}
        </span>
      )}
    </div>
  )
}
