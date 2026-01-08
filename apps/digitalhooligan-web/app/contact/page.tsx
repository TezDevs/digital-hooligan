import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Contact — Digital Hooligan",
  description:
    "Contact Digital Hooligan LLC. Veteran-led software studio building web apps, dashboards, and automation tools.",
};

export const dynamic = "force-static";

const primaryCta =
  "inline-flex items-center justify-center rounded-full bg-dh-rebel-red px-5 py-2.5 text-sm font-semibold text-white shadow shadow-dh-rebel-red/30 transition hover:bg-dh-rebel-red/90";
const secondaryCta =
  "inline-flex items-center justify-center rounded-full border border-dh-steel-blue/60 bg-dh-steel-blue/10 px-5 py-2.5 text-sm font-semibold text-dh-steel-blue transition hover:bg-dh-steel-blue/15";
const neutralCta =
  "inline-flex items-center justify-center rounded-full border border-dh-border bg-transparent px-5 py-2.5 text-sm font-semibold text-dh-text transition hover:bg-white/5";

export default function ContactPage() {
  const email = "hello@digitalhooligan.io";
  const mailto = `mailto:${email}?subject=${encodeURIComponent(
    "Inquiry — Digital Hooligan",
  )}`;

  return (
    <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      <header className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-dh-steel-blue">
          Contact
        </p>
        <h1 className="text-balance text-3xl font-semibold tracking-tight text-dh-text sm:text-4xl">
          Start a conversation
        </h1>
        <p className="max-w-2xl text-pretty text-dh-muted">
          If you’re ready to scope work, pressure-test an idea, or need a
          delivery partner for a real mission, email us. We keep intake
          lightweight and move fast.
        </p>
      </header>

      <section className="mt-8 grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl border border-dh-border bg-dh-panel/70 p-6">
          <h2 className="text-lg font-semibold text-dh-text">Primary contact</h2>
          <p className="mt-2 text-dh-muted">
            Email:{" "}
            <a
              className="font-semibold text-dh-steel-blue underline underline-offset-2 hover:opacity-90"
              href={mailto}
            >
              {email}
            </a>
          </p>
          <p className="mt-3 text-sm text-dh-muted/90">
            Typical response time: within 1 business day.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <a href={mailto} className={primaryCta}>
              Email Digital Hooligan
            </a>

            <Link href="/services" className={secondaryCta}>
              View services
            </Link>
          </div>
        </div>

        <div className="rounded-2xl border border-dh-border bg-dh-panel/70 p-6">
          <h2 className="text-lg font-semibold text-dh-text">
            What to include (optional)
          </h2>
          <p className="mt-2 text-dh-muted">
            A few bullets help us route quickly and respond with a concrete next
            step.
          </p>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-dh-muted">
            <li>What you’re building (product, dashboard, automation, integration)</li>
            <li>Timeline and key constraints (security, compliance, data boundaries)</li>
            <li>Current state (new build, refactor, rescue, prototype)</li>
            <li>Success criteria (what “done” looks like)</li>
            <li>Budget range (even a band is helpful)</li>
          </ul>
        </div>
      </section>

      <section className="mt-10 flex flex-wrap gap-3">
        <Link href="/" className={neutralCta}>
          Back to home
        </Link>

        <Link href="/company" className={secondaryCta}>
          About the company
        </Link>
      </section>
    </main>
  );
}
