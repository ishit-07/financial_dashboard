import { useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useUiStore } from './store/uiStore'
import Sidebar from './components/layout/Sidebar'
import TopBar from './components/layout/TopBar'
import MobileNav from './components/layout/MobileNav'
import ToastContainer from './components/ui/ToastContainer'
import DashboardPage from './pages/DashboardPage'
import TransactionsPage from './pages/TransactionsPage'
import InsightsPage from './pages/InsightsPage'

export default function App() {
  const darkMode = useUiStore((s) => s.darkMode)

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode)
  }, [darkMode])

  return (
    <div className="flex h-screen w-full overflow-hidden font-sans">
      <Sidebar />
      <div className="flex flex-1 flex-col min-w-0">
        <TopBar />
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8 pb-20 md:pb-6">
          <Routes>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/transactions" element={<TransactionsPage />} />
            <Route path="/insights" element={<InsightsPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
      <MobileNav />
      <ToastContainer />
    </div>
  )
}
