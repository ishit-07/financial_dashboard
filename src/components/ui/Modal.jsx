import { useEffect, useCallback, useState } from 'react'
import { useUiStore } from '../../store/uiStore'

export default function Modal({ isOpen, onClose, title, children }) {
  const darkMode = useUiStore((s) => s.darkMode)
  const [closing, setClosing] = useState(false)

  const handleClose = useCallback(() => {
    setClosing(true)
    setTimeout(() => {
      setClosing(false)
      onClose()
    }, 150)
  }, [onClose])

  useEffect(() => {
    if (!isOpen) return
    const handleKey = (e) => {
      if (e.key === 'Escape') handleClose()
    }
    document.addEventListener('keydown', handleKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
  }, [isOpen, handleClose])

  if (!isOpen && !closing) return null

  return (
    <div
      className={`fixed inset-0 z-50 flex items-end md:items-center justify-center p-0 md:p-4 ${
        closing ? 'modal-overlay-exit' : 'modal-overlay-enter'
      }`}
      onClick={handleClose}
      id="modal-overlay"
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      {/* Content */}
      <div
        onClick={(e) => e.stopPropagation()}
        className={`relative w-full md:max-w-lg md:rounded-2xl rounded-t-2xl shadow-[var(--shadow-modal)] overflow-hidden ${
          closing ? 'modal-content-exit' : 'modal-content-enter'
        } ${
          darkMode
            ? 'bg-surface-dark border border-border-dark'
            : 'bg-surface-light border border-border-light'
        }`}
        id="modal-content"
      >
        {/* Header */}
        <div
          className={`flex items-center justify-between px-6 py-4 border-b ${
            darkMode ? 'border-border-dark' : 'border-border-light'
          }`}
        >
          <h2 className="text-lg font-semibold">{title}</h2>
          <button
            onClick={handleClose}
            className="p-1 rounded-lg text-text-muted hover:text-current transition-colors cursor-pointer"
            id="modal-close-btn"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-5 max-h-[70vh] overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  )
}
