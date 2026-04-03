import { useState, useCallback } from 'react'
import { useUiStore } from '../../store/uiStore'
import { formatCurrency } from '../../utils/formatters'

export default function AnomalyAlert({ anomalies }) {
  const darkMode = useUiStore((s) => s.darkMode)
  const [dismissed, setDismissed] = useState(new Set())

  const dismiss = useCallback((category) => {
    setDismissed((prev) => new Set([...prev, category]))
  }, [])

  const visible = anomalies.filter((a) => !dismissed.has(a.category))

  if (anomalies.length === 0) {
    return (
      <div
        className={`rounded-xl p-3 sm:p-5 border ${
          darkMode
            ? 'bg-surface-dark border-border-dark'
            : 'bg-surface-light border-border-light'
        }`}
        style={{ boxShadow: 'var(--shadow-card)' }}
        id="anomaly-all-normal"
      >
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 sm:w-10 sm:h-10 rounded-full bg-success-muted flex items-center justify-center">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2">
              <path d="M20 6L9 17l-5-5" />
            </svg>
          </div>
          <div>
            <p className="font-semibold text-success">All spending looks normal</p>
            <p className="text-xs text-text-muted mt-0.5">
              No spending anomalies detected this month
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-3" id="anomaly-alerts">
      {visible.map((a) => (
        <div
          key={a.category}
          className={`rounded-xl p-4 border flex items-start gap-3 transition-all ${
            darkMode
              ? 'bg-warning-muted/10 border-warning/20'
              : 'bg-warning-muted border-warning/20'
          }`}
          style={{ boxShadow: 'var(--shadow-card)' }}
        >
          <div className="w-9 h-9 rounded-full bg-warning-muted flex items-center justify-center shrink-0 mt-0.5">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#F59E0B" strokeWidth="2">
              <path d="M12 9v4M12 17h.01" />
              <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
            </svg>
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-sm text-warning">
              {a.category} spending is unusually high
            </p>
            <p className="text-xs text-text-muted mt-1">
              Current: {formatCurrency(a.amount)} · Average:{' '}
              {formatCurrency(a.avg)} ·{' '}
              <span className="text-warning font-medium">
                {formatCurrency(a.amount - a.avg)} over
              </span>
            </p>
          </div>
          <button
            onClick={() => dismiss(a.category)}
            className="p-1 text-text-muted hover:text-current transition-colors shrink-0 cursor-pointer"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>
      ))}
    </div>
  )
}
