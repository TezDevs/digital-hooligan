// components/ceo/CeoHeader.tsx
"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const navItems = [
    { href: "/ceo", label: "Overview" },
    { href: "/ceo/tasks", label: "Tasks" },
    { href: "/ceo/deals", label: "Deals" },
    { href: "/ceo/finance", label: "Finance" },
    { href: "/ceo/ai-hub", label: "AI Hub" }
];

export function CeoHeader() {
    const pathname = usePathname();
    const router = useRouter();

    return (
        <header className="border-b border-slate-900/80 bg-slate-950/80 backdrop-blur">
            <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3">
                {/* Brand */}
                <Link href="/ceo" className="flex items-center gap-2">
                    <span className="inline-flex h-7 w-7 items-center justify-center rounded-xl bg-emerald-500/10 text-[13px] font-bold text-emerald-300 border border-emerald-500/40">
                        DH
                    </span>
                    <div className="leading-tight">
                        <div className="text-xs font-semibold tracking-[0.2em] text-slate-400 uppercase">
                            CEO dashboard
                        </div>
                        <div className="text-[11px] text-slate-500">
                            Digital Hooligan control center
                        </div>
                    </div>
                </Link>

                {/* Nav */}
                <nav className="flex items-center gap-2 text-[11px]">
                    <div className="hidden md:flex items-center gap-1">
                        {navItems.map((item) => {
                            const isActive = pathname === item.href;
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={[
                                        "rounded-full border px-3 py-1 transition-colors",
                                        isActive
                                            ? "border-emerald-500/70 bg-emerald-500/10 text-emerald-100"
                                            : "border-slate-800 bg-slate-900/60 text-slate-300 hover:border-slate-600 hover:bg-slate-900"
                                    ].join(" ")}
                                >
                                    {item.label}
                                </Link>
                            );
                        })}
                    </div>

                    {/* Mobile dropdown could be added later; for now, minimal */}
                    <button
                        type="button"
                        onClick={() => router.push("/ceo/logout")}
                        className="rounded-full border border-slate-800 bg-slate-900 px-3 py-1 text-[11px] text-slate-300 hover:border-rose-500/60 hover:bg-rose-500/10 hover:text-rose-100"
                    >
                        Logout
                    </button>
                </nav>
            </div>
        </header>
    );
}