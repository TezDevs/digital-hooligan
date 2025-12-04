'use client';

import React from 'react';
import Link from 'next/link';
import {
    DollarSign,
    PiggyBank,
    TrendingUp,
    TrendingDown,
    Wallet,
    Calculator,
    Receipt,
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
            className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium transition ${isActive
                    ? 'bg-primary/90 text-primary-foreground ring-2 ring-primary shadow-sm'
                    : 'text-muted-foreground hover:bg-muted'
                }`}
        >
            <span>{label}</span>
            {isActive && (
                <span className="h-1.5 w-1.5 rounded-full bg-primary-foreground" />
            )}
        </Link>
    );
}

type ProductRow = {
    name: string;
    mrr: string;
    status: string;
    notes: string;
};

const productRows: ProductRow[] = [
    {
        name: 'PennyWize',
        mrr: '$2,400',
        status: 'Building',
        notes: 'Early users, scraper + alerts.',
    },
    {
        name: 'DropSignal',
        mrr: '$1,200',
        status: 'Pre-launch',
        notes: 'Assist mode first, bots + apps later.',
    },
    {
        name: 'HypeWatch',
        mrr: '$650',
        status: 'Pre-launch',
        notes: 'Collectibles version of DropSignal.',
    },
];

type Movement = {
    type: 'Income' | 'Expense';
    label: string;
    amount: string;
    when: string;
};

const movements: Movement[] = [
    {
        type: 'Income',
        label: 'Freelance / Gun.io, first milestone',
        amount: '+$4,000',
        when: 'This week',
    },
    {
        type: 'Expense',
        label: 'Vercel, domain, infra basics',
        amount: '-$120',
        when: 'This week',
    },
    {
        type: 'Expense',
        label: 'Mac mini / storage upgrades (capex)',
        amount: '-$220',
        when: 'This month',
    },
];

export default function CeoFinancePage() {
    return (
        <div className="space-y-6">
            {/* Header + nav */}
            <header className="space-y-4">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                            Finance
                        </h1>
                        <p className="mt-1 text-sm text-muted-foreground">
                            Simple picture of money in, money out, and how Digital Hooligan is
                            trending.
                        </p>
                    </div>
                    <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 text-xs text-muted-foreground shadow-sm">
                        <span className="h-2 w-2 rounded-full bg-emerald-500" />
                        <span>Runway: comfortable (solo founder mode)</span>
                    </div>
                </div>

                <nav className="flex flex-wrap gap-2">
                    <Tab href="/ceo" label="Overview" />
                    <Tab href="/ceo/tasks" label="Tasks" />
                    <Tab href="/ceo/deals" label="Deals" />
                    <Tab href="/ceo/finance" label="Finance" isActive />
                    <Tab href="/ceo/performance" label="Performance" />
                    <Tab href="/ceo/ai-hub" label="AI Hub" />
                    <Tab href="/ceo/settings" label="Settings" />
                    <Tab href="/ceo/logout" label="Logout" />
                </nav>
            </header>

            {/* Top stats */}
            <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                <div className="rounded-2xl border border-border bg-card p-4 shadow-sm sm:p-5">
                    <div className="flex items-center justify-between gap-3">
                        <div>
                            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                                Est. MRR
                            </p>
                            <p className="mt-1 text-xl font-semibold sm:text-2xl">$4,250</p>
                            <p className="mt-1 text-xs text-muted-foreground">
                                Across PennyWize, DropSignal, and HypeWatch.
                            </p>
                        </div>
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-muted">
                            <DollarSign className="h-4 w-4" />
                        </div>
                    </div>
                </div>

                <div className="rounded-2xl border border-border bg-card p-4 shadow-sm sm:p-5">
                    <div className="flex items-center justify-between gap-3">
                        <div>
                            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                                Pipeline value
                            </p>
                            <p className="mt-1 text-xl font-semibold sm:text-2xl">$40,550</p>
                            <p className="mt-1 text-xs text-muted-foreground">
                                Weighted across gov + freelance opportunities.
                            </p>
                        </div>
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-muted">
                            <TrendingUp className="h-4 w-4" />
                        </div>
                    </div>
                </div>

                <div className="rounded-2xl border border-border bg-card p-4 shadow-sm sm:p-5">
                    <div className="flex items-center justify-between gap-3">
                        <div>
                            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                                Runway / buffer
                            </p>
                            <p className="mt-1 text-xl font-semibold sm:text-2xl">12+ months</p>
                            <p className="mt-1 text-xs text-muted-foreground">
                                Conservative solo-founder runway with current burn.
                            </p>
                        </div>
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-muted">
                            <PiggyBank className="h-4 w-4" />
                        </div>
                    </div>
                </div>

                <div className="rounded-2xl border border-border bg-card p-4 shadow-sm sm:p-5">
                    <div className="flex items-center justify-between gap-3">
                        <div>
                            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                                This month
                            </p>
                            <p className="mt-1 text-xl font-semibold sm:text-2xl">
                                +$3,680 net
                            </p>
                            <p className="mt-1 text-xs text-muted-foreground">
                                Rough picture after infra + admin costs.
                            </p>
                        </div>
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-muted">
                            <Wallet className="h-4 w-4" />
                        </div>
                    </div>
                </div>
            </section>

            {/* By product + movements */}
            <section className="grid gap-4 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1.2fr)]">
                {/* By product */}
                <div className="rounded-2xl border border-border bg-card p-4 shadow-sm sm:p-5">
                    <div className="flex items-center justify-between gap-3">
                        <div>
                            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                                By product
                            </p>
                            <p className="mt-1 text-sm text-muted-foreground">
                                Quick breakdown of where revenue is coming from.
                            </p>
                        </div>
                        <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-border bg-muted">
                            <Calculator className="h-4 w-4" />
                        </div>
                    </div>

                    <div className="mt-4 overflow-x-auto">
                        <table className="min-w-full text-left text-xs">
                            <thead className="border-b border-border text-[11px] uppercase text-muted-foreground">
                                <tr>
                                    <th className="pb-2 pr-4">Product</th>
                                    <th className="pb-2 pr-4">Est. MRR</th>
                                    <th className="pb-2 pr-4">Status</th>
                                    <th className="pb-2">Notes</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border/60">
                                {productRows.map((row) => (
                                    <tr key={row.name}>
                                        <td className="py-2 pr-4 font-medium">{row.name}</td>
                                        <td className="py-2 pr-4">{row.mrr}</td>
                                        <td className="py-2 pr-4">
                                            <span className="inline-flex rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-semibold text-emerald-400">
                                                {row.status}
                                            </span>
                                        </td>
                                        <td className="py-2 text-muted-foreground">{row.notes}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Movements */}
                <div className="space-y-4">
                    <div className="rounded-2xl border border-border bg-card p-4 shadow-sm sm:p-5">
                        <div className="flex items-center justify-between gap-3">
                            <div>
                                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                                    Recent cash movements
                                </p>
                                <p className="mt-1 text-sm text-muted-foreground">
                                    Just enough detail for &quot;where did the money go?&quot;
                                </p>
                            </div>
                            <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-border bg-muted">
                                <Receipt className="h-4 w-4" />
                            </div>
                        </div>

                        <ul className="mt-4 space-y-2 text-xs">
                            {movements.map((m, idx) => (
                                <li
                                    key={idx}
                                    className="flex items-start justify-between gap-3 rounded-xl border border-border bg-background/60 px-3 py-2"
                                >
                                    <div>
                                        <p className="font-medium">{m.label}</p>
                                        <p className="mt-1 text-[11px] text-muted-foreground">
                                            {m.type} · {m.when}
                                        </p>
                                    </div>
                                    <span
                                        className={`text-xs font-semibold ${m.amount.startsWith('+')
                                                ? 'text-emerald-400'
                                                : 'text-rose-400'
                                            }`}
                                    >
                                        {m.amount}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="rounded-2xl border border-border bg-card p-4 shadow-sm sm:p-5">
                        <div className="flex items-center justify-between gap-3">
                            <div>
                                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                                    Future integrations
                                </p>
                                <p className="mt-1 text-sm text-muted-foreground">
                                    Placeholder for Stripe, bank feeds, and auto-updated
                                    dashboards.
                                </p>
                            </div>
                            <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-border bg-muted">
                                <TrendingDown className="h-4 w-4" />
                            </div>
                        </div>

                        <p className="mt-4 text-xs text-muted-foreground">
                            Later, this card can pull real data from Stripe, your bank, or an
                            accounting tool. For now, it&apos;s just a reminder that the
                            grown-up version of this screen is waiting whenever you&apos;re
                            ready.
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
}