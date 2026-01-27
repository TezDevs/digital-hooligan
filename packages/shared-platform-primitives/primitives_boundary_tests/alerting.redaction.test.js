import { describe, it, expect } from "vitest";
import { sendAlert } from "../src/primitives/alerting";
const sink = {
    async dispatch() {
        return;
    },
};
describe("Alerting (meaning-free; no sensitive payload in logs)", () => {
    it("returns only payloadHash/pointer for sensitive classes (no payload echo)", async () => {
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
            dataClass: "pii",
        });
        const payload = { email: "person@example.com", secret: "do-not-log" };
        const log = await sendAlert(ctx, sink, {
            transport: "webhook",
            destination: "downstream-hook",
            payload,
            payloadPointerForSensitive: "secure://pointer/123",
        });
        expect(log.payloadHash).toMatch(/[a-f0-9]{64}/);
        expect(log.payloadPointer).toBe("secure://pointer/123");
        // ensure log does not contain raw payload fields
        expect(JSON.stringify(log)).not.toContain("person@example.com");
        expect(JSON.stringify(log)).not.toContain("do-not-log");
    });
    it("refuses semantic fields like severity/priority (no authority assumptions)", async () => {
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
        await expect(sendAlert(ctx, sink, {
            transport: "webhook",
            destination: "downstream-hook",
            payload: { severity: "high", msg: "nope" },
        })).rejects.toThrow(/refuses semantic fields/);
    });
});
//# sourceMappingURL=alerting.redaction.test.js.map