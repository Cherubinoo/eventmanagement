import { useNavigate } from 'react-router-dom'
import { Sparkles, LogOut } from 'lucide-react'
import { getCurrentUser, logout } from '../../lib/auth'

export default function DashboardShell({ title, children }) {
  const navigate = useNavigate()
  const user = getCurrentUser()

  const handleLogout = () => {
    logout()
    navigate('/login', { replace: true })
  }

  return (
    <div className="min-h-screen bg-white dark:bg-[#05060a]">
      <header className="flex items-center justify-between border-b border-gray-200 px-6 py-5 dark:border-white/10 lg:px-12">
        <div className="flex items-center gap-2 text-lg font-semibold tracking-tight text-gray-900 dark:text-white">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-fuchsia-500">
            <Sparkles className="h-4 w-4 text-white" />
          </span>
          Roadies
        </div>
        <div className="flex items-center gap-4">
          {user && (
            <span className="text-sm text-gray-600 dark:text-white/60">
              {user.name} · <span className="text-xs uppercase tracking-wide">{user.role}</span>
            </span>
          )}
          <button
            type="button"
            onClick={handleLogout}
            className="flex items-center gap-1.5 rounded-full border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100 dark:border-white/10 dark:text-white/70 dark:hover:bg-white/5"
          >
            <LogOut className="h-4 w-4" />
            Log out
          </button>
        </div>
      </header>

      <main className="px-6 py-10 lg:px-12">
        <h1 className="text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">{title}</h1>
        <div className="mt-8">{children}</div>
      </main>
    </div>
  )
}
