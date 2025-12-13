import Link from "next/link";

export default function CeoLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="">
            <div className="mx-auto w-full max-w-6xl px-4 py-6 md:px-6 lg:px-8">
                <header className="mb-6 flex flex-col gap-3">
                    <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                        <Link
                            href="/ceo"
                            className="inline-flex items-center gap-2 rounded-lg bg-white/5 px-3 py-2 text-xs text-slate-200 ring-1 ring-white/10 hover:bg-white/10"
                        >
                            Digital Hooligan • CEO
                        </Link>

                        <nav className="flex flex-wrap items-center gap-2">
                            <Link
                                href="/ceo/performance"
                                className="rounded-lg bg-white/5 px-3 py-2 text-xs text-slate-200 ring-1 ring-white/10 hover:bg-white/10"
                            >
                                Performance
                            </Link>
                            <Link
                                href="/ceo/incidents"
                                className="rounded-lg bg-white/5 px-3 py-2 text-xs text-slate-200 ring-1 ring-white/10 hover:bg-white/10"
                            >
                                Incidents
                            </Link>
                            <Link
                                href="/ceo/health"
                                className="rounded-lg bg-white/5 px-3 py-2 text-xs text-slate-200 ring-1 ring-white/10 hover:bg-white/10"
                            >
                                Health
                            </Link>
                            <Link
                                href="/ceo/dev-workbench"
                                className="rounded-lg bg-white/5 px-3 py-2 text-xs text-slate-200 ring-1 ring-white/10 hover:bg-white/10"
                            >
                                Dev Workbench
                            </Link>
                        </nav>
                    </div>

                    <div className="h-px w-full bg-white/10" />
                </header>

                <main>{children}</main>
            </div>
        </div>
    );
}