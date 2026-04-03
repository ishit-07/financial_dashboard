import { useUiStore } from '../../store/uiStore'

export default function EmptyState({ title, subtitle, action, onAction }) {
  const darkMode = useUiStore((s) => s.darkMode)

  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center" id="empty-state">
      {/* Empty wallet SVG illustration */}
      <svg width="120" height="120" viewBox="0 0 120 120" fill="none" className="mb-6 opacity-40">
        <rect x="20" y="35" width="80" height="55" rx="8" stroke="currentColor" strokeWidth="2" fill="none" />
        <path d="M20 50h80" stroke="currentColor" strokeWidth="2" />
        <rect x="70" y="58" width="20" height="12" rx="4" stroke="currentColor" strokeWidth="2" fill="none" />
        <circle cx="80" cy="64" r="2" fill="currentColor" />
        <path d="M35 35V28a8 8 0 018-8h34a8 8 0 018 8v7" stroke="currentColor" strokeWidth="2" fill="none" />
      </svg>

      <h3 className="text-lg font-semibold mb-2">{title || 'No transactions found'}</h3>
      <p className="text-text-muted text-sm max-w-xs mb-6">
        {subtitle || 'Try adjusting your filters or add a new transaction'}
      </p>

      {action && (
        <button
          onClick={onAction}
          className="px-4 py-2 bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary-hover transition-colors active:scale-[0.97] cursor-pointer"
          id="empty-state-action"
        >
          {action}
        </button>
      )}
    </div>
  )
}
