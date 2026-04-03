import { useMemo } from 'react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from 'recharts'
import { useTransactionStore } from '../../store/transactionStore'
import { useUiStore } from '../../store/uiStore'
import { sumByMonth } from '../../utils/aggregators'
import { formatCurrency } from '../../utils/formatters'

export default function MonthComparisonChart() {
  const transactions = useTransactionStore((s) => s.transactions)
  const darkMode = useUiStore((s) => s.darkMode)
  
  const data = useMemo(() => {
    const monthly = sumByMonth(transactions)
    return monthly.slice(-6).map((m) => {
      const date = new Date(m.month + '-01')
      return {
        ...m,
        label: date.toLocaleDateString('en-IN', {
          month: 'short',
          year: '2-digit',
        }),
      }
    })
  }, [transactions])

  return (
    <div id="month-comparison-chart">
      <ResponsiveContainer width="100%" height={280}>
        <BarChart data={data} margin={{ top: 5, right: 10, left: 0, bottom: 0 }} barGap={2} barCategoryGap="25%">
          <CartesianGrid
            strokeDasharray="3 3"
            stroke={darkMode ? '#2A2D3A' : '#E8ECF0'}
            vertical={false}
          />
          <XAxis
            dataKey="label"
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12, fill: '#94A3B8' }}
            minTickGap={10}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12, fill: '#94A3B8' }}
            tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`}
            width={50}
          />
          <Tooltip content={<CustomTooltip darkMode={darkMode} />} />
          <Legend
            formatter={(value) => (
              <span className="text-xs text-text-muted capitalize">{value}</span>
            )}
            wrapperStyle={{ paddingTop: '10px' }}
          />
          <Bar
            dataKey="income"
            fill="#10B981"
            radius={[4, 4, 0, 0]}
            maxBarSize={16}
          />
          <Bar
            dataKey="expense"
            fill="#F43F5E"
            radius={[4, 4, 0, 0]}
            maxBarSize={16}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

function CustomTooltip({ active, payload, darkMode }) {
  if (!active || !payload?.length) return null
  return (
    <div
      className={`px-3 py-2 rounded-lg shadow-lg text-sm ${
        darkMode
          ? 'bg-surface-dark border border-border-dark'
          : 'bg-surface-light border border-border-light'
      }`}
    >
      <p className="text-text-muted text-xs mb-1">{payload[0]?.payload?.label}</p>
      {payload.map((p) => (
        <p key={p.dataKey} className="font-medium" style={{ color: p.fill }}>
          {p.dataKey === 'income' ? 'Income' : 'Expense'}:{' '}
          {formatCurrency(p.value)}
        </p>
      ))}
    </div>
  )
}