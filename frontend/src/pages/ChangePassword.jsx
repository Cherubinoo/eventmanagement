import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Lock } from 'lucide-react'
import AuthLayout from '../components/AuthLayout'
import { authApi, ApiError } from '../lib/api'
import { getCurrentUser, homeRouteForRole, updateSessionUser } from '../lib/auth'

const INPUT_CLASSES =
  'w-full rounded-xl border border-gray-300 bg-white py-2.5 pl-10 pr-4 text-sm text-gray-900 outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 dark:border-white/15 dark:bg-white/5 dark:text-white dark:placeholder:text-white/30'

export default function ChangePassword({ theme, toggleTheme }) {
  const navigate = useNavigate()
  const [form, setForm] = useState({ password: '', confirmPassword: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match.')
      return
    }
    setError('')
    setLoading(true)
    try {
      const updatedUser = await authApi.changePassword({
        new_password: form.password,
        new_password_confirm: form.confirmPassword,
      })
      updateSessionUser(updatedUser)
      navigate(homeRouteForRole(updatedUser.role), { replace: true })
    } catch (err) {
      if (err instanceof ApiError && err.data) {
        const firstError = Object.values(err.data).flat()[0]
        setError(typeof firstError === 'string' ? firstError : 'Could not set your new password.')
      } else {
        setError('Something went wrong. Please try again.')
      }
    } finally {
      setLoading(false)
    }
  }

  const user = getCurrentUser()

  return (
    <AuthLayout theme={theme} toggleTheme={toggleTheme}>
      <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-8 shadow-sm dark:border-white/10 dark:bg-white/[0.03] sm:p-10">
        <h1 className="text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
          Set your password
        </h1>
        <p className="mt-2 text-sm text-gray-600 dark:text-white/60">
          {user ? `Welcome, ${user.name.split(' ')[0]}. ` : ''}
          You're using a temporary password — choose a new one to continue.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <div>
            <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-white/70">
              New password
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
            <label
              htmlFor="confirmPassword"
              className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-white/70"
            >
              Confirm new password
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

          {error && <p className="text-sm text-rose-600 dark:text-rose-400">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-full bg-gray-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-gray-700 disabled:opacity-60 dark:bg-white dark:text-[#05060a] dark:hover:bg-white/90"
          >
            {loading ? 'Saving…' : 'Set password & continue'}
          </button>
        </form>
      </div>
    </AuthLayout>
  )
}
