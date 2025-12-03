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

function Tab({ href, label, isActive }) {
    return (
        <Link
            href={href}
            className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium transition ${isActive
                    ? 'bg-primary text-primary-foreground shadow-sm'
                    : 'text-muted-foreground hover:bg-muted'
                }`}
        >
            {label}
        </Link>
    );
}

function StatCard({ label, value, helper, icon }) {
    return (
        <div className="rounded-2xl border border-border bg-card p-4 shadow-sm sm:p-5">
            <div className="flex items-center justify-between gap-3">
                <div>
                    <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                        {label}
                    </p>
                    <p className="mt-1 text-xl font-semibold leading-tight sm:text-2xl">
                        {value}
                    </p>
                    {helper && (
                        <p className="mt-1 text-xs text-muted-foreground">{helper}</p>
                    )}
                </div>
                <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-muted">
                    {icon}
                </div>
            </div>
        </div>
    );
}

const products = [
    {
        name: 'PennyWize',
        mrr: '$1,800',
        subs: 45,
        notes: 'Early adopters + penny stock nerds.',
    },
    {
        name: 'DropSignal',
        mrr: '$1,900',
        subs: 32,
        notes: 'Sneaker / streetwear assist-mode alerts.',
    },
    {
        name: 'HypeWatch',
        mrr: '$550',
        subs: 11,
        notes: 'Collectibles + display pieces roadmap.',
    },
];

const cashMovements = [
    {
        date: '2025-12-01',
        type: 'In',
        label: 'Subscription payouts (all apps)',
        amount: '+$420',
        category: 'Revenue',
    },
    {
        date: '2025-11-29',
        type: 'Out',
        label: 'Vercel / infra / misc tools',
        amount: '-$65',
        category: 'Infra',
    },
    {
        date: '2025-11-25',
        type: 'Out',
        label: 'Design / icon assets',
        amount: '-$40',
        category: 'Design',
    },
    {
        date: '2025-11-20',
        type: 'Out',
        label: 'Mac mini / dev gear (amortized mentally)',
        amount: '-$120',
        category: 'Hardware',
    },
];

export default function CeoFinancePage() {
    const estMRR = '$4,250';
    const estPipelineValue = '$30–60k';
    const estRunwayMonths = 'Plenty (solo + lean)';

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
                            Simple view of money in, money out, and how your apps are pulling
                            their weight.
                        </p>
                    </div>
                    <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 text-xs text-muted-foreground shadow-sm">
                        <span className="h-2 w-2 rounded-full bg-emerald-500" />
                        <span>Goal: keep this fun, not scary</span>
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
            <section className="grid gap-4 md:grid-cols-3">
                <StatCard
                    label="Est. MRR"
                    value={estMRR}
                    helper="Rough recurring revenue across all live products."
                    icon={<DollarSign className="h-4 w-4" />}
                />
                <StatCard
                    label="Pipeline value"
                    value={estPipelineValue}
                    helper="Very fuzzy, but keeps your eyes on the prize."
                    icon={<TrendingUp className="h-4 w-4" />}
                />
                <StatCard
                    label="Runway / buffer"
                    value={estRunwayMonths}
                    helper="Solo + lean gear means you mostly need time and focus."
                    icon={<PiggyBank className="h-4 w-4" />}
                />
            </section>

            {/* Product breakdown + cash table */}
            <section className="grid gap-4 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1.2fr)]">
                {/* Product revenue table */}
                <div className="rounded-2xl border border-border bg-card p-4 shadow-sm sm:p-5">
                    <div className="flex items-center justify-between gap-3">
                        <div>
                            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                                By product
                            </p>
                            <p className="mt-1 text-sm text-muted-foreground">
                                How PennyWize, DropSignal, and HypeWatch contribute to MRR.
                            </p>
                        </div>
                        <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-border bg-muted">
                            <Wallet className="h-4 w-4" />
                        </div>
                    </div>

                    <div className="mt-4 overflow-x-auto">
                        <table className="min-w-full text-left text-xs">
                            <thead className="border-b border-border text-[11px] uppercase text-muted-foreground">
                                <tr>
                                    <th className="py-2 pr-4">Product</th>
                                    <th className="px-4 py-2">Est. MRR</th>
                                    <th className="px-4 py-2">Subscriptions</th>
                                    <th className="px-4 py-2">Notes</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border/70">
                                {products.map((p) => (
                                    <tr key={p.name}>
                                        <td className="py-2 pr-4 text-sm font-medium">{p.name}</td>
                                        <td className="px-4 py-2">{p.mrr}</td>
                                        <td className="px-4 py-2">{p.subs}</td>
                                        <td className="px-4 py-2">{p.notes}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Cash movements */}
                <div className="space-y-4">
                    <section className="rounded-2xl border border-border bg-card p-4 shadow-sm sm:p-5">
                        <div className="flex items-center justify-between gap-3">
                            <div>
                                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                                    Recent cash movements
                                </p>
                                <p className="mt-1 text-sm text-muted-foreground">
                                    Super lightweight view of money in vs. out.
                                </p>
                            </div>
                            <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-border bg-muted">
                                <Receipt className="h-4 w-4" />
                            </div>
                        </div>

                        <ul className="mt-4 space-y-2 text-xs">
                            {cashMovements.map((m) => (
                                <li
                                    key={`${m.date}-${m.label}`}
                                    className="flex items-center justify-between rounded-xl border border-border bg-background/60 px-3 py-2"
                                >
                                    <div className="flex flex-col">
                                        <span className="font-medium">{m.label}</span>
                                        <span className="text-[11px] text-muted-foreground">
                                            {m.date} · {m.category}
                                        </span>
                                    </div>
                                    <span
                                        className={`text-[11px] font-semibold ${m.type === 'In' ? 'text-emerald-400' : 'text-rose-400'
                                            }`}
                                    >
                                        {m.amount}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </section>

                    <section className="rounded-2xl border border-border bg-card p-4 shadow-sm sm:p-5">
                        <div className="flex items-center justify-between gap-3">
                            <div>
                                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                                    This week&apos;s money moves
                                </p>
                                <p className="mt-1 text-sm text-muted-foreground">
                                    Tiny rituals that keep finances from sneaking up on you.
                                </p>
                            </div>
                            <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-border bg-muted">
                                <Calculator className="h-4 w-4" />
                            </div>
                        </div>

                        <ul className="mt-4 space-y-2 text-xs">
                            <li className="rounded-xl border border-border bg-background/60 px-3 py-2">
                                Do a 10–15 minute money check-in: Stripe / bank / subscriptions.
                            </li>
                            <li className="rounded-xl border border-border bg-background/60 px-3 py-2">
                                Confirm recurring infra costs (Vercel, domains, tools) are still
                                worth it.
                            </li>
                            <li className="rounded-xl border border-border bg-background/60 px-3 py-2">
                                Decide one tiny offer / package you could pitch on Gun.io or
                                Upwork.
                            </li>
                        </ul>
                    </section>
                </div>
            </section>

            {/* Future: integrations */}
            <section className="rounded-2xl border border-border bg-card p-4 shadow-sm sm:p-5">
                <div className="flex items-center justify-between gap-3">
                    <div>
                        <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                            Future integrations
                        </p>
                        <p className="mt-1 text-sm text-muted-foreground">
                            Placeholder for Stripe, bank feeds, and auto-updated dashboards.
                        </p>
                    </div>
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-border bg-muted">
                        <TrendingDown className="h-4 w-4 rotate-180" />
                    </div>
                </div>

                <p className="mt-3 text-xs text-muted-foreground">
                    Later, this card can pull real data from Stripe, your bank, or an
                    accounting tool. For now, it&apos;s just a reminder that the grown-up
                    version of this screen is waiting whenever you&apos;re ready.
                </p>
            </section>
        </div>
    );
}