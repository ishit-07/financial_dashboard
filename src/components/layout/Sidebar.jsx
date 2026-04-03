import { NavLink } from 'react-router-dom'
import { useUiStore } from '../../store/uiStore'

const links = [
  {
    to: '/',
    label: 'Dashboard',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="3" y="3" width="7" height="7" rx="1.5" />
        <rect x="14" y="3" width="7" height="7" rx="1.5" />
        <rect x="3" y="14" width="7" height="7" rx="1.5" />
        <rect x="14" y="14" width="7" height="7" rx="1.5" />
      </svg>
    ),
  },
  {
    to: '/transactions',
    label: 'Transactions',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
      </svg>
    ),
  },
  {
    to: '/insights',
    label: 'Insights',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M21 21H4.6c-.56 0-.84 0-1.054-.109a1 1 0 01-.437-.437C3 20.24 3 19.96 3 19.4V3" />
        <path d="M7 14l4-4 4 4 6-6" />
      </svg>
    ),
  },
]

export default function Sidebar() {
  const darkMode = useUiStore((s) => s.darkMode)
  const sidebarOpen = useUiStore((s) => s.sidebarOpen)

  return (
    <aside
      className={`hidden md:flex flex-col h-full border-r transition-all duration-200 shrink-0 ${
        sidebarOpen ? 'w-60' : 'w-16'
      } ${
        darkMode
          ? 'bg-surface-dark border-border-dark'
          : 'bg-surface-light border-border-light'
      }`}
      id="sidebar"
    >
      {/* Logo */}
      <div className={`flex items-center gap-3 px-4 h-16 border-b shrink-0 ${
        darkMode ? 'border-border-dark' : 'border-border-light'
      }`}>
        <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center shrink-0">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
          </svg>
        </div>
        {sidebarOpen && (
          <span className="text-base font-semibold tracking-tight whitespace-nowrap">
            Zorvyn
          </span>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4 px-3 space-y-1">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            end={link.to === '/'}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 ${
                sidebarOpen ? '' : 'justify-center'
              } ${
                isActive
                  ? 'bg-primary text-white shadow-sm'
                  : `text-text-muted hover:text-current ${
                      darkMode ? 'hover:bg-border-dark/50' : 'hover:bg-bg-light'
                    }`
              }`
            }
            id={`nav-${link.label.toLowerCase()}`}
          >
            <span className="shrink-0">{link.icon}</span>
            {sidebarOpen && <span>{link.label}</span>}
          </NavLink>
        ))}
      </nav>

      {/* Footer */}
      {sidebarOpen && (
        <div className={`px-4 py-4 border-t text-xs text-text-muted ${
          darkMode ? 'border-border-dark' : 'border-border-light'
        }`}>
          Zorvyn Finance v1.0
        </div>
      )}
    </aside>
  )
}
