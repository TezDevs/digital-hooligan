import Link from "next/link";

type SearchParams = {
    error?: string;
    from?: string;
    loggedOut?: string;
};

export default async function CeoLoginPage({
    searchParams,
}: {
    searchParams: Promise<SearchParams>;
}) {
    const params = await searchParams;
    const hasError = Boolean(params?.error);
    const isLoggedOut = params?.loggedOut === "1";

    return (
        <main className="flex min-h-screen items-center justify-center bg-slate-950 px-4 py-8 text-slate-50">
            <div className="w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900/80 p-6 shadow-xl">
                <div className="mb-4 flex items-center justify-between gap-2">
                    <div>
                        <p className="text-xs font-medium uppercase tracking-wide text-emerald-400">
                            Digital Hooligan · Internal
                        </p>
                        <h1 className="mt-1 text-lg font-semibold tracking-tight">
                            CEO Dashboard Login
                        </h1>
                        <p className="mt-1 text-xs text-slate-400">
                            This area is for the CEO only. If you were just browsing, head
                            back to the main site.
                        </p>
                    </div>
                    <Link
                        href="/"
                        className="rounded-full border border-slate-800 px-3 py-1 text-xs text-slate-300 transition hover:border-emerald-500/60 hover:text-emerald-300"
                    >
                        ← Back to site
                    </Link>
                </div>

                {isLoggedOut && (
                    <div className="mb-3 rounded-lg border border-sky-500/40 bg-sky-500/10 px-3 py-2 text-[11px] text-sky-100">
                        You&apos;ve been logged out of the CEO dashboard. Sign in again to
                        re-enter.
                    </div>
                )}

                {hasError && (
                    <div className="mb-3 rounded-lg border border-rose-500/40 bg-rose-500/10 px-3 py-2 text-[11px] text-rose-100">
                        Incorrect username or password. Please try again.
                    </div>
                )}

                <form
                    method="POST"
                    action="/api/ceo-login"
                    className="space-y-4 text-sm"
                >
                    <div className="space-y-1.5">
                        <label
                            htmlFor="username"
                            className="block text-xs font-medium text-slate-300"
                        >
                            Username
                        </label>
                        <input
                            id="username"
                            name="username"
                            type="text"
                            autoComplete="username"
                            required
                            className="w-full rounded-lg border border-slate-800 bg-slate-950/70 px-3 py-2 text-sm text-slate-50 outline-none ring-emerald-500/40 placeholder:text-slate-500 focus:border-emerald-500 focus:ring-2"
                            placeholder="CEO username"
                        />
                    </div>

                    <div className="space-y-1.5">
                        <label
                            htmlFor="password"
                            className="block text-xs font-medium text-slate-300"
                        >
                            Password
                        </label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            autoComplete="current-password"
                            required
                            className="w-full rounded-lg border border-slate-800 bg-slate-950/70 px-3 py-2 text-sm text-slate-50 outline-none ring-emerald-500/40 placeholder:text-slate-500 focus:border-emerald-500 focus:ring-2"
                            placeholder="••••••••"
                        />
                    </div>

                    {/* Preserve ?from=... so we can redirect back after login */}
                    <input
                        type="hidden"
                        name="from"
                        value={params?.from ?? "/ceo"}
                    />

                    <button
                        type="submit"
                        className="mt-2 inline-flex w-full items-center justify-center rounded-lg bg-emerald-500 px-3 py-2 text-sm font-semibold text-slate-950 transition hover:bg-emerald-400"
                    >
                        Enter CEO Dashboard
                    </button>
                </form>

                <p className="mt-4 text-[11px] leading-snug text-slate-500">
                    In a later phase, this can be upgraded to full auth (e.g. OAuth, SSO,
                    or a proper identity provider). For now, it&apos;s a private gate so
                    casual visitors can&apos;t reach the dashboard.
                </p>
            </div>
        </main>
    );
}
