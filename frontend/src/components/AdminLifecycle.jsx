const ADMIN_ITEMS = [
  'Users',
  'Organizations',
  'Events',
  'Registrations',
  'Payments',
  'Reports',
  'Categories',
  'Platform activity',
  'Moderation',
  'Permissions',
]

const LIFECYCLE_STEPS = [
  'Create',
  'Plan',
  'Promote',
  'Register',
  'Organize',
  'Attend',
  'Participate',
  'Evaluate',
  'Announce',
  'Certify',
  'Analyze',
]

export default function AdminLifecycle() {
  return (
    <section className="flex min-h-screen flex-col justify-center border-y border-gray-200 bg-gray-50 px-6 py-28 dark:border-white/10 dark:bg-white/[0.02] lg:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-violet-600 dark:text-violet-400">
            Admin Control Center
          </span>
          <h2 className="mt-4 text-4xl font-semibold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
            Complete platform-level control
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-gray-600 dark:text-white/60">
            A secure, scalable ecosystem for managing multiple organizations and events.
          </p>
        </div>

        <div className="mt-12 flex flex-wrap justify-center gap-3">
          {ADMIN_ITEMS.map((item) => (
            <span
              key={item}
              className="rounded-full border border-gray-200 bg-white px-5 py-2.5 text-base text-gray-700 dark:border-white/10 dark:bg-white/5 dark:text-white/70"
            >
              {item}
            </span>
          ))}
        </div>

        <div className="mt-24 text-center">
          <h3 className="text-3xl font-semibold tracking-tight text-gray-900 dark:text-white">
            The Event Lifecycle
          </h3>
          <p className="mt-3 text-lg text-gray-600 dark:text-white/60">
            Everything stays connected throughout the journey.
          </p>
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-center gap-x-2 gap-y-5">
          {LIFECYCLE_STEPS.map((step, i) => (
            <div key={step} className="flex items-center gap-2">
              <span className="rounded-full border border-violet-300 bg-violet-50 px-5 py-2 text-base font-medium text-violet-700 dark:border-violet-400/30 dark:bg-violet-500/10 dark:text-violet-200">
                {step}
              </span>
              {i < LIFECYCLE_STEPS.length - 1 && <span className="text-gray-300 dark:text-white/20">→</span>}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
