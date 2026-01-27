import { describe, it, expect } from "vitest";
import { createInMemoryEntityResolutionStore } from "../src/primitives/entityResolution";
const ctx = Object.freeze({
    workspaceId: "w1",
    actorType: "service",
    actorId: "svc-1",
    appId: "radix-core",
    environment: "dev",
    version: "1.0.0",
    buildTimestamp: "build",
    requestId: "req",
    traceId: "trace",
    dataClass: "internal",
});
describe("Entity Resolution (no convenience merges; ambiguity surfaced)", () => {
    it("returns contested when multiple candidates exist (no forced merge)", () => {
        const store = createInMemoryEntityResolutionStore();
        const e1 = store.createEntity(ctx);
        const e2 = store.createEntity(ctx);
        store.addAlias(ctx, {
            canonicalEntityId: e1.id,
            alias: "ACME",
            validFrom: "2020-01-01T00:00:00.000Z",
        });
        store.addAlias(ctx, {
            canonicalEntityId: e2.id,
            alias: "ACME",
            validFrom: "2020-01-01T00:00:00.000Z",
        });
        const res = store.resolve(ctx, {
            alias: "ACME",
            atTime: "2021-01-01T00:00:00.000Z",
        });
        expect(res.state).toBe("contested");
        expect(res.candidates.length).toBe(2);
    });
});
//# sourceMappingURL=entityResolution.no_merges.test.js.map