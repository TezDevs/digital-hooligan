import Link from "next/link";
import CeoHotkey from "../ceo/CeoHotkey";

export default function Footer() {
    return (
        <footer className="border-t border-slate-900 bg-slate-950">
            {/* Hotkey listener lives here so it runs on every page that includes the footer */}
            <CeoHotkey />

            <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-8 text-sm text-slate-400 md:flex-row md:items-start md:justify-between">
                <div className="space-y-2">
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                        Digital Hooligan LLC
                    </p>
                    <p className="max-w-md text-xs text-slate-500">
                        Solo dev shop turning scrappy ideas into apps, bots, APIs, and
                        automation toys – one experiment at a time.
                    </p>
                    <div className="mt-2 space-y-1 text-xs">
                        <p>
                            Phone:{" "}
                            <a
                                href="tel:15402876266"
                                className="text-slate-300 hover:text-emerald-300"
                            >
                                (540) 287-6266
                            </a>
                        </p>
                        <p>
                            Email:{" "}
                            <a
                                href="mailto:ceo@digitalhooligan.io"
                                className="text-slate-300 hover:text-emerald-300"
                            >
                                ceo@digitalhooligan.io
                            </a>
                        </p>
                    </div>
                </div>

                <div className="flex flex-col items-start gap-4 text-xs md:items-end">
                    <div className="flex flex-wrap gap-4">
                        <Link
                            href="/#apps"
                            className="hover:text-emerald-300 hover:underline"
                        >
                            Apps
                        </Link>
                        <Link
                            href="/labs"
                            className="hover:text-emerald-300 hover:underline"
                        >
                            Hooligan Labs
                        </Link>
                        <Link
                            href="/services"
                            className="hover:text-emerald-300 hover:underline"
                        >
                            Services
                        </Link>
                        <Link
                            href="/#contact"
                            className="hover:text-emerald-300 hover:underline"
                        >
                            Contact
                        </Link>
                    </div>

                    <div className="flex items-center gap-3">
                        <a
                            href="https://github.com/TezDevs"
                            target="_blank"
                            rel="noreferrer"
                            className="hover:text-emerald-300"
                        >
                            GitHub
                        </a>
                        <a
                            href="https://www.linkedin.com/in/courtez-cannady-a"
                            target="_blank"
                            rel="noreferrer"
                            className="hover:text-emerald-300"
                        >
                            LinkedIn
                        </a>
                    </div>

                    <div className="flex items-center gap-2 text-[11px] text-slate-500">
                        <span>© {new Date().getFullYear()} Digital Hooligan LLC</span>
                        <span className="text-slate-700">·</span>

                        {/* Tiny, subtle CEO entry link – blends in for visitors */}
                        <Link
                            href="/ceo/login"
                            className="text-[10px] text-slate-800 transition hover:text-emerald-300 hover:underline focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-emerald-400"
                            aria-label="Internal CEO login"
                        >
                            internal
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
