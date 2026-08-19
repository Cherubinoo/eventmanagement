import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Mail, Lock } from 'lucide-react'
import AuthLayout from '../components/AuthLayout'

const INPUT_CLASSES =
  'w-full rounded-xl border border-gray-300 bg-white py-2.5 pl-10 pr-4 text-sm text-gray-900 outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 dark:border-white/15 dark:bg-white/5 dark:text-white dark:placeholder:text-white/30'

export default function Login({ theme, toggleTheme }) {
  const [form, setForm] = useState({ email: '', password: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <AuthLayout theme={theme} toggleTheme={toggleTheme}>
      <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-8 shadow-sm dark:border-white/10 dark:bg-white/[0.03] sm:p-10">
        <h1 className="text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">Welcome back</h1>
        <p className="mt-2 text-sm text-gray-600 dark:text-white/60">
          Log in to manage your events and registrations.
        </p>

        {submitted ? (
          <div className="mt-8 rounded-xl border border-violet-200 bg-violet-50 px-4 py-3 text-sm text-violet-700 dark:border-violet-400/30 dark:bg-violet-500/10 dark:text-violet-200">
            Login isn't connected yet — authentication is coming in a future update.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <div>
              <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-white/70">
                Email
              </label>
              <div className="relative">
                <Mail className="pointer-events-none absolute left-3.5 top-1/2 h-4.5 w-4.5 -translate-y-1/2 text-gray-400 dark:text-white/40" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className={INPUT_CLASSES}
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-white/70">
                Password
              </label>
              <div className="relative">
                <Lock className="pointer-events-none absolute left-3.5 top-1/2 h-4.5 w-4.5 -translate-y-1/2 text-gray-400 dark:text-white/40" />
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={form.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className={INPUT_CLASSES}
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full rounded-full bg-gray-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-gray-700 dark:bg-white dark:text-[#05060a] dark:hover:bg-white/90"
            >
              Log in
            </button>
          </form>
        )}

        <p className="mt-8 text-center text-sm text-gray-600 dark:text-white/60">
          Don't have an account?{' '}
          <Link to="/signup" className="font-semibold text-violet-600 dark:text-violet-400">
            Sign up
          </Link>
        </p>
      </div>
    </AuthLayout>
  )
}
