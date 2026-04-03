import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { mockTransactions } from '../data/mockTransactions'

export const useTransactionStore = create(
  persist(
    (set) => ({
      transactions: mockTransactions,
      filters: {
        category: '',
        type: '',
        dateFrom: '',
        dateTo: '',
        search: '',
      },
      sort: { field: 'date', direction: 'desc' },

      addTransaction: (txn) =>
        set((state) => ({
          transactions: [
            { ...txn, id: `txn_${Date.now()}` },
            ...state.transactions,
          ],
        })),

      editTransaction: (id, updates) =>
        set((state) => ({
          transactions: state.transactions.map((t) =>
            t.id === id ? { ...t, ...updates } : t
          ),
        })),

      deleteTransaction: (id) =>
        set((state) => ({
          transactions: state.transactions.filter((t) => t.id !== id),
        })),

      setFilter: (key, value) =>
        set((state) => ({
          filters: { ...state.filters, [key]: value },
        })),

      clearFilters: () =>
        set({
          filters: {
            category: '',
            type: '',
            dateFrom: '',
            dateTo: '',
            search: '',
          },
        }),

      setSort: (field) =>
        set((state) => ({
          sort: {
            field,
            direction:
              state.sort.field === field && state.sort.direction === 'asc'
                ? 'desc'
                : 'asc',
          },
        })),
    }),
    { name: 'zorvyn-transactions' }
  )
)
