import { describe, it, expect } from "vitest";
import { createInMemoryEventTimelineStore } from "../src/primitives/eventTimeline";
const ctx = Object.freeze({
    workspaceId: "w1",
    actorType: "service",
    actorId: "svc-1",
    appId: "solum",
    environment: "dev",
    version: "1.0.0",
    buildTimestamp: "build",
    requestId: "req",
    traceId: "trace",
    dataClass: "internal",
});
describe("Event & Timeline (append-only, deterministic)", () => {
    it("does not expose mutation methods beyond append (prohibited behaviors not present)", () => {
        const store = createInMemoryEventTimelineStore();
        const t = store.createTimeline(ctx);
        //* @ts-expect-error - no delete method should exist
        expect(store.delete).toBeUndefined();
        //* @ts-expect-error - no update method should exist //
        expect(store.update).toBeUndefined();
        store.append(ctx, {
            timelineId: t.id,
            occurredAt: "2020-01-01T00:00:00.000Z",
            type: "ingest",
            entityIds: ["e1"],
        });
        const read = store.read(ctx, t.id);
        expect(read.length).toBe(1);
    });
});
//# sourceMappingURL=timeline.appendonly.test.js.map