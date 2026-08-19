import { Layers, LineChart, Heart, Blocks } from 'lucide-react'

const REASONS = [
  {
    icon: Layers,
    title: 'Everything in One Place',
    description:
      'No more switching between spreadsheets, forms, messaging apps, ticketing platforms, and attendance systems.',
  },
  {
    icon: LineChart,
    title: 'Smarter Event Management',
    description: 'Real-time dashboards and centralized data help organizers make better decisions.',
  },
  {
    icon: Heart,
    title: 'Better Participant Experience',
    description: 'One place to discover, register, attend, participate, and track achievements.',
  },
  {
    icon: Blocks,
    title: 'Scalable Architecture',
    description: 'From small college events to large multi-event organizations.',
  },
]

export default function WhyRoadies() {
  return (
    <section id="why-roadies" className="flex min-h-screen flex-col justify-center border-y border-gray-200 bg-gray-50 px-6 py-28 dark:border-white/10 dark:bg-white/[0.02] lg:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="text-center">
          <h2 className="text-4xl font-semibold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
            Why Roadies?
          </h2>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {REASONS.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="rounded-2xl border border-gray-200 bg-white p-7 text-center dark:border-white/10 dark:bg-white/[0.03]"
            >
              <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-lg bg-gray-100 dark:bg-white/10">
                <Icon className="h-6 w-6 text-gray-900 dark:text-white" />
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
