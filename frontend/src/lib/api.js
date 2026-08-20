const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api'

const STORAGE_KEY = 'roadies_auth'

export class ApiError extends Error {
  constructor(data, status) {
    super(data?.detail || 'Request failed')
    this.data = data
    this.status = status
  }
}

export function getSession() {
  const raw = localStorage.getItem(STORAGE_KEY)
  return raw ? JSON.parse(raw) : null
}

export function setSession(session) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(session))
}

export function clearSession() {
  localStorage.removeItem(STORAGE_KEY)
}

async function request(path, { method = 'GET', body, auth = false } = {}) {
  const headers = { 'Content-Type': 'application/json' }
  if (auth) {
    const session = getSession()
    if (session?.access) headers.Authorization = `Bearer ${session.access}`
  }

  const res = await fetch(`${API_BASE_URL}${path}`, {
    method,
    headers,
    body: body !== undefined ? JSON.stringify(body) : undefined,
  })

  const data = await res.json().catch(() => ({}))
  if (!res.ok) throw new ApiError(data, res.status)
  return data
}

export const authApi = {
  register: (payload) => request('/auth/register/', { method: 'POST', body: payload }),
  login: (payload) => request('/auth/login/', { method: 'POST', body: payload }),
  me: () => request('/auth/me/', { auth: true }),
}

export const adminApi = {
  listOrganizers: () => request('/admin/organizers/', { auth: true }),
  createOrganizer: (payload) => request('/admin/organizers/', { method: 'POST', body: payload, auth: true }),
}
