import { useMemo } from 'react'
import { useTransactionStore } from '../store/transactionStore'
import { useUiStore } from '../store/uiStore'
import {
  getTopCategory,
  compareMonths,
  detectAnomalies,
  getSavingsRate,
  groupByCategory,
} from '../utils/aggregators'
import { formatCurrency, formatPercent, getCategoryIcon, getCategoryColor } from '../utils/formatters'
import InsightCard from '../components/insights/InsightCard'
import MonthComparisonChart from '../components/insights/MonthComparisonChart'
import AnomalyAlert from '../components/insights/AnomalyAlert'

export default function InsightsPage() {
  const darkMode = useUiStore((s) => s.darkMode)
  const transactions = useTransactionStore((s) => s.transactions)

  const topCategory = useMemo(() => getTopCategory(transactions), [transactions])
  const comparison = useMemo(() => compareMonths(transactions), [transactions])
  const anomalies = useMemo(() => detectAnomalies(transactions), [transactions])
  const savingsRate = useMemo(() => getSavingsRate(transactions), [transactions])
  const grouped = useMemo(() => groupByCategory(transactions), [transactions])
  const totalExpense = useMemo(
    () => Object.values(grouped).reduce((s, v) => s + v, 0),
    [grouped]
  )

  const incomeChange = useMemo(() => {
    if (comparison.previous.income === 0) return null
    return (
      ((comparison.current.income - comparison.previous.income) /
        comparison.previous.income) *
      100
    )
  }, [comparison])

  const expenseChange = useMemo(() => {
    if (comparison.previous.expense === 0) return null
    return (
      ((comparison.current.expense - comparison.previous.expense) /
        comparison.previous.expense) *
      100
    )
  }, [comparison])

  const foodPercent = useMemo(() => {
    if (totalExpense === 0) return 0
    return ((grouped['Food'] || 0) / totalExpense) * 100
  }, [grouped, totalExpense])

  const entPercent = useMemo(() => {
    if (totalExpense === 0) return 0
    return ((grouped['Entertainment'] || 0) / totalExpense) * 100
  }, [grouped, totalExpense])

  const tips = useMemo(() => {
    const result = []
    if (foodPercent > 30) {
      result.push({
        icon: '🍳',
        title: 'Consider meal prepping',
        text: `Food is ${foodPercent.toFixed(0)}% of your expenses. Try meal prepping to save more.`,
        color: '#F59E0B',
      })
    }
    if (entPercent > 15) {
      result.push({
        icon: '🎬',
        title: 'Entertainment spend is high',
        text: `Entertainment is ${entPercent.toFixed(0)}% of your spend this month. Consider cutting back.`,
        color: '#F43F5E',
      })
    }
    if (savingsRate > 20) {
      result.push({
        icon: '🎉',
        title: 'Great savings rate!',
        text: `You're saving ${savingsRate.toFixed(1)}% of your income. Keep it up!`,
        color: '#10B981',
      })
    } else if (savingsRate > 0) {
      result.push({
        icon: '💡',
        title: 'Room to improve',
        text: `Your savings rate is ${savingsRate.toFixed(1)}%. Try targeting 20% or more.`,
        color: '#6366F1',
      })
    }
    return result
  }, [foodPercent, entPercent, savingsRate])

  return (
    <div className="page-enter space-y-6 max-w-7xl mx-auto" id="insights-page">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Top spending category */}
        {topCategory && (
          <InsightCard title="Top Spending Category">
            <div className="flex items-center gap-4">
              <div
                className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl"
                style={{ backgroundColor: getCategoryColor(topCategory.category) + '20' }}
              >
                {getCategoryIcon(topCategory.category)}
              </div>
              <div className="flex-1">
                <p className="text-xl font-semibold">{topCategory.category}</p>
                <p className="text-text-muted text-sm mt-0.5">
                  {formatCurrency(topCategory.total)} ·{' '}
                  {topCategory.percent.toFixed(1)}% of expenses
                </p>
              </div>
            </div>
            {/* Progress bar */}
            <div className={`mt-4 h-2 rounded-full overflow-hidden ${
              darkMode ? 'bg-border-dark' : 'bg-border-light'
            }`}>
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{
                  width: `${topCategory.percent}%`,
                  backgroundColor: getCategoryColor(topCategory.category),
                }}
              />
            </div>
          </InsightCard>
        )}

        {/* Month comparison */}
        <InsightCard title="Month-over-Month">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-text-muted mb-1">This Month Income</p>
              <p className="text-lg font-semibold text-success">
                {formatCurrency(comparison.current.income)}
              </p>
              {incomeChange !== null && (
                <p className={`text-xs mt-1 ${incomeChange >= 0 ? 'text-success' : 'text-danger'}`}>
                  {formatPercent(incomeChange)} vs last month
                </p>
              )}
            </div>
            <div>
              <p className="text-xs text-text-muted mb-1">This Month Expense</p>
              <p className="text-lg font-semibold text-danger">
                {formatCurrency(comparison.current.expense)}
              </p>
              {expenseChange !== null && (
                <p className={`text-xs mt-1 ${expenseChange <= 0 ? 'text-success' : 'text-danger'}`}>
                  {formatPercent(expenseChange)} vs last month
                </p>
              )}
            </div>
            <div>
              <p className="text-xs text-text-muted mb-1">Last Month Income</p>
              <p className="text-sm font-medium text-text-muted">
                {formatCurrency(comparison.previous.income)}
              </p>
            </div>
            <div>
              <p className="text-xs text-text-muted mb-1">Last Month Expense</p>
              <p className="text-sm font-medium text-text-muted">
                {formatCurrency(comparison.previous.expense)}
              </p>
            </div>
          </div>
        </InsightCard>

        {/* Anomaly alerts */}
        <div className="lg:col-span-2">
          <h3 className="text-sm font-semibold mb-3">Spending Anomalies</h3>
          <AnomalyAlert anomalies={anomalies} />
        </div>

        {/* Smart tips */}
        {tips.length > 0 && (
          <div className="lg:col-span-2">
            <h3 className="text-sm font-semibold mb-3">Smart Tips</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {tips.map((tip, i) => (
                <div
                  key={i}
                  className={`rounded-xl p-4 border transition-all duration-200 hover:-translate-y-0.5 ${
                    darkMode
                      ? 'bg-surface-dark border-border-dark'
                      : 'bg-surface-light border-border-light'
                  }`}
                  style={{ boxShadow: 'var(--shadow-card)' }}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xl">{tip.icon}</span>
                    <span className="text-sm font-semibold" style={{ color: tip.color }}>
                      {tip.title}
                    </span>
                  </div>
                  <p className="text-xs text-text-muted leading-relaxed">
                    {tip.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Monthly bar chart */}
        <div className="lg:col-span-2">
          <InsightCard title="Monthly Income vs Expenses">
            <MonthComparisonChart />
          </InsightCard>
        </div>
      </div>
    </div>
  )
}
