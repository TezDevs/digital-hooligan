'use client';

import React from 'react';
import Link from 'next/link';
import { LogOut, ShieldAlert, Home } from 'lucide-react';

type TabProps = {
    href: string;
    label: string;
    isActive?: boolean;
};

function Tab({ href, label, isActive }: TabProps) {
    return (
        <Link
            href={href}
            className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium transition ${isActive
                    ? 'bg-white text-slate-900 ring-2 ring-primary shadow-sm'
                    : 'border border-border bg-card text-muted-foreground hover:bg-muted'
                }`}
        >
            <span className="flex items-center gap-1.5">
                <span>{label}</span>
                {isActive && (
                    <span className="h-2 w-2 rounded-full bg-primary ring-2 ring-primary/40" />
                )}
            </span>
        </Link>
    );
}

export default function CeoLogoutPage() {
    return (
        <div className="space-y-6">
            {/* Header + nav */}
            <header className="space-y-4">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                            Logout
                        </h1>
                        <p className="mt-1 text-sm text-muted-foreground">
                            When auth is wired up, this screen will safely sign you out of the
                            CEO dashboard and any internal views.
                        </p>
                    </div>
                    <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 text-xs text-muted-foreground shadow-sm">
                        <span className="h-2 w-2 rounded-full bg-emerald-500" />
                        <span>Currently: local dev / single-user mode</span>
                    </div>
                </div>

                <nav className="flex flex-wrap gap-2">
                    <Tab href="/ceo" label="Overview" />
                    <Tab href="/ceo/tasks" label="Tasks" />
                    <Tab href="/ceo/deals" label="Deals" />
                    <Tab href="/ceo/finance" label="Finance" />
                    <Tab href="/ceo/performance" label="Performance" />
                    <Tab href="/ceo/ai-hub" label="AI Hub" />
                    <Tab href="/ceo/settings" label="Settings" />
                    <Tab href="/ceo/logout" label="Logout" isActive />
                </nav>
            </header>

            {/* Logout card */}
            <section className="flex items-center justify-center">
                <div className="w-full max-w-md rounded-2xl border border-border bg-card p-5 shadow-sm sm:p-6">
                    <div className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-muted">
                                <LogOut className="h-5 w-5" />
                            </div>
                            <div>
                                <p className="text-sm font-semibold">Ready to head out?</p>
                                <p className="mt-1 text-xs text-muted-foreground">
                                    In the future, this will trigger a real sign-out from your
                                    auth provider. Right now, it&apos;s just a visual checkpoint.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="mt-4 space-y-3 text-xs text-muted-foreground">
                        <div className="inline-flex items-start gap-2 rounded-xl border border-border bg-background/60 px-3 py-2">
                            <ShieldAlert className="mt-[2px] h-3.5 w-3.5" />
                            <p>
                                Best practice: only expose the CEO dashboard behind a real auth
                                layer (later). For now, this is a reminder that the &quot;log
                                out&quot; flow belongs here.
                            </p>
                        </div>
                        <p>
                            When you wire this up, you can:
                            <br />
                            – Call your auth sign-out endpoint.
                            <br />
                            – Clear any client-side session data.
                            <br />
                            – Redirect back to the public home page.
                        </p>
                    </div>

                    <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                        <Link
                            href="/"
                            className="inline-flex items-center justify-center rounded-full bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground shadow-sm hover:bg-primary/90"
                        >
                            <Home className="mr-1.5 h-3.5 w-3.5" />
                            Back to main site
                        </Link>

                        <button
                            type="button"
                            disabled
                            className="inline-flex items-center justify-center rounded-full border border-dashed border-border px-3 py-1.5 text-xs font-medium text-muted-foreground"
                        >
                            <LogOut className="mr-1.5 h-3.5 w-3.5" />
                            Future: Sign out from auth
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
}