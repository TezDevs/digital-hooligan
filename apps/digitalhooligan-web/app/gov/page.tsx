import Link from "next/link";

export const metadata = {
    title: "Gov & Enterprise | Digital Hooligan",
    description:
        "Veteran-led boutique studio building web apps, internal tools, and automation for government and enterprise teams.",
};

export default function GovPage() {
    return (
        <main className="min-h-screen bg-black text-zinc-50">
            <section className="px-6 py-16 md:px-12 lg:px-24 max-w-5xl mx-auto">
                {/* Hero */}
                <div className="mb-12">
                    <p className="text-xs uppercase tracking-[0.2em] text-zinc-500 mb-3">
                        Gov &amp; Enterprise
                    </p>
                    <h1 className="text-3xl md:text-5xl font-semibold tracking-tight mb-4">
                        Digital Hooligan for teams that need things{" "}
                        <span className="text-red-500">actually shipped</span>.
                    </h1>
                    <p className="text-zinc-300 max-w-2xl">
                        Veteran-led, small, and ruthlessly focused on delivery. Digital
                        Hooligan builds web apps, internal tools, and automation for teams
                        that live in high-signal, low-bullshit environments—whether that&apos;s
                        government, defense, or critical operations in the private sector.
                    </p>
                </div>

                {/* Badges */}
                <div className="flex flex-wrap gap-3 mb-12">
                    <span className="rounded-full border border-zinc-800 px-3 py-1 text-xs uppercase tracking-wide text-zinc-300">
                        Veteran-led small business
                    </span>
                    <span className="rounded-full border border-zinc-800 px-3 py-1 text-xs uppercase tracking-wide text-zinc-300">
                        NAICS 541511 – Custom software
                    </span>
                    <span className="rounded-full border border-zinc-800 px-3 py-1 text-xs uppercase tracking-wide text-zinc-300">
                        Remote-native, US-based
                    </span>
                    <span className="rounded-full border border-zinc-800 px-3 py-1 text-xs uppercase tracking-wide text-zinc-300">
                        Web apps, dashboards &amp; internal tools
                    </span>
                </div>

                {/* What we deliver */}
                <div className="grid gap-8 md:grid-cols-2 mb-12">
                    <div>
                        <h2 className="text-xl font-semibold mb-3">What we actually build</h2>
                        <ul className="space-y-2 text-zinc-300 text-sm">
                            <li>• Web dashboards and internal tools for ops, support, and leadership.</li>
                            <li>• Data pipelines, scrapers, and monitors around public or internal data.</li>
                            <li>• Automation that glues together legacy systems and modern APIs.</li>
                            <li>• Prototypes &amp; MVPs to validate new ideas without 12 months of meetings.</li>
                            <li>• Lightweight bots and alerting tools tailored to your workflows.</li>
                        </ul>
                    </div>

                    <div>
                        <h2 className="text-xl font-semibold mb-3">How we work</h2>
                        <ul className="space-y-2 text-zinc-300 text-sm">
                            <li>• Small, senior-led team: you&apos;re working directly with the builder.</li>
                            <li>• Async-first and remote-friendly; used to working around constraints.</li>
                            <li>• Opinionated about clean, maintainable code and clear documentation.</li>
                            <li>• Comfortable with government and enterprise processes and reviews.</li>
                            <li>• Designed for repeatable, long-term support—not throwaway prototypes.</li>
                        </ul>
                    </div>
                </div>

                {/* Procurement / process block */}
                <div className="border border-zinc-800 rounded-2xl p-6 mb-12 bg-zinc-950/60">
                    <h2 className="text-lg font-semibold mb-2">
                        Built to slot into your process
                    </h2>
                    <p className="text-zinc-300 text-sm mb-3">
                        Digital Hooligan LLC operates as a US-based software &amp; web app
                        development studio under NAICS 541511. Entity registration is in
                        progress for federal opportunities via SAM.gov, with future
                        certification planned as a veteran-owned small business.
                    </p>
                    <p className="text-zinc-400 text-xs">
                        If you have a specific vehicle, BPA, or small pilot you&apos;re
                        exploring, we can help you shape the scope into something a lean
                        shop can execute quickly.
                    </p>
                </div>

                {/* CTA */}
                <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                    <div>
                        <h2 className="text-lg font-semibold mb-1">
                            Have a small, sharp project in mind?
                        </h2>
                        <p className="text-zinc-300 text-sm max-w-xl">
                            Start with something focused—an internal tool, a dashboard, or a
                            proof-of-concept—and we&apos;ll help you ship it, then decide what
                            deserves to grow.
                        </p>
                    </div>
                    <div className="flex gap-3">
                        <Link
                            href="/#contact"
                            className="inline-flex items-center rounded-full px-4 py-2 text-sm font-medium border border-red-500 bg-red-500/10 hover:bg-red-500/20 transition"
                        >
                            Talk to Digital Hooligan
                        </Link>
                        <Link
                            href="/labs"
                            className="inline-flex items-center rounded-full px-4 py-2 text-xs font-medium border border-zinc-800 text-zinc-300 hover:bg-zinc-900 transition"
                        >
                            Explore experiments in Hooligan Labs
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
}