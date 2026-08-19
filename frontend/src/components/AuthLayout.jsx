import { Link } from 'react-router-dom'
import { Sparkles, Sun, Moon } from 'lucide-react'

export default function AuthLayout({ theme, toggleTheme, children }) {
  return (
    <div className="relative flex min-h-screen flex-col bg-white dark:bg-[#05060a]">
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            'radial-gradient(60% 50% at 50% 0%, rgba(139,92,246,0.18) 0%, rgba(255,255,255,0) 70%)',
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 -z-10 hidden dark:block"
        style={{
          background:
            'radial-gradient(60% 50% at 50% 0%, rgba(139,92,246,0.25) 0%, rgba(5,6,10,0) 70%)',
        }}
      />

      <header className="flex items-center justify-between px-6 py-6 lg:px-12">
        <Link to="/" className="flex items-center gap-2 text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-fuchsia-500">
            <Sparkles className="h-4.5 w-4.5 text-white" />
          </span>
          Roadies
        </Link>
        <button
          type="button"
          onClick={toggleTheme}
          aria-label="Toggle theme"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 text-gray-600 transition hover:bg-gray-100 dark:border-white/10 dark:text-white/70 dark:hover:bg-white/5"
        >
          {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </button>
      </header>

      <main className="flex flex-1 items-center justify-center px-6 py-12">{children}</main>
    </div>
  )
}
