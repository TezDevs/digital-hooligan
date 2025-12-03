import Link from "next/link";

export default function Footer() {
    return (
        <footer className="border-t border-white/5 bg-black px-4 py-10 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-5xl space-y-6 text-xs text-slate-400">
                {/* Top row */}
                <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
                    {/* Brand + tagline */}
                    <div className="space-y-2">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-500">
                            DIGITAL HOOLIGAN LLC
                        </p>
                        <p className="max-w-sm text-[11px] text-slate-400">
                            A small, veteran-owned software studio building web apps, bots,
                            dashboards, and automation toys that grow into real products.
                        </p>
                        <p className="text-[11px] text-slate-500">
                            NAICS 541511 · SAM.gov registered · Veteran-Owned Small Business
                            (VSOB).
                        </p>
                    </div>

                    {/* Link columns */}
                    <div className="grid gap-6 sm:grid-cols-3">
                        {/* Company */}
                        <div className="space-y-2">
                            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500">
                                COMPANY
                            </p>
                            <div className="flex flex-col gap-1.5">
                                <Link href="/company" className="hover:text-emerald-300">
                                    Company profile
                                </Link>
                                <Link href="/gov" className="hover:text-emerald-300">
                                    Government services
                                </Link>
                                <Link href="/services" className="hover:text-emerald-300">
                                    Services overview
                                </Link>
                            </div>
                        </div>

                        {/* Apps */}
                        <div className="space-y-2">
                            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500">
                                APPS &amp; LABS
                            </p>
                            <div className="flex flex-col gap-1.5">
                                <Link href="/labs" className="hover:text-emerald-300">
                                    Hooligan Labs
                                </Link>
                                <Link href="/pennywize" className="hover:text-emerald-300">
                                    PennyWize
                                </Link>
                                <Link href="/dropsignal" className="hover:text-emerald-300">
                                    DropSignal
                                </Link>
                            </div>
                        </div>

                        {/* Legal / internal */}
                        <div className="space-y-2">
                            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500">
                                LEGAL &amp; ADMIN
                            </p>
                            <div className="flex flex-col gap-1.5">
                                <Link href="/privacy" className="hover:text-emerald-300">
                                    Privacy
                                </Link>
                                <Link href="/terms" className="hover:text-emerald-300">
                                    Terms
                                </Link>
                                {/* Tiny nod to CEO dashboard (no details) */}
                                <Link
                                    href="/ceo"
                                    className="text-slate-500 hover:text-emerald-300"
                                >
                                    CEO entrance
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom row */}
                <div className="flex flex-col gap-2 border-t border-slate-800 pt-4 sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-[11px]">
                        © {new Date().getFullYear()} Digital Hooligan LLC. All rights
                        reserved.
                    </p>
                    <p className="text-[11px] text-slate-500">
                        Built with a mix of out-of-the-box thinking, web engineering, and a
                        little bit of hooligan energy.
                    </p>
                </div>
            </div>
        </footer>
    );
}