import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "CEO · Digital Hooligan",
    description:
        "A small, private control room for running Digital Hooligan. Not a public area.",
};

export default function CeoPage() {
    return (
        <main className="flex min-h-screen items-center justify-center bg-gradient-to-b from-black via-slate-950 to-black text-slate-50">
            <div className="mx-auto max-w-md rounded-3xl border border-slate-800 bg-black/80 px-6 py-8 shadow-lg shadow-emerald-500/10">
                <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-500">
                    ACCESS RESTRICTED
                </p>
                <h1 className="mt-3 text-xl font-semibold tracking-tight">
                    CEO entrance only.
                </h1>
                <p className="mt-3 text-sm text-slate-300">
                    This corner of Digital Hooligan is a{" "}
                    <span className="font-medium text-slate-100">
                        private control room
                    </span>{" "}
                    for running the studio—contracts, tasks, and experiments.
                </p>
                <p className="mt-2 text-xs text-slate-500">
                    There&apos;s nothing to sign up for here. If you landed on this URL,
                    you&apos;ve found one of the studio&apos;s little side doors.
                </p>

                <div className="mt-5 flex flex-wrap gap-2 text-xs">
                    <Link
                        href="/"
                        className="inline-flex items-center justify-center rounded-full bg-emerald-400 px-4 py-2 font-semibold text-black shadow shadow-emerald-500/40 hover:bg-emerald-300"
                    >
                        Back to homepage
                    </Link>
                    <Link
                        href="/labs"
                        className="inline-flex items-center justify-center rounded-full border border-slate-700 bg-slate-950 px-4 py-2 font-semibold text-slate-100 hover:border-emerald-400/70"
                    >
                        Visit Hooligan Labs
                    </Link>
                </div>
            </div>
        </main>
    );
}