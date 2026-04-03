const CATEGORY_COLORS = {
  Food: '#6366F1',
  Transport: '#10B981',
  Housing: '#F59E0B',
  Entertainment: '#F43F5E',
  Health: '#8B5CF6',
  Income: '#10B981',
}

const CATEGORY_ICONS = {
  Food: '🍔',
  Transport: '🚗',
  Housing: '🏠',
  Entertainment: '🎬',
  Health: '💊',
  Income: '💰',
}

export function formatCurrency(amount) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount)
}

export function formatDate(dateStr) {
  const d = new Date(dateStr + 'T00:00:00')
  return d.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

export function formatPercent(value) {
  const sign = value >= 0 ? '+' : ''
  return `${sign}${value.toFixed(1)}%`
}

export function getCategoryColor(category) {
  return CATEGORY_COLORS[category] || '#94A3B8'
}

export function getCategoryIcon(category) {
  return CATEGORY_ICONS[category] || '📋'
}
