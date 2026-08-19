import {
  Sparkles,
  ClipboardList,
  Megaphone,
  UserPlus,
  LayoutGrid,
  Ticket,
  Award,
  BarChart3,
} from 'lucide-react'

const STOPS = [
  { label: 'Create', icon: Sparkles },
  { label: 'Plan', icon: ClipboardList },
  { label: 'Promote', icon: Megaphone },
  { label: 'Register', icon: UserPlus },
  { label: 'Organize', icon: LayoutGrid },
  { label: 'Attend', icon: Ticket },
  { label: 'Certify', icon: Award },
  { label: 'Analyze', icon: BarChart3 },
]

const WIDTH = 1200
const HEIGHT = 220
const BASELINE = HEIGHT / 2
const AMPLITUDE = 55

function roadY(xFraction) {
  return BASELINE + AMPLITUDE * Math.sin(xFraction * Math.PI * 1.6 + Math.PI / 2.2)
}

function buildRoadPath() {
  const samples = 120
  const segments = []
  for (let i = 0; i <= samples; i++) {
    const xFraction = i / samples
    const x = xFraction * WIDTH
    const y = roadY(xFraction)
    segments.push(`${i === 0 ? 'M' : 'L'}${x.toFixed(1)},${y.toFixed(1)}`)
  }
  return segments.join(' ')
}

const ROAD_PATH = buildRoadPath()

const MARKERS = STOPS.map((stop, i) => {
  const xFraction = i / (STOPS.length - 1)
  const x = xFraction * WIDTH
  const y = roadY(xFraction)
  return { ...stop, x, y }
})

function Marker({ stop, index }) {
  const above = index % 2 === 0
  return (
    <div
      className="absolute"
      style={{
        left: `${(stop.x / WIDTH) * 100}%`,
        top: `${(stop.y / HEIGHT) * 100}%`,
        transform: 'translate(-50%, -50%)',
      }}
    >
      <div className="relative flex h-14 w-14 items-center justify-center rounded-full border-4 border-white bg-gradient-to-br from-violet-500 to-fuchsia-500 text-white shadow-lg dark:border-[#05060a]">
        <stop.icon className="h-6 w-6" />
        <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-white text-[10px] font-bold text-violet-600 shadow dark:bg-[#05060a] dark:text-violet-300">
          {index + 1}
        </span>
        <span
          className={`absolute left-1/2 -translate-x-1/2 whitespace-nowrap text-sm font-semibold text-gray-900 dark:text-white ${
            above ? '-top-9' : 'top-16'
          }`}
        >
          {stop.label}
        </span>
      </div>
    </div>
  )
}

export default function EventJourney() {
  return (
    <section className="flex min-h-screen flex-col justify-center border-t border-gray-200 px-6 py-28 dark:border-white/10 lg:px-12">
      <div className="mx-auto max-w-6xl text-center">
        <span className="text-sm font-semibold uppercase tracking-wider text-violet-600 dark:text-violet-400">
          The Roadies Journey
        </span>
        <h2 className="mt-4 text-4xl font-semibold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
          Every event follows the same road
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-gray-600 dark:text-white/60">
          From the first idea to the final report — one connected path, no detours.
        </p>

        <div
          className="relative mx-auto mt-24 hidden w-full max-w-5xl md:block"
          style={{ aspectRatio: `${WIDTH} / ${HEIGHT}` }}
        >
          <svg
            viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
            preserveAspectRatio="none"
            className="absolute inset-0 h-full w-full overflow-visible"
          >
            <path
              d={ROAD_PATH}
              fill="none"
              strokeWidth={34}
              strokeLinecap="round"
              className="stroke-gray-200 dark:stroke-white/10"
            />
            <path
              d={ROAD_PATH}
              fill="none"
              strokeWidth={3}
              strokeDasharray="16 16"
              strokeLinecap="round"
              className="stroke-violet-400/70 dark:stroke-violet-300/50"
            />
          </svg>

          {MARKERS.map((stop, i) => (
            <Marker key={stop.label} stop={stop} index={i} />
          ))}
        </div>

        <div className="mt-16 flex flex-col items-center gap-6 md:hidden">
          {STOPS.map((stop, i) => (
            <div key={stop.label} className="flex flex-col items-center">
              <div className="relative flex h-14 w-14 items-center justify-center rounded-full border-4 border-white bg-gradient-to-br from-violet-500 to-fuchsia-500 text-white shadow-lg dark:border-[#05060a]">
                <stop.icon className="h-6 w-6" />
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-white text-[10px] font-bold text-violet-600 shadow dark:bg-[#05060a] dark:text-violet-300">
                  {i + 1}
                </span>
              </div>
              <span className="mt-3 text-base font-semibold text-gray-900 dark:text-white">{stop.label}</span>
              {i < STOPS.length - 1 && (
                <div className="mt-4 h-8 w-1 rounded-full bg-gradient-to-b from-violet-300 to-fuchsia-300 dark:from-violet-500/40 dark:to-fuchsia-500/40" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
