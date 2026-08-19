import { Trophy, Users2, Gavel, BarChart3 } from 'lucide-react'

const CAPABILITIES = [
  'Individual competitions',
  'Team-based competitions',
  'Multiple rounds',
  'Leaderboards',
  'Judging panels',
  'Scorecards',
  'Result announcements',
]

export default function TeamCompetitions() {
  return (
    <section id="competitions" className="flex min-h-screen flex-col justify-center px-6 py-28 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-orange-600 dark:text-orange-400">
            Team & Competition Management
          </span>
          <h2 className="mt-4 text-4xl font-semibold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
            Built for competitions, hackathons, and multi-round judging
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-gray-600 dark:text-white/60">
            Participants create or join teams and track progress. Organizers run everything from
            leaderboards to final results.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {CAPABILITIES.map((item) => (
              <span
                key={item}
                className="rounded-full border border-gray-200 bg-white px-5 py-2.5 text-base text-gray-700 dark:border-white/10 dark:bg-white/5 dark:text-white/70"
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-16 grid grid-cols-2 gap-6 lg:grid-cols-4">
          {[
            { icon: Users2, label: 'Team formation' },
            { icon: Trophy, label: 'Leaderboards' },
            { icon: Gavel, label: 'Judging panels' },
            { icon: BarChart3, label: 'Scorecards' },
          ].map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="flex flex-col items-center gap-4 rounded-2xl border border-gray-200 bg-white p-7 text-center dark:border-white/10 dark:bg-white/[0.03]"
            >
              <Icon className="h-7 w-7 text-orange-600 dark:text-orange-400" />
              <span className="text-base font-medium text-gray-900 dark:text-white">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
