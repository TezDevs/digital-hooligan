// components/ceo/CeoHeader.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navTabs = [
    { href: "/ceo", label: "Overview" },
    { href: "/ceo/tasks", label: "Tasks" },
    { href: "/ceo/deals", label: "Deals" },
    { href: "/ceo/finance", label: "Finance" },
    { href: "/ceo/performance", label: "Performance" },
    { href: "/ceo/ai-hub", label: "AI Hub" },
    { href: "/ceo/settings", label: "Settings" },
    { href: "/ceo/logout", label: "Logout" }
];

export function CeoHeader() {
    const pathname = usePathname();
    const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD

    return (
        <header className="border-b border-slate-900 bg-slate-950/80 backdrop-blur">
            <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-3 md:flex-row md:items-center md:justify-between">
                {/* Left: title & subtitle */}
                <div className="space-y-1">
                    <div className="flex items-center gap-2">
                        <span className="rounded-full bg-emerald-500/15 px-2 py-[2px] text-[10px] font-semibold uppercase tracking-[0.16em] text-emerald-300">
                            Digital Hooligan
                        </span>
                        <span className="text-[10px] text-slate-500">
                            Internal · CEO dashboard
                        </span>
                    </div>
                    <h1 className="text-sm font-semibold text-slate-50">
                        CEO Control Panel
                    </h1>
                    <p className="text-[11px] text-slate-400">
                        High-level control room for apps, deals, money, and admin risk.
                    </p>
                </div>

                {/* Right: date + nav tabs */}
                <div className="flex flex-col items-start gap-2 md:items-end">
                    <div className="text-[10px] text-slate-400">
                        Today:{" "}
                        <span className="font-medium text-slate-200">
                            {today}
                        </span>
                    </div>

                    <nav className="flex flex-wrap gap-2 text-[11px]">
                        {navTabs.map((tab) => {
                            const isActive =
                                pathname === tab.href ||
                                (tab.href !== "/ceo" && pathname.startsWith(tab.href));

                            return (
                                <Link
                                    key={tab.href}
                                    href={tab.href}
                                    className={[
                                        "rounded-full border px-3 py-1 transition-colors",
                                        isActive
                                            ? "border-emerald-500/60 bg-emerald-500/10 text-emerald-200"
                                            : "border-slate-800 bg-slate-900 text-slate-300 hover:border-slate-600 hover:text-slate-100"
                                    ].join(" ")}
                                >
                                    {tab.label}
                                </Link>
                            );
                        })}
                    </nav>
                </div>
            </div>
        </header>
    );
}