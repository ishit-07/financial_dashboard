import { useState, useRef, useEffect } from 'react'
import { useUiStore } from '../../store/uiStore'

export default function CustomSelect({ value, onChange, options, placeholder = 'Select...', className = '', id }) {
  const darkMode = useUiStore((s) => s.darkMode)
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const selectedOption = options.find((opt) => opt.value === value)
  const displayLabel = selectedOption ? selectedOption.label : placeholder

  return (
    <div className={`relative ${className}`} ref={dropdownRef} id={id}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full flex items-center justify-between text-sm rounded-lg border px-3 py-2 outline-none transition-all focus:ring-2 focus:ring-primary/40 focus:border-primary cursor-pointer ${
          darkMode
            ? 'bg-bg-dark border-border-dark text-text-primary-dark hover:bg-border-dark/50'
            : 'bg-bg-light border-border-light text-text-primary-light hover:bg-bg-light'
        }`}
      >
        <span className={`block truncate ${!selectedOption && placeholder && 'text-text-muted'}`}>
          {displayLabel}
        </span>
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className={`shrink-0 ml-2 transition-transform duration-200 text-text-muted ${isOpen ? 'rotate-180' : ''}`}
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>

      {isOpen && (
        <div
          className={`absolute z-50 top-full left-0 right-0 mt-1.5 w-full rounded-xl shadow-lg border overflow-y-auto max-h-60 ${
            darkMode
              ? 'bg-surface-dark border-border-dark'
              : 'bg-surface-light border-border-light'
          }`}
          style={{ animation: 'fadeIn 150ms ease-out' }}
        >
          <div className="p-1.5 flex flex-col gap-1">
            {options.map((opt) => {
              const isSelected = value === opt.value
              return (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => {
                    onChange(opt.value)
                    setIsOpen(false)
                  }}
                  className={`w-full text-left px-3 py-2 text-sm rounded-lg transition-colors cursor-pointer ${
                    isSelected
                      ? (darkMode ? 'bg-primary/20 text-primary' : 'bg-primary-muted text-primary')
                      : (darkMode ? 'text-text-primary-dark hover:bg-border-dark/50' : 'text-text-primary-light hover:bg-bg-light')
                  }`}
                >
                  {opt.label}
                </button>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
