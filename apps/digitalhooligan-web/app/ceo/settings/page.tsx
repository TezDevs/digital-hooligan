// app/ceo/settings/page.tsx
import type { Metadata } from "next";
import { CeoHeader } from "@/components/ceo/CeoHeader";

export const metadata: Metadata = {
    title: "CEO Settings | Digital Hooligan",
    description:
        "Settings for the Digital Hooligan CEO dashboard — company profile, security, and AI preferences."
};

export default function CeoSettingsPage() {
    return (
        <div className="min-h-screen bg-slate-950 text-slate-50">
            <CeoHeader />

            <main className="mx-auto max-w-6xl px-4 py-6 space-y-4">
                {/* Header */}
                <header className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
                    <div>
                        <h1 className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                            Settings
                        </h1>
                        <p className="mt-1 text-[12px] text-slate-400">
                            Light-weight controls for your CEO dashboard. v1 is mostly display-only so
                            we don&apos;t over-complicate things before wiring a real backend.
                        </p>
                    </div>
                    <div className="flex flex-wrap gap-2 text-[11px] text-slate-300">
                        <span className="rounded-full border border-slate-800 bg-slate-900 px-3 py-1">
                            v1: static
                        </span>
                        <span className="rounded-full border border-slate-800 bg-slate-900 px-3 py-1">
                            v2+: persisted + AI-aware
                        </span>
                    </div>
                </header>

                {/* Main settings grid */}
                <section className="grid grid-cols-1 gap-4 lg:grid-cols-[1.1fr_1fr] pb-6">
                    {/* Profile & company */}
                    <article className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4 space-y-3">
                        <div className="flex items-center justify-between gap-2">
                            <div>
                                <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                                    Profile &amp; company
                                </h2>
                                <p className="mt-1 text-[11px] text-slate-400">
                                    Quick snapshot of who this dashboard is for and what entity it
                                    represents.
                                </p>
                            </div>
                            <span className="rounded-full border border-slate-700 bg-slate-950/80 px-2 py-1 text-[10px] text-slate-400">
                                Coming soon: editable
                            </span>
                        </div>

                        <dl className="grid grid-cols-1 gap-3 text-[11px] md:grid-cols-2">
                            <div>
                                <dt className="text-[10px] uppercase tracking-[0.2em] text-slate-500">
                                    Owner
                                </dt>
                                <dd className="mt-1 text-slate-100">Courtez Cannady</dd>
                            </div>
                            <div>
                                <dt className="text-[10px] uppercase tracking-[0.2em] text-slate-500">
                                    Company
                                </dt>
                                <dd className="mt-1 text-slate-100">Digital Hooligan LLC</dd>
                            </div>
                            <div>
                                <dt className="text-[10px] uppercase tracking-[0.2em] text-slate-500">
                                    Focus
                                </dt>
                                <dd className="mt-1 text-slate-100">
                                    Software / web app development, SaaS, APIs, automation tools
                                </dd>
                            </div>
                            <div>
                                <dt className="text-[10px] uppercase tracking-[0.2em] text-slate-500">
                                    Gov track
                                </dt>
                                <dd className="mt-1 text-slate-100">
                                    NAICS 541511, SAM.gov, future VSOB/SDVOSB
                                </dd>
                            </div>
                        </dl>

                        <p className="text-[10px] text-slate-500">
                            Later, this section can sync to real company metadata and surface flags if
                            something is out of date (SAM.gov renewal, Navy Federal, etc.).
                        </p>
                    </article>

                    {/* Security & AI */}
                    <div className="space-y-4">
                        {/* Security */}
                        <article className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4 space-y-2 text-[11px]">
                            <div className="flex items-center justify-between gap-2">
                                <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                                    Security
                                </h2>
                                <span className="rounded-full border border-emerald-500/60 bg-emerald-500/10 px-2 py-1 text-[10px] text-emerald-100">
                                    v1 locked down
                                </span>
                            </div>
                            <ul className="mt-1 space-y-1 text-slate-300">
                                <li>• CEO dashboard requires login via /ceo/login.</li>
                                <li>• Public site routes never expose CEO-only data.</li>
                                <li>• Future: IP allowlist and hardware key support.</li>
                            </ul>
                            <p className="text-[10px] text-slate-500 mt-1">
                                As the stack grows, this is where we&apos;ll configure things like DMZ /
                                VPN requirements, device rules, and alerting on suspicious access.
                            </p>
                        </article>

                        {/* AI preferences */}
                        <article className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4 space-y-3 text-[11px]">
                            <div className="flex items-center justify-between gap-2">
                                <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                                    AI preferences
                                </h2>
                                <span className="rounded-full border border-slate-700 bg-slate-950/80 px-2 py-1 text-[10px] text-slate-400">
                                    Mock toggles
                                </span>
                            </div>

                            <div className="space-y-2">
                                <SettingToggle
                                    label="Strategy AI"
                                    description="Can read summary metrics (tasks, deals, finance) but not raw client data."
                                    enabled
                                />
                                <SettingToggle
                                    label="Ops AI"
                                    description="Can view code snippets and logs you explicitly paste in, but not full repos yet."
                                    enabled
                                />
                                <SettingToggle
                                    label="Gov bid helper"
                                    description="Future assistant focused on SAM.gov and proposal drafting."
                                    enabled={false}
                                />
                            </div>

                            <p className="text-[10px] text-slate-500">
                                When we wire up real assistants, these toggles will control what context
                                each AI can see so you can keep things tight and intentional.
                            </p>
                        </article>
                    </div>
                </section>
            </main>
        </div>
    );
}

function SettingToggle({
    label,
    description,
    enabled
}: {
    label: string;
    description: string;
    enabled: boolean;
}) {
    return (
        <div className="flex items-start justify-between gap-3 rounded-xl border border-slate-800 bg-slate-950/80 px-3 py-2">
            <div>
                <div className="text-[11px] font-semibold text-slate-100">{label}</div>
                <p className="mt-1 text-[10px] text-slate-500">{description}</p>
            </div>
            <div
                className={[
                    "inline-flex h-5 w-9 items-center rounded-full border text-[10px]",
                    enabled
                        ? "border-emerald-500/60 bg-emerald-500/20 justify-end text-emerald-100"
                        : "border-slate-700 bg-slate-900 justify-start text-slate-400"
                ].join(" ")}
            >
                <span className="mx-1 rounded-full bg-slate-950 px-1">
                    {enabled ? "ON" : "OFF"}
                </span>
            </div>
        </div>
    );
}