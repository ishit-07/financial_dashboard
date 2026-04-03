export function exportToCSV(transactions) {
  const headers = ['Date', 'Description', 'Category', 'Type', 'Amount']
  const rows = transactions.map((t) =>
    [t.date, `"${t.description}"`, t.category, t.type, t.amount].join(',')
  )
  const csv = [headers.join(','), ...rows].join('\n')
  downloadFile(csv, 'transactions.csv', 'text/csv')
}

export function exportToJSON(transactions) {
  const json = JSON.stringify(transactions, null, 2)
  downloadFile(json, 'transactions.json', 'application/json')
}

function downloadFile(content, filename, mimeType) {
  const blob = new Blob([content], { type: mimeType })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}
