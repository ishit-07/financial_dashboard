import { useEffect, useState } from 'react'
import { useUiStore } from '../../store/uiStore'

export default function ToastContainer() {
  const toasts = useUiStore((s) => s.toasts)
  const removeToast = useUiStore((s) => s.removeToast)

  return (
    <div className="fixed bottom-20 md:bottom-6 right-4 z-[60] flex flex-col gap-2 pointer-events-none">
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onDismiss={removeToast} />
      ))}
    </div>
  )
}

function ToastItem({ toast, onDismiss }) {
  const darkMode = useUiStore((s) => s.darkMode)
  const [exiting, setExiting] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setExiting(true)
      setTimeout(() => onDismiss(toast.id), 200)
    }, 3000)
    return () => clearTimeout(timer)
  }, [toast.id, onDismiss])

  const iconMap = {
    success: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2">
        <path d="M20 6L9 17l-5-5" />
      </svg>
    ),
    error: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#F43F5E" strokeWidth="2">
        <circle cx="12" cy="12" r="10" />
        <path d="M15 9l-6 6M9 9l6 6" />
      </svg>
    ),
    info: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6366F1" strokeWidth="2">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 16v-4M12 8h.01" />
      </svg>
    ),
  }

  return (
    <div
      className={`pointer-events-auto flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg text-sm font-medium min-w-[260px] ${
        exiting ? 'toast-exit' : 'toast-enter'
      } ${
        darkMode
          ? 'bg-surface-dark border border-border-dark text-text-primary-dark'
          : 'bg-surface-light border border-border-light text-text-primary-light'
      }`}
    >
      {iconMap[toast.type] || iconMap.info}
      <span className="flex-1">{toast.message}</span>
      <button
        onClick={() => {
          setExiting(true)
          setTimeout(() => onDismiss(toast.id), 200)
        }}
        className="text-text-muted hover:text-current transition-colors p-0.5 cursor-pointer"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M18 6L6 18M6 6l12 12" />
        </svg>
      </button>
    </div>
  )
}
