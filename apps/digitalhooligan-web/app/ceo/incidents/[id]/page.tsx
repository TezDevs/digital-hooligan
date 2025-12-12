// app/ceo/incidents/[id]/page.tsx
import Link from "next/link";
import {
    getStubIncidents,
    Incident,
    IncidentSeverity,
    IncidentStatus,
} from "@/lib/incidents";

export const dynamic = "force-dynamic";

function severityLabel(severity: IncidentSeverity): string {
    switch (severity) {
        case "critical":
            return "Critical";
        case "high":
            return "High";
        case "medium":
            return "Medium";
        case "low":
            return "Low";
        default:
            return severity;
    }
}

function severityClasses(severity: IncidentSeverity): string {
    switch (severity) {
        case "critical":
            return "bg-red-500/10 text-red-400 ring-1 ring-red-500/40";
        case "high":
            return "bg-amber-500/10 text-amber-400 ring-1 ring-amber-500/40";
        case "medium":
            return "bg-sky-500/10 text-sky-400 ring-1 ring-sky-500/40";
        case "low":
            return "bg-emerald-500/10 text-emerald-400 ring-1 ring-emerald-500/40";
        default:
            return "bg-slate-500/10 text-slate-300 ring-1 ring-slate-500/40";
    }
}

function statusLabel(status: IncidentStatus): string {
    switch (status) {
        case "open":
            return "Open";
        case "investigating":
            return "Investigating";
        case "mitigated":
            return "Mitigated";
        case "resolved":
            return "Resolved";
        case "closed":
            return "Closed";
        default:
            return status;
    }
}

function statusClasses(status: IncidentStatus): string {
    switch (status) {
        case "open":
            return "bg-red-500/10 text-red-300 ring-1 ring-red-500/40";
        case "investigating":
            return "bg-amber-500/10 text-amber-300 ring-1 ring-amber-500/40";
        case "mitigated":
            return "bg-sky-500/10 text-sky-300 ring-1 ring-sky-500/40";
        case "resolved":
            return "bg-emerald-500/10 text-emerald-300 ring-1 ring-emerald-500/40";
        case "closed":
            return "bg-slate-600/20 text-slate-200 ring-1 ring-slate-600/60";
        default:
            return "bg-slate-500/10 text-slate-300 ring-1 ring-slate-500/40";
    }
}

function formatDate(value: string): string {
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "—";
    return date.toLocaleString();
}

// In newer Next, params is a Promise we must await.
type PageProps = {
    params: Promise<{ id: string }>;
};

