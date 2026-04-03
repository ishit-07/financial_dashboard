import { useState, useCallback } from 'react'
import { useTransactionStore } from '../store/transactionStore'
import { useUiStore } from '../store/uiStore'
import { useFilteredTransactions } from '../hooks/useFilteredTransactions'
import { usePermission } from '../hooks/usePermission'
import { exportToCSV } from '../utils/exportUtils'
import FilterBar from '../components/transactions/FilterBar'
import TransactionTable from '../components/transactions/TransactionTable'
import AddEditModal from '../components/transactions/AddEditModal'

export default function TransactionsPage() {
  const darkMode = useUiStore((s) => s.darkMode)
  const addToast = useUiStore((s) => s.addToast)
  const addTransaction = useTransactionStore((s) => s.addTransaction)
  const editTransaction = useTransactionStore((s) => s.editTransaction)
  const deleteTransaction = useTransactionStore((s) => s.deleteTransaction)
  const clearFilters = useTransactionStore((s) => s.clearFilters)
  const { filtered } = useFilteredTransactions()

  const [modalOpen, setModalOpen] = useState(false)
  const [editData, setEditData] = useState(null)

  const handleAdd = useCallback(() => {
    setEditData(null)
    setModalOpen(true)
  }, [])

  const handleEdit = useCallback((txn) => {
    setEditData(txn)
    setModalOpen(true)
  }, [])

  const handleSubmit = useCallback(
    (data) => {
      if (editData) {
        editTransaction(editData.id, data)
        addToast({ type: 'success', message: 'Transaction updated successfully' })
      } else {
        addTransaction(data)
        addToast({ type: 'success', message: 'Transaction added successfully' })
      }
    },
    [editData, editTransaction, addTransaction, addToast]
  )

  const handleDelete = useCallback(
    (id) => {
      deleteTransaction(id)
      addToast({ type: 'success', message: 'Transaction deleted' })
    },
    [deleteTransaction, addToast]
  )

  const handleCloseModal = useCallback(() => {
    setModalOpen(false)
    setEditData(null)
  }, [])

  return (
    <div className="page-enter space-y-5 max-w-7xl mx-auto" id="transactions-page">
      <FilterBar onAddClick={handleAdd} />

      <div
        className={`rounded-xl overflow-hidden ${
          darkMode
            ? 'bg-surface-dark border border-border-dark'
            : 'bg-surface-light border border-border-light'
        }`}
        style={{ boxShadow: 'var(--shadow-card)' }}
      >
        <TransactionTable
          transactions={filtered}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onAdd={handleAdd}
          onClearFilters={clearFilters}
        />
      </div>

      <AddEditModal
        isOpen={modalOpen}
        onClose={handleCloseModal}
        onSubmit={handleSubmit}
        editData={editData}
      />
    </div>
  )
}
