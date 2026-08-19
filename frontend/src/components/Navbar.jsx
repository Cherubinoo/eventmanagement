import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Menu, X, Sparkles, Sun, Moon } from 'lucide-react'

const NAV_LINKS = [
  { label: 'Organizers', href: '#organizers' },
  { label: 'Participants', href: '#participants' },
  { label: 'Competitions', href: '#competitions' },
  { label: 'Why Roadies', href: '#why-roadies' },
]

export default function Navbar({ theme, toggleTheme }) {
  const [open, setOpen] = useState(false)

  return (
    <header className="fixed top-0 inset-x-0 z-50 border-b border-gray-200 bg-white/80 backdrop-blur-md dark:border-white/10 dark:bg-[#05060a]/80">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-12">
        <a href="#top" className="flex items-center gap-2 text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-fuchsia-500">
            <Sparkles className="h-4.5 w-4.5 text-white" />
          </span>
          Roadies
        </a>

        <div className="hidden items-center gap-9 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-base font-medium text-gray-600 transition hover:text-gray-900 dark:text-white/70 dark:hover:text-white"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden items-center gap-4 md:flex">
          <button
            type="button"
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 text-gray-600 transition hover:bg-gray-100 dark:border-white/10 dark:text-white/70 dark:hover:bg-white/5"
          >
            {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>
          <Link to="/login" className="text-base font-medium text-gray-600 transition hover:text-gray-900 dark:text-white/70 dark:hover:text-white">
            Log in
          </Link>
          <Link
            to="/signup"
            className="rounded-full bg-gray-900 px-5 py-2.5 text-base font-semibold text-white transition hover:bg-gray-700 dark:bg-white dark:text-[#05060a] dark:hover:bg-white/90"
          >
            Get Started
          </Link>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <button
            type="button"
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 text-gray-600 dark:border-white/10 dark:text-white/70"
          >
            {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="text-gray-900 dark:text-white"
            aria-label="Toggle menu"
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="border-t border-gray-200 bg-white px-6 py-4 dark:border-white/10 dark:bg-[#05060a] md:hidden">
          <div className="flex flex-col gap-4">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="text-base font-medium text-gray-600 dark:text-white/70"
              >
                {link.label}
              </a>
            ))}
            <Link
              to="/signup"
              onClick={() => setOpen(false)}
              className="rounded-full bg-gray-900 px-4 py-2.5 text-center text-base font-semibold text-white dark:bg-white dark:text-[#05060a]"
            >
              Get Started
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