export default async function IncidentDetailPage({ params }: PageProps) {
    const { id } = await params;

    const incidentList = getStubIncidents();
    let incident: Incident | null = null;

    // 1) Try interpreting id as an index: /ceo/incidents/0
    const index = Number(id);
    if (!Number.isNaN(index) && index >= 0 && index < incidentList.length) {
        incident = incidentList[index];
    }

    // 2) Fallback: match by incident.id: /ceo/incidents/INC-DROP-001
    if (!incident) {
        incident = incidentList.find((i) => i.id === id) ?? null;
    }

    if (!incident) {
        return (
            <div className="min-h-screen bg-black text-slate-100">
                <div className="mx-auto flex max-w-3xl flex-col gap-6 px-4 py-8 md:px-6 lg:px-8">
                    <div className="flex items-center justify-between text-xs text-slate-500">
                        <div className="flex items-center gap-1">
                            <Link
                                href="/ceo/incidents"
                                className="text-sky-400 hover:text-sky-300"
                            >
                                Incidents
                            </Link>
                            <span>/</span>
                            <span className="font-mono text-[11px] text-slate-400">
                                {id}
                            </span>
                        </div>
                        <Link
                            href="/ceo"
                            className="hidden text-slate-500 hover:text-slate-300 md:inline-flex"
                        >
                            Back to CEO dashboard
                        </Link>
                    </div>

                    <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-6">
                        <h1 className="text-lg font-semibold text-slate-100">
                            Incident not found
                        </h1>
                        <p className="mt-2 text-sm text-slate-400">
                            No incident exists for{" "}
                            <span className="font-mono text-slate-200">{id}</span> in the
                            current stub data.
                        </p>
                        <p className="mt-4 text-xs text-slate-500">
                            Use the Incidents list to navigate to valid incidents.
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    const severityBadge = severityClasses(incident.severity);
    const statusBadge = statusClasses(incident.status);

    return (
        <div className="min-h-screen bg-black text-slate-100">
            <div className="mx-auto flex max-w-5xl flex-col gap-8 px-4 py-8 md:px-6 lg:px-8">
                {/* Breadcrumb + back link */}
                <div className="flex items-center justify-between gap-2 text-xs text-slate-500">
                    <div className="flex items-center gap-1">
                        <Link
                            href="/ceo/incidents"
                            className="text-sky-400 hover:text-sky-300"
                        >
                            Incidents
                        </Link>
                        <span>/</span>
                        <span className="font-mono text-[11px] text-slate-400">
                            {incident.id}
                        </span>
                    </div>
                    <Link
                        href="/ceo"
                        className="hidden text-slate-500 hover:text-slate-300 md:inline-flex"
                    >
                        Back to CEO dashboard
                    </Link>
                </div>

                {/* Header */}
                <header className="space-y-3">
                    <div className="flex flex-wrap items-center gap-3">
                        <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">
                            {incident.title}
                        </h1>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 text-xs">
                        <span className="inline-flex items-center rounded-full border border-slate-700 px-2 py-0.5 font-mono text-[11px] text-slate-300">
                            {incident.id}
                        </span>

                        <span className="inline-flex items-center rounded-full border border-slate-700 px-2 py-0.5 text-[11px] text-slate-300">
                            App:{" "}
                            <span className="ml-1 font-semibold text-slate-100">
                                {incident.appName}
                            </span>
                        </span>

                        <span
                            className={`inline-flex items-center rounded-full px-2 py-1 text-[11px] font-medium ${severityBadge}`}
                        >
                            Severity: {severityLabel(incident.severity)}
                        </span>

                        <span
                            className={`inline-flex items-center rounded-full px-2 py-1 text-[11px] font-medium ${statusBadge}`}
                        >
                            Status: {statusLabel(incident.status)}
                        </span>
                    </div>
                </header>

                {/* Layout: left detail, right meta */}
                <div className="grid gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,1.2fr)]">
                    {/* Left column */}
                    <section className="space-y-4">
                        <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-4">
                            <h2 className="text-sm font-semibold text-slate-100">
                                Description
                            </h2>
                            <p className="mt-2 text-sm text-slate-300">
                                {incident.description}
                            </p>
                        </div>

                        <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-4">
                            <h2 className="text-sm font-semibold text-slate-100">
                                Impact summary
                            </h2>
                            <p className="mt-2 text-sm text-slate-300">
                                {incident.impactSummary}
                            </p>
                        </div>
                    </section>

                    {/* Right column */}
                    <aside className="space-y-4">
                        <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-4 text-sm">
                            <h2 className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                                Timeline
                            </h2>
                            <dl className="mt-3 space-y-2 text-xs text-slate-300">
                                <div className="flex justify-between gap-4">
                                    <dt className="text-slate-500">Started</dt>
                                    <dd className="font-mono text-[11px]">
                                        {formatDate(incident.startedAt)}
                                    </dd>
                                </div>
                                <div className="flex justify-between gap-4">
                                    <dt className="text-slate-500">Last update</dt>
                                    <dd className="font-mono text-[11px]">
                                        {formatDate(incident.updatedAt)}
                                    </dd>
                                </div>
                                <div className="flex justify-between gap-4">
                                    <dt className="text-slate-500">Detected by</dt>
                                    <dd className="font-mono text-[11px]">
                                        {incident.detectedBy}
                                    </dd>
                                </div>
                            </dl>
                        </div>

                        <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-4 text-sm">
                            <h2 className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                                Customer impact
                            </h2>
                            <p className="mt-2 text-sm text-slate-300">
                                {incident.customerImpact === "none"
                                    ? "No direct customer impact recorded."
                                    : `Reported customer impact: ${incident.customerImpact}.`}
                            </p>
                        </div>

                        <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-4 text-sm">
                            <h2 className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                                Links
                            </h2>
                            {incident.links && incident.links.length > 0 ? (
                                <ul className="mt-2 space-y-1 text-xs">
                                    {incident.links.map((link) => (
                                        <li key={`${incident.id}-${link.label}`}>
                                            <span className="inline-flex items-center gap-1">
                                                <span className="rounded-full bg-slate-800 px-2 py-0.5 text-[10px] uppercase tracking-wide text-slate-300">
                                                    {link.type}
                                                </span>
                                                <span className="text-sky-400 hover:text-sky-300">
                                                    {link.label}
                                                </span>
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="mt-2 text-xs text-slate-500">
                                    No runbooks or tickets linked yet.
                                </p>
                            )}
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    );
}