import {
  assertAuthority,
  denyCrossWorkspace,
  type AuthorityContext,
} from "./authority";
import { generateOpaqueId, type ProvenanceEnvelope } from "./identity";
import { PrimitiveError } from "./_errors";
import { sha256Hex } from "./hashing";

export type EvidenceId = string;

export type EvidenceRef = Readonly<{
  id: EvidenceId;
  workspaceId: string;

  sourceUri: string;
  retrievedAt: string;

  // references, not embedded truth
  sourceHash?: string;

  // pointers for sensitive evidence
  contentPointer?: string;

  provenance: ProvenanceEnvelope;
}>;

export interface EvidenceRegistry {
  register(
    ctx: AuthorityContext,
    input: {
      sourceUri: string;
      retrievedAt?: string;
      sourceContentForHash?: string;
      contentPointer?: string;
    },
  ): EvidenceRef;
  get(ctx: AuthorityContext, id: EvidenceId): EvidenceRef | null;
}

export function createInMemoryEvidenceRegistry(): EvidenceRegistry {
  const byId = new Map<EvidenceId, EvidenceRef>();

  return {
    register(ctx, input) {
      const a = assertAuthority(ctx);
      if (!input.sourceUri)
        throw new PrimitiveError("INVALID_INPUT", "sourceUri is required.");

      const retrievedAt = input.retrievedAt ?? new Date().toISOString();
      const now = new Date().toISOString();

      const sourceHash = input.sourceContentForHash
        ? sha256Hex(input.sourceContentForHash)
        : undefined;
      const contentPointer = input.contentPointer;

      const ev: EvidenceRef = Object.freeze({
        id: generateOpaqueId(),
        workspaceId: a.workspaceId,
        sourceUri: input.sourceUri,
        retrievedAt,
        ...(sourceHash ? { sourceHash } : {}),
        ...(contentPointer ? { contentPointer } : {}),
        provenance: Object.freeze({
          sourceSystem: a.appId,
          actorId: a.actorId,
          actorType: a.actorType,
          environment: a.environment,
          createdAt: now,
          workspaceId: a.workspaceId,
        }),
      });

      byId.set(ev.id, ev);
      return ev;
    },

    get(ctx, id) {
      const a = assertAuthority(ctx);
      const ev = byId.get(id);
      if (!ev) return null;
      denyCrossWorkspace(a.workspaceId, ev.workspaceId);
      return ev;
    },
  };
}
