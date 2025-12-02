const productLinks = [
    { label: "PennyWize", href: "/pennywize" },
    { label: "DropSignal", href: "/dropsignal" },
    { label: "HypeWatch (via Labs)", href: "/labs" },
    { label: "Ops Toys (internal)", href: "/labs" },
];

const companyLinks = [
    { label: "Home", href: "/" },
    { label: "About", href: "/#about" },
    { label: "Services", href: "/services" },
    { label: "Hooligan Labs", href: "/labs" },
    { label: "Street Cred", href: "/#street-cred" },
];

const operatorLinks = [
    { label: "CEO Dashboard", href: "/ceo" },
    { label: "Labs HQ", href: "/labs/hq" },
];

const legalLinks = [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Use", href: "/terms" },
];

export default function Footer() {
    const year = new Date().getFullYear();

    return (
        <footer className="border-t border-white/5 bg-black/95 px-4 py-10 text-xs text-slate-400 sm:px-6 lg:px-8">
            <div className="mx-auto flex max-w-6xl flex-col gap-8">
                <div className="grid gap-8 md:grid-cols-[minmax(0,1.3fr),minmax(0,2fr)]">
                    {/* Brand block */}
                    <div className="space-y-3">
                        <div className="flex items-center gap-2">
                            <div className="flex h-8 w-8 items-center justify-center rounded-xl border border-emerald-400/40 bg-gradient-to-br from-emerald-500/25 via-slate-900 to-black text-sm font-bold text-emerald-100 shadow-[0_0_30px_rgba(16,185,129,0.4)]">
                                DH
                            </div>
                            <div>
                                <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-slate-400">
                                    DIGITAL HOOLIGAN
                                </p>
                                <p className="text-[11px] text-slate-500">
                                    Apps, bots & automation toys · Hooligan Labs
                                </p>
                            </div>
                        </div>
                        <p className="max-w-sm text-[11px] text-slate-400">
                            A small, stubborn studio building tools for sneakerheads,
                            collectors, traders, and operators — with a clear path to serving
                            gov & enterprise programs.
                        </p>
                    </div>

                    {/* Link columns */}
                    <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-4">
                        <div className="space-y-2">
                            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500">
                                Apps & bots
                            </p>
                            <ul className="space-y-1">
                                {productLinks.map((item) => (
                                    <li key={item.label}>
                                        <a
                                            href={item.href}
                                            className="text-[11px] text-slate-400 hover:text-emerald-300"
                                        >
                                            {item.label}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="space-y-2">
                            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500">
                                Company
                            </p>
                            <ul className="space-y-1">
                                {companyLinks.map((item) => (
                                    <li key={item.label}>
                                        <a
                                            href={item.href}
                                            className="text-[11px] text-slate-400 hover:text-emerald-300"
                                        >
                                            {item.label}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="space-y-2">
                            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500">
                                Internal dashboards
                            </p>
                            <ul className="space-y-1">
                                {operatorLinks.map((item) => (
                                    <li key={item.label}>
                                        <a
                                            href={item.href}
                                            className="text-[11px] text-slate-400 hover:text-sky-300"
                                        >
                                            {item.label}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                            <p className="mt-2 text-[10px] text-slate-500">
                                Hidden CEO entry points may exist in the UI. If you know, you
                                know.
                            </p>
                        </div>

                        <div className="space-y-2">
                            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500">
                                Legal
                            </p>
                            <ul className="space-y-1">
                                {legalLinks.map((item) => (
                                    <li key={item.label}>
                                        <a
                                            href={item.href}
                                            className="text-[11px] text-slate-400 hover:text-emerald-300"
                                        >
                                            {item.label}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                            <p className="mt-2 text-[10px] text-slate-500">
                                Digital Hooligan LLC · Software / web app development, SaaS,
                                APIs, automation tools.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Bottom bar */}
                <div className="flex flex-col gap-3 border-t border-slate-800 pt-4 text-[11px] text-slate-500 sm:flex-row sm:items-center sm:justify-between">
                    <p>
                        © {year} Digital Hooligan LLC. All rights reserved. Built with a
                        hooligan heart and an enterprise brain.
                    </p>
                    <div className="flex flex-wrap gap-3">
                        <span className="text-slate-600">
                            NAICS 541511 · Gov & enterprise friendly
                        </span>
                        <a
                            href="/ceo"
                            className="text-slate-600 hover:text-emerald-300"
                            aria-label="CEO dashboard entry"
                        >
                            CEO view
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}