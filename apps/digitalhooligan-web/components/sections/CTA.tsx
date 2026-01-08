import Link from "next/link";

export default function CTA() {
  return (
    <section
      id="cta"
      className="border-t border-white/5 bg-gradient-to-r from-slate-950 via-black to-slate-950 px-4 py-14 sm:px-6 md:py-16 lg:px-8"
    >
      <div className="mx-auto max-w-5xl">
        <div className="rounded-3xl border border-dh-street-gray/40 bg-dh-black/60 p-6 md:p-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="space-y-3">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-dh-electric-mint">
                Ready when you are
              </p>
              <h2 className="text-balance text-2xl font-semibold tracking-tight text-slate-50 sm:text-3xl">
                Want a disciplined builder for your next thing?
              </h2>
              <p className="max-w-2xl text-pretty text-slate-300">
                If you’re scoping a product, modernizing ops, or need a tight
                delivery partner, we keep it simple: define the outcome, ship
                clean, iterate fast.
              </p>
              <p className="text-sm text-slate-400">
                Prefer email? Jump to{" "}
                <Link
                  href="/contact"
                  className="font-semibold text-dh-electric-mint underline underline-offset-2 hover:opacity-90"
                >
                  contact
                </Link>{" "}
                and send a quick outline.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-full bg-dh-rebel-red px-5 py-2.5 text-sm font-semibold text-black shadow shadow-dh-rebel-red/30 transition hover:opacity-90"
              >
                Start a conversation
              </Link>

              <Link
                href="/labs"
                className="inline-flex items-center justify-center rounded-full border border-dh-electric-mint/70 bg-dh-electric-mint/10 px-5 py-2.5 text-sm font-medium text-dh-electric-mint transition hover:bg-dh-electric-mint/20"
              >
                Explore Labs
              </Link>

              <Link
                href="/services"
                className="inline-flex items-center justify-center rounded-full border border-dh-street-gray/60 bg-dh-black/60 px-5 py-2.5 text-sm font-medium text-dh-offwhite transition hover:border-dh-electric-mint/60 hover:text-dh-electric-mint"
              >
                Services
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
