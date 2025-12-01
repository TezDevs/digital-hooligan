// app/not-found.tsx

import Link from "next/link";

export default function NotFound() {
    return (
        <main className="flex min-h-screen items-center justify-center bg-black px-4 text-zinc-100">
            <div className="mx-auto flex w-full max-w-xl flex-col items-center rounded-2xl border border-zinc-800 bg-zinc-950/80 p-8 shadow-[0_0_80px_rgba(16,185,129,0.25)]">
                <p className="text-xs font-semibold uppercase tracking-[0.35em] text-emerald-400">
                    Digital Hooligan
                </p>

                <div className="mt-4 inline-flex items-baseline gap-2">
                    <span className="text-4xl font-semibold text-zinc-50 sm:text-5xl">
                        404
                    </span>
                    <span className="text-sm text-zinc-500 sm:text-base">
                        Page off the grid
                    </span>
                </div>

                <p className="mt-4 text-center text-sm text-zinc-400">
                    You just wandered into a street that doesn&apos;t exist yet.
                    The route you&apos;re looking for is missing, moved, or still
                    cooking in Hooligan Labs.
                </p>

                <div className="mt-8 grid w-full gap-3 sm:grid-cols-3">
                    <Link
                        href="/"
                        className="inline-flex items-center justify-center rounded-xl border border-emerald-500/70 bg-emerald-500/15 px-4 py-2 text-sm font-medium text-emerald-200 transition hover:bg-emerald-500/25 hover:text-emerald-100"
                    >
                        ⬅ Back home
                    </Link>

                    <Link
                        href="/#apps"
                        className="inline-flex items-center justify-center rounded-xl border border-zinc-700 bg-zinc-900/70 px-4 py-2 text-sm font-medium text-zinc-200 transition hover:border-emerald-500/60 hover:text-emerald-100"
                    >
                        View apps
                    </Link>

                    <Link
                        href="/labs"
                        className="inline-flex items-center justify-center rounded-xl border border-zinc-700 bg-zinc-900/70 px-4 py-2 text-sm font-medium text-zinc-200 transition hover:border-emerald-500/60 hover:text-emerald-100"
                    >
                        Hooligan Labs
                    </Link>
                </div>

                <p className="mt-6 text-center text-[11px] text-zinc-500">
                    If you landed here from a broken link, the lab is probably
                    refactoring something. Try the buttons above or check back soon.
                </p>
            </div>
        </main>
    );
}