import { ShieldCheck, Handshake } from 'lucide-react'

const ROLES = [
  'Event Admin',
  'Coordinator',
  'Volunteer',
  'Registration Manager',
  'Judge',
  'Content Manager',
  'Finance Manager',
  'Technical Team',
]

const SPONSOR_ITEMS = [
  'Sponsor information',
  'Sponsorship packages',
  'Contributions',
  'Agreements',
  'Branding requirements',
  'Sponsor visibility',
]

export default function EventTeamsSponsors() {
  return (
    <section className="flex min-h-screen flex-col justify-center px-6 py-28 lg:px-12">
      <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-2">
        <div className="rounded-2xl border border-gray-200 bg-white p-10 text-center dark:border-white/10 dark:bg-white/[0.03]">
          <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-lg bg-indigo-100 dark:bg-indigo-500/15">
            <ShieldCheck className="h-7 w-7 text-indigo-600 dark:text-indigo-400" />
          </div>
          <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">For Event Teams</h3>
          <p className="mt-3 text-base text-gray-600 dark:text-white/60">
            Large events need more than one organizer. Assign roles with controlled access to
            exactly the features each person needs.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-2.5">
            {ROLES.map((role) => (
              <span
                key={role}
                className="rounded-full border border-gray-200 bg-gray-50 px-4 py-2 text-sm text-gray-700 dark:border-white/10 dark:bg-white/5 dark:text-white/70"
              >
                {role}
              </span>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-10 text-center dark:border-white/10 dark:bg-white/[0.03]">
          <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-lg bg-rose-100 dark:bg-rose-500/15">
            <Handshake className="h-7 w-7 text-rose-600 dark:text-rose-400" />
          </div>
          <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">Sponsors & Partners</h3>
          <p className="mt-3 text-base text-gray-600 dark:text-white/60">
            Manage sponsorships end to end, and give sponsors dedicated visibility across event
            pages and promotional content.
          </p>
          <ul className="mt-8 flex flex-col items-center gap-3">
            {SPONSOR_ITEMS.map((item) => (
              <li key={item} className="flex items-center gap-2 text-base text-gray-700 dark:text-white/70">
                <span className="h-1.5 w-1.5 rounded-full bg-rose-500 dark:bg-rose-400" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
