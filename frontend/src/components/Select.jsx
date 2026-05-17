import React from 'react'

export default function Select({
  label,
  value,
  onChange,
  options = [],
  error,
  disabled = false,
  required = false,
  name,
  placeholder = 'Select...',
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
      <div style={{ position: 'relative' }}>
        <select
          name={name}
          value={value}
          onChange={onChange}
          disabled={disabled}
          required={required}
          style={{
            background: 'var(--surface)',
            backgroundColor: 'var(--surface)',
            border: `1.5px solid ${error ? 'var(--danger)' : 'var(--border)'}`,
            borderRadius: '6px',
            color: value ? 'var(--text)' : 'var(--text-muted)',
            fontFamily: 'var(--font-body)',
            fontSize: '14px',
            padding: '10px 36px 10px 14px',
            outline: 'none',
            transition: 'border-color 0.15s ease',
            width: '100%',
            boxSizing: 'border-box',
            appearance: 'none',
            WebkitAppearance: 'none',
            MozAppearance: 'none',
            cursor: disabled ? 'not-allowed' : 'pointer',
            opacity: disabled ? 0.6 : 1,
          }}
          onFocus={(e) => {
            if (!error) e.currentTarget.style.borderColor = 'var(--accent)'
          }}
          onBlur={(e) => {
            if (!error) e.currentTarget.style.borderColor = 'var(--border)'
          }}
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <span
          style={{
            position: 'absolute',
            right: '12px',
            top: '50%',
            transform: 'translateY(-50%)',
            pointerEvents: 'none',
            color: 'var(--text-muted)',
            fontSize: '10px',
          }}
        >
          ▼
        </span>
      </div>
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
