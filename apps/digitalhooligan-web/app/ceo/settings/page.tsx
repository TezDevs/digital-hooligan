'use client';

import React from 'react';
import Link from 'next/link';
import {
    Settings,
    User,
    Building2,
    ShieldCheck,
    ToggleRight,
    ToggleLeft,
    Globe,
    Server,
    FileText,
    Lock,
} from 'lucide-react';

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

// Fake toggle component (visual only for now)
type FlagToggleProps = {
    label: string;
    helper?: string;
    enabled?: boolean;
};

function FlagToggle({ label, helper, enabled }: FlagToggleProps) {
    return (
        <div className="flex items-start justify-between gap-3 rounded-xl border border-border bg-background/60 px-3 py-2 text-xs">
            <div>
                <p className="font-medium">{label}</p>
                {helper && (
                    <p className="mt-1 text-[11px] text-muted-foreground">{helper}</p>
                )}
            </div>
            <div className="flex items-center">
                <span
                    className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold ${enabled
                            ? 'bg-emerald-500/10 text-emerald-400'
                            : 'bg-slate-500/10 text-slate-300'
                        }`}
                >
                    {enabled ? (
                        <>
                            <ToggleRight className="h-3 w-3" />
                            On
                        </>
                    ) : (
                        <>
                            <ToggleLeft className="h-3 w-3" />
                            Off
                        </>
                    )}
                </span>
            </div>
        </div>
    );
}

export default function CeoSettingsPage() {
    return (
        <div className="space-y-6">
            {/* Header + nav */}
            <header className="space-y-4">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                            Settings
                        </h1>
                        <p className="mt-1 text-sm text-muted-foreground">
                            High-level controls for Digital Hooligan as a business and as a
                            multi-app studio.
                        </p>
                    </div>
                    <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 text-xs text-muted-foreground shadow-sm">
                        <span className="h-2 w-2 rounded-full bg-emerald-500" />
                        <span>Owner: Courtez · Digital Hooligan LLC</span>
                    </div>
                </div>

                <nav className="flex flex-wrap gap-2">
                    <Tab href="/ceo" label="Overview" />
                    <Tab href="/ceo/tasks" label="Tasks" />
                    <Tab href="/ceo/deals" label="Deals" />
                    <Tab href="/ceo/finance" label="Finance" />
                    <Tab href="/ceo/performance" label="Performance" />
                    <Tab href="/ceo/ai-hub" label="AI Hub" />
                    <Tab href="/ceo/settings" label="Settings" isActive />
                    <Tab href="/ceo/logout" label="Logout" />
                </nav>
            </header>

            {/* Layout: profile + business + flags */}
            <section className="grid gap-4 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1.2fr)]">
                {/* Left column: profile + business snapshot */}
                <div className="space-y-4">
                    {/* Founder & profile */}
                    <div className="rounded-2xl border border-border bg-card p-4 shadow-sm sm:p-5">
                        <div className="flex items-center justify-between gap-3">
                            <div>
                                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                                    Profile
                                </p>
                                <p className="mt-1 text-sm text-muted-foreground">
                                    Quick reference for who&apos;s driving the ship.
                                </p>
                            </div>
                            <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-border bg-muted">
                                <User className="h-4 w-4" />
                            </div>
                        </div>

                        <div className="mt-4 grid gap-3 text-xs sm:grid-cols-2">
                            <div className="rounded-xl border border-border bg-background/60 px-3 py-2">
                                <p className="text-[11px] font-medium uppercase text-muted-foreground">
                                    Founder
                                </p>
                                <p className="mt-1 font-semibold">Courtez Cannady</p>
                                <p className="mt-1 text-[11px] text-muted-foreground">
                                    TezDevs · Product / Engineering / Ops.
                                </p>
                            </div>
                            <div className="rounded-xl border border-border bg-background/60 px-3 py-2">
                                <p className="text-[11px] font-medium uppercase text-muted-foreground">
                                    Company
                                </p>
                                <p className="mt-1 font-semibold">Digital Hooligan LLC</p>
                                <p className="mt-1 text-[11px] text-muted-foreground">
                                    Single-member LLC · Software / web apps / SaaS / automation.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Business snapshot */}
                    <div className="rounded-2xl border border-border bg-card p-4 shadow-sm sm:p-5">
                        <div className="flex items-center justify-between gap-3">
                            <div>
                                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                                    Business snapshot
                                </p>
                                <p className="mt-1 text-sm text-muted-foreground">
                                    High-level details you&apos;ll need when talking to banks,
                                    platforms, and gov forms.
                                </p>
                            </div>
                            <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-border bg-muted">
                                <Building2 className="h-4 w-4" />
                            </div>
                        </div>

                        <div className="mt-4 grid gap-3 text-xs sm:grid-cols-2">
                            <div className="rounded-xl border border-border bg-background/60 px-3 py-2">
                                <p className="text-[11px] font-medium uppercase text-muted-foreground">
                                    Legal form
                                </p>
                                <p className="mt-1 font-semibold">Single-member LLC</p>
                                <p className="mt-1 text-[11px] text-muted-foreground">
                                    Pass-through taxation · Disregarded entity by default.
                                </p>
                            </div>
                            <div className="rounded-xl border border-border bg-background/60 px-3 py-2">
                                <p className="text-[11px] font-medium uppercase text-muted-foreground">
                                    Focus
                                </p>
                                <p className="mt-1 font-semibold">NAICS 541511-ish</p>
                                <p className="mt-1 text-[11px] text-muted-foreground">
                                    Custom software, APIs, automation, dashboards, internal tools.
                                </p>
                            </div>
                            <div className="rounded-xl border border-border bg-background/60 px-3 py-2">
                                <p className="text-[11px] font-medium uppercase text-muted-foreground">
                                    Gov &amp; certs
                                </p>
                                <p className="mt-1 font-semibold">Gov-curious</p>
                                <p className="mt-1 text-[11px] text-muted-foreground">
                                    SAM.gov in progress · VSOB/SDVOSB planned · SBA-compliant
                                    posture.
                                </p>
                            </div>
                            <div className="rounded-xl border border-border bg-background/60 px-3 py-2">
                                <p className="text-[11px] font-medium uppercase text-muted-foreground">
                                    Banking
                                </p>
                                <p className="mt-1 font-semibold">Navy Federal (business)</p>
                                <p className="mt-1 text-[11px] text-muted-foreground">
                                    Account in review / early stages.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right column: feature flags + links */}
                <div className="space-y-4">
                    {/* Feature flags / modes */}
                    <div className="rounded-2xl border border-border bg-card p-4 shadow-sm sm:p-5">
                        <div className="flex items-center justify-between gap-3">
                            <div>
                                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                                    Product flags
                                </p>
                                <p className="mt-1 text-sm text-muted-foreground">
                                    Visual-only for now, but defines how you want to run the apps.
                                </p>
                            </div>
                            <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-border bg-muted">
                                <Settings className="h-4 w-4" />
                            </div>
                        </div>

                        <div className="mt-4 space-y-2">
                            <FlagToggle
                                label="PennyWize: public marketing page live"
                                helper="Keep this on once the main site is ready; later this gates the app itself."
                                enabled
                            />
                            <FlagToggle
                                label="DropSignal: assist mode only"
                                helper="Start with alerts + links to official retailers before heavy bot automation."
                                enabled
                            />
                            <FlagToggle
                                label="HypeWatch: collectibles research only"
                                helper="Phase 1: watchlists + alerts. Add direct cart flows later."
                                enabled
                            />
                            <FlagToggle
                                label="Internal dashboards visible"
                                helper="CEO dashboard + Labs HQ appear in the navigation and footers."
                                enabled
                            />
                        </div>
                    </div>

                    {/* Legal + infra links */}
                    <div className="rounded-2xl border border-border bg-card p-4 shadow-sm sm:p-5">
                        <div className="flex items-center justify-between gap-3">
                            <div>
                                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                                    Legal &amp; infrastructure
                                </p>
                                <p className="mt-1 text-sm text-muted-foreground">
                                    Quick anchors to the &quot;grown-up company&quot; pieces.
                                </p>
                            </div>
                            <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-border bg-muted">
                                <ShieldCheck className="h-4 w-4" />
                            </div>
                        </div>

                        <div className="mt-4 grid gap-2 text-xs">
                            <Link
                                href="/privacy"
                                className="flex items-center justify-between rounded-xl border border-border bg-background/60 px-3 py-2 hover:bg-muted/60"
                            >
                                <span className="inline-flex items-center gap-2">
                                    <FileText className="h-3.5 w-3.5" />
                                    <span>Privacy policy</span>
                                </span>
                                <span className="text-[11px] text-muted-foreground">
                                    /privacy ↗
                                </span>
                            </Link>

                            <Link
                                href="/terms"
                                className="flex items-center justify-between rounded-xl border border-border bg-background/60 px-3 py-2 hover:bg-muted/60"
                            >
                                <span className="inline-flex items-center gap-2">
                                    <Lock className="h-3.5 w-3.5" />
                                    <span>Terms of use</span>
                                </span>
                                <span className="text-[11px] text-muted-foreground">
                                    /terms ↗
                                </span>
                            </Link>

                            <Link
                                href="/gov-services"
                                className="flex items-center justify-between rounded-xl border border-border bg-background/60 px-3 py-2 hover:bg-muted/60"
                            >
                                <span className="inline-flex items-center gap-2">
                                    <Globe className="h-3.5 w-3.5" />
                                    <span>Gov &amp; enterprise services</span>
                                </span>
                                <span className="text-[11px] text-muted-foreground">
                                    /gov-services ↗
                                </span>
                            </Link>

                            <Link
                                href="/labs/hq"
                                className="flex items-center justify-between rounded-xl border border-border bg-background/60 px-3 py-2 hover:bg-muted/60"
                            >
                                <span className="inline-flex items-center gap-2">
                                    <Server className="h-3.5 w-3.5" />
                                    <span>Labs HQ (internal)</span>
                                </span>
                                <span className="text-[11px] text-muted-foreground">
                                    /labs/hq ↗
                                </span>
                            </Link>
                        </div>

                        <p className="mt-4 text-xs text-muted-foreground">
                            Later, this card can control which links are visible on the public
                            site vs. internal-only, and wire into real flag config.
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
}