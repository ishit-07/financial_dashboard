import { useState, useCallback, useEffect } from 'react'
import { useUiStore } from '../../store/uiStore'
import Modal from '../ui/Modal'
import Button from '../ui/Button'
import CustomSelect from '../ui/CustomSelect'

const CATEGORIES = ['Food', 'Transport', 'Housing', 'Entertainment', 'Health', 'Income']

const INITIAL_FORM = {
  description: '',
  amount: '',
  category: 'Food',
  type: 'expense',
  date: new Date().toISOString().split('T')[0],
}

export default function AddEditModal({ isOpen, onClose, onSubmit, editData }) {
  const darkMode = useUiStore((s) => s.darkMode)
  const [form, setForm] = useState(INITIAL_FORM)
  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (editData) {
      setForm({
        description: editData.description,
        amount: String(editData.amount),
        category: editData.category,
        type: editData.type,
        date: editData.date,
      })
    } else {
      setForm(INITIAL_FORM)
    }
    setErrors({})
  }, [editData, isOpen])

  const validate = useCallback(() => {
    const err = {}
    if (!form.description.trim()) err.description = 'Description is required'
    if (!form.amount || isNaN(form.amount) || Number(form.amount) <= 0)
      err.amount = 'Enter a valid amount'
    if (!form.date) err.date = 'Date is required'
    setErrors(err)
    return Object.keys(err).length === 0
  }, [form])

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault()
      if (!validate()) return
      onSubmit({
        description: form.description.trim(),
        amount: Number(form.amount),
        category: form.category,
        type: form.type,
        date: form.date,
      })
      onClose()
    },
    [form, validate, onSubmit, onClose]
  )

  const handleChange = useCallback((key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }))
    setErrors((prev) => ({ ...prev, [key]: undefined }))
  }, [])

  const inputClass = `w-full text-sm rounded-lg border px-3 py-2.5 outline-none transition-all focus:ring-2 focus:ring-primary/40 focus:border-primary ${
    darkMode
      ? 'bg-bg-dark border-border-dark text-text-primary-dark'
      : 'bg-bg-light border-border-light text-text-primary-light'
  }`

  const errorInputClass = 'border-danger focus:ring-danger/40 focus:border-danger'

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={editData ? 'Edit Transaction' : 'Add Transaction'}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Description */}
        <div>
          <label className="block text-xs font-medium text-text-muted mb-1.5">
            Description
          </label>
          <input
            type="text"
            value={form.description}
            onChange={(e) => handleChange('description', e.target.value)}
            className={`${inputClass} ${errors.description ? errorInputClass : ''}`}
            placeholder="e.g., Swiggy Order"
            id="form-description"
          />
          {errors.description && (
            <p className="text-xs text-danger mt-1">{errors.description}</p>
          )}
        </div>

        {/* Amount */}
        <div>
          <label className="block text-xs font-medium text-text-muted mb-1.5">
            Amount (₹)
          </label>
          <input
            type="number"
            value={form.amount}
            onChange={(e) => handleChange('amount', e.target.value)}
            className={`${inputClass} ${errors.amount ? errorInputClass : ''}`}
            placeholder="0"
            min="0"
            step="1"
            id="form-amount"
          />
          {errors.amount && (
            <p className="text-xs text-danger mt-1">{errors.amount}</p>
          )}
        </div>

        {/* Category */}
        <div>
          <label className="block text-xs font-medium text-text-muted mb-1.5">
            Category
          </label>
          <CustomSelect
            value={form.category}
            onChange={(val) => handleChange('category', val)}
            options={CATEGORIES.map((c) => ({ value: c, label: c }))}
            id="form-category"
          />
        </div>

        {/* Type */}
        <div>
          <label className="block text-xs font-medium text-text-muted mb-1.5">
            Type
          </label>
          <div className="flex gap-3">
            {['expense', 'income'].map((t) => (
              <label
                key={t}
                className={`flex-1 flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg border text-sm font-medium cursor-pointer transition-all ${
                  form.type === t
                    ? t === 'income'
                      ? 'border-success bg-success-muted text-success'
                      : 'border-danger bg-danger-muted text-danger'
                    : darkMode
                    ? 'border-border-dark text-text-muted hover:border-border-dark'
                    : 'border-border-light text-text-muted hover:border-border-light'
                }`}
              >
                <input
                  type="radio"
                  name="type"
                  value={t}
                  checked={form.type === t}
                  onChange={(e) => handleChange('type', e.target.value)}
                  className="sr-only"
                />
                {t === 'income' ? '↑ Income' : '↓ Expense'}
              </label>
            ))}
          </div>
        </div>

        {/* Date */}
        <div>
          <label className="block text-xs font-medium text-text-muted mb-1.5">
            Date
          </label>
          <input
            type="date"
            value={form.date}
            onChange={(e) => handleChange('date', e.target.value)}
            className={`${inputClass} cursor-pointer ${errors.date ? errorInputClass : ''}`}
            id="form-date"
          />
          {errors.date && (
            <p className="text-xs text-danger mt-1">{errors.date}</p>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-3 pt-2">
          <Button
            variant="ghost"
            className="flex-1"
            onClick={onClose}
            id="form-cancel"
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            className="flex-1"
            type="submit"
            id="form-submit"
          >
            {editData ? 'Save Changes' : 'Add Transaction'}
          </Button>
        </div>
      </form>
    </Modal>
  )
}
