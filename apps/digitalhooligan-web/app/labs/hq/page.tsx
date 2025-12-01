import Link from "next/link";

const experiments = [
    {
        name: "PennyWize",
        type: "Market tools",
        stage: "Designing MVP",
        focus: "Penny stock / small-cap signal scraper",
        nextStep: "Lock first data sources + MVP feature set",
    },
    {
        name: "DropSignal",
        type: "Sneakers & streetwear",
        stage: "Concept → Assist mode",
        focus: "Price-drop alerts for sneakers + streetwear",
        nextStep: "Define Phase 1 'assist mode' alert flows",
    },
    {
        name: "HypeWatch",
        type: "Collectibles radar",
        stage: "Concept",
        focus: "Price tracking for cards, figures, watches, mags",
        nextStep: "Decide first collectible vertical and icon set",
    },
    {
        name: "Ops Toys",
        type: "Internal ops tools",
        stage: "Early automations",
        focus: "Infra, logging, and workflow helpers",
        nextStep: "List first 3 “toys” worth building",
    },
];

const pipeline = {
    backlog: [
        "Write Hooligan Labs mission statement for /labs",
        "Rough-cut UX flows for PennyWize web app",
        "Collect 10–20 real sneaker & collectible use-cases",
    ],
    inProgress: [
        "Define DropSignal assist-mode vs. add-to-cart phases",
        "Polish labs branding + iconography across the site",
    ],
    readyToTest: [
        "Run through /labs page as if you're a new visitor",
        "Sanity-check feature naming vs. target audiences",
    ],
};

const ideaBacklog = [
    {
        label: "Sneaker social layer",
        detail:
            "Lightweight social feed around DropSignal alerts (flex your wins, share watchlists).",
        weight: "Medium",
    },
    {
        label: "Collector ledger",
        detail:
            "Simple portfolio view for collectibles + sneakers with purchase price vs. current floor.",
        weight: "High",
    },
    {
        label: "Ops Toys marketplace",
        detail:
            "Internal toys that eventually become small public tools (log viewers, alert formatters, etc.).",
        weight: "Low / later",
    },
    {
        label: "API-first experiment",
        detail:
            "Ship one API-only product under Digital Hooligan before a full web UI.",
        weight: "Medium",
    },
];

