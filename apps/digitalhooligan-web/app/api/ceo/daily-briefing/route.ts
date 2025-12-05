// apps/digitalhooligan-web/app/api/ceo/daily-briefing/route.ts

import { NextResponse } from "next/server";
import { APP_REGISTRY, type AppRegistryEntry } from "@/lib/appRegistry";

export const dynamic = "force-dynamic";

type DailyBriefingResponse = {
    ok: true;
    type: "ceo_daily_briefing";
    headline: string;
    summary: string;
    focusItems: string[];
    recommendedAppId: string;
    recommendedAppName: string;
    tags: string[];
    timestamp: string;
};

function getMissingPathStatus(app: AppRegistryEntry): string[] {
    const missing: string[] = [];
    if (!app.marketingPath) missing.push("marketingPath");
    if (!app.ceoPath) missing.push("ceoPath");
    if (!app.labsPath) missing.push("labsPath");
    return missing;
}

export async function GET() {
    const now = new Date().toISOString();

    const total = APP_REGISTRY.length;
    const internalOnly = APP_REGISTRY.filter((a) => a.internalOnly).length;
    const publicFacing = total - internalOnly;

    const appsWithMissing = APP_REGISTRY.filter(
        (a) => getMissingPathStatus(a).length > 0,
    );

    // Pick a "focus app":
    // 1) First with missing wiring,
    // 2) else first public-facing app,
    // 3) else just the first entry.
    const focusApp: AppRegistryEntry | undefined =
        appsWithMissing[0] ??
        APP_REGISTRY.find((a) => !a.internalOnly) ??
        APP_REGISTRY[0];

    if (!focusApp) {
        const payload: DailyBriefingResponse = {
            ok: true,
            type: "ceo_daily_briefing",
            headline: "Nothing in the registry yet.",
            summary:
                "Once you add apps and bots to APP_REGISTRY, the CEO Copilot can give you a more useful daily briefing.",
            focusItems: [
                "Add at least one app/bot entry to APP_REGISTRY.",
                "Wire up basic marketing, CEO, and Labs paths.",
            ],
            recommendedAppId: "",
            recommendedAppName: "",
            tags: ["registry", "setup"],
            timestamp: now,
        };

        return NextResponse.json(payload);
    }

    const missingPaths = getMissingPathStatus(focusApp);

    const headline =
        missingPaths.length > 0
            ? `Tidy up ${focusApp.name}'s wiring, then push one concrete move.`
            : `Pick one move for ${focusApp.name}, then advance a revenue lever.`;

    const summary =
        missingPaths.length > 0
            ? `${focusApp.name} is in the registry but still missing ${missingPaths.join(
                ", ",
            )}. Clean that up so CEO, Labs, and Dev Workbench all point at the same reality. After that, make one decision that moves the app closer to revenue.`
            : `${focusApp.name} is already wired into the registry. Use that to your advantage: verify the key routes still work, decide what "shipped" means for the next milestone, and document the decision in your notes.`;

    const focusItems: string[] = [];

    focusItems.push(
        `You currently have ${total} apps/bots in the registry: ${publicFacing} public-facing, ${internalOnly} internal-only.`,
    );

    if (missingPaths.length > 0) {
        focusItems.push(
            `${focusApp.name} (id: ${focusApp.id}) is missing: ${missingPaths.join(
                ", ",
            )}.`,
        );
    } else {
        focusItems.push(
            `${focusApp.name} (id: ${focusApp.id}) has full routing wired. Use it as the template when adding new entries.`,
        );
    }

    focusItems.push(
        "Once this is done, write down one sentence about what you shipped or clarified today. That becomes part of your decision log later.",
    );

    const tags: string[] = [];
    if (missingPaths.length > 0) tags.push("wiring");
    if (!focusApp.internalOnly) tags.push("public-facing");
    if (focusApp.internalOnly) tags.push("internal");
    tags.push("ceo-ritual");

    const payload: DailyBriefingResponse = {
        ok: true,
        type: "ceo_daily_briefing",
        headline,
        summary,
        focusItems,
        recommendedAppId: focusApp.id,
        recommendedAppName: focusApp.name,
        tags,
        timestamp: now,
    };

    return NextResponse.json(payload);
}