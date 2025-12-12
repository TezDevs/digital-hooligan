// app/ceo/incidents/page.tsx
import {
    computeIncidentsSummary,
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

function formatCustomerImpact(
    impact: Incident["customerImpact"]
): { label: string; classes: string } {
    switch (impact) {
        case "none":
            return {
                label: "No customer impact",
                classes:
                    "bg-emerald-500/10 text-emerald-300 ring-1 ring-emerald-500/40",
            };
        case "minor":
            return {
                label: "Minor",
                classes: "bg-sky-500/10 text-sky-300 ring-1 ring-sky-500/40",
            };
        case "moderate":
            return {
                label: "Moderate",
                classes: "bg-amber-500/10 text-amber-300 ring-1 ring-amber-500/40",
            };
        case "major":
            return {
                label: "Major",
                classes: "bg-red-500/10 text-red-300 ring-1 ring-red-500/40",
            };
        default:
            return {
                label: impact,
                classes: "bg-slate-500/10 text-slate-300 ring-1 ring-slate-500/40",
            };
    }
}

export default async function IncidentsPage() {
    const incidents = getStubIncidents();
    const summary = computeIncidentsSummary(incidents);

    return (
        <div className="min-h-screen bg-black text-slate-100">
            <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-8 md:px-6 lg:px-8">
                {/* Header */}
                <header className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
                    <div>
                        <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">
                            Incidents
                        </h1>
                        <p className="mt-2 max-w-2xl text-sm text-slate-400">
                            Mission-grade view of what&apos;s broken, degraded, or under
                            maintenance across the Digital Hooligan fleet. Today this is
                            stubbed data; tomorrow it can wire into real alerts and
                            monitoring.
                        </p>
                    </div>
                    <div className="flex flex-col items-start gap-1 text-xs text-slate-500 md:items-end">
                        <span className="font-mono uppercase text-slate-300">
                            Stubbed · Local-only
                        </span>
                        <span>
                            Total incidents:{" "}
                            <span className="font-semibold text-slate-100">
                                {summary.total}
                            </span>
                        </span>
                    </div>
                </header>

                {/* Summary cards */}
                <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4">
                        <p className="text-xs uppercase tracking-wide text-slate-500">
                            Open / Investigating
                        </p>
                        <p className="mt-2 text-2xl font-semibold">
                            {summary.open + summary.investigating}
                        </p>
                        <p className="mt-1 text-xs text-slate-500">
                            Active work in progress
                        </p>
                    </div>

                    <div className="rounded-2xl border border-red-900/60 bg-red-950/40 p-4">
                        <p className="text-xs uppercase tracking-wide text-red-400">
                            Critical / High
                        </p>
                        <p className="mt-2 text-2xl font-semibold text-red-200">
                            {summary.critical + summary.high}
                        </p>
                        <p className="mt-1 text-xs text-red-200/80">
                            Incidents with real customer risk
                        </p>
                    </div>

                    <div className="rounded-2xl border border-sky-900/60 bg-sky-950/40 p-4">
                        <p className="text-xs uppercase tracking-wide text-sky-400">
                            Medium / Low
                        </p>
                        <p className="mt-2 text-2xl font-semibold text-sky-200">
                            {summary.medium + summary.low}
                        </p>
                        <p className="mt-1 text-xs text-sky-200/80">
                            Maintenance &amp; internal noise
                        </p>
                    </div>

                    <div className="rounded-2xl border border-emerald-900/60 bg-emerald-950/40 p-4">
                        <p className="text-xs uppercase tracking-wide text-emerald-400">
                            Resolved / Closed
                        </p>
                        <p className="mt-2 text-2xl font-semibold text-emerald-200">
                            {summary.resolved + summary.closed}
                        </p>
                        <p className="mt-1 text-xs text-emerald-200/80">
                            Ready for postmortems &amp; learnings
                        </p>
                    </div>
                </section>

                {/* Incidents table */}
                <section className="space-y-3">
                    <div className="flex items-center justify-between gap-2">
                        <h2 className="text-sm font-medium uppercase tracking-wide text-slate-400">
                            Active &amp; recent incidents
                        </h2>
                        <p className="text-xs text-slate-500">
                            One row per incident. Scroll horizontally on smaller screens.
                        </p>
                    </div>

                    <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-950/70">
                        <table className="min-w-full border-collapse text-left text-xs md:text-sm">
                            <thead className="border-b border-slate-800 bg-slate-950/80">
                                <tr className="text-slate-400">
                                    <th className="px-4 py-3 font-medium">Incident</th>
                                    <th className="px-4 py-3 font-medium">App</th>
                                    <th className="px-4 py-3 font-medium">Severity</th>
                                    <th className="px-4 py-3 font-medium">Status</th>
                                    <th className="px-4 py-3 font-medium">Customer impact</th>
                                    <th className="px-4 py-3 font-medium">Started</th>
                                    <th className="px-4 py-3 font-medium">Last update</th>
                                    <th className="px-4 py-3 font-medium">Summary</th>
                                    <th className="px-4 py-3 font-medium">Links</th>
                                </tr>
                            </thead>
                            <tbody>
                                {incidents.map((incident) => {
                                    const impact = formatCustomerImpact(incident.customerImpact);

                                    return (
                                        <tr
                                            key={incident.id}
                                            className="border-t border-slate-900/60 hover:bg-slate-900/40"
                                        >
                                            <td className="px-4 py-3 align-top">
                                                <div className="flex flex-col gap-1">
                                                    <span className="font-mono text-[11px] text-slate-400">
                                                        {incident.id}
                                                    </span>
                                                    <span className="text-sm font-medium text-slate-100">
                                                        {incident.title}
                                                    </span>
                                                    <span className="text-[11px] text-slate-500">
                                                        Detected by {incident.detectedBy.replace("-", " ")}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-4 py-3 align-top">
                                                <div className="flex flex-col">
                                                    <span className="text-xs text-slate-100">
                                                        {incident.appName}
                                                    </span>
                                                    <span className="text-[11px] font-mono text-slate-500">
                                                        {incident.appId}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-4 py-3 align-top">
                                                <span
                                                    className={`inline-flex items-center rounded-full px-2 py-1 text-[11px] font-medium ${severityClasses(
                                                        incident.severity
                                                    )}`}
                                                >
                                                    {severityLabel(incident.severity)}
                                                </span>
                                            </td>
                                            <td className="px-4 py-3 align-top">
                                                <span
                                                    className={`inline-flex items-center rounded-full px-2 py-1 text-[11px] font-medium ${statusClasses(
                                                        incident.status
                                                    )}`}
                                                >
                                                    {statusLabel(incident.status)}
                                                </span>
                                            </td>
                                            <td className="px-4 py-3 align-top">
                                                <span
                                                    className={`inline-flex items-center rounded-full px-2 py-1 text-[11px] font-medium ${impact.classes}`}
                                                >
                                                    {impact.label}
                                                </span>
                                            </td>
                                            <td className="px-4 py-3 align-top">
                                                <span className="text-xs text-slate-200">
                                                    {formatDate(incident.startedAt)}
                                                </span>
                                            </td>
                                            <td className="px-4 py-3 align-top">
                                                <span className="text-xs text-slate-200">
                                                    {formatDate(incident.updatedAt)}
                                                </span>
                                            </td>
                                            <td className="px-4 py-3 align-top">
                                                <p className="max-w-xs text-xs text-slate-200">
                                                    {incident.impactSummary}
                                                </p>
                                            </td>
                                            <td className="px-4 py-3 align-top">
                                                {incident.links && incident.links.length > 0 ? (
                                                    <div className="flex flex-col gap-1">
                                                        {incident.links.map((link) => (
                                                            <span
                                                                key={`${incident.id}-${link.label}`}
                                                                className="inline-flex cursor-pointer text-[11px] text-sky-400 hover:text-sky-300"
                                                            >
                                                                {link.label}
                                                            </span>
                                                        ))}
                                                    </div>
                                                ) : (
                                                    <span className="text-xs text-slate-500">—</span>
                                                )}
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </section>
            </div>
        </div>
    );
}