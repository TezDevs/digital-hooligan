import Link from "next/link";

type LabsRegistryItem = {
    id: string;
    slug?: string;
    name: string;
    tagline?: string;
    // Optional fields for Labs view
    stage?: string; // <- what we display in the "stage" column
    kind?: string;
    lifecycle?: string;
    owner?: string;
    tags?: string[];
    [key: string]: unknown;
};

type RegistryResponse = {
    apps: LabsRegistryItem[];
};

const STAGE_LABEL: Record<string, string> = {
    idea: "Idea",
    prototype: "Prototype",
    beta: "Beta",
    live: "Live",
};

function getBaseUrl() {
    const publicBase = process.env.NEXT_PUBLIC_APP_BASE_URL;
    if (publicBase) return publicBase;

    const vercel = process.env.VERCEL_URL;
    if (vercel) return `https://${vercel}`;

    return "http://localhost:3000";
}

async function getLabsRegistry(): Promise<LabsRegistryItem[]> {
    const baseUrl = getBaseUrl();

    const res = await fetch(`${baseUrl}/api/registry/apps`, {
        cache: "no-store",
    });

    if (!res.ok) {
        console.error(
            "[Labs Registry] Failed to load apps",
            res.status,
            res.statusText
        );
        return [];
    }

    const data = (await res.json()) as RegistryResponse;

    const apps = Array.isArray(data.apps) ? data.apps : [];

    // For Labs view we can keep everything, or filter to “internal / bot / lab” later.
    return apps;
}

export default async function LabsAppRegistryPage() {
    const apps = await getLabsRegistry();

    return (
        <main className="min-h-screen bg-slate-950 text-slate-50">
            <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-8">
                {/* Header */}
                <header className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                    <div>
                        <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-emerald-400">
                            Hooligan Labs
                        </p>
                        <h1 className="mt-2 text-2xl font-semibold tracking-tight">
                            Labs App Registry
                        </h1>
                        <p className="mt-2 max-w-xl text-sm text-slate-400">
                            Internal snapshot of apps, bots, and experiments that live inside
                            Hooligan Labs. Stage is intentionally loose (idea, prototype, beta,
                            live) so we can quickly see what&apos;s cooking.
                        </p>
                    </div>

                    <div className="flex items-center gap-2 text-xs">
                        <Link
                            href="/ceo/apps"
                            className="inline-flex items-center gap-1 rounded-full border border-slate-700 bg-slate-900 px-3 py-1 text-slate-300 hover:border-emerald-400 hover:text-emerald-200"
                        >
                            <span aria-hidden="true">↗</span>
                            <span>CEO App Registry</span>
                        </Link>
                    </div>
                </header>

                {/* Table */}
                <section className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-950/60">
                    <div className="border-b border-slate-800 px-4 py-3">
                        <h2 className="text-sm font-semibold text-slate-50">
                            Registry entries
                        </h2>
                        <p className="text-xs text-slate-400">
                            Data pulled from{" "}
                            <span className="font-mono text-emerald-300">
                                /api/registry/apps
                            </span>{" "}
                            and rendered for Labs only. Stage field is optional, so new apps
                            won&apos;t break this view.
                        </p>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="min-w-full border-t border-slate-800 text-left text-xs">
                            <thead className="bg-slate-900/80 text-[11px] uppercase tracking-wide text-slate-400">
                                <tr>
                                    <th className="px-4 py-2">App</th>
                                    <th className="px-4 py-2">Slug</th>
                                    <th className="px-4 py-2">Stage</th>
                                    <th className="px-4 py-2">Kind</th>
                                    <th className="px-4 py-2">Lifecycle</th>
                                    <th className="px-4 py-2">Owner</th>
                                    <th className="px-4 py-2">Tags</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-800 bg-slate-950/40">
                                {apps.length === 0 && (
                                    <tr>
                                        <td
                                            colSpan={7}
                                            className="px-4 py-6 text-center text-xs text-slate-500"
                                        >
                                            No apps in the registry yet. Once{" "}
                                            <span className="font-mono text-emerald-300">
                                                /api/registry/apps
                                            </span>{" "}
                                            is populated, they&apos;ll show up here automatically.
                                        </td>
                                    </tr>
                                )}

                                {apps.map((entry) => {
                                    const stage =
                                        typeof entry.stage === "string" ? entry.stage : undefined;
                                    const stageLabel =
                                        (stage && STAGE_LABEL[stage.toLowerCase()]?.toString()) ||
                                        stage ||
                                        "-";

                                    return (
                                        <tr
                                            key={entry.id}
                                            className="hover:bg-slate-900/60 transition-colors"
                                        >
                                            <td className="px-4 py-2 align-top">
                                                <div className="flex flex-col gap-0.5">
                                                    <span className="text-xs font-medium text-slate-50">
                                                        {entry.name}
                                                    </span>
                                                    {entry.tagline && (
                                                        <span className="text-[11px] text-slate-400">
                                                            {entry.tagline}
                                                        </span>
                                                    )}
                                                    <span className="font-mono text-[10px] text-slate-500">
                                                        {entry.id}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-4 py-2 align-top font-mono text-[11px] text-slate-300">
                                                {entry.slug || "-"}
                                            </td>
                                            <td className="px-4 py-2 align-top text-xs text-slate-300">
                                                {stageLabel}
                                            </td>
                                            <td className="px-4 py-2 align-top text-xs text-slate-300">
                                                {entry.kind || "-"}
                                            </td>
                                            <td className="px-4 py-2 align-top text-xs text-slate-300">
                                                {entry.lifecycle || "-"}
                                            </td>
                                            <td className="px-4 py-2 align-top text-xs text-slate-300">
                                                {entry.owner || "-"}
                                            </td>
                                            <td className="px-4 py-2 align-top text-[11px] text-slate-300">
                                                {entry.tags && entry.tags.length > 0 ? (
                                                    <div className="flex flex-wrap gap-1">
                                                        {entry.tags.map((tag) => (
                                                            <span
                                                                key={tag}
                                                                className="rounded-full bg-slate-900 px-2 py-0.5"
                                                            >
                                                                #{tag}
                                                            </span>
                                                        ))}
                                                    </div>
                                                ) : (
                                                    <span className="text-slate-500">-</span>
                                                )}
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </section>
            </div>
        </main>
    );
}