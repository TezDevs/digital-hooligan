import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Labs HQ · Digital Hooligan",
    description:
        "Internal Labs HQ workspace for Digital Hooligan experiments. Not a public area.",
};

export default function LabsHqPage() {
    return (
        <main className="flex min-h-screen items-center justify-center bg-gradient-to-b from-black via-slate-950 to-black text-slate-50">
            <div className="mx-auto max-w-md rounded-3xl border border-slate-800 bg-black/80 px-6 py-8 shadow-lg shadow-sky-500/10">
                <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-500">
                    ACCESS RESTRICTED · LABS HQ
                </p>
                <h1 className="mt-3 text-xl font-semibold tracking-tight">
                    Hooligan Labs control bay.
                </h1>
                <p className="mt-3 text-sm text-slate-300">
                    This is a{" "}
                    <span className="font-medium text-slate-100">
                        private workspace
                    </span>{" "}
                    where Digital Hooligan experiments live—PennyWize, DropSignal,
                    HypeWatch, Ops Toys, and other ideas that aren&apos;t ready for the
                    street yet.
                </p>
                <p className="mt-2 text-xs text-slate-500">
                    If you found this URL, you&apos;ve bumped into the back side of the
                    lab. The public updates and stories live over on the main Hooligan
                    Labs page instead.
                </p>

                <div className="mt-5 flex flex-wrap gap-2 text-xs">
                    <Link
                        href="/labs"
                        className="inline-flex items-center justify-center rounded-full bg-sky-400 px-4 py-2 font-semibold text-black shadow shadow-sky-500/40 hover:bg-sky-300"
                    >
                        Visit Hooligan Labs
                    </Link>
                    <Link
                        href="/"
                        className="inline-flex items-center justify-center rounded-full border border-slate-700 bg-slate-950 px-4 py-2 font-semibold text-slate-100 hover:border-emerald-400/70"
                    >
                        Back to homepage
                    </Link>
                </div>
            </div>
        </main>
    );
}