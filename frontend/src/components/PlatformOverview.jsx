const CONNECTED_AREAS = [
  'Registrations',
  'Schedules',
  'Communication',
  'Payments',
  'Teams',
  'Attendance',
  'Reporting',
]

export default function PlatformOverview() {
  return (
    <section className="flex min-h-screen flex-col justify-center border-y border-gray-200 bg-gray-50 px-6 py-28 dark:border-white/10 dark:bg-white/[0.02] lg:px-12">
      <div className="mx-auto max-w-4xl text-center">
        <h2 className="text-4xl font-semibold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
          One Platform. Every Event.
        </h2>
        <p className="mt-6 text-lg leading-relaxed text-gray-600 dark:text-white/60">
          Event management often involves disconnected tools for every moving part. Roadies
          brings it all together — organizers get a centralized dashboard, and participants get a
          seamless path from discovery to certificate.
        </p>

        <div className="mt-12 flex flex-wrap justify-center gap-3">
          {CONNECTED_AREAS.map((area) => (
            <span
              key={area}
              className="rounded-full border border-gray-200 bg-white px-5 py-2.5 text-base text-gray-700 dark:border-white/10 dark:bg-white/5 dark:text-white/70"
            >
              {area}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
