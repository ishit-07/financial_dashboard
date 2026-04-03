import { useMemo } from 'react'
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts'
import { useTransactionStore } from '../../store/transactionStore'
import { useUiStore } from '../../store/uiStore'
import { getMonthlyBalance } from '../../utils/aggregators'
import { formatCurrency } from '../../utils/formatters'

export default function BalanceTrendChart() {
  const transactions = useTransactionStore((s) => s.transactions)
  const darkMode = useUiStore((s) => s.darkMode)

  const data = useMemo(() => getMonthlyBalance(transactions), [transactions])

  if (data.length === 0) {
    return (
      <div
        className={`rounded-xl p-5 h-full flex items-center justify-center ${
          darkMode
            ? 'bg-surface-dark border border-border-dark'
            : 'bg-surface-light border border-border-light'
        }`}
        style={{ boxShadow: 'var(--shadow-card)' }}
      >
        <p className="text-text-muted text-sm">No data yet</p>
      </div>
    )
  }

  return (
    <div
      className={`rounded-xl p-5 ${
        darkMode
          ? 'bg-surface-dark border border-border-dark'
          : 'bg-surface-light border border-border-light'
      }`}
      style={{ boxShadow: 'var(--shadow-card)' }}
      id="balance-trend-chart"
    >
      <h3 className="text-sm font-semibold mb-4">Balance Trend</h3>
      <ResponsiveContainer width="100%" height={240}>
        <AreaChart data={data} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="balanceGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#6366F1" stopOpacity={0.3} />
              <stop offset="100%" stopColor="#6366F1" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke={darkMode ? '#2A2D3A' : '#E8ECF0'}
            vertical={false}
          />
          <XAxis
            dataKey="month"
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12, fill: '#94A3B8' }}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12, fill: '#94A3B8' }}
            tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`}
            width={50}
          />
          <Tooltip content={<CustomTooltip darkMode={darkMode} />} />
          <Area
            type="monotone"
            dataKey="balance"
            stroke="#6366F1"
            strokeWidth={2.5}
            fill="url(#balanceGradient)"
            dot={false}
            activeDot={{
              r: 5,
              fill: '#6366F1',
              stroke: darkMode ? '#1A1D27' : '#FFFFFF',
              strokeWidth: 2,
            }}
          />
        </AreaChart>
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
      <p className="text-text-muted text-xs mb-0.5">{payload[0].payload.month}</p>
      <p className="font-semibold text-primary">
        {formatCurrency(payload[0].value)}
      </p>
    </div>
  )
}
