import { useUiStore } from '../../store/uiStore'

export default function InsightCard({ title, children, className = '' }) {
  const darkMode = useUiStore((s) => s.darkMode)

  return (
    <div
      className={`rounded-xl p-5 transition-all duration-200 hover:-translate-y-0.5 ${
        darkMode
          ? 'bg-surface-dark border border-border-dark'
          : 'bg-surface-light border border-border-light'
      } ${className}`}
      style={{ boxShadow: 'var(--shadow-card)' }}
    >
      {title && (
        <h3 className="text-sm font-semibold mb-4">{title}</h3>
      )}
      {children}
    </div>
  )
}
