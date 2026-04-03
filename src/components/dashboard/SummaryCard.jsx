import { useMemo } from 'react'
import { useUiStore } from '../../store/uiStore'
import { formatCurrency, formatPercent } from '../../utils/formatters'

export default function SummaryCard({ label, amount, icon, trend, accentColor, accentBg }) {
  const darkMode = useUiStore((s) => s.darkMode)

  const trendValue = useMemo(() => {
    if (trend === null || trend === undefined) return null
    return trend
  }, [trend])

  return (
    <div
      className={`relative overflow-hidden rounded-xl p-5 transition-all duration-200 hover:-translate-y-0.5 cursor-default group ${
        darkMode
          ? 'bg-surface-dark border border-border-dark'
          : 'bg-surface-light border border-border-light'
      }`}
      style={{ boxShadow: 'var(--shadow-card)' }}
      id={`summary-card-${label?.toLowerCase().replace(/\s+/g, '-')}`}
    >
      {/* Accent glow */}
      <div
        className="absolute top-0 right-0 w-24 h-24 rounded-full opacity-10 blur-2xl -translate-y-6 translate-x-6 group-hover:opacity-20 transition-opacity"
        style={{ backgroundColor: accentColor }}
      />

      <div className="flex items-start justify-between mb-3">
        <div
          className="w-10 h-10 rounded-lg flex items-center justify-center text-lg"
          style={{ backgroundColor: accentBg }}
        >
          {icon}
        </div>
        {trendValue !== null && (
          <span
            className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full ${
              trendValue >= 0
                ? 'bg-success-muted text-success'
                : 'bg-danger-muted text-danger'
            }`}
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              style={{
                transform: trendValue >= 0 ? 'none' : 'rotate(180deg)',
                transition: 'transform 200ms',
              }}
            >
              <path d="M12 19V5M5 12l7-7 7 7" />
            </svg>
            {formatPercent(trendValue)}
          </span>
        )}
      </div>

      <p className="text-xs text-text-muted font-medium mb-1">{label}</p>
      <p className="text-2xl font-semibold tracking-tight" style={{ color: accentColor }}>
        {formatCurrency(amount)}
      </p>
    </div>
  )
}
