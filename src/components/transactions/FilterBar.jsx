import { useCallback, useState, useMemo } from 'react'
import { useTransactionStore } from '../../store/transactionStore'
import { useUiStore } from '../../store/uiStore'
import { usePermission } from '../../hooks/usePermission'
import Button from '../ui/Button'
import CustomSelect from '../ui/CustomSelect'

const CATEGORIES = ['', 'Food', 'Transport', 'Housing', 'Entertainment', 'Health', 'Income']
const TYPES = ['', 'income', 'expense']

export default function FilterBar({ onAddClick }) {
  const darkMode = useUiStore((s) => s.darkMode)
  const filters = useTransactionStore((s) => s.filters)
  const setFilter = useTransactionStore((s) => s.setFilter)
  const clearFilters = useTransactionStore((s) => s.clearFilters)
  const canAdd = usePermission('add')
  const canExport = usePermission('export')
  const [expanded, setExpanded] = useState(false)

  const hasFilters = useMemo(
    () => Object.values(filters).some((v) => v !== ''),
    [filters]
  )

  const activeChips = useMemo(() => {
    const chips = []
    if (filters.category) chips.push({ key: 'category', label: filters.category })
    if (filters.type) chips.push({ key: 'type', label: filters.type === 'income' ? 'Income' : 'Expense' })
    if (filters.dateFrom) chips.push({ key: 'dateFrom', label: `From: ${filters.dateFrom}` })
    if (filters.dateTo) chips.push({ key: 'dateTo', label: `To: ${filters.dateTo}` })
    if (filters.search) chips.push({ key: 'search', label: `"${filters.search}"` })
    return chips
  }, [filters])

  const handleSearch = useCallback(
    (e) => setFilter('search', e.target.value),
    [setFilter]
  )

  const inputClass = `text-sm rounded-lg border px-3 py-2 outline-none transition-all focus:ring-2 focus:ring-primary/40 focus:border-primary ${
    darkMode
      ? 'bg-bg-dark border-border-dark text-text-primary-dark placeholder:text-text-muted'
      : 'bg-bg-light border-border-light text-text-primary-light placeholder:text-text-muted'
  }`

  return (
    <div className="space-y-3" id="filter-bar">
      {/* Main row */}
      <div className="flex flex-wrap items-center gap-3">
        {/* Search */}
        <div className="relative flex-1 min-w-[200px]">
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted"
            width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="M21 21l-4.35-4.35" />
          </svg>
          <input
            type="text"
            placeholder="Search transactions..."
            value={filters.search}
            onChange={handleSearch}
            className={`${inputClass} pl-9 pr-8 w-full`}
            id="search-input"
          />
          {filters.search && (
            <button
              onClick={() => setFilter('search', '')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-current cursor-pointer"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>

        {/* Mobile filter toggle */}
        <button
          onClick={() => setExpanded(!expanded)}
          className={`md:hidden p-2 rounded-lg border cursor-pointer ${
            darkMode ? 'border-border-dark' : 'border-border-light'
          }`}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M22 3H2l8 9.46V19l4 2v-8.54L22 3z" />
          </svg>
        </button>

        {/* Desktop filter controls */}
        <div className={`${expanded ? 'flex' : 'hidden'} md:flex flex-wrap items-center gap-3 w-full md:w-auto`}>
          <CustomSelect
            value={filters.category}
            onChange={(val) => setFilter('category', val)}
            options={[
              { value: '', label: 'All Categories' },
              ...CATEGORIES.filter(Boolean).map((c) => ({ value: c, label: c })),
            ]}
            className="min-w-[160px]"
            id="filter-category"
          />

          <CustomSelect
            value={filters.type}
            onChange={(val) => setFilter('type', val)}
            options={[
              { value: '', label: 'All Types' },
              { value: 'income', label: 'Income' },
              { value: 'expense', label: 'Expense' },
            ]}
            className="min-w-[140px]"
            id="filter-type"
          />

          <input
            type="date"
            value={filters.dateFrom}
            onChange={(e) => setFilter('dateFrom', e.target.value)}
            className={`${inputClass} cursor-pointer`}
            placeholder="From"
            id="filter-date-from"
          />

          <input
            type="date"
            value={filters.dateTo}
            onChange={(e) => setFilter('dateTo', e.target.value)}
            className={`${inputClass} cursor-pointer`}
            placeholder="To"
            id="filter-date-to"
          />

          {hasFilters && (
            <Button variant="ghost" size="sm" onClick={clearFilters} id="clear-filters">
              Clear all
            </Button>
          )}
        </div>

        {/* Action buttons (right-aligned) */}
        <div className="flex items-center gap-2 ml-auto">
          {canExport && (
            <Button
              variant="secondary"
              size="sm"
              onClick={() => {
                const { exportToCSV } = require('../../utils/exportUtils')
                const txns = useTransactionStore.getState().transactions
                exportToCSV(txns)
              }}
              id="export-csv-btn"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" />
              </svg>
              Export CSV
            </Button>
          )}
          {canAdd && (
            <Button variant="primary" size="sm" onClick={onAddClick} id="add-transaction-btn">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 5v14M5 12h14" />
              </svg>
              Add Transaction
            </Button>
          )}
        </div>
      </div>

      {/* Active filter chips */}
      {activeChips.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {activeChips.map((chip) => (
            <span
              key={chip.key}
              className={`chip-enter inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
                darkMode
                  ? 'bg-primary-muted text-primary'
                  : 'bg-primary-muted text-primary'
              }`}
            >
              {chip.label}
              <button
                onClick={() => setFilter(chip.key, '')}
                className="hover:text-current transition-colors cursor-pointer"
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  )
}
