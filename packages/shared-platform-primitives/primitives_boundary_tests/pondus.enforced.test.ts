import { describe, it, expect } from "vitest";
import {
  createPondusContextGateway,
  type PondusClient,
} from "../src/primitives/pondusContext";
import type { AuthorityContext } from "../src/primitives/authority";

const ctx: AuthorityContext = Object.freeze({
  workspaceId: "w1",
  actorType: "service",
  actorId: "svc-1",
  appId: "pondus-consumer",
  environment: "dev",
  version: "1.0.0",
  buildTimestamp: "build",
  requestId: "req",
  traceId: "trace",
  dataClass: "internal",
});

describe("Pondus Context (must use Pondus APIs; no semantics)", () => {
  it("fails closed if prohibited semantic fields appear in the context pack", async () => {
    const client: PondusClient = {
      async putContextPack() {
        return { id: "x" };
      },
      async getContextPacks() {
        return [];
      },
    };

    const gw = createPondusContextGateway(client);

    await expect(
      gw.createContextPack(ctx, {
        entityIds: ["e1"],
        evidenceIds: [],
        assumptions: ["a1"],
        constraints: [],
        freshness: { decayHint: "unknown" },
        // prohibited semantic hint
        //* @ts-expect-error
        decision: "approve",
      } as any),
    ).rejects.toThrow(/Prohibited semantic field/);
  });
});
