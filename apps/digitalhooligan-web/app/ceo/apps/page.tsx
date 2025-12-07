import Link from "next/link";

type AppPaths = {
    marketing?: string;
    ceo?: string;
    labs?: string;
};

type AppRegistryItem = {
    id: string;
    slug?: string;
    name: string;
    codeName?: string;
    kind: string; // e.g. "internal", "external", "bot", etc.
    lifecycle: string; // e.g. "idea", "prototype", "beta", "live"
    owner?: string;
    tags?: string[];
    description?: string;
    paths?: AppPaths;
};

type RegistryResponse = {
    apps: AppRegistryItem[];
};

async function getAppRegistry(): Promise<RegistryResponse> {
    const res = await fetch("/api/registry/apps", {
        cache: "no-store",
    });

    if (!res.ok) {
        throw new Error("Failed to load app registry");
    }

    return res.json();
}

export default async function CeoAppsPage() {
    const { apps } = await getAppRegistry();

    return (
        <main className="min-h-screen bg-slate-950 text-slate-50">
            <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-8">
                {/* Header */}
                <header className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-400">
                            CEO / App Registry
                        </p>
                        <h1 className="text-3xl font-semibold tracking-tight">
                            Apps & Bots
                        </h1>
                        <p className="mt-1 text-sm text-slate-400">
                            Central registry for Digital Hooligan apps, bots, and internal tools.
                            Click into an app for full CEO detail.
                        </p>
                    </div>

                    <div className="flex items-center gap-3 text-xs text-slate-400">
                        <span className="inline-flex items-center rounded-full border border-emerald-500/40 px-3 py-1">
                            <span className="mr-1 h-1.5 w-1.5 rounded-full bg-emerald-400" />
                            <span>Registry live</span>
                        </span>
                        <span className="hidden md:inline">
                            {apps.length} {apps.length === 1 ? "entry" : "entries"}
                        </span>
                    </div>
                </header>

                {/* Grid of app cards */}
                <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                    {apps.map((app) => {
                        const idOrSlug = app.slug || app.id;
                        return (
                            <Link
                                key={app.id}
                                href={`/ceo/apps/${encodeURIComponent(idOrSlug)}`}
                                className="group flex flex-col rounded-2xl border border-slate-800 bg-slate-900/40 p-4 transition hover:-translate-y-0.5 hover:border-emerald-500/60 hover:bg-slate-900"
                            >
                                <div className="mb-2 flex items-center justify-between gap-2">
                                    <h2 className="text-base font-semibold tracking-tight group-hover:text-emerald-300">
                                        {app.name}
                                    </h2>
                                    <span className="rounded-full border border-slate-700 px-2 py-0.5 text-[10px] uppercase tracking-wide text-slate-300">
                                        {app.kind}
                                    </span>
                                </div>

                                {app.codeName && (
                                    <p className="text-[11px] font-mono text-emerald-400">
                                        {app.codeName}
                                    </p>
                                )}

                                {app.description && (
                                    <p className="mt-2 line-clamp-2 text-xs text-slate-400">
                                        {app.description}
                                    </p>
                                )}

                                <div className="mt-3 flex flex-wrap items-center gap-2 text-[11px] text-slate-400">
                                    {app.lifecycle && (
                                        <span className="rounded-full bg-slate-900/80 px-2 py-0.5 text-[10px] uppercase tracking-wide text-emerald-300">
                                            {app.lifecycle}
                                        </span>
                                    )}
                                    {app.owner && (
                                        <span className="rounded-full bg-slate-900/80 px-2 py-0.5">
                                            Owner: <span className="text-slate-200">{app.owner}</span>
                                        </span>
                                    )}
                                </div>

                                {app.tags && app.tags.length > 0 && (
                                    <div className="mt-3 flex flex-wrap gap-1.5">
                                        {app.tags.map((tag) => (
                                            <span
                                                key={tag}
                                                className="rounded-full bg-slate-900/90 px-2 py-0.5 text-[10px] text-slate-300"
                                            >
                                                #{tag}
                                            </span>
                                        ))}
                                    </div>
                                )}

                                <div className="mt-4 flex items-center justify-between text-[11px] text-slate-500">
                                    <div className="flex items-center gap-1">
                                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400/80" />
                                        <span>AI summary wired</span>
                                    </div>
                                    <span className="flex items-center gap-1 text-emerald-300 group-hover:text-emerald-200">
                                        View CEO detail
                                        <span aria-hidden="true">↗</span>
                                    </span>
                                </div>
                            </Link>
                        );
                    })}

                    {apps.length === 0 && (
                        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 text-sm text-slate-400">
                            No apps in the registry yet. Once entries are added to{" "}
                            <span className="font-mono text-emerald-300">/api/registry/apps</span>, they
                            will appear here for the CEO.
                        </div>
                    )}
                </section>
            </div>
        </main>
    );
}