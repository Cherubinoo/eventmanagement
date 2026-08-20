import { Fragment, useEffect, useState } from 'react'
import { UserPlus, Pencil, Trash2, Power } from 'lucide-react'
import DashboardShell from './shared/DashboardShell'
import { ApiError, adminApi } from '../lib/api'

const INPUT_CLASSES =
  'w-full rounded-xl border border-gray-300 bg-white py-2.5 px-4 text-sm text-gray-900 outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 dark:border-white/15 dark:bg-white/5 dark:text-white dark:placeholder:text-white/30'

const SMALL_INPUT_CLASSES =
  'w-full rounded-lg border border-gray-300 bg-white py-1.5 px-2.5 text-sm text-gray-900 outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 dark:border-white/15 dark:bg-white/5 dark:text-white'

const INITIAL_FORM = { name: '', email: '', phone: '' }

function firstErrorMessage(err, fallback) {
  if (err instanceof ApiError && err.data) {
    const first = Object.values(err.data).flat()[0]
    if (typeof first === 'string') return first
  }
  return fallback
}

export default function AdminDashboard() {
  return (
    <DashboardShell title="Super Admin dashboard">
      <div className="space-y-10">
        <OrganizersSection />
        <UsersSection />
      </div>
    </DashboardShell>
  )
}

function OrganizersSection() {
  const [organizers, setOrganizers] = useState([])
  const [loading, setLoading] = useState(true)
  const [form, setForm] = useState(INITIAL_FORM)
  const [error, setError] = useState('')
  const [creating, setCreating] = useState(false)
  const [newCredential, setNewCredential] = useState(null)

  const [editingId, setEditingId] = useState(null)
  const [editForm, setEditForm] = useState({ name: '', email: '', phone: '' })
  const [rowError, setRowError] = useState('')
  const [rowBusyId, setRowBusyId] = useState(null)

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
    setNewCredential(null)
    setCreating(true)
    try {
      const created = await adminApi.createOrganizer(form)
      setNewCredential({ email: created.email, password: created.temporary_password })
      setForm(INITIAL_FORM)
      loadOrganizers()
    } catch (err) {
      setError(firstErrorMessage(err, 'Could not create organizer.'))
    } finally {
      setCreating(false)
    }
  }

  const startEdit = (org) => {
    setRowError('')
    setEditingId(org.id)
    setEditForm({ name: org.name, email: org.email, phone: org.phone })
  }

  const cancelEdit = () => {
    setEditingId(null)
    setRowError('')
  }

  const saveEdit = async (id) => {
    setRowError('')
    setRowBusyId(id)
    try {
      await adminApi.updateOrganizer(id, editForm)
      setEditingId(null)
      loadOrganizers()
    } catch (err) {
      setRowError(firstErrorMessage(err, 'Could not update organizer.'))
    } finally {
      setRowBusyId(null)
    }
  }

  const toggleActive = async (org) => {
    setRowError('')
    setRowBusyId(org.id)
    try {
      await adminApi.updateOrganizer(org.id, { is_active: !org.is_active })
      loadOrganizers()
    } catch (err) {
      setRowError(firstErrorMessage(err, 'Could not update organizer.'))
    } finally {
      setRowBusyId(null)
    }
  }

  const removeOrganizer = async (org) => {
    setRowError('')
    setRowBusyId(org.id)
    try {
      await adminApi.deleteOrganizer(org.id)
      loadOrganizers()
    } catch (err) {
      setRowError(firstErrorMessage(err, 'Could not delete organizer.'))
      setRowBusyId(null)
    }
  }

  return (
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

        {newCredential && (
          <div className="mt-5 rounded-xl border border-violet-200 bg-violet-50 px-4 py-3 text-sm text-violet-700 dark:border-violet-400/30 dark:bg-violet-500/10 dark:text-violet-200">
            Organizer created. Share this one-time temporary password with {newCredential.email} — they'll
            be asked to set their own password the first time they log in:
            <div className="mt-2 font-mono text-xs">
              <div>email: {newCredential.email}</div>
              <div>temporary password: {newCredential.password}</div>
            </div>
          </div>
        )}
      </div>

      <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-white/10 dark:bg-white/[0.03]">
        <h2 className="text-base font-semibold text-gray-900 dark:text-white">Organizers</h2>
        {rowError && <p className="mt-2 text-sm text-rose-600 dark:text-rose-400">{rowError}</p>}
        {loading ? (
          <p className="mt-4 text-sm text-gray-500 dark:text-white/50">Loading…</p>
        ) : organizers.length === 0 ? (
          <p className="mt-4 text-sm text-gray-500 dark:text-white/50">No organizers yet.</p>
        ) : (
          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-gray-200 text-gray-500 dark:border-white/10 dark:text-white/50">
                  <th className="py-2 pr-3 font-medium">Name</th>
                  <th className="py-2 pr-3 font-medium">Email</th>
                  <th className="py-2 pr-3 font-medium">Phone</th>
                  <th className="py-2 pr-3 font-medium">Status</th>
                  <th className="py-2 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {organizers.map((org) => {
                  const isEditing = editingId === org.id
                  const busy = rowBusyId === org.id
                  return (
                    <tr key={org.id} className="border-b border-gray-100 dark:border-white/5">
                      {isEditing ? (
                        <>
                          <td className="py-2 pr-3">
                            <input
                              className={SMALL_INPUT_CLASSES}
                              value={editForm.name}
                              onChange={(e) => setEditForm((f) => ({ ...f, name: e.target.value }))}
                            />
                          </td>
                          <td className="py-2 pr-3">
                            <input
                              className={SMALL_INPUT_CLASSES}
                              value={editForm.email}
                              onChange={(e) => setEditForm((f) => ({ ...f, email: e.target.value }))}
                            />
                          </td>
                          <td className="py-2 pr-3">
                            <input
                              className={SMALL_INPUT_CLASSES}
                              value={editForm.phone}
                              onChange={(e) => setEditForm((f) => ({ ...f, phone: e.target.value }))}
                            />
                          </td>
                          <td className="py-2 pr-3 text-gray-500 dark:text-white/50">
                            {org.is_active ? 'Active' : 'Inactive'}
                          </td>
                          <td className="py-2">
                            <div className="flex gap-2">
                              <button
                                type="button"
                                disabled={busy}
                                onClick={() => saveEdit(org.id)}
                                className="rounded-lg bg-gray-900 px-3 py-1 text-xs font-semibold text-white disabled:opacity-60 dark:bg-white dark:text-[#05060a]"
                              >
                                Save
                              </button>
                              <button
                                type="button"
                                onClick={cancelEdit}
                                className="rounded-lg border border-gray-300 px-3 py-1 text-xs font-medium text-gray-700 dark:border-white/15 dark:text-white/70"
                              >
                                Cancel
                              </button>
                            </div>
                          </td>
                        </>
                      ) : (
                        <>
                          <td className="py-2 pr-3 text-gray-900 dark:text-white">{org.name}</td>
                          <td className="py-2 pr-3 text-gray-600 dark:text-white/60">{org.email}</td>
                          <td className="py-2 pr-3 text-gray-600 dark:text-white/60">{org.phone}</td>
                          <td className="py-2 pr-3">
                            <span
                              className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                                org.is_active
                                  ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300'
                                  : 'bg-gray-100 text-gray-500 dark:bg-white/5 dark:text-white/50'
                              }`}
                            >
                              {org.is_active ? 'Active' : 'Inactive'}
                            </span>
                          </td>
                          <td className="py-2">
                            <div className="flex gap-2">
                              <button
                                type="button"
                                title="Edit"
                                onClick={() => startEdit(org)}
                                className="rounded-lg border border-gray-300 p-1.5 text-gray-600 hover:bg-gray-100 dark:border-white/15 dark:text-white/70 dark:hover:bg-white/5"
                              >
                                <Pencil className="h-3.5 w-3.5" />
                              </button>
                              <button
                                type="button"
                                title={org.is_active ? 'Deactivate' : 'Activate'}
                                disabled={busy}
                                onClick={() => toggleActive(org)}
                                className="rounded-lg border border-gray-300 p-1.5 text-gray-600 hover:bg-gray-100 disabled:opacity-60 dark:border-white/15 dark:text-white/70 dark:hover:bg-white/5"
                              >
                                <Power className="h-3.5 w-3.5" />
                              </button>
                              <button
                                type="button"
                                title="Delete"
                                disabled={busy}
                                onClick={() => removeOrganizer(org)}
                                className="rounded-lg border border-rose-200 p-1.5 text-rose-600 hover:bg-rose-50 disabled:opacity-60 dark:border-rose-400/30 dark:text-rose-300 dark:hover:bg-rose-500/10"
                              >
                                <Trash2 className="h-3.5 w-3.5" />
                              </button>
                            </div>
                          </td>
                        </>
                      )}
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

function UsersSection() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [busyId, setBusyId] = useState(null)
  const [expandedId, setExpandedId] = useState(null)

  const loadUsers = async () => {
    setLoading(true)
    setError('')
    try {
      const data = await adminApi.listUsers({ search, is_active: statusFilter })
      setUsers(Array.isArray(data) ? data : data.results || [])
    } catch {
      setError('Could not load users.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const timeout = setTimeout(loadUsers, 250)
    return () => clearTimeout(timeout)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, statusFilter])

  const toggleActive = async (user) => {
    setBusyId(user.id)
    try {
      await adminApi.updateUserStatus(user.id, !user.is_active)
      loadUsers()
    } catch {
      setError('Could not update user.')
    } finally {
      setBusyId(null)
    }
  }

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-white/10 dark:bg-white/[0.03]">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-base font-semibold text-gray-900 dark:text-white">Users</h2>
        <div className="flex gap-2">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name or email"
            className="rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-sm text-gray-900 outline-none focus:border-violet-500 dark:border-white/15 dark:bg-white/5 dark:text-white"
          />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-sm text-gray-900 outline-none focus:border-violet-500 dark:border-white/15 dark:bg-white/5 dark:text-white"
          >
            <option value="">All statuses</option>
            <option value="true">Active</option>
            <option value="false">Inactive</option>
          </select>
        </div>
      </div>

      {error && <p className="mt-2 text-sm text-rose-600 dark:text-rose-400">{error}</p>}

      {loading ? (
        <p className="mt-4 text-sm text-gray-500 dark:text-white/50">Loading…</p>
      ) : users.length === 0 ? (
        <p className="mt-4 text-sm text-gray-500 dark:text-white/50">No users found.</p>
      ) : (
        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-gray-200 text-gray-500 dark:border-white/10 dark:text-white/50">
                <th className="py-2 pr-3 font-medium">Name</th>
                <th className="py-2 pr-3 font-medium">Email</th>
                <th className="py-2 pr-3 font-medium">Phone</th>
                <th className="py-2 pr-3 font-medium">Status</th>
                <th className="py-2 pr-3 font-medium">Joined</th>
                <th className="py-2 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <Fragment key={user.id}>
                  <tr className="border-b border-gray-100 dark:border-white/5">
                    <td className="py-2 pr-3">
                      <button
                        type="button"
                        onClick={() => setExpandedId(expandedId === user.id ? null : user.id)}
                        className="text-gray-900 underline-offset-2 hover:underline dark:text-white"
                      >
                        {user.name}
                      </button>
                    </td>
                    <td className="py-2 pr-3 text-gray-600 dark:text-white/60">{user.email}</td>
                    <td className="py-2 pr-3 text-gray-600 dark:text-white/60">{user.phone}</td>
                    <td className="py-2 pr-3">
                      <span
                        className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                          user.is_active
                            ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300'
                            : 'bg-gray-100 text-gray-500 dark:bg-white/5 dark:text-white/50'
                        }`}
                      >
                        {user.is_active ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="py-2 pr-3 text-gray-600 dark:text-white/60">
                      {new Date(user.date_joined).toLocaleDateString()}
                    </td>
                    <td className="py-2">
                      <button
                        type="button"
                        disabled={busyId === user.id}
                        onClick={() => toggleActive(user)}
                        className="rounded-lg border border-gray-300 p-1.5 text-gray-600 hover:bg-gray-100 disabled:opacity-60 dark:border-white/15 dark:text-white/70 dark:hover:bg-white/5"
                        title={user.is_active ? 'Deactivate' : 'Activate'}
                      >
                        <Power className="h-3.5 w-3.5" />
                      </button>
                    </td>
                  </tr>
                  {expandedId === user.id && (
                    <tr className="border-b border-gray-100 bg-gray-50 dark:border-white/5 dark:bg-white/[0.02]">
                      <td colSpan={6} className="px-3 py-3 text-xs text-gray-500 dark:text-white/50">
                        User ID #{user.id} · Role: {user.role} · Event registrations aren't tracked yet.
                      </td>
                    </tr>
                  )}
                </Fragment>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
