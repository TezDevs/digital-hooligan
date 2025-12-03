// app/ceo/performance/page.tsx

import type { Metadata } from "next";
import { CeoHeader } from "@/components/ceo/CeoHeader";

export const metadata: Metadata = {
    title: "Performance | Digital Hooligan CEO",
    description:
        "Application performance and reliability metrics for Digital Hooligan apps."
};

export default function CeoPerformancePage() {
    return (
        <div className="min-h-screen bg-slate-950 text-slate-50">
            <CeoHeader />
            <main className="mx-auto max-w-6xl px-4 py-6 space-y-4">
                <header className="space-y-1">
                    <h1 className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                        App Performance
                    </h1>
                    <p className="text-[12px] text-slate-400">
                        Dedicated space for uptime, latency, users, subscriptions, and error
                        rates for PennyWize, DropSignal, HypeWatch and other tools as they
                        hit production.
                    </p>
                    <p className="text-[11px] text-slate-500">
                        For now, this page is a stub wired into the nav. As apps launch,
                        we&apos;ll hook this into monitoring and analytics to show real
                        charts.
                    </p>
                </header>

                <section className="rounded-2xl border border-dashed border-slate-800 bg-slate-900/40 p-4 text-[11px] text-slate-400">
                    <p className="mb-2 font-semibold text-slate-200">
                        Coming soon: performance dashboard
                    </p>
                    <ul className="space-y-1 list-disc pl-4">
                        <li>Per-app uptime &amp; downtime timeline.</li>
                        <li>Latency percentiles (P50/P95/P99) for key endpoints.</li>
                        <li>Active users &amp; subscriptions by app.</li>
                        <li>Error rates and incident history.</li>
                        <li>Simple “is it safe to deploy?” signal for each product.</li>
                    </ul>
                </section>
            </main>
        </div>
    );
}