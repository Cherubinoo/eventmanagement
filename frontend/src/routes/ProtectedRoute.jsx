import { Navigate } from 'react-router-dom'
import { getCurrentUser, homeRouteForRole, isAuthenticated } from '../lib/auth'

export default function ProtectedRoute({ allowedRoles, children }) {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />
  }

  const user = getCurrentUser()

  if (user?.must_change_password && window.location.pathname !== '/change-password') {
    return <Navigate to="/change-password" replace />
  }

  if (allowedRoles && !allowedRoles.includes(user?.role)) {
    return <Navigate to={homeRouteForRole(user?.role)} replace />
  }

  return children
}
