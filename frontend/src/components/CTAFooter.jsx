import { Sparkles } from 'lucide-react'

export default function CTAFooter() {
  return (
    <>
      <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 py-32 text-center lg:px-12">
        <div
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            background:
              'radial-gradient(50% 60% at 50% 50%, rgba(139,92,246,0.12) 0%, rgba(255,255,255,0) 70%)',
          }}
        />
        <div className="pointer-events-none absolute inset-0 -z-10 hidden dark:block"
          style={{
            background:
              'radial-gradient(50% 60% at 50% 50%, rgba(139,92,246,0.2) 0%, rgba(5,6,10,0) 70%)',
          }}
        />
        <div className="mx-auto max-w-4xl">
          <h2 className="text-4xl font-semibold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
            Event management should be about creating experiences —
            <br className="hidden sm:block" /> not managing spreadsheets.
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-gray-600 dark:text-white/60">
            Whether you're organizing a 50-person workshop or a 5,000-person festival, Roadies
            gives you the tools to plan smarter, manage better, and experience more.
          </p>
          <a
            href="#top"
            className="mt-10 inline-flex items-center justify-center gap-2 rounded-full bg-gray-900 px-8 py-4 text-base font-semibold text-white transition hover:bg-gray-700 dark:bg-white dark:text-[#05060a] dark:hover:bg-white/90"
          >
            Bring your event to Roadies
          </a>
        </div>
      </section>

      <footer className="border-t border-gray-200 px-6 py-10 dark:border-white/10 lg:px-12">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 sm:flex-row">
          <a href="#top" className="flex items-center gap-2 text-base font-semibold text-gray-900 dark:text-white">
            <span className="flex h-6 w-6 items-center justify-center rounded-md bg-gradient-to-br from-violet-500 to-fuchsia-500">
              <Sparkles className="h-3 w-3 text-white" />
            </span>
            Roadies
          </a>
          <p className="text-sm text-gray-500 dark:text-white/40">
            Plan smarter. Manage better. Experience more.
          </p>
        </div>
      </footer>
    </>
  )
}
