import { useUiStore } from '../../store/uiStore'

const VARIANT_STYLES = {
  primary: 'bg-primary-muted text-primary',
  success: 'bg-success-muted text-success',
  danger: 'bg-danger-muted text-danger',
  warning: 'bg-warning-muted text-warning',
  purple: 'bg-[rgba(139,92,246,0.15)] text-purple',
  default: '',
}

export default function Badge({ children, variant = 'default', className = '' }) {
  const darkMode = useUiStore((s) => s.darkMode)

  const defaultStyle = darkMode
    ? 'bg-border-dark text-text-muted'
    : 'bg-border-light text-text-muted'

  const style = variant === 'default' ? defaultStyle : VARIANT_STYLES[variant]

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium whitespace-nowrap ${style} ${className}`}
    >
      {children}
    </span>
  )
}
