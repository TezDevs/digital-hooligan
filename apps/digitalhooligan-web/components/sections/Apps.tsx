type AppCard = {
    name: string;
    tagline: string;
    niche: string;
    status: string;
    href: string;
    primaryCta: string;
    phase: string;
};

const apps: AppCard[] = [
    {
        name: "PennyWize",
        tagline: "Penny stock scraper with a social layer around the tickers.",
        niche: "Retail traders · penny stocks · data-first insights",
        status: "Bot + web app first, mobile later",
        href: "/pennywize",
        primaryCta: "View PennyWize",
        phase: "Phase 1: web app · Phase 2: iOS & Android",
    },
    {
        name: "DropSignal",
        tagline: "Sneaker & streetwear price-drop radar with assist-mode alerts.",
        niche: "Sneakerheads · streetwear · Jordans · Kith · Mitchell & Ness",
        status: "Alerts first, add-to-cart flows in grown-up mode",
        href: "/dropsignal",
        primaryCta: "View DropSignal",
        phase: "Phase 1: bot alerts · Phase 2: web app · Phase 3: mobile",
    },
    {
        name: "HypeWatch",
        tagline: "Collectible price watcher for cards, figures, mags & flex pieces.",
        niche: "Collectibles · slabs · figures · watches & display toys",
        status: "Starts inside Labs, then graduates to its own app",
        href: "/labs",
        primaryCta: "View in Labs",
        phase: "Phase 0: Labs experiment · Phase 1: web · Phase 2: mobile",
    },
    {
        name: "Ops Toys",
        tagline: "Automation toys for infra, logging, deployments & dev workflow.",
        niche: "DevOps · SRE · internal tools & dashboards",
        status: "Internal-first, with public tools where it makes sense",
        href: "/labs",
        primaryCta: "View Ops Toys in Labs",
        phase: "Phase 0: internal use · Phase 1: curated public tools",
    },
];

export default function Apps() {
    return (
        <section
            id="apps"
            className="border-b border-white/5 bg-slate-950/70 px-4 py-16 sm:px-6 md:py-20 lg:px-8"
        >
            <div className="mx-auto max-w-6xl">
                <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                    <div>
                        <h2 className="text-balance text-2xl font-semibold tracking-tight text-slate-50 sm:text-3xl">
                            Hooligan apps & bots
                        </h2>
                        <p className="mt-2 max-w-xl text-sm text-slate-300 sm:text-base">
                            Every app starts as a{" "}
                            <span className="font-medium text-slate-100">tool-first bot</span>{" "}
                            or dashboard. Once it proves it’s useful, it{" "}
                            <span className="font-medium text-slate-100">
                                graduates to a full web app
                            </span>{" "}
                            and eventually a mobile app on the Apple & Google Play stores.
                        </p>
                    </div>

                    <p className="max-w-sm text-xs text-slate-400">
                        Nothing here is a hype landing page with no brain behind it. Each
                        project is wired for data, automation, and a future social layer
                        wrapped around the numbers.
                    </p>
                </div>

                <div className="mt-8 grid gap-5 md:grid-cols-2">
                    {apps.map((app) => (
                        <article
                            key={app.name}
                            className="group relative overflow-hidden rounded-2xl border border-slate-800/80 bg-gradient-to-b from-slate-950 to-black p-5 shadow-[0_18px_45px_rgba(0,0,0,0.7)] transition-transform hover:-translate-y-1 hover:border-emerald-400/60"
                        >
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.14),transparent_60%)] opacity-0 transition-opacity group-hover:opacity-100" />
                            <div className="relative flex h-full flex-col justify-between gap-4">
                                <header className="space-y-2">
                                    <div className="inline-flex items-center gap-2 rounded-full border border-slate-700/80 bg-slate-900/70 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.22em] text-slate-400">
                                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                                        Hooligan Labs · App
                                    </div>
                                    <h3 className="text-lg font-semibold text-slate-50">
                                        {app.name}
                                    </h3>
                                    <p className="text-sm text-slate-300">{app.tagline}</p>
                                </header>

                                <div className="space-y-2 text-xs">
                                    <p className="text-slate-400">
                                        <span className="font-semibold text-slate-200">
                                            Niche:
                                        </span>{" "}
                                        {app.niche}
                                    </p>
                                    <p className="text-slate-400">
                                        <span className="font-semibold text-slate-200">
                                            Roadmap:
                                        </span>{" "}
                                        {app.phase}
                                    </p>
                                    <p className="text-slate-400">
                                        <span className="font-semibold text-slate-200">
                                            Status:
                                        </span>{" "}
                                        {app.status}
                                    </p>
                                </div>

                                <footer className="mt-3 flex items-center justify-between gap-4">
                                    <a
                                        href={app.href}
                                        className="inline-flex items-center gap-1 rounded-full bg-emerald-400 px-3.5 py-1.5 text-xs font-semibold text-black shadow shadow-emerald-500/40 transition group-hover:bg-emerald-300"
                                    >
                                        {app.primaryCta}
                                        <span aria-hidden="true">↗</span>
                                    </a>
                                    <span className="text-[10px] uppercase tracking-[0.22em] text-slate-500">
                                        Assist mode → add-to-cart mode
                                    </span>
                                </footer>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}