import { useEffect, useState } from 'react'
import { UserPlus } from 'lucide-react'
import DashboardShell from './shared/DashboardShell'
import { ApiError, adminApi } from '../lib/api'

const INPUT_CLASSES =
  'w-full rounded-xl border border-gray-300 bg-white py-2.5 px-4 text-sm text-gray-900 outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 dark:border-white/15 dark:bg-white/5 dark:text-white dark:placeholder:text-white/30'

const INITIAL_FORM = { name: '', email: '', phone: '' }

export default function AdminDashboard() {
  const [organizers, setOrganizers] = useState([])
  const [loading, setLoading] = useState(true)
  const [form, setForm] = useState(INITIAL_FORM)
  const [error, setError] = useState('')
  const [creating, setCreating] = useState(false)
  const [generatedCredential, setGeneratedCredential] = useState(null)

  const loadOrganizers = async () => {
    setLoading(true)
    try {
      const data = await adminApi.listOrganizers()
      setOrganizers(Array.isArray(data) ? data : data.results || [])
    } catch {
      setError('Could not load organizers.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadOrganizers()
  }, [])

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setGeneratedCredential(null)
    setCreating(true)
    try {
      const created = await adminApi.createOrganizer(form)
      setGeneratedCredential({ email: created.email, password: created.generated_password })
      setForm(INITIAL_FORM)
      loadOrganizers()
    } catch (err) {
      if (err instanceof ApiError && err.data) {
        const firstError = Object.values(err.data).flat()[0]
        setError(typeof firstError === 'string' ? firstError : 'Could not create organizer.')
      } else {
        setError('Something went wrong. Please try again.')
      }
    } finally {
      setCreating(false)
    }
  }

  return (
    <DashboardShell title="Super Admin dashboard">
      <div className="grid gap-8 lg:grid-cols-[380px_1fr]">
        <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-white/10 dark:bg-white/[0.03]">
          <h2 className="flex items-center gap-2 text-base font-semibold text-gray-900 dark:text-white">
            <UserPlus className="h-4.5 w-4.5" />
            Create Organizer
          </h2>
          <form onSubmit={handleSubmit} className="mt-5 space-y-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-white/70">Name</label>
              <input
                name="name"
                required
                value={form.name}
                onChange={handleChange}
                placeholder="Jordan Lee"
                className={INPUT_CLASSES}
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-white/70">Email</label>
              <input
                name="email"
                type="email"
                required
                value={form.email}
                onChange={handleChange}
                placeholder="organizer@example.com"
                className={INPUT_CLASSES}
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-white/70">Phone</label>
              <input
                name="phone"
                type="tel"
                required
                value={form.phone}
                onChange={handleChange}
                placeholder="+1 555 123 4567"
                className={INPUT_CLASSES}
              />
            </div>

            {error && <p className="text-sm text-rose-600 dark:text-rose-400">{error}</p>}

            <button
              type="submit"
              disabled={creating}
              className="w-full rounded-full bg-gray-900 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-gray-700 disabled:opacity-60 dark:bg-white dark:text-[#05060a] dark:hover:bg-white/90"
            >
              {creating ? 'Creating…' : 'Create Organizer'}
            </button>
          </form>

          {generatedCredential && (
            <div className="mt-5 rounded-xl border border-violet-200 bg-violet-50 px-4 py-3 text-sm text-violet-700 dark:border-violet-400/30 dark:bg-violet-500/10 dark:text-violet-200">
              Organizer created. Share these one-time login credentials securely:
              <div className="mt-2 font-mono text-xs">
                <div>email: {generatedCredential.email}</div>
                <div>password: {generatedCredential.password}</div>
              </div>
            </div>
          )}
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-white/10 dark:bg-white/[0.03]">
          <h2 className="text-base font-semibold text-gray-900 dark:text-white">Organizers</h2>
          {loading ? (
            <p className="mt-4 text-sm text-gray-500 dark:text-white/50">Loading…</p>
          ) : organizers.length === 0 ? (
            <p className="mt-4 text-sm text-gray-500 dark:text-white/50">No organizers yet.</p>
          ) : (
            <table className="mt-4 w-full text-left text-sm">
              <thead>
                <tr className="border-b border-gray-200 text-gray-500 dark:border-white/10 dark:text-white/50">
                  <th className="py-2 font-medium">Name</th>
                  <th className="py-2 font-medium">Email</th>
                  <th className="py-2 font-medium">Phone</th>
                </tr>
              </thead>
              <tbody>
                {organizers.map((org) => (
                  <tr key={org.id} className="border-b border-gray-100 dark:border-white/5">
                    <td className="py-2 text-gray-900 dark:text-white">{org.name}</td>
                    <td className="py-2 text-gray-600 dark:text-white/60">{org.email}</td>
                    <td className="py-2 text-gray-600 dark:text-white/60">{org.phone}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </DashboardShell>
  )
}
