import { randomUUID } from "node:crypto";
import { assertAuthority, type AuthorityContext } from "./authority";
import { PrimitiveError } from "./_errors";

export type ProvenanceEnvelope = Readonly<{
  sourceSystem: string;
  actorId: string;
  actorType: "user" | "service" | "breakglass";
  environment: "dev" | "staging" | "prod";
  createdAt: string; // ISO-8601
  workspaceId: string;
}>;

export function generateOpaqueId(): string {
  // Opaque, non-semantic ID. Uses UUID v4. Environment must NOT be encoded. 【Identity Standard】【 [oai_citation:2‡System_Identity_Naming_and_Addressability_Standard_v1.docx](file-service://file-HykZCsLBFqiWCzo4kNsLB8)】
  return randomUUID();
}

export function createProvenance(
  ctx: AuthorityContext,
  sourceSystem: string,
  createdAt = new Date().toISOString(),
): ProvenanceEnvelope {
  const a = assertAuthority(ctx);
  if (!sourceSystem)
    throw new PrimitiveError("INVALID_INPUT", "sourceSystem is required.");
  return Object.freeze({
    sourceSystem,
    actorId: a.actorId,
    actorType: a.actorType,
    environment: a.environment,
    createdAt,
    workspaceId: a.workspaceId,
  });
}

/**
 * Replay-safe: caller must pass the original provenance if replaying.
 * This function will refuse to "invent" replay authority.
 */
export function preserveOrCreateProvenance(
  ctx: AuthorityContext,
  input: {
    sourceSystem: string;
    replayProvenance?: ProvenanceEnvelope;
    createdAt?: string;
  },
): ProvenanceEnvelope {
  assertAuthority(ctx);
  if (input.replayProvenance) {
    // Fail-closed if replay provenance shape is missing required fields.
    const p = input.replayProvenance;
    if (
      !p.sourceSystem ||
      !p.actorId ||
      !p.environment ||
      !p.createdAt ||
      !p.workspaceId
    ) {
      throw new PrimitiveError(
        "INVALID_INPUT",
        "replayProvenance is incomplete; refusing to infer fields.",
      );
    }
    return Object.freeze({ ...p });
  }
  return createProvenance(
    ctx,
    input.sourceSystem,
    input.createdAt ?? new Date().toISOString(),
  );
}
