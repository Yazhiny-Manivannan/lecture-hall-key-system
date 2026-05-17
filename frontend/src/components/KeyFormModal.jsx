import React, { useState, useEffect } from 'react'
import Modal from './Modal'
import Input from './Input'
import Select from './Select'
import Button from './Button'
import api from '../api/axios'

const STATUS_OPTIONS = [
  { value: 'available', label: 'Available' },
  { value: 'in_use', label: 'In Use' },
  { value: 'lost', label: 'Lost' },
]

const emptyForm = {
  lectureHall: '',
  keyNumber: '',
  building: 'Main Campus',
  status: 'available',
}

export default function KeyFormModal({ isOpen, onClose, onSuccess, editKey }) {
  const [form, setForm] = useState(emptyForm)
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [apiError, setApiError] = useState('')

  const isEditing = Boolean(editKey)

  useEffect(() => {
    if (editKey) {
      setForm({
        lectureHall: editKey.lectureHall || '',
        keyNumber: editKey.keyNumber || '',
        building: editKey.building || 'Main Campus',
        status: editKey.status || 'available',
      })
    } else {
      setForm(emptyForm)
    }
    setErrors({})
    setApiError('')
  }, [editKey, isOpen])

  const validate = () => {
    const newErrors = {}
    if (!form.lectureHall.trim()) newErrors.lectureHall = 'Lecture hall is required'
    if (!form.keyNumber.trim()) newErrors.keyNumber = 'Key number is required'
    if (!form.building.trim()) newErrors.building = 'Building is required'
    if (!form.status) newErrors.status = 'Status is required'
    return newErrors
  }

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    setErrors((prev) => ({ ...prev, [e.target.name]: '' }))
  }

  const handleSubmit = async () => {
    const validationErrors = validate()
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    setLoading(true)
    setApiError('')

    try {
      if (isEditing) {
        await api.put(`api/keys/update/${editKey._id}`, form)
      } else {
        await api.post('api/keys/create', form)
      }
      onSuccess()
      onClose()
    } catch (err) {
      setApiError(err.response?.data?.message || 'Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isEditing ? 'Edit Key Record' : 'Add New Key'}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
        {apiError && (
          <div
            style={{
              background: 'rgba(255,80,80,0.08)',
              border: '1px solid rgba(255,80,80,0.25)',
              borderRadius: '6px',
              padding: '10px 14px',
              color: 'var(--danger)',
              fontFamily: 'var(--font-mono)',
              fontSize: '12px',
            }}
          >
            {apiError}
          </div>
        )}

        <Input
          label="Lecture Hall"
          name="lectureHall"
          value={form.lectureHall}
          onChange={handleChange}
          placeholder="e.g. LH-01"
          error={errors.lectureHall}
          required
        />

        <Input
          label="Key Number"
          name="keyNumber"
          value={form.keyNumber}
          onChange={handleChange}
          placeholder="e.g. KEY-1001"
          error={errors.keyNumber}
          required
          disabled={isEditing}
        />

        <Input
          label="Building"
          name="building"
          value={form.building}
          onChange={handleChange}
          placeholder="e.g. Main Campus"
          error={errors.building}
          required
        />

        <Select
          label="Status"
          name="status"
          value={form.status}
          onChange={handleChange}
          options={STATUS_OPTIONS}
          error={errors.status}
          required
        />

        <div
          style={{
            display: 'flex',
            gap: '10px',
            justifyContent: 'flex-end',
            paddingTop: '8px',
            borderTop: '1px solid var(--border)',
          }}
        >
          <Button variant="secondary" onClick={onClose} disabled={loading}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} loading={loading}>
            {isEditing ? 'Save Changes' : 'Create Key'}
          </Button>
        </div>
      </div>
    </Modal>
  )
}
