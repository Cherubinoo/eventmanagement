import DashboardShell from './shared/DashboardShell'

export default function OrganizerDashboard() {
  return (
    <DashboardShell title="Organizer dashboard">
      <p className="text-sm text-gray-600 dark:text-white/60">
        Welcome! Event creation and management tools will live here.
      </p>
    </DashboardShell>
  )
}