export default function LabsHqPage() {
    return (
        <main className="min-h-screen bg-slate-950 text-slate-50">
            <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-10 md:py-12">
                {/* Top bar / nav */}
                <header className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
                    <div className="space-y-3">
                        <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
                            <Link
                                href="/"
                                className="inline-flex items-center text-slate-400 transition hover:text-emerald-400"
                            >
                                <span aria-hidden="true" className="mr-1">
                                    ←
                                </span>
                                Back to site
                            </Link>
                            <span className="text-slate-700">/</span>
                            <Link
                                href="/labs"
                                className="text-slate-400 transition hover:text-emerald-400"
                            >
                                Labs
                            </Link>
                            <span className="text-slate-700">/</span>
                            <span className="text-slate-300">Labs HQ</span>
                        </div>
                        <div>
                            <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                                Hooligan Labs HQ
                            </h1>
                            <p className="mt-1 max-w-xl text-sm text-slate-400">
                                Internal view of every experiment under Digital Hooligan –
                                status, next moves, and what&apos;s worth shipping next.
                            </p>
                        </div>
                    </div>

                    <div className="space-y-2 text-right text-xs text-slate-400">
                        <Link
                            href="/ceo"
                            className="inline-flex items-center justify-end gap-1 rounded-full border border-slate-800 bg-slate-900 px-3 py-1 text-[11px] font-medium text-slate-200 transition hover:border-emerald-500/60 hover:text-emerald-300"
                        >
                            <span aria-hidden="true">📊</span>
                            CEO Dashboard
                        </Link>
                        <p className="text-[11px] text-slate-500">
                            Labs HQ is part of the internal CEO console; same login, same
                            cookie.
                        </p>
                    </div>
                </header>

                {/* Experiments overview */}
                <section className="rounded-xl border border-slate-800 bg-slate-900/70 p-5">
                    <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
                        <h2 className="text-sm font-semibold text-slate-100">
                            Experiments overview
                        </h2>
                        <p className="text-xs text-slate-500">
                            Each card is a lab baby. The goal is to move them from idea →
                            prototype → revenue.
                        </p>
                    </div>
                    <div className="mt-4 grid gap-3 md:grid-cols-2">
                        {experiments.map((exp) => (
                            <article
                                key={exp.name}
                                className="flex flex-col justify-between gap-3 rounded-lg border border-slate-800 bg-slate-950/40 p-4 text-sm"
                            >
                                <div className="flex items-start justify-between gap-3">
                                    <div>
                                        <h3 className="text-sm font-semibold text-slate-50">
                                            {exp.name}
                                        </h3>
                                        <p className="mt-0.5 text-[11px] uppercase tracking-wide text-slate-400">
                                            {exp.type}
                                        </p>
                                    </div>
                                    <span className="rounded-full bg-slate-800 px-2 py-0.5 text-[11px] text-slate-300">
                                        {exp.stage}
                                    </span>
                                </div>
                                <p className="text-xs text-slate-300">{exp.focus}</p>
                                <p className="text-[11px] text-slate-500">
                                    <span className="font-semibold text-slate-300">
                                        Next:
                                    </span>{" "}
                                    {exp.nextStep}
                                </p>
                            </article>
                        ))}
                    </div>
                </section>

                {/* Build pipeline */}
                <section className="grid gap-6 md:grid-cols-3">
                    <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-4">
                        <h2 className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                            Backlog
                        </h2>
                        <p className="mt-1 text-[11px] text-slate-500">
                            Good ideas, not yet scheduled.
                        </p>
                        <ul className="mt-3 space-y-2 text-xs">
                            {pipeline.backlog.map((item) => (
                                <li
                                    key={item}
                                    className="rounded-lg border border-slate-800 bg-slate-950/40 p-2.5 text-slate-200"
                                >
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-4">
                        <h2 className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                            In progress
                        </h2>
                        <p className="mt-1 text-[11px] text-slate-500">
                            Things you&apos;re actively shaping this week.
                        </p>
                        <ul className="mt-3 space-y-2 text-xs">
                            {pipeline.inProgress.map((item) => (
                                <li
                                    key={item}
                                    className="rounded-lg border border-emerald-500/40 bg-emerald-500/5 p-2.5 text-slate-100"
                                >
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-4">
                        <h2 className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                            Ready to test
                        </h2>
                        <p className="mt-1 text-[11px] text-slate-500">
                            Items that just need you to run through them like a user.
                        </p>
                        <ul className="mt-3 space-y-2 text-xs">
                            {pipeline.readyToTest.map((item) => (
                                <li
                                    key={item}
                                    className="rounded-lg border border-sky-500/40 bg-sky-500/5 p-2.5 text-slate-100"
                                >
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                </section>

                {/* Idea backlog */}
                <section className="rounded-xl border border-slate-800 bg-slate-900/70 p-5">
                    <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
                        <h2 className="text-sm font-semibold text-slate-100">
                            Idea backlog (don&apos;t lose the sparks)
                        </h2>
                        <p className="text-xs text-slate-500">
                            Not yet on the roadmap, but worth revisiting when you have
                            capacity.
                        </p>
                    </div>
                    <div className="mt-4 grid gap-3 md:grid-cols-2">
                        {ideaBacklog.map((idea) => (
                            <article
                                key={idea.label}
                                className="flex flex-col gap-2 rounded-lg border border-slate-800 bg-slate-950/40 p-4 text-xs"
                            >
                                <div className="flex items-center justify-between gap-2">
                                    <h3 className="text-sm font-semibold text-slate-50">
                                        {idea.label}
                                    </h3>
                                    <span className="rounded-full bg-slate-800 px-2 py-0.5 text-[11px] text-slate-300">
                                        Priority: {idea.weight}
                                    </span>
                                </div>
                                <p className="text-slate-300">{idea.detail}</p>
                            </article>
                        ))}
                    </div>
                </section>

                {/* Notes */}
                <section className="rounded-xl border border-dashed border-slate-800 bg-slate-900/60 p-5">
                    <h2 className="text-sm font-semibold text-slate-100">
                        Lab notes (scratchpad)
                    </h2>
                    <p className="mt-1 text-xs text-slate-500">
                        Later this could sync with Notion or a small DB table. For now,
                        think of this as the whiteboard summary of what Labs is about.
                    </p>
                    <div className="mt-3 rounded-lg border border-slate-800 bg-slate-950/70 p-3 text-[11px] text-slate-300">
                        Hooligan Labs is where new toys are born. The goal: rapidly explore
                        apps, bots, and APIs that plug into the CEO dashboard and actually
                        move MRR, not just look cool.
                    </div>
                </section>

                <footer className="mt-2 border-t border-slate-900 pt-4 text-xs text-slate-500">
                    <p>
                        Labs HQ is an internal view only. Visitors see the public{" "}
                        <Link
                            href="/labs"
                            className="text-slate-300 underline-offset-2 hover:text-emerald-300 hover:underline"
                        >
                            /labs
                        </Link>{" "}
                        page; you see this.
                    </p>
                </footer>
            </div>
        </main>
    );
}
