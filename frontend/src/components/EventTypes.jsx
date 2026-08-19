const EVENT_TYPES = [
  {
    emoji: '🎓',
    title: 'College Events',
    description: 'Symposiums, culturals, fests, workshops, and department events.',
  },
  {
    emoji: '💻',
    title: 'Hackathons',
    description: 'Team formation, problem statements, submissions, judging, and leaderboards.',
  },
  {
    emoji: '🏆',
    title: 'Competitions',
    description: 'Multi-round competitions with scoring and result management.',
  },
  {
    emoji: '🎤',
    title: 'Conferences',
    description: 'Speakers, sessions, schedules, registrations, and attendance.',
  },
  {
    emoji: '📚',
    title: 'Workshops',
    description: 'Instructor management, participant registration, schedules, and certificates.',
  },
  {
    emoji: '🏢',
    title: 'Corporate Events',
    description: 'Meetups, conferences, training programs, employee events, and networking.',
  },
]

export default function EventTypes() {
  return (
    <section className="flex min-h-screen flex-col justify-center px-6 py-28 lg:px-12">
      <div className="mx-auto max-w-7xl text-center">
        <h2 className="text-4xl font-semibold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
          Built for every kind of event
        </h2>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {EVENT_TYPES.map(({ emoji, title, description }) => (
            <div
              key={title}
              className="rounded-2xl border border-gray-200 bg-white p-8 text-center transition hover:border-gray-300 hover:shadow-lg dark:border-white/10 dark:bg-white/[0.03] dark:hover:border-white/20 dark:hover:bg-white/[0.05] dark:hover:shadow-none"
            >
              <span className="text-4xl">{emoji}</span>
              <h3 className="mt-5 text-xl font-semibold text-gray-900 dark:text-white">{title}</h3>
              <p className="mt-3 text-base leading-relaxed text-gray-600 dark:text-white/60">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
