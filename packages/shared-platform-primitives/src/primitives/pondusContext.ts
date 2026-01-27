import {
  assertAuthority,
  denyCrossWorkspace,
  type AuthorityContext,
} from "./authority";
import { generateOpaqueId, type ProvenanceEnvelope } from "./identity";
import { PrimitiveError } from "./_errors";

export type ContextPackId = string;

export type ContextFreshness = Readonly<{
  // descriptive markers, not prescriptive
  retrievedAt?: string; // ISO
  expiresAt?: string; // ISO
  decayHint?: "stale" | "unknown" | "fresh";
}>;

export type ContextPack = Readonly<{
  id: ContextPackId;
  workspaceId: string;

  entityIds: readonly string[];
  evidenceIds: readonly string[];

  assumptions: readonly string[];
  constraints: readonly string[];

  freshness: ContextFreshness;

  provenance: ProvenanceEnvelope;

  createdAt: string; // ISO
}>;

export type PondusPutResult = Readonly<{ id: ContextPackId }>;

export interface PondusClient {
  putContextPack(
    ctx: AuthorityContext,
    pack: ContextPack,
  ): Promise<PondusPutResult>;
  getContextPacks(
    ctx: AuthorityContext,
    query: {
      workspaceId: string;
      entityId?: string;
      since?: string;
      until?: string;
    },
  ): Promise<readonly ContextPack[]>;
}

/**
 * Enforced invariant: Context packaging & retrieval MUST go through Pondus APIs.
 * This module provides a strict wrapper that:
 * - requires a PondusClient (fail-closed)
 * - refuses prohibited fields that look like "decision" or "signal" semantics
 */
export function createPondusContextGateway(client: PondusClient) {
  if (!client)
    throw new PrimitiveError(
      "PONDUS_CLIENT_MISSING",
      "PondusClient is required (fail-closed).",
    );

  function assertNoProhibitedFields(obj: unknown): void {
    const s = JSON.stringify(obj);
    // Hard deny likely semantic boundary collapses (minimal, explicit, fail-closed).
    const prohibited = [
      "decision",
      "execute",
      "recommend",
      "approval",
      "signalScore",
      "verdict",
    ];
    for (const p of prohibited) {
      if (s.includes(`"${p}"`) || s.includes(`'${p}'`)) {
        throw new PrimitiveError(
          "PROHIBITED_FIELD",
          `Prohibited semantic field detected in context pack: ${p}`,
        );
      }
    }
  }

  return Object.freeze({
    async createContextPack(
      ctx: AuthorityContext,
      input: Omit<
        ContextPack,
        "id" | "workspaceId" | "createdAt" | "provenance"
      > & { provenance?: ProvenanceEnvelope },
    ): Promise<ContextPack> {
      const a = assertAuthority(ctx);

      assertNoProhibitedFields(input);

      const createdAt = new Date().toISOString();
      const prov: ProvenanceEnvelope =
        input.provenance ??
        Object.freeze({
          sourceSystem: a.appId,
          actorId: a.actorId,
          actorType: a.actorType,
          environment: a.environment,
          createdAt,
          workspaceId: a.workspaceId,
        });

      const pack: ContextPack = Object.freeze({
        id: generateOpaqueId(),
        workspaceId: a.workspaceId,
        entityIds: Object.freeze([...(input.entityIds ?? [])]),
        evidenceIds: Object.freeze([...(input.evidenceIds ?? [])]),
        assumptions: Object.freeze([...(input.assumptions ?? [])]),
        constraints: Object.freeze([...(input.constraints ?? [])]),
        freshness: Object.freeze({ ...(input.freshness ?? {}) }),
        provenance: Object.freeze({ ...prov }),
        createdAt,
      });

      await client.putContextPack(a, pack);
      return pack;
    },

    async retrieveByEntity(
      ctx: AuthorityContext,
      entityId: string,
    ): Promise<readonly ContextPack[]> {
      const a = assertAuthority(ctx);
      if (!entityId)
        throw new PrimitiveError("INVALID_INPUT", "entityId is required.");
      const packs = await client.getContextPacks(a, {
        workspaceId: a.workspaceId,
        entityId,
      });
      // enforce isolation (fail-closed even if client misbehaves)
      packs.forEach((p) => denyCrossWorkspace(a.workspaceId, p.workspaceId));
      return Object.freeze(packs.map((p) => Object.freeze({ ...p })));
    },
  });
}
