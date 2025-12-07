import { NextResponse } from "next/server";
import {
    appRegistry,
    type AppRegistryEntry,
    type AppId,
} from "@/lib/appRegistry";

export const dynamic = "force-dynamic";

/**
 * Local extension of AppRegistryEntry for this API.
 * The shared type doesn’t currently expose every field
 * we want to filter on, so we mark them optional here.
 */
type FilterableApp = AppRegistryEntry & {
    internalOnly?: boolean;
    kind?: string;
    lifecycle?: string;
    owner?: string;
    tags?: string[];
};

/**
 * /api/apps/registry
 *
 * Central source of truth for app + bot metadata.
 * Query params (all optional):
 *   - includeInternal=true | false  (default: false)
 *   - id=<appId>                   (if present, returns a single app)
 *   - kind=<kind>                  (e.g. "public-app", "internal-only")
 *   - lifecycle=<stage>            (e.g. "design", "build", "live")
 *   - owner=<owner>                (e.g. "digital-hooligan")
 *   - tag=<tag>                    (filters if tag is present)
 */
export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);

    const includeInternal = searchParams.get("includeInternal") === "true";
    const id = (searchParams.get("id") as AppId | null) || null;
    const kind = searchParams.get("kind");
    const lifecycle = searchParams.get("lifecycle");
    const owner = searchParams.get("owner");
    const tag = searchParams.get("tag");

    // Treat registry entries as FilterableApp for this endpoint
    let apps: FilterableApp[] = appRegistry as FilterableApp[];

    // Hide internal-only apps unless explicitly requested
    if (!includeInternal) {
        apps = apps.filter((app) => !app.internalOnly);
    }

    // If an id is provided, return a single app (or 404-style payload)
    if (id) {
        const app = apps.find((entry) => entry.id === id);

        if (!app) {
            return NextResponse.json(
                {
                    ok: false,
                    error: "not_found",
                    message: `No app found in registry for id "${id}".`,
                    id,
                },
                { status: 404 }
            );
        }

        return NextResponse.json({
            ok: true,
            app,
        });
    }

    // Otherwise, apply filters and return a list
    if (kind && kind !== "all") {
        apps = apps.filter((app) => app.kind === kind);
    }

    if (lifecycle && lifecycle !== "all") {
        apps = apps.filter((app) => app.lifecycle === lifecycle);
    }

    if (owner && owner !== "all") {
        apps = apps.filter((app) => app.owner === owner);
    }

    if (tag) {
        apps = apps.filter((app) => app.tags?.includes(tag));
    }

    return NextResponse.json({
        ok: true,
        total: apps.length,
        apps,
    });
}