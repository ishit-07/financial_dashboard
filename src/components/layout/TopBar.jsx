import { useLocation } from 'react-router-dom'
import { useUiStore } from '../../store/uiStore'
import { useRoleStore } from '../../store/roleStore'
import RoleBadge from './RoleBadge'
import { useCallback, useState, useRef, useEffect } from 'react'

const PAGE_TITLES = {
  '/': 'Dashboard',
  '/transactions': 'Transactions',
  '/insights': 'Insights',
}

export default function TopBar() {
  const darkMode = useUiStore((s) => s.darkMode)
  const toggleDarkMode = useUiStore((s) => s.toggleDarkMode)
  const toggleSidebar = useUiStore((s) => s.toggleSidebar)
  const role = useRoleStore((s) => s.role)
  const setRole = useRoleStore((s) => s.setRole)
  const location = useLocation()

  const [dropdownOpen, setDropdownOpen] = useState(false)
  const dropdownRef = useRef(null)

  const title = PAGE_TITLES[location.pathname] || 'Dashboard'

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleRoleSelect = (newRole) => {
    setRole(newRole)
    setDropdownOpen(false)
  }

  return (
    <header
      className={`flex items-center justify-between h-16 px-4 md:px-6 border-b shrink-0 transition-theme ${darkMode
          ? 'bg-surface-dark border-border-dark'
          : 'bg-surface-light border-border-light'
        }`}
      id="topbar"
    >
      {/* Left side */}
      <div className="flex items-center gap-2 md:gap-3 min-w-0">
        {/* Sidebar toggle (desktop) */}
        <button
          onClick={toggleSidebar}
          className="hidden md:flex p-2 rounded-lg text-text-muted hover:text-current transition-colors cursor-pointer shrink-0"
          id="sidebar-toggle"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 12h18M3 6h18M3 18h18" />
          </svg>
        </button>

        {/* Mobile logo */}
        <div className="md:hidden flex items-center gap-2 shrink-0">
          <div className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
          </div>
        </div>

        <h1 className="text-lg md:text-xl font-semibold truncate">{title}</h1>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-4">
        {/* Role switcher */}
        <div className="relative flex items-center gap-3" ref={dropdownRef}>
          <div className="hidden sm:block ">
            <RoleBadge />
          </div>
          <button
            type="button"
            aria-label="Switch User Role"
            aria-haspopup="true"
            aria-expanded={dropdownOpen}
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className={`flex items-center gap-2 text-sm font-medium px-3 py-1.5 rounded-lg border transition-theme cursor-pointer ${darkMode
                ? 'bg-surface-dark border-border-dark text-text-primary-dark hover:bg-border-dark/50'
                : 'bg-surface-light border-border-light text-text-primary-light hover:bg-bg-light'
              }`}
            id="role-switcher-btn"
          >
            <span className="capitalize">{role}</span>
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className={`transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`}
              aria-hidden="true"
            >
              <path d="M6 9l6 6 6-6" />
            </svg>
          </button>

          {dropdownOpen && (
            <div
              role="menu"
              className={`absolute top-full right-0 mt-2 w-36 rounded-xl shadow-lg border overflow-hidden z-50 ${darkMode
                  ? 'bg-surface-dark border-border-dark'
                  : 'bg-surface-light border-border-light'
                }`}
              style={{ animation: 'fadeIn 150ms ease-out' }}
            >
              <div className="p-1.5 flex flex-col gap-1">
                <button
                  type="button"
                  role="menuitem"
                  onClick={() => handleRoleSelect('admin')}
                  className={`w-full flex items-center gap-2 text-left px-3 py-2 text-xs rounded-lg transition-colors cursor-pointer ${role === 'admin'
                      ? (darkMode ? 'bg-primary/20 text-primary' : 'bg-primary-muted text-primary')
                      : (darkMode ? 'hover:bg-border-dark/50 text-text-primary-dark' : 'hover:bg-bg-light text-text-primary-light')
                    }`}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  </svg>
                  Admin
                </button>
                <button
                  type="button"
                  role="menuitem"
                  onClick={() => handleRoleSelect('viewer')}
                  className={`w-full flex items-center gap-2 text-left px-3 py-2 text-xs rounded-lg transition-colors cursor-pointer ${role === 'viewer'
                      ? (darkMode ? 'bg-primary/20 text-primary' : 'bg-primary-muted text-primary')
                      : (darkMode ? 'hover:bg-border-dark/50 text-text-primary-dark' : 'hover:bg-bg-light text-text-primary-light')
                    }`}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                  Viewer
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Dark mode toggle */}
        <button
          type="button"
          aria-label={darkMode ? 'Switch to light theme' : 'Switch to dark theme'}
          aria-pressed={darkMode}
          onClick={toggleDarkMode}
          className={`p-2 rounded-lg transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary ${darkMode
              ? 'text-amber-400 hover:bg-border-dark/50'
              : 'text-text-muted hover:bg-bg-light'
            }`}
          id="dark-mode-toggle"
        >
          {darkMode ? (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <circle cx="12" cy="12" r="5" />
              <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
            </svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
            </svg>
          )}
        </button>
      </div>
    </header>
  )
}
