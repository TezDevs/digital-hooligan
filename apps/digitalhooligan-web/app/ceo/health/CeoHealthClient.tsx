"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";

type PingResponse = { ok: boolean; timestamp: string };
type HealthResponse = {
    ok: boolean;
    service: string;
    env: string;
    timestamp: string;
    uptimeSec: number;
    version: string | null;
};

type HealthStatus = "healthy" | "degraded" | "down" | "maintenance" | "ok" | "slow";

type AppHealthStatus = {
    appId: string;
    status: HealthStatus;
    latencyMs: number;
    checkedAt: string;
    message?: string;
};

type AppsSnapshot = {
    apps: AppHealthStatus[];
    meta: { source: "stub" | "live"; generatedAt: string };
};

type LoadState<T> = {
    loading: boolean;
    data: T | null;
    error: string | null;
};

function formatDate(v?: string | null) {
    if (!v) return "—";
    const d = new Date(v);
    if (Number.isNaN(d.getTime())) return "—";
    return d.toLocaleString();
}

function formatMs(v?: number | null) {
    if (v == null || v <= 0) return "—";
    return `${v} ms`;
}

function statusBadge(status: HealthStatus) {
    switch (status) {
        case "healthy":
        case "ok":
            return "bg-emerald-500/10 text-emerald-400 ring-1 ring-emerald-500/40";
        case "degraded":
        case "slow":
            return "bg-amber-500/10 text-amber-400 ring-1 ring-amber-500/40";
        case "down":
            return "bg-rose-500/10 text-rose-400 ring-1 ring-rose-500/40";
        case "maintenance":
            return "bg-sky-500/10 text-sky-400 ring-1 ring-sky-500/40";
        default:
            return "bg-slate-500/10 text-slate-300 ring-1 ring-slate-500/40";
    }
}

async function getJson<T>(url: string): Promise<T> {
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
    return (await res.json()) as T;
}

