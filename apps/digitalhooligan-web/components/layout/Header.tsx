"use client";

import Link from "next/link";
import { useState } from "react";

export default function Header() {
    const [open, setOpen] = useState(false);

    const navItems = [
        { label: "Apps", href: "/#apps" },
        { label: "Services", href: "/services" },
        { label: "Company", href: "/company" },
        { label: "Labs", href: "/labs" },
        { label: "Street Cred", href: "/#street-cred" },
        { label: "Contact", href: "/#contact" },
    ];

    return (
        <header className="sticky top-0 z-40 border-b border-zinc-800 bg-black/80 text-zinc-100 backdrop-blur">
            <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
                {/* Brand */}
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 rounded-xl px-1 py-1 hover:bg-zinc-900/60"
                >
                    <span className="inline-flex h-8 w-8 items-center justify-center rounded-xl border border-emerald-500/60 bg-emerald-500/10 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-300">
                        DH
                    </span>
                    <span className="text-sm font-semibold tracking-tight text-zinc-50">
                        Digital Hooligan
                    </span>
                </Link>

                {/* Desktop nav */}
                <nav className="hidden items-center gap-6 text-xs font-medium text-zinc-400 md:flex">
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className="transition hover:text-emerald-300"
                        >
                            {item.label}
                        </Link>
                    ))}
                </nav>

                {/* Mobile menu button */}
                <button
                    type="button"
                    onClick={() => setOpen((prev) => !prev)}
                    className="inline-flex items-center rounded-lg border border-zinc-800 bg-zinc-950 px-2 py-1 text-xs font-medium text-zinc-200 transition hover:border-emerald-500/60 hover:text-emerald-200 md:hidden"
                    aria-label="Toggle navigation"
                    aria-expanded={open}
                >
                    <span className="font-mono text-[11px]">
                        {open ? "Close" : "Menu"}
                    </span>
                </button>
            </div>

            {/* Mobile nav panel */}
            {open && (
                <nav className="border-t border-zinc-800 bg-black/95 px-4 pb-4 pt-2 text-sm text-zinc-300 md:hidden">
                    <ul className="flex flex-col gap-2">
                        {navItems.map((item) => (
                            <li key={item.href}>
                                <Link
                                    href={item.href}
                                    className="block rounded-lg px-2 py-1.5 text-zinc-300 transition hover:bg-zinc-900 hover:text-emerald-200"
                                    onClick={() => setOpen(false)}
                                >
                                    {item.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>
            )}
        </header>
    );
}