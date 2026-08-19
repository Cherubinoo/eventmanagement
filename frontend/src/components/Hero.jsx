import { ArrowRight, CalendarCheck } from 'lucide-react'

export default function Hero() {
  return (
    <section id="top" className="relative flex min-h-screen items-center overflow-hidden px-6 pt-20 lg:px-12">
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            'radial-gradient(60% 50% at 50% 0%, rgba(139,92,246,0.18) 0%, rgba(255,255,255,0) 70%)',
        }}
      />
      <div className="pointer-events-none absolute inset-0 -z-10 hidden dark:block"
        style={{
          background:
            'radial-gradient(60% 50% at 50% 0%, rgba(139,92,246,0.25) 0%, rgba(5,6,10,0) 70%)',
        }}
      />

      <div className="mx-auto flex max-w-6xl flex-col items-center text-center">
        <span className="mb-8 inline-flex items-center gap-2 rounded-full border border-gray-200 bg-gray-50 px-5 py-2 text-sm font-medium text-gray-600 dark:border-white/10 dark:bg-white/5 dark:text-white/70">
          <CalendarCheck className="h-4 w-4 text-violet-500 dark:text-violet-400" />
          One platform for every event, start to finish
        </span>

        <h1 className="text-5xl font-semibold tracking-tight text-gray-900 dark:text-white sm:text-7xl lg:text-8xl">
          Plan. Organize.{' '}
          <span className="bg-gradient-to-r from-violet-500 via-fuchsia-500 to-orange-400 bg-clip-text text-transparent dark:from-violet-400 dark:via-fuchsia-400 dark:to-orange-300">
            Experience.
          </span>
        </h1>

        <p className="mt-8 max-w-3xl text-xl leading-relaxed text-gray-600 dark:text-white/60">
          Roadies is an all-in-one event planning and management platform — bringing
          registrations, schedules, teams, communication, payments, and certificates into one
          connected experience for college fests, hackathons, conferences, and corporate events.
        </p>

        <div className="mt-12 flex flex-col gap-4 sm:flex-row">
          <a
            id="get-started"
            href="#organizers"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-gray-900 px-8 py-4 text-base font-semibold text-white transition hover:bg-gray-700 dark:bg-white dark:text-[#05060a] dark:hover:bg-white/90"
          >
            Start organizing
            <ArrowRight className="h-5 w-5" />
          </a>
          <a
            href="#participants"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-gray-300 px-8 py-4 text-base font-semibold text-gray-900 transition hover:bg-gray-100 dark:border-white/15 dark:text-white dark:hover:bg-white/5"
          >
            Explore events
          </a>
        </div>
      </div>
    </section>
  )
}
