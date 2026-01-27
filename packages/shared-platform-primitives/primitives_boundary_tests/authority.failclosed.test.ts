import { describe, it, expect } from "vitest";
import { assertAuthority } from "../src/primitives/authority";

describe("AuthorityContext (fail-closed boundaries)", () => {
  it("rejects missing workspaceId (no cross-tenant ambiguity)", () => {
    expect(() =>
      assertAuthority({
        //* @ts-expect-error
        workspaceId: "",
        actorType: "user",
        actorId: "u1",
        appId: "app",
        environment: "dev",
        version: "1.0.0",
        buildTimestamp: "t",
        requestId: "r",
        traceId: "t2",
        dataClass: "internal",
      }),
    ).toThrow(/workspaceId is required/);
  });

  it("rejects missing actor identity (no silent authority)", () => {
    expect(() =>
      assertAuthority({
        workspaceId: "w1",
        //* @ts-expect-error
        actorType: "user",
        //* @ts-expect-error
        actorId: "",
        appId: "app",
        environment: "dev",
        version: "1.0.0",
        buildTimestamp: "t",
        requestId: "r",
        traceId: "t2",
        dataClass: "internal",
      }),
    ).toThrow(/actor identity is required/);
  });

  it("rejects invalid dataClass (must be explicit taxonomy)", () => {
    expect(() =>
      assertAuthority({
        workspaceId: "w1",
        actorType: "user",
        actorId: "u1",
        appId: "app",
        environment: "dev",
        version: "1.0.0",
        buildTimestamp: "t",
        requestId: "r",
        traceId: "t2",
        // @ts-expect-error
        dataClass: "secret",
      }),
    ).toThrow(/dataClass must be one of/);
  });
});
