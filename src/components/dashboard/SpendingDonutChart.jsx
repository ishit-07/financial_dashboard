import { useMemo, useState } from 'react'
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Sector,
  Tooltip,
} from 'recharts'
import { useTransactionStore } from '../../store/transactionStore'
import { useUiStore } from '../../store/uiStore'
import { groupByCategory } from '../../utils/aggregators'
import { formatCurrency, getCategoryColor } from '../../utils/formatters'

export default function SpendingDonutChart() {
  const transactions = useTransactionStore((s) => s.transactions)
  const darkMode = useUiStore((s) => s.darkMode)
  const [activeIndex, setActiveIndex] = useState(null)

  const data = useMemo(() => {
    const grouped = groupByCategory(transactions)
    return Object.entries(grouped).map(([name, value]) => ({
      name,
      value,
      color: getCategoryColor(name),
    }))
  }, [transactions])

  const totalExpenses = useMemo(
    () => data.reduce((s, d) => s + d.value, 0),
    [data]
  )

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
        <p className="text-text-muted text-sm">No expenses yet</p>
      </div>
    )
  }

  return (
    <div
      className={`min-h-[320px] h-full flex flex-col rounded-xl p-5 ${
        darkMode
          ? 'bg-surface-dark border border-border-dark'
          : 'bg-surface-light border border-border-light'
      }`}
      style={{ boxShadow: 'var(--shadow-card)' }}
      id="spending-donut-chart"
    >
      <h3 className="text-sm font-semibold mb-4">Spending by Category</h3>

      <div className="flex-1 min-h-0 relative">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Tooltip 
              content={<CustomTooltip darkMode={darkMode} />} 
              cursor={false} 
              wrapperStyle={{ zIndex: 100 }}
            />
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={85}
              paddingAngle={3}
              dataKey="value"
              activeIndex={activeIndex}
              activeShape={(props) => renderActiveShape(props, darkMode)}
              onMouseEnter={(_, index) => setActiveIndex(index)}
              onMouseLeave={() => setActiveIndex(null)}
              stroke="none"
            >
              {data.map((entry, index) => (
                <Cell key={index} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>

        {/* Center label */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="text-center">
            <p className="text-xs text-text-muted">Total</p>
            <p className="text-lg font-semibold">{formatCurrency(totalExpenses)}</p>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-x-4 gap-y-2 mt-3 justify-center">
        {data.map((entry) => (
          <div key={entry.name} className="flex items-center gap-1.5 text-xs">
            <span
              className="w-2.5 h-2.5 rounded-full shrink-0"
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-text-muted">{entry.name}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function renderActiveShape(props, darkMode) {
  const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill } = props
  return (
    <Sector
      cx={cx}
      cy={cy}
      innerRadius={innerRadius - 2}
      outerRadius={outerRadius + 6}
      startAngle={startAngle}
      endAngle={endAngle}
      fill={fill}
      style={{ filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.2))' }}
    />
  )
}

function CustomTooltip({ active, payload, darkMode }) {
  if (!active || !payload?.length) return null
  return (
    <div
      className={`px-3 py-2 border rounded-lg shadow-lg text-sm ${
        darkMode
          ? 'bg-surface-dark border-border-dark'
          : 'bg-surface-light border-border-light'
      }`}
    >
      <div className="flex items-center gap-2 mb-1">
        <span 
          className="w-2 h-2 rounded-full" 
          style={{ backgroundColor: payload[0].payload.color }} 
        />
        <p className={`font-semibold ${darkMode ? 'text-text-primary-dark' : 'text-text-primary-light'}`}>
          {payload[0].name}
        </p>
      </div>
      <p className="text-xs font-medium text-text-muted pl-4">
        {formatCurrency(payload[0].value)}
      </p>
    </div>
  )
}
