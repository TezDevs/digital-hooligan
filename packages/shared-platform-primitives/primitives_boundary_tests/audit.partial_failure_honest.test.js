import { describe, it, expect } from "vitest";
import { emitAudit } from "../src/primitives/audit";
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
describe("Audit (partial failure honesty)", () => {
    it("returns an audit_write_failure event when sink append fails (no silent failure)", async () => {
        const sink = {
            async append() {
                throw new Error("down");
            },
        };
        const out = await emitAudit(ctx, sink, {
            action: "create",
            objectType: "testObject",
            objectId: "o1",
            result: "success",
        });
        expect(out.primary).toBeDefined();
        expect(out.auditWriteFailure).toBeDefined();
        expect(out.auditWriteFailure?.action).toBe("audit_write_failure");
        expect(out.auditWriteFailure?.errorCode).toBe("AUDIT_WRITE_FAILED");
    });
});
//# sourceMappingURL=audit.partial_failure_honest.test.js.map