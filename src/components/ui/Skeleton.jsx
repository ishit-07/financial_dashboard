import { useUiStore } from '../../store/uiStore'

export default function Skeleton({ width = '100%', height = '20px', rounded = 'rounded-lg', className = '' }) {
  const darkMode = useUiStore((s) => s.darkMode)

  return (
    <div
      className={`skeleton-pulse ${rounded} ${className}`}
      style={{ width, height }}
      role="status"
      aria-label="Loading"
    >
      <div
        className={`w-full h-full ${rounded} ${
          darkMode ? 'bg-border-dark' : 'bg-border-light'
        }`}
      />
    </div>
  )
}

export function SkeletonCard() {
  return (
    <div className="p-5 space-y-3">
      <Skeleton width="40%" height="14px" />
      <Skeleton width="60%" height="28px" />
      <Skeleton width="30%" height="14px" />
    </div>
  )
}

export function SkeletonChart() {
  return (
    <div className="p-5 space-y-4">
      <Skeleton width="30%" height="16px" />
      <Skeleton width="100%" height="200px" rounded="rounded-xl" />
    </div>
  )
}

export function SkeletonRow() {
  return (
    <div className="flex items-center gap-4 px-4 py-3">
      <Skeleton width="80px" height="14px" />
      <Skeleton width="150px" height="14px" />
      <Skeleton width="70px" height="22px" rounded="rounded-full" />
      <Skeleton width="80px" height="14px" />
      <Skeleton width="60px" height="22px" rounded="rounded-full" />
    </div>
  )
}
