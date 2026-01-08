import Link from "next/link";

const primaryCta =
  "inline-flex items-center justify-center rounded-full bg-dh-rebel-red px-5 py-2.5 text-sm font-semibold text-white shadow shadow-dh-rebel-red/30 transition hover:bg-dh-rebel-red/90";
const secondaryCta =
  "inline-flex items-center justify-center rounded-full border border-dh-steel-blue/60 bg-dh-steel-blue/10 px-5 py-2.5 text-sm font-semibold text-dh-steel-blue transition hover:bg-dh-steel-blue/15";
const neutralCta =
  "inline-flex items-center justify-center rounded-full border border-dh-border bg-transparent px-5 py-2.5 text-sm font-semibold text-dh-text transition hover:bg-white/5";

export default function CTA() {
  return (
    <section id="cta" className="border-t border-dh-border bg-dh-carbon px-4 py-14 sm:px-6 md:py-16 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="rounded-3xl border border-dh-border bg-dh-panel/70 p-6 md:p-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="space-y-3">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-dh-steel-blue">
                Ready when you are
              </p>
              <h2 className="text-balance text-2xl font-semibold tracking-tight text-dh-text sm:text-3xl">
                Want a disciplined builder for your next thing?
              </h2>
              <p className="max-w-2xl text-pretty text-dh-muted">
                If you’re scoping a product, modernizing ops, or need a tight
                delivery partner, we keep it simple: define the outcome, ship
                clean, iterate fast.
              </p>
              <p className="text-sm text-dh-muted/90">
                Prefer email? Jump to{" "}
                <Link
                  href="/contact"
                  className="font-semibold text-dh-steel-blue underline underline-offset-2 hover:opacity-90"
                >
                  contact
                </Link>{" "}
                and send a quick outline.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link href="/contact" className={primaryCta}>
                Start a conversation
              </Link>

              <Link href="/labs" className={secondaryCta}>
                Explore Labs
              </Link>

              <Link href="/services" className={neutralCta}>
                Services
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
