import { useState } from 'react'
import { Link } from 'react-router-dom'
import { User, Mail, Lock, Compass, LayoutDashboard, Check } from 'lucide-react'
import AuthLayout from '../components/AuthLayout'

const ROLES = [
  {
    id: 'participant',
    label: 'Participant',
    description: 'Discover and register for events',
    icon: Compass,
  },
  {
    id: 'organizer',
    label: 'Organizer',
    description: 'Create and manage events',
    icon: LayoutDashboard,
  },
]

const INPUT_CLASSES =
  'w-full rounded-xl border border-gray-300 bg-white py-2.5 pl-10 pr-4 text-sm text-gray-900 outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 dark:border-white/15 dark:bg-white/5 dark:text-white dark:placeholder:text-white/30'

export default function Signup({ theme, toggleTheme }) {
  const [role, setRole] = useState('participant')
  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '' })
  const [error, setError] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = (e) => {
    e.preventDefault()
    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match.')
      return
    }
    setError('')
    setSubmitted(true)
  }

  return (
    <AuthLayout theme={theme} toggleTheme={toggleTheme}>
      <div className="w-full max-w-lg rounded-2xl border border-gray-200 bg-white p-8 shadow-sm dark:border-white/10 dark:bg-white/[0.03] sm:p-10">
        <h1 className="text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">Create your account</h1>
        <p className="mt-2 text-sm text-gray-600 dark:text-white/60">
          Join Roadies as a participant or an organizer.
        </p>

        {submitted ? (
          <div className="mt-8 rounded-xl border border-violet-200 bg-violet-50 px-4 py-3 text-sm text-violet-700 dark:border-violet-400/30 dark:bg-violet-500/10 dark:text-violet-200">
            Thanks, {form.name.split(' ')[0] || 'there'}! Your {role} account request is ready —
            authentication is coming in a future update.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <div>
              <span className="mb-2 block text-sm font-medium text-gray-700 dark:text-white/70">
                I am joining as a
              </span>
              <div className="grid grid-cols-2 gap-3">
                {ROLES.map(({ id, label, description, icon: Icon }) => {
                  const active = role === id
                  return (
                    <button
                      key={id}
                      type="button"
                      onClick={() => setRole(id)}
                      className={`relative flex flex-col items-start gap-2 rounded-xl border p-4 text-left transition ${
                        active
                          ? 'border-violet-500 bg-violet-50 dark:border-violet-400 dark:bg-violet-500/10'
                          : 'border-gray-200 bg-white hover:border-gray-300 dark:border-white/10 dark:bg-white/5 dark:hover:border-white/20'
                      }`}
                    >
                      {active && (
                        <span className="absolute right-3 top-3 flex h-5 w-5 items-center justify-center rounded-full bg-violet-500 text-white">
                          <Check className="h-3 w-3" />
                        </span>
                      )}
                      <Icon
                        className={`h-5 w-5 ${active ? 'text-violet-600 dark:text-violet-400' : 'text-gray-500 dark:text-white/50'}`}
                      />
                      <span className="text-sm font-semibold text-gray-900 dark:text-white">{label}</span>
                      <span className="text-xs text-gray-500 dark:text-white/50">{description}</span>
                    </button>
                  )
                })}
              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-white/70">
                  Full name
                </label>
                <div className="relative">
                  <User className="pointer-events-none absolute left-3.5 top-1/2 h-4.5 w-4.5 -translate-y-1/2 text-gray-400 dark:text-white/40" />
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Jordan Lee"
                    className={INPUT_CLASSES}
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
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
                    minLength={8}
                    value={form.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className={INPUT_CLASSES}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="confirmPassword" className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-white/70">
                  Confirm password
                </label>
                <div className="relative">
                  <Lock className="pointer-events-none absolute left-3.5 top-1/2 h-4.5 w-4.5 -translate-y-1/2 text-gray-400 dark:text-white/40" />
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    required
                    minLength={8}
                    value={form.confirmPassword}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className={INPUT_CLASSES}
                  />
                </div>
              </div>
            </div>

            {error && <p className="text-sm text-rose-600 dark:text-rose-400">{error}</p>}

            <button
              type="submit"
              className="w-full rounded-full bg-gray-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-gray-700 dark:bg-white dark:text-[#05060a] dark:hover:bg-white/90"
            >
              Create account
            </button>
          </form>
        )}

        <p className="mt-8 text-center text-sm text-gray-600 dark:text-white/60">
          Already have an account?{' '}
          <Link to="/login" className="font-semibold text-violet-600 dark:text-violet-400">
            Log in
          </Link>
        </p>
      </div>
    </AuthLayout>
  )
}
