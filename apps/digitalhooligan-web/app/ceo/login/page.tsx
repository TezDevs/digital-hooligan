// app/ceo/login/page.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "CEO Login | Digital Hooligan",
    description: "Secure access to the Digital Hooligan CEO dashboard."
};

interface CeoLoginPageProps {
    searchParams: Promise<{
        error?: string;
        from?: string;
    }>;
}

export default async function CeoLoginPage({ searchParams }: CeoLoginPageProps) {
    const params = await searchParams;

    const hasError = params.error === "1";
    const from = params.from || "/ceo";

    return (
        <div className="min-h-screen bg-slate-950 text-slate-50 flex items-center justify-center px-4">
            <div className="w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900/80 p-6 shadow-xl">
                <div className="flex items-center gap-3 mb-4">
                    <div className="h-9 w-9 rounded-xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-xs font-semibold text-emerald-300">
                        DH
                    </div>
                    <div>
                        <div className="text-xs uppercase tracking-[0.2em] text-slate-400">
                            Digital Hooligan
                        </div>
                        <div className="text-sm font-semibold text-slate-100">
                            CEO Access Portal
                        </div>
                    </div>
                </div>

                <p className="text-[11px] text-slate-400 mb-4">
                    This area is for the Digital Hooligan CEO only. All access may be logged
                    and monitored. Use a trusted device and network.
                </p>

                {hasError && (
                    <div className="mb-4 rounded-xl border border-rose-500/50 bg-rose-500/10 px-3 py-2 text-[11px] text-rose-100">
                        Incorrect credentials. Please try again.
                    </div>
                )}

                {/* IMPORTANT: posts to /api/ceo/login, not /ceo/login */}
                <form method="POST" action="/api/ceo/login" className="space-y-3">
                    <div className="space-y-1 text-[11px]">
                        <label htmlFor="username" className="text-slate-300">
                            Username / Email
                        </label>
                        <input
                            id="username"
                            name="username"
                            type="text"
                            autoComplete="username"
                            className="w-full rounded-xl border border-slate-800 bg-slate-950/80 px-3 py-2 text-[12px] text-slate-100 outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-500/60"
                            required
                        />
                    </div>

                    <div className="space-y-1 text-[11px]">
                        <label htmlFor="password" className="text-slate-300">
                            Password
                        </label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            autoComplete="current-password"
                            className="w-full rounded-xl border border-slate-800 bg-slate-950/80 px-3 py-2 text-[12px] text-slate-100 outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-500/60"
                            required
                        />
                    </div>

                    <input type="hidden" name="from" value={from} />

                    <button
                        type="submit"
                        className="mt-2 inline-flex w-full items-center justify-center rounded-xl border border-emerald-400/70 bg-emerald-500/10 px-3 py-2 text-[12px] font-medium text-emerald-100 hover:bg-emerald-500/20"
                    >
                        Log in securely
                    </button>
                </form>

                <p className="mt-4 text-[10px] text-slate-500">
                    Tip: In production, credentials come from env vars (CEO_DASH_USERNAME /
                    CEO_DASH_PASSWORD) and this route is additionally protected by
                    Cloudflare Access.
                </p>
            </div>
        </div>
    );
}