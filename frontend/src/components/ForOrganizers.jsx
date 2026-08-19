import { CalendarPlus, Users, LayoutDashboard, ListChecks } from 'lucide-react'

const FEATURES = [
  {
    icon: CalendarPlus,
    title: 'Create Events',
    description:
      'Set up name, description, date, venue, categories, registration requirements, capacity, rules, schedules, fees, and prizes in minutes.',
  },
  {
    icon: Users,
    title: 'Manage Registrations',
    description:
      'View participants in real time, approve or reject entries, manage information, export data, and handle team registrations.',
  },
  {
    icon: LayoutDashboard,
    title: 'Event Dashboard',
    description:
      'Track registrations, confirmed participants, attendance, revenue, capacity, and engagement from one centralized view.',
  },
  {
    icon: ListChecks,
    title: 'Schedule Management',
    description:
      'Define sessions, competitions, workshops, venues, time slots, speakers, judges, and coordinators — visible to participants instantly.',
  },
]

export default function ForOrganizers() {
  return (
    <section id="organizers" className="flex min-h-screen flex-col justify-center px-6 py-28 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-violet-600 dark:text-violet-400">
            For Organizers
          </span>
          <h2 className="mt-4 text-4xl font-semibold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
            Complete control over your event
          </h2>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="rounded-2xl border border-gray-200 bg-white p-7 text-center transition hover:border-gray-300 hover:shadow-lg dark:border-white/10 dark:bg-white/[0.03] dark:hover:border-white/20 dark:hover:bg-white/[0.05] dark:hover:shadow-none"
            >
              <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-lg bg-violet-100 dark:bg-violet-500/15">
                <Icon className="h-6 w-6 text-violet-600 dark:text-violet-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-gray-600 dark:text-white/60">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
