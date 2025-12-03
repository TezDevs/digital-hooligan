"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_TABS = [
    { href: "/ceo", label: "Overview" },
    { href: "/ceo/tasks", label: "Tasks" },
    { href: "/ceo/deals", label: "Deals" },
    { href: "/ceo/finance", label: "Finance" },
    { href: "/ceo/performance", label: "Performance" },
    { href: "/ceo/ai-hub", label: "AI Hub" },
    { href: "/ceo/settings", label: "Settings" }
];

export function CeoHeader() {
    const pathname = usePathname();
    const today = new Date().toISOString().slice(0, 10);

    return (
        <header className="border-b border-slate-900/80 bg-slate-950/95 backdrop-blur">
            <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-3">
                {/* Top row: title + date */}
                <div className="flex flex-col justify-between gap-2 md:flex-row md:items-center">
                    <div>
                        <div className="text-[11px] font-semibold uppercase tracking-[0.25em] text-emerald-400">
                            Digital Hooligan
                        </div>
                        <div className="mt-1 text-sm font-semibold text-slate-50">
                            CEO Control Panel
                        </div>
                        <p className="text-[11px] text-slate-400">
                            Private dashboard for strategy, money, deals, and ops.
                        </p>
                    </div>
                    <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-300">
                        <span className="rounded-full border border-slate-800 bg-slate-900 px-3 py-1">
                            Today: {today}
                        </span>
                        <span className="rounded-full border border-slate-800 bg-slate-900 px-3 py-1">
                            Logged in as CEO
                        </span>
                    </div>
                </div>

                {/* Tab row */}
                <nav className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex flex-wrap gap-2 text-[11px]">
                        {NAV_TABS.map((tab) => {
                            const active =
                                pathname === tab.href ||
                                (tab.href !== "/ceo" &&
                                    pathname.startsWith(tab.href) &&
                                    tab.href !== "/ceo/settings"); // simple active check

                            return (
                                <Link
                                    key={tab.href}
                                    href={tab.href}
                                    className={[
                                        "rounded-full border px-3 py-1 transition-colors",
                                        active
                                            ? "border-emerald-500/80 bg-emerald-500/10 text-emerald-100"
                                            : "border-slate-800 bg-slate-900 text-slate-300 hover:border-slate-600 hover:text-slate-50"
                                    ].join(" ")}
                                >
                                    {tab.label}
                                </Link>
                            );
                        })}
                    </div>

                    <Link
                        href="/ceo/logout"
                        className="rounded-full border border-slate-800 bg-slate-900 px-3 py-1 text-[11px] text-slate-300 hover:border-rose-500 hover:bg-rose-500/10 hover:text-rose-100"
                    >
                        Logout
                    </Link>
                </nav>
            </div>
        </header>
    );
}