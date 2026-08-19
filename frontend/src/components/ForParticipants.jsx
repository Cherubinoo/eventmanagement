import { Compass, ClipboardCheck, LayoutGrid, QrCode } from 'lucide-react'

const FEATURES = [
  {
    icon: Compass,
    title: 'Discover Events',
    description:
      'Explore events by category, location, date, organization, event type, and interests — without searching multiple platforms.',
  },
  {
    icon: ClipboardCheck,
    title: 'Easy Registration',
    description:
      'A streamlined flow to register and manage your profile, team information, payments, tickets, and schedules.',
  },
  {
    icon: LayoutGrid,
    title: 'Personalized Dashboard',
    description:
      'My Events → Upcoming Events → Schedule → Tickets → Certificates → Notifications, all in one place.',
  },
  {
    icon: QrCode,
    title: 'Digital Tickets & QR Check-in',
    description:
      'Every registration comes with a digital pass and unique QR code for fast entry, verification, and attendance tracking.',
  },
]

export default function ForParticipants() {
  return (
    <section id="participants" className="flex min-h-screen flex-col justify-center border-y border-gray-200 bg-gray-50 px-6 py-28 dark:border-white/10 dark:bg-white/[0.02] lg:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-fuchsia-600 dark:text-fuchsia-400">
            For Participants
          </span>
          <h2 className="mt-4 text-4xl font-semibold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
            Discover, register, and participate — seamlessly
          </h2>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="rounded-2xl border border-gray-200 bg-white p-7 text-center transition hover:border-gray-300 hover:shadow-lg dark:border-white/10 dark:bg-white/[0.03] dark:hover:border-white/20 dark:hover:bg-white/[0.05] dark:hover:shadow-none"
            >
              <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-lg bg-fuchsia-100 dark:bg-fuchsia-500/15">
                <Icon className="h-6 w-6 text-fuchsia-600 dark:text-fuchsia-400" />
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
