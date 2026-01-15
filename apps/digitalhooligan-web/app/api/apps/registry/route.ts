import { NextResponse } from "next/server";

type RegistryItem = {
    id: string;
    name: string;
    kind: string; // e.g. "public-app" | "internal-tool"
    lifecycle: string; // e.g. "live" | "mvp" | "internal"
};

function buildStubRegistry(): RegistryItem[] {
    return [
        { id: "pennywize", name: "PennyWize", kind: "public-app", lifecycle: "live" },
        { id: "dropsignal", name: "DropSignal", kind: "public-app", lifecycle: "mvp" },
        { id: "hypewatch", name: "HypeWatch", kind: "public-app", lifecycle: "maintenance" },
        { id: "ops-toys", name: "Ops Toys", kind: "internal-tool", lifecycle: "internal" },
    ];
}

function countBy(items: RegistryItem[], key: "kind" | "lifecycle"): Record<string, number> {
    return items.reduce<Record<string, number>>((acc, item) => {
        const k = (item[key] || "unknown").toString();
        acc[k] = (acc[k] ?? 0) + 1;
        return acc;
    }, {});
}

export async function GET() {
    const items = buildStubRegistry();

    const payload = {
        ok: true,
        source: "STUB",
        generatedAt: new Date().toISOString(),
        summary: {
            total: items.length,
            byKind: countBy(items, "kind"),
            byLifecycle: countBy(items, "lifecycle"),
        },
        // Keep items available for future “registry table” views if you want
        items,
    };

    return NextResponse.json(payload, {
        status: 200,
        headers: { "Cache-Control": "no-store" },
    });
}