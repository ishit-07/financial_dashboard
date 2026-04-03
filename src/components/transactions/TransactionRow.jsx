import { useCallback, memo } from 'react'
import { useUiStore } from '../../store/uiStore'
import { formatCurrency, formatDate, getCategoryColor } from '../../utils/formatters'
import Badge from '../ui/Badge'

const CATEGORY_BADGE_MAP = {
  Food: 'primary',
  Transport: 'success',
  Housing: 'warning',
  Entertainment: 'danger',
  Health: 'purple',
  Income: 'success',
}

const TransactionRow = memo(function TransactionRow({
  transaction,
  canEdit,
  canDelete,
  onEdit,
  onDelete,
}) {
  const darkMode = useUiStore((s) => s.darkMode)

  const handleEdit = useCallback(() => onEdit(transaction), [transaction, onEdit])
  const handleDelete = useCallback(() => onDelete(transaction), [transaction, onDelete])

  return (
    <tr
      className={`group transition-colors ${
        darkMode ? 'hover:bg-border-dark/30' : 'hover:bg-bg-light'
      }`}
      id={`txn-row-${transaction.id}`}
    >
      <td className="px-4 py-3 text-sm text-text-muted whitespace-nowrap">
        {formatDate(transaction.date)}
      </td>
      <td className="px-4 py-3 text-sm font-medium whitespace-nowrap">
        {transaction.description}
      </td>
      <td className="px-4 py-3">
        <Badge variant={CATEGORY_BADGE_MAP[transaction.category] || 'default'}>
          <span
            className="w-1.5 h-1.5 rounded-full mr-1.5 inline-block"
            style={{ backgroundColor: getCategoryColor(transaction.category) }}
          />
          {transaction.category}
        </Badge>
      </td>
      <td
        className={`px-4 py-3 text-sm font-semibold whitespace-nowrap ${
          transaction.type === 'income' ? 'text-success' : 'text-danger'
        }`}
      >
        {transaction.type === 'income' ? '+' : '-'}
        {formatCurrency(transaction.amount)}
      </td>
      <td className="px-4 py-3">
        <Badge variant={transaction.type === 'income' ? 'success' : 'danger'}>
          {transaction.type === 'income' ? 'Income' : 'Expense'}
        </Badge>
      </td>
      <td className="px-4 py-3 text-right">
        <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          {canEdit && (
            <button
              onClick={handleEdit}
              className="p-1.5 rounded-md text-text-muted hover:text-primary hover:bg-primary-muted transition-colors cursor-pointer"
              title="Edit"
              id={`edit-${transaction.id}`}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
                <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
              </svg>
            </button>
          )}
          {canDelete && (
            <button
              onClick={handleDelete}
              className="p-1.5 rounded-md text-text-muted hover:text-danger hover:bg-danger-muted transition-colors cursor-pointer"
              title="Delete"
              id={`delete-${transaction.id}`}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="3,6 5,6 21,6" />
                <path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" />
              </svg>
            </button>
          )}
        </div>
      </td>
    </tr>
  )
})

export default TransactionRow
