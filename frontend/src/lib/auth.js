import { clearSession, getSession, setSession } from './api'

export const ROLE_HOME = {
  SUPER_ADMIN: '/admin/dashboard',
  ORGANIZER: '/organizer/dashboard',
  USER: '/events',
}

export function saveSession({ access, refresh, user }) {
  setSession({ access, refresh, user })
}

export function updateSessionUser(user) {
  const session = getSession()
  if (session) setSession({ ...session, user })
}

export function getCurrentUser() {
  return getSession()?.user || null
}

export function isAuthenticated() {
  return !!getSession()?.access
}

export function logout() {
  clearSession()
}

export function homeRouteForRole(role) {
  return ROLE_HOME[role] || '/login'
}
