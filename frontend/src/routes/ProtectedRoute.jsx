import { Navigate } from 'react-router-dom'
import { getCurrentUser, homeRouteForRole, isAuthenticated } from '../lib/auth'

export default function ProtectedRoute({ allowedRoles, children }) {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />
  }

  const user = getCurrentUser()
  if (allowedRoles && !allowedRoles.includes(user?.role)) {
    return <Navigate to={homeRouteForRole(user?.role)} replace />
  }

  return children
}
