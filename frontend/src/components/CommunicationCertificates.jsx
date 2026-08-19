import { MessageSquareText, Award } from 'lucide-react'

const ANNOUNCEMENTS = [
  'Event announcements',
  'Schedule updates',
  'Registration notifications',
  'Venue changes',
  'Competition updates',
  'Emergency announcements',
]

const CERTIFICATE_TYPES = [
  'Participation',
  'Winners',
  'Runners-up',
  'Volunteers',
  'Speakers',
  'Organizers',
  'Judges',
]

export default function CommunicationCertificates() {
  return (
    <section className="flex min-h-screen flex-col justify-center border-y border-gray-200 bg-gray-50 px-6 py-28 dark:border-white/10 dark:bg-white/[0.02] lg:px-12">
      <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-2">
        <div className="rounded-2xl border border-gray-200 bg-white p-10 text-center dark:border-white/10 dark:bg-white/[0.03]">
          <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-lg bg-sky-100 dark:bg-sky-500/15">
            <MessageSquareText className="h-7 w-7 text-sky-600 dark:text-sky-400" />
          </div>
          <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">Communication</h3>
          <p className="mt-3 text-base text-gray-600 dark:text-white/60">
            Keep everyone connected before, during, and after the event.
          </p>
          <ul className="mt-8 flex flex-col items-center gap-3">
            {ANNOUNCEMENTS.map((item) => (
              <li key={item} className="flex items-center gap-2 text-base text-gray-700 dark:text-white/70">
                <span className="h-1.5 w-1.5 rounded-full bg-sky-500 dark:bg-sky-400" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-10 text-center dark:border-white/10 dark:bg-white/[0.03]">
          <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-lg bg-emerald-100 dark:bg-emerald-500/15">
            <Award className="h-7 w-7 text-emerald-600 dark:text-emerald-400" />
          </div>
          <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">Certificates & Achievements</h3>
          <p className="mt-3 text-base text-gray-600 dark:text-white/60">
            Digital certificates, generated automatically and downloadable from every profile.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-2.5">
            {CERTIFICATE_TYPES.map((item) => (
              <span
                key={item}
                className="rounded-full border border-gray-200 bg-gray-50 px-4 py-2 text-sm text-gray-700 dark:border-white/10 dark:bg-white/5 dark:text-white/70"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
