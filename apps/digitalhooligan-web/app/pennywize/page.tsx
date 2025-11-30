"use client";

import Link from "next/link";
import Image from "next/image";

export default function PennyWizePage() {
    return (
        <main className="min-h-screen border-t border-dh-street-gray/60 bg-gradient-to-b from-dh-black via-black to-black/95 text-white">
            {/* Layout wrapper */}
            <div className="mx-auto max-w-5xl px-4 pb-16 pt-10 sm:px-6 sm:pt-12 lg:px-8 lg:pb-20">
                {/* Back link */}
                <div className="mb-6 text-sm">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-1 text-dh-street-gray/80 hover:text-dh-electric-mint transition-colors"
                    >
                        <span aria-hidden>←</span>
                        <span>Back to Digital Hooligan</span>
                    </Link>
                </div>

                {/* Hero row */}
                <section className="flex flex-col gap-8 lg:flex-row lg:items-center">
                    <div className="flex-1">
                        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-dh-electric-mint/80">
                            PennyWize
                        </p>
                        <h1 className="mt-2 text-3xl font-semibold sm:text-4xl lg:text-5xl">
                            Cash-flow autopilot for solo builders & small teams.
                        </h1>
                        <p className="mt-4 max-w-xl text-sm leading-relaxed text-dh-street-gray/80">
                            PennyWize keeps an always-on eye on your subscriptions,
                            infrastructure costs, and product revenue so you don&apos;t have
                            to live in a spreadsheet. It&apos;s built for the people actually
                            shipping things — not for finance departments.
                        </p>

                        <div className="mt-6 flex flex-wrap items-center gap-3 text-xs">
                            <span className="rounded-full border border-dh-street-gray/60 px-3 py-1 uppercase tracking-[0.16em] text-dh-street-gray/80">
                                Status: Prototype
                            </span>
                            <span className="rounded-full bg-dh-electric-mint/10 px-3 py-1 text-dh-electric-mint/90">
                                Digital Hooligan Labs
                            </span>
                        </div>
                    </div>

                    {/* Side visual */}
                    <div className="flex-1">
                        <div className="relative mx-auto h-56 max-w-sm overflow-hidden rounded-3xl border border-dh-street-gray/60 bg-[radial-gradient(circle_at_top,_rgba(30,255,203,0.25),_transparent_55%),_linear-gradient(to_bottom,_#050608,_#050608)] shadow-[0_0_40px_rgba(0,0,0,0.7)]">
                            {/* Optional: use your PennyWize icon large */}
                            <div className="absolute inset-0 flex flex-col justify-between p-5">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-[11px] uppercase tracking-[0.18em] text-dh-street-gray/70">
                                            Live spend
                                        </p>
                                        <p className="mt-1 text-lg font-semibold">$7,820 / mo</p>
                                    </div>
                                    <div className="relative h-10 w-10 overflow-hidden rounded-xl border border-dh-street-gray/60 bg-black/60">
                                        <Image
                                            src="/pennywize-icon.png"
                                            alt="PennyWize icon"
                                            fill
                                            sizes="40px"
                                            className="object-contain"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <div className="mb-3 flex items-center justify-between text-[11px] text-dh-street-gray/70">
                                        <span>Next 30 days runway</span>
                                        <span className="text-dh-electric-mint/90">+3.2 months</span>
                                    </div>
                                    <div className="h-1.5 overflow-hidden rounded-full bg-white/5">
                                        <div className="h-full w-3/5 rounded-full bg-dh-electric-mint/80" />
                                    </div>
                                </div>

                                <div className="flex gap-3 text-[11px] text-dh-street-gray/75">
                                    <div className="flex-1 rounded-2xl bg-white/3 p-2.5">
                                        <p className="text-[10px] uppercase tracking-[0.16em]">
                                            Subscriptions
                                        </p>
                                        <p className="mt-1 text-sm font-semibold">$2,140</p>
                                        <p className="mt-0.5 text-[10px] text-dh-street-gray/60">
                                            Audit & auto-flag waste.
                                        </p>
                                    </div>
                                    <div className="flex-1 rounded-2xl bg-white/3 p-2.5">
                                        <p className="text-[10px] uppercase tracking-[0.16em]">
                                            Infra
                                        </p>
                                        <p className="mt-1 text-sm font-semibold">$3,980</p>
                                        <p className="mt-0.5 text-[10px] text-dh-street-gray/60">
                                            EC2, RDS, Functions, edge…
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <p className="mt-3 text-[11px] text-dh-street-gray/70">
                            UI concept &mdash; not final product. PennyWize is still in active
                            design and prototyping inside Hooligan Labs.
                        </p>
                    </div>
                </section>

                {/* Problem → Solution → Who it's for */}
                <section className="mt-12 grid gap-8 md:grid-cols-3">
                    <div className="space-y-3">
                        <h2 className="text-xs font-semibold uppercase tracking-[0.22em] text-dh-street-gray/70">
                            Problem
                        </h2>
                        <p className="text-sm leading-relaxed text-dh-street-gray/85">
                            As you stack SaaS tools, infra, and experiments, it becomes
                            impossible to answer simple questions like: &quot;What is our
                            actual burn?&quot; or &quot;What can I cut today without breaking
                            the product?&quot;
                        </p>
                    </div>
                    <div className="space-y-3">
                        <h2 className="text-xs font-semibold uppercase tracking-[0.22em] text-dh-street-gray/70">
                            Solution
                        </h2>
                        <p className="text-sm leading-relaxed text-dh-street-gray/85">
                            PennyWize connects billing data from your payment processor,
                            cloud providers, and key SaaS tools into one &quot;cash-flow
                            brain&quot; that surfaces trends, risky spikes, and quick wins
                            automatically.
                        </p>
                    </div>
                    <div className="space-y-3">
                        <h2 className="text-xs font-semibold uppercase tracking-[0.22em] text-dh-street-gray/70">
                            Who it&apos;s for
                        </h2>
                        <p className="text-sm leading-relaxed text-dh-street-gray/85">
                            Solo founders, tiny product teams, and technical leaders who are
                            tired of babysitting spreadsheets but still want to know exactly
                            where every dollar goes.
                        </p>
                    </div>
                </section>

                {/* Mini roadmap */}
                <section className="mt-12">
                    <h2 className="text-xs font-semibold uppercase tracking-[0.22em] text-dh-street-gray/70">
                        Mini roadmap
                    </h2>

                    <ol className="mt-4 space-y-4 text-sm text-dh-street-gray/85">
                        <li className="flex gap-3">
                            <span className="mt-[2px] inline-flex h-5 w-5 items-center justify-center rounded-full border border-dh-electric-mint/80 text-[11px] text-dh-electric-mint/90">
                                1
                            </span>
                            <div>
                                <p className="font-medium text-white">
                                    Billing &amp; infra cost ingestion
                                </p>
                                <p className="mt-1 text-sm text-dh-street-gray/80">
                                    Connect Stripe and core cloud providers (AWS / Vercel /
                                    Cloudflare) to build a clean timeline of costs vs. income.
                                </p>
                            </div>
                        </li>

                        <li className="flex gap-3">
                            <span className="mt-[2px] inline-flex h-5 w-5 items-center justify-center rounded-full border border-dh-electric-mint/80 text-[11px] text-dh-electric-mint/90">
                                2
                            </span>
                            <div>
                                <p className="font-medium text-white">
                                    Waste detection &amp; quick-win suggestions
                                </p>
                                <p className="mt-1 text-sm text-dh-street-gray/80">
                                    Surface idle services, zombie subscriptions, and unusual
                                    spend spikes with simple, human-readable suggestions.
                                </p>
                            </div>
                        </li>

                        <li className="flex gap-3">
                            <span className="mt-[2px] inline-flex h-5 w-5 items-center justify-center rounded-full border border-dh-electric-mint/80 text-[11px] text-dh-electric-mint/90">
                                3
                            </span>
                            <div>
                                <p className="font-medium text-white">
                                    Scenario planning &amp; runway alerts
                                </p>
                                <p className="mt-1 text-sm text-dh-street-gray/80">
                                    Model &quot;what if we cut X&quot; scenarios and get proactive
                                    alerts when runway or margins fall below your thresholds.
                                </p>
                            </div>
                        </li>
                    </ol>
                </section>

                {/* Status / call-to-action stub */}
                <section className="mt-12 rounded-2xl border border-dh-street-gray/60 bg-white/5 p-5 sm:p-6">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <p className="text-sm font-medium text-white">
                                PennyWize is still in the lab.
                            </p>
                            <p className="mt-1 text-sm text-dh-street-gray/80">
                                I&apos;m collecting real stories from solo builders and small
                                teams about how they track cash-flow today.
                            </p>
                        </div>
                        <div className="flex flex-col gap-2 text-sm">
                            <p className="text-xs uppercase tracking-[0.18em] text-dh-street-gray/70">
                                Want early access?
                            </p>
                            <p className="text-dh-street-gray/80">
                                Reach out via the contact section on the homepage and mention
                                <span className="text-dh-electric-mint/90"> PennyWize</span>.
                            </p>
                        </div>
                    </div>
                </section>
            </div>
        </main>
    );
}
