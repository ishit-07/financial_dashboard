import { NavLink } from 'react-router-dom'
import { useUiStore } from '../../store/uiStore'

const tabs = [
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

export default function MobileNav() {
  const darkMode = useUiStore((s) => s.darkMode)

  return (
    <nav
      className={`md:hidden fixed bottom-0 left-0 right-0 z-40 flex items-center justify-around h-16 border-t transition-theme ${
        darkMode
          ? 'bg-surface-dark border-border-dark'
          : 'bg-surface-light border-border-light'
      }`}
      id="mobile-nav"
    >
      {tabs.map((tab) => (
        <NavLink
          key={tab.to}
          to={tab.to}
          end={tab.to === '/'}
          className={({ isActive }) =>
            `flex flex-col items-center gap-1 px-3 py-1.5 text-[11px] font-medium transition-colors ${
              isActive ? 'text-primary' : 'text-text-muted'
            }`
          }
          id={`mobile-nav-${tab.label.toLowerCase()}`}
        >
          {tab.icon}
          <span>{tab.label}</span>
        </NavLink>
      ))}
    </nav>
  )
}
