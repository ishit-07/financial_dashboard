import { useMemo, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTransactionStore } from '../store/transactionStore'
import { useUiStore } from '../store/uiStore'
import { useFilteredTransactions } from '../hooks/useFilteredTransactions'
import { compareMonths } from '../utils/aggregators'
import { formatCurrency, formatDate } from '../utils/formatters'
import SummaryCard from '../components/dashboard/SummaryCard'
import BalanceTrendChart from '../components/dashboard/BalanceTrendChart'
import SpendingDonutChart from '../components/dashboard/SpendingDonutChart'
import Badge from '../components/ui/Badge'
import { SkeletonCard, SkeletonChart } from '../components/ui/Skeleton'
import EmptyState from '../components/ui/EmptyState'

export default function DashboardPage() {
  const darkMode = useUiStore((s) => s.darkMode)
  const transactions = useTransactionStore((s) => s.transactions)
  const { stats } = useFilteredTransactions()
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 600)
    return () => clearTimeout(timer)
  }, [])

  const comparison = useMemo(() => compareMonths(transactions), [transactions])

  const incomeTrend = useMemo(() => {
    if (comparison.previous.income === 0) return null
    return (
      ((comparison.current.income - comparison.previous.income) /
        comparison.previous.income) *
      100
    )
  }, [comparison])

  const expenseTrend = useMemo(() => {
    if (comparison.previous.expense === 0) return null
    return (
      ((comparison.current.expense - comparison.previous.expense) /
        comparison.previous.expense) *
      100
    )
  }, [comparison])

  const balanceTrend = useMemo(() => {
    const prevBalance = comparison.previous.income - comparison.previous.expense
    if (prevBalance === 0) return null
    return ((stats.balance - prevBalance) / Math.abs(prevBalance)) * 100
  }, [comparison, stats.balance])

  const recentTransactions = useMemo(
    () =>
      [...transactions]
        .sort((a, b) => b.date.localeCompare(a.date))
        .slice(0, 5),
    [transactions]
  )

  if (!loading && transactions.length === 0) {
    return (
      <div className="page-enter max-w-7xl mx-auto flex items-center justify-center min-h-[70vh]">
        <EmptyState
          title="Welcome to Zorvyn Finance"
          description="It looks like you don't have any data yet. Start tracking your financial health by adding your first transaction."
          actionLabel="Add Transaction"
          onAction={() => navigate('/transactions')}
        />
      </div>
    )
  }

  return (
    <div className="page-enter space-y-6 max-w-7xl mx-auto" id="dashboard-page">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {loading ? (
          <>
            <div className={`rounded-xl ${darkMode ? 'bg-surface-dark border border-border-dark' : 'bg-surface-light border border-border-light'}`}>
              <SkeletonCard />
            </div>
            <div className={`rounded-xl ${darkMode ? 'bg-surface-dark border border-border-dark' : 'bg-surface-light border border-border-light'}`}>
              <SkeletonCard />
            </div>
            <div className={`rounded-xl ${darkMode ? 'bg-surface-dark border border-border-dark' : 'bg-surface-light border border-border-light'}`}>
              <SkeletonCard />
            </div>
          </>
        ) : (
          <>
            <SummaryCard
              label="Total Balance"
              amount={stats.balance}
              icon="💰"
              trend={balanceTrend}
              accentColor="#6366F1"
              accentBg="rgba(99,102,241,0.15)"
            />
            <SummaryCard
              label="Total Income"
              amount={stats.income}
              icon="📈"
              trend={incomeTrend}
              accentColor="#10B981"
              accentBg="rgba(16,185,129,0.15)"
            />
            <SummaryCard
              label="Total Expenses"
              amount={stats.expense}
              icon="📉"
              trend={expenseTrend}
              accentColor="#F43F5E"
              accentBg="rgba(244,63,94,0.15)"
            />
          </>
        )}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        <div className="lg:col-span-3">
          {loading ? (
            <div className={`rounded-xl ${darkMode ? 'bg-surface-dark border border-border-dark' : 'bg-surface-light border border-border-light'}`}>
              <SkeletonChart />
            </div>
          ) : (
            <BalanceTrendChart />
          )}
        </div>
        <div className="lg:col-span-2">
          {loading ? (
            <div className={`rounded-xl ${darkMode ? 'bg-surface-dark border border-border-dark' : 'bg-surface-light border border-border-light'}`}>
              <SkeletonChart />
            </div>
          ) : (
            <SpendingDonutChart />
          )}
        </div>
      </div>

      {/* Recent Transactions */}
      <div
        className={`rounded-xl overflow-hidden ${
          darkMode
            ? 'bg-surface-dark border border-border-dark'
            : 'bg-surface-light border border-border-light'
        }`}
        style={{ boxShadow: 'var(--shadow-card)' }}
        id="recent-transactions"
      >
        <div className="px-5 py-4 flex items-center justify-between">
          <h3 className="text-sm font-semibold">Recent Transactions</h3>
          <a
            href="/transactions"
            className="text-xs text-primary hover:text-primary-hover font-medium transition-colors"
          >
            View all →
          </a>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <tbody
              className={`divide-y ${
                darkMode ? 'divide-border-dark' : 'divide-border-light'
              }`}
            >
              {recentTransactions.map((txn) => (
                <tr
                  key={txn.id}
                  className={`transition-colors ${
                    darkMode ? 'hover:bg-border-dark/30' : 'hover:bg-bg-light'
                  }`}
                >
                  <td className="px-5 py-3 text-sm text-text-muted whitespace-nowrap">
                    {formatDate(txn.date)}
                  </td>
                  <td className="px-5 py-3 text-sm font-medium">
                    {txn.description}
                  </td>
                  <td className="px-5 py-3">
                    <Badge
                      variant={txn.type === 'income' ? 'success' : 'danger'}
                    >
                      {txn.category}
                    </Badge>
                  </td>
                  <td
                    className={`px-5 py-3 text-sm font-semibold text-right whitespace-nowrap ${
                      txn.type === 'income' ? 'text-success' : 'text-danger'
                    }`}
                  >
                    {txn.type === 'income' ? '+' : '-'}
                    {formatCurrency(txn.amount)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
