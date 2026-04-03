import { useMemo } from 'react'
import { useTransactionStore } from '../store/transactionStore'

export function useFilteredTransactions() {
  const transactions = useTransactionStore((s) => s.transactions)
  const filters = useTransactionStore((s) => s.filters)
  const sort = useTransactionStore((s) => s.sort)

  const filtered = useMemo(() => {
    let result = [...transactions]

    if (filters.category) {
      result = result.filter((t) => t.category === filters.category)
    }
    if (filters.type) {
      result = result.filter((t) => t.type === filters.type)
    }
    if (filters.dateFrom) {
      result = result.filter((t) => t.date >= filters.dateFrom)
    }
    if (filters.dateTo) {
      result = result.filter((t) => t.date <= filters.dateTo)
    }
    if (filters.search) {
      const q = filters.search.toLowerCase()
      result = result.filter(
        (t) =>
          t.description.toLowerCase().includes(q) ||
          t.category.toLowerCase().includes(q)
      )
    }

    result.sort((a, b) => {
      let cmp = 0
      if (sort.field === 'date') cmp = a.date.localeCompare(b.date)
      else if (sort.field === 'amount') cmp = a.amount - b.amount
      else if (sort.field === 'description')
        cmp = a.description.localeCompare(b.description)
      else if (sort.field === 'category')
        cmp = a.category.localeCompare(b.category)
      else if (sort.field === 'type') cmp = a.type.localeCompare(b.type)

      return sort.direction === 'asc' ? cmp : -cmp
    })

    return result
  }, [transactions, filters, sort])

  const stats = useMemo(() => {
    const income = transactions
      .filter((t) => t.type === 'income')
      .reduce((s, t) => s + t.amount, 0)
    const expense = transactions
      .filter((t) => t.type === 'expense')
      .reduce((s, t) => s + t.amount, 0)
    return {
      total: transactions.length,
      income,
      expense,
      balance: income - expense,
    }
  }, [transactions])

  return { filtered, stats }
}