export default function CeoHealthClient() {
    const [ping, setPing] = useState<LoadState<PingResponse>>({
        loading: true,
        data: null,
        error: null,
    });

    const [health, setHealth] = useState<LoadState<HealthResponse>>({
        loading: true,
        data: null,
        error: null,
    });

    const [apps, setApps] = useState<LoadState<AppsSnapshot>>({
        loading: true,
        data: null,
        error: null,
    });

    const refresh = useCallback(async () => {
        setPing({ loading: true, data: null, error: null });
        setHealth({ loading: true, data: null, error: null });
        setApps({ loading: true, data: null, error: null });

        try {
            const [p, h, a] = await Promise.all([
                getJson<PingResponse>("/api/health/ping"),
                getJson<HealthResponse>("/api/health"),
                getJson<AppsSnapshot>("/api/health/apps"),
            ]);

            setPing({ loading: false, data: p, error: null });
            setHealth({ loading: false, data: h, error: null });
            setApps({ loading: false, data: a, error: null });
        } catch (e: unknown) {
            const msg = e instanceof Error ? e.message : "Unknown error";
            // Set partial state in a predictable way
            setPing((s) => ({ ...s, loading: false, error: s.error ?? msg }));
            setHealth((s) => ({ ...s, loading: false, error: s.error ?? msg }));
            setApps((s) => ({ ...s, loading: false, error: s.error ?? msg }));
        }
    }, []);

    useEffect(() => {
        queueMicrotask(() => {
            void refresh();
        });
    }, [refresh]);

    const summary = useMemo(() => {
        const list = apps.data?.apps ?? [];
        const base = { total: 0, healthy: 0, degraded: 0, down: 0, maintenance: 0 };
        return list.reduce((acc, a) => {
            acc.total += 1;
            if (a.status === "healthy" || a.status === "ok") acc.healthy += 1;
            if (a.status === "degraded" || a.status === "slow") acc.degraded += 1;
            if (a.status === "down") acc.down += 1;
            if (a.status === "maintenance") acc.maintenance += 1;
            return acc;
        }, base);
    }, [apps.data]);

    return (
        <div className="min-h-screen bg-black text-slate-100">
            <div className="mx-auto w-full max-w-6xl px-4 py-8 md:px-6 lg:px-8">
                <header className="flex flex-col gap-4">
                    <div className="flex items-center justify-between gap-3">
                        <Link
                            href="/ceo"
                            className="inline-flex items-center gap-2 rounded-lg bg-white/5 px-3 py-2 text-xs text-slate-200 ring-1 ring-white/10 hover:bg-white/10"
                        >
                            ← Back to Dashboard
                        </Link>

                        <button
                            onClick={refresh}
                            className="rounded-lg bg-white/5 px-3 py-2 text-xs text-slate-200 ring-1 ring-white/10 hover:bg-white/10"
                        >
                            Refresh
                        </button>
                    </div>

                    <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
                        <div>
                            <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">
                                Health
                            </h1>
                            <p className="mt-2 max-w-2xl text-sm text-slate-400">
                                Validates the health API surface (ping, service health, apps snapshot).
                                This is stubbed now and can swap to live checks later.
                            </p>
                        </div>

                        <div className="text-xs text-slate-400">
                            Apps snapshot generated:{" "}
                            <span className="font-mono text-slate-300">
                                {formatDate(apps.data?.meta.generatedAt)}
                            </span>
                        </div>
                    </div>
                </header>

                {/* Top cards */}
                <section className="mt-8 grid grid-cols-1 gap-3 md:grid-cols-3">
                    <div className="rounded-xl bg-white/5 p-4 ring-1 ring-white/10">
                        <div className="text-xs text-slate-400">/api/health/ping</div>
                        <div className="mt-2 text-sm">
                            {ping.loading ? (
                                <span className="text-slate-400">Loading…</span>
                            ) : ping.error ? (
                                <span className="text-rose-300">Error: {ping.error}</span>
                            ) : (
                                <>
                                    <span className="font-mono text-slate-200">
                                        ok={String(ping.data?.ok)}
                                    </span>
                                    <div className="mt-1 text-xs text-slate-400">
                                        {formatDate(ping.data?.timestamp)}
                                    </div>
                                </>
                            )}
                        </div>
                    </div>

                    <div className="rounded-xl bg-white/5 p-4 ring-1 ring-white/10">
                        <div className="text-xs text-slate-400">/api/health</div>
                        <div className="mt-2 text-sm">
                            {health.loading ? (
                                <span className="text-slate-400">Loading…</span>
                            ) : health.error ? (
                                <span className="text-rose-300">Error: {health.error}</span>
                            ) : (
                                <>
                                    <div className="font-mono text-slate-200">
                                        {health.data?.service}
                                    </div>
                                    <div className="mt-1 text-xs text-slate-400">
                                        env:{" "}
                                        <span className="font-mono text-slate-300">
                                            {health.data?.env}
                                        </span>{" "}
                                        • uptime:{" "}
                                        <span className="font-mono text-slate-300">
                                            {health.data?.uptimeSec}s
                                        </span>{" "}
                                        • version:{" "}
                                        <span className="font-mono text-slate-300">
                                            {health.data?.version ?? "—"}
                                        </span>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>

                    <div className="rounded-xl bg-white/5 p-4 ring-1 ring-white/10">
                        <div className="text-xs text-slate-400">/api/health/apps</div>
                        <div className="mt-2 text-sm">
                            {apps.loading ? (
                                <span className="text-slate-400">Loading…</span>
                            ) : apps.error ? (
                                <span className="text-rose-300">Error: {apps.error}</span>
                            ) : (
                                <>
                                    <div className="text-xs text-slate-400">
                                        source:{" "}
                                        <span className="font-mono uppercase text-slate-300">
                                            {apps.data?.meta.source}
                                        </span>
                                    </div>
                                    <div className="mt-2 grid grid-cols-5 gap-2">
                                        {[
                                            ["T", summary.total],
                                            ["H", summary.healthy],
                                            ["D", summary.degraded],
                                            ["X", summary.down],
                                            ["M", summary.maintenance],
                                        ].map(([k, v]) => (
                                            <div
                                                key={k}
                                                className="rounded-lg bg-black/30 p-2 text-center ring-1 ring-white/10"
                                            >
                                                <div className="text-[10px] text-slate-400">{k}</div>
                                                <div className="text-sm font-semibold">{v}</div>
                                            </div>
                                        ))}
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </section>

                {/* Apps list */}
                <section className="mt-8 overflow-hidden rounded-xl ring-1 ring-white/10">
                    <div className="bg-white/5 px-4 py-3 text-sm font-semibold">
                        Apps snapshot
                    </div>

                    <div className="divide-y divide-white/10">
                        {(apps.data?.apps ?? []).map((a) => (
                            <div
                                key={a.appId}
                                className="flex flex-col gap-2 px-4 py-4 md:flex-row md:items-center md:justify-between"
                            >
                                <div className="min-w-0">
                                    <div className="flex items-center gap-3">
                                        <div className="truncate font-mono text-sm text-slate-200">
                                            {a.appId}
                                        </div>
                                        <span
                                            className={`inline-flex items-center rounded-full px-2 py-1 text-xs ${statusBadge(
                                                a.status
                                            )}`}
                                        >
                                            {a.status}
                                        </span>
                                    </div>
                                    {a.message ? (
                                        <div className="mt-1 text-xs text-slate-400">{a.message}</div>
                                    ) : null}
                                </div>

                                <div className="flex flex-wrap gap-4 text-xs text-slate-400 md:justify-end">
                                    <div>
                                        Latency:{" "}
                                        <span className="font-mono text-slate-300">
                                            {a.status === "maintenance" ? "—" : formatMs(a.latencyMs)}
                                        </span>
                                    </div>
                                    <div>
                                        Checked:{" "}
                                        <span className="font-mono text-slate-300">
                                            {formatDate(a.checkedAt)}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}

                        {!apps.loading && (apps.data?.apps?.length ?? 0) === 0 ? (
                            <div className="px-4 py-6 text-sm text-slate-400">
                                No apps returned.
                            </div>
                        ) : null}
                    </div>
                </section>
            </div>
        </div>
    );
}