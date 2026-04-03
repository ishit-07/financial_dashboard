export function groupByCategory(transactions) {
  return transactions
    .filter((t) => t.type === 'expense')
    .reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + t.amount
      return acc
    }, {})
}

export function sumByMonth(transactions) {
  const months = {}
  transactions.forEach((t) => {
    const month = t.date.slice(0, 7) // "2024-11"
    if (!months[month]) months[month] = { month, income: 0, expense: 0 }
    if (t.type === 'income') months[month].income += t.amount
    else months[month].expense += t.amount
  })
  return Object.values(months).sort((a, b) => a.month.localeCompare(b.month))
}

export function getTopCategory(transactions) {
  const grouped = groupByCategory(transactions)
  const entries = Object.entries(grouped)
  if (entries.length === 0) return null
  entries.sort((a, b) => b[1] - a[1])
  const totalExpense = entries.reduce((s, [, v]) => s + v, 0)
  return {
    category: entries[0][0],
    total: entries[0][1],
    percent: totalExpense > 0 ? (entries[0][1] / totalExpense) * 100 : 0,
  }
}

export function compareMonths(transactions) {
  const now = new Date()
  const curKey = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`
  const prev = new Date(now.getFullYear(), now.getMonth() - 1, 1)
  const prevKey = `${prev.getFullYear()}-${String(prev.getMonth() + 1).padStart(2, '0')}`

  const calc = (key) => {
    const txns = transactions.filter((t) => t.date.startsWith(key))
    return {
      income: txns.filter((t) => t.type === 'income').reduce((s, t) => s + t.amount, 0),
      expense: txns.filter((t) => t.type === 'expense').reduce((s, t) => s + t.amount, 0),
    }
  }

  return { current: calc(curKey), previous: calc(prevKey) }
}

export function detectAnomalies(transactions, multiplier = 2) {
  const grouped = groupByCategory(transactions)
  const monthlyData = {}

  transactions
    .filter((t) => t.type === 'expense')
    .forEach((t) => {
      const key = `${t.category}-${t.date.slice(0, 7)}`
      if (!monthlyData[key]) monthlyData[key] = { category: t.category, month: t.date.slice(0, 7), total: 0 }
      monthlyData[key].total += t.amount
    })

  const categoryMonthly = {}
  Object.values(monthlyData).forEach((d) => {
    if (!categoryMonthly[d.category]) categoryMonthly[d.category] = []
    categoryMonthly[d.category].push(d.total)
  })

  const anomalies = []
  Object.entries(categoryMonthly).forEach(([category, amounts]) => {
    if (amounts.length < 2) return
    const avg = amounts.reduce((s, v) => s + v, 0) / amounts.length
    const latest = amounts[amounts.length - 1]
    if (latest > avg * multiplier) {
      anomalies.push({ category, amount: latest, avg: Math.round(avg) })
    }
  })

  return anomalies
}

export function getMonthlyBalance(transactions) {
  const months = sumByMonth(transactions)
  let runningBalance = 0
  return months.map((m) => {
    runningBalance += m.income - m.expense
    const label = new Date(m.month + '-01').toLocaleDateString('en-IN', {
      month: 'short',
      year: '2-digit'
    })
    return { month: label, balance: runningBalance }
  })
}

export function getSavingsRate(transactions) {
  const income = transactions
    .filter((t) => t.type === 'income')
    .reduce((s, t) => s + t.amount, 0)
  const expense = transactions
    .filter((t) => t.type === 'expense')
    .reduce((s, t) => s + t.amount, 0)
  if (income === 0) return 0
  return ((income - expense) / income) * 100
}
