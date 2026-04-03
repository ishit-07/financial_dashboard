import { useState, useCallback, useMemo } from 'react'
import { useUiStore } from '../../store/uiStore'
import { useTransactionStore } from '../../store/transactionStore'
import { usePermission } from '../../hooks/usePermission'
import TransactionRow from './TransactionRow'
import EmptyState from '../ui/EmptyState'
import Button from '../ui/Button'

const ROWS_PER_PAGE = 10

export default function TransactionTable({ transactions, onEdit, onDelete, onAdd, onClearFilters }) {
  const darkMode = useUiStore((s) => s.darkMode)
  const sort = useTransactionStore((s) => s.sort)
  const setSort = useTransactionStore((s) => s.setSort)
  const canEdit = usePermission('edit')
  const canDelete = usePermission('delete')
  const canAdd = usePermission('add')
  const [page, setPage] = useState(0)
  const [confirmDelete, setConfirmDelete] = useState(null)

  const totalPages = Math.ceil(transactions.length / ROWS_PER_PAGE)
  const paged = useMemo(
    () => transactions.slice(page * ROWS_PER_PAGE, (page + 1) * ROWS_PER_PAGE),
    [transactions, page]
  )

  const handleSort = useCallback(
    (field) => {
      setSort(field)
      setPage(0)
    },
    [setSort]
  )

  const handleDeleteClick = useCallback((txn) => {
    setConfirmDelete(txn)
  }, [])

  const confirmDeleteAction = useCallback(() => {
    if (confirmDelete) {
      onDelete(confirmDelete.id)
      setConfirmDelete(null)
    }
  }, [confirmDelete, onDelete])

  if (transactions.length === 0) {
    return (
      <EmptyState
        title="No transactions found"
        subtitle="Try adjusting your filters or add a new transaction"
        action={canAdd ? 'Add Transaction' : 'Clear Filters'}
        onAction={canAdd ? onAdd : onClearFilters}
      />
    )
  }

  const columns = [
    { key: 'date', label: 'Date' },
    { key: 'description', label: 'Description' },
    { key: 'category', label: 'Category' },
    { key: 'amount', label: 'Amount' },
    { key: 'type', label: 'Type' },
    { key: '', label: '' },
  ]

  return (
    <div id="transaction-table">
      <div className="overflow-x-auto rounded-xl">
        <table className="w-full text-left">
          <thead>
            <tr
              className={`text-xs uppercase tracking-wider ${
                darkMode
                  ? 'text-text-muted border-b border-border-dark'
                  : 'text-text-muted border-b border-border-light'
              }`}
            >
              {columns.map((col) => (
                <th
                  key={col.key || 'actions'}
                  className={`px-4 py-3 font-medium ${
                    col.key ? 'cursor-pointer select-none hover:text-current transition-colors' : ''
                  }`}
                  onClick={col.key ? () => handleSort(col.key) : undefined}
                  id={col.key ? `sort-${col.key}` : undefined}
                >
                  <span className="inline-flex items-center gap-1">
                    {col.label}
                    {col.key && sort.field === col.key && (
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        className="transition-transform duration-200"
                        style={{
                          transform: sort.direction === 'asc' ? 'rotate(180deg)' : 'none',
                        }}
                      >
                        <path d="M6 9l6 6 6-6" />
                      </svg>
                    )}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody
            className={`divide-y ${
              darkMode ? 'divide-border-dark' : 'divide-border-light'
            }`}
          >
            {paged.map((txn) => (
              <TransactionRow
                key={txn.id}
                transaction={txn}
                canEdit={canEdit}
                canDelete={canDelete}
                onEdit={onEdit}
                onDelete={handleDeleteClick}
              />
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-4 px-4 pb-5">
          <p className="text-xs text-text-muted text-center sm:text-left whitespace-nowrap">
            Showing {page * ROWS_PER_PAGE + 1}–
            {Math.min((page + 1) * ROWS_PER_PAGE, transactions.length)} of{' '}
            {transactions.length}
          </p>
          <div className="flex items-center justify-center gap-2 w-full sm:w-auto">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setPage((p) => Math.max(0, p - 1))}
              disabled={page === 0}
              id="pagination-prev"
              className="whitespace-nowrap"
            >
              ← Prev
            </Button>
            <span className="text-xs text-text-muted px-2 whitespace-nowrap">
              {page + 1} / {totalPages}
            </span>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
              disabled={page === totalPages - 1}
              id="pagination-next"
              className="whitespace-nowrap"
            >
              Next →
            </Button>
          </div>
        </div>
      )}

      {/* Inline delete confirmation */}
      {confirmDelete && (
        <div
          className={`fixed inset-0 z-50 flex items-center justify-center p-4 modal-overlay-enter`}
          onClick={() => setConfirmDelete(null)}
        >
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
          <div
            onClick={(e) => e.stopPropagation()}
            className={`relative rounded-xl p-6 max-w-sm w-full modal-content-enter ${
              darkMode
                ? 'bg-surface-dark border border-border-dark'
                : 'bg-surface-light border border-border-light'
            }`}
            style={{ boxShadow: 'var(--shadow-modal)' }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-danger-muted flex items-center justify-center">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#F43F5E" strokeWidth="2">
                  <path d="M12 9v4M12 17h.01" />
                  <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold">Delete Transaction</h3>
                <p className="text-sm text-text-muted">
                  Delete "{confirmDelete.description}"?
                </p>
              </div>
            </div>
            <div className="flex gap-2 justify-end">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setConfirmDelete(null)}
                id="confirm-cancel"
              >
                Cancel
              </Button>
              <Button
                variant="danger"
                size="sm"
                onClick={confirmDeleteAction}
                id="confirm-delete"
              >
                Delete
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
