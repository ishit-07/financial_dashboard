import { useCallback } from 'react'
import { useUiStore } from '../../store/uiStore'

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  onClick,
  disabled = false,
  className = '',
  id,
  type = 'button',
}) {
  const darkMode = useUiStore((s) => s.darkMode)

  const base =
    'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-150 active:scale-[0.97] focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none cursor-pointer'

  const sizes = {
    sm: 'px-3 py-1.5 text-xs gap-1.5',
    md: 'px-4 py-2 text-sm gap-2',
    lg: 'px-6 py-3 text-base gap-2',
  }

  const variants = {
    primary: `bg-primary text-white hover:bg-primary-hover focus:ring-primary shadow-sm`,
    secondary: darkMode
      ? 'bg-surface-dark text-text-primary-dark border border-border-dark hover:bg-border-dark focus:ring-primary'
      : 'bg-surface-light text-text-primary-light border border-border-light hover:bg-bg-light focus:ring-primary',
    danger: 'bg-danger text-white hover:brightness-110 focus:ring-danger',
    ghost: darkMode
      ? 'text-text-muted hover:text-text-primary-dark hover:bg-surface-dark focus:ring-primary'
      : 'text-text-muted hover:text-text-primary-light hover:bg-bg-light focus:ring-primary',
  }

  const handleClick = useCallback(
    (e) => {
      if (onClick) onClick(e)
    },
    [onClick]
  )

  return (
    <button
      id={id}
      type={type}
      disabled={disabled}
      onClick={handleClick}
      className={`${base} ${sizes[size]} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  )
}
