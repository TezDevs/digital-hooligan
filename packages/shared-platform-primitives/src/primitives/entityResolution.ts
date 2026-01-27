import {
  assertAuthority,
  denyCrossWorkspace,
  type AuthorityContext,
} from "./authority";
import { generateOpaqueId, type ProvenanceEnvelope } from "./identity";
import { PrimitiveError } from "./_errors";

export type CanonicalEntity = Readonly<{
  id: string; // opaque
  workspaceId: string;
  createdAt: string;
  provenance: ProvenanceEnvelope;
}>;

export type EntityAlias = Readonly<{
  alias: string;
  canonicalEntityId: string;
  validFrom: string; // ISO
  validTo?: string; // ISO
  provenance: ProvenanceEnvelope;
}>;

export type ResolutionCandidate = Readonly<{
  canonicalEntityId: string;
  confidence: number; // bounded, not truth
  rationale: string; // descriptive, not decisive
}>;

// Use readonly arrays to avoid mutable/readonly mismatch.
export type ResolutionResult =
  | Readonly<{ state: "resolved"; candidates: readonly [ResolutionCandidate] }>
  | Readonly<{
      state: "contested";
      candidates: readonly ResolutionCandidate[];
    }>;

export interface EntityResolutionStore {
  createEntity(ctx: AuthorityContext): CanonicalEntity;
  addAlias(
    ctx: AuthorityContext,
    input: {
      canonicalEntityId: string;
      alias: string;
      validFrom: string;
      validTo?: string;
    },
  ): EntityAlias;
  resolve(
    ctx: AuthorityContext,
    input: { alias: string; atTime?: string },
  ): ResolutionResult;
  listAliases(ctx: AuthorityContext, canonicalEntityId: string): EntityAlias[];
}

/**
 * In-memory reference implementation.
 * - No "convenience merges"
 * - Ambiguity is surfaced as contested
 */
export function createInMemoryEntityResolutionStore(): EntityResolutionStore {
  const entities = new Map<string, CanonicalEntity>();
  const aliases: EntityAlias[] = [];

  return {
    createEntity(ctx) {
      const a = assertAuthority(ctx);
      const now = new Date().toISOString();
      const entity: CanonicalEntity = Object.freeze({
        id: generateOpaqueId(),
        workspaceId: a.workspaceId,
        createdAt: now,
        provenance: Object.freeze({
          sourceSystem: a.appId,
          actorId: a.actorId,
          actorType: a.actorType,
          environment: a.environment,
          createdAt: now,
          workspaceId: a.workspaceId,
        }),
      });
      entities.set(entity.id, entity);
      return entity;
    },

    addAlias(ctx, input) {
      const a = assertAuthority(ctx);
      if (!input.canonicalEntityId)
        throw new PrimitiveError(
          "INVALID_INPUT",
          "canonicalEntityId is required.",
        );
      if (!input.alias)
        throw new PrimitiveError("INVALID_INPUT", "alias is required.");
      if (!input.validFrom)
        throw new PrimitiveError("INVALID_INPUT", "validFrom is required.");

      const entity = entities.get(input.canonicalEntityId);
      if (!entity)
        throw new PrimitiveError(
          "INVALID_INPUT",
          "canonicalEntityId does not exist.",
        );
      denyCrossWorkspace(a.workspaceId, entity.workspaceId);

      // Preserve history: append-only alias list (no overwrite).
      const now = new Date().toISOString();
      const alias: EntityAlias = Object.freeze({
        alias: input.alias,
        canonicalEntityId: entity.id,
        validFrom: input.validFrom,
        ...(input.validTo ? { validTo: input.validTo } : {}),
        provenance: Object.freeze({
          sourceSystem: a.appId,
          actorId: a.actorId,
          actorType: a.actorType,
          environment: a.environment,
          createdAt: now,
          workspaceId: a.workspaceId,
        }),
      });
      aliases.push(alias);
      return alias;
    },

    resolve(ctx, input) {
      const a = assertAuthority(ctx);
      if (!input.alias)
        throw new PrimitiveError("INVALID_INPUT", "alias is required.");

      const at = input.atTime ?? new Date().toISOString();
      const matches = aliases.filter((x) => {
        // workspace isolation: only aliases created within the same workspace are visible
        if (x.provenance.workspaceId !== a.workspaceId) return false;
        if (x.alias !== input.alias) return false;
        if (x.validFrom > at) return false;
        if (x.validTo && x.validTo <= at) return false;
        return true;
      });

      const unique = Array.from(
        new Set(matches.map((m) => m.canonicalEntityId)),
      );

      if (unique.length === 0) {
        return Object.freeze({
          state: "contested",
          candidates: Object.freeze([]) as readonly ResolutionCandidate[],
        });
      }

      if (unique.length === 1) {
        const only: ResolutionCandidate = Object.freeze({
          canonicalEntityId: unique[0]!,
          confidence: 0.8,
          rationale: "Single alias match within workspace and time window.",
        });
        return Object.freeze({
          state: "resolved",
          candidates: Object.freeze([only]) as readonly [ResolutionCandidate],
        });
      }

      const candidates = Object.freeze(
        unique.map((id) =>
          Object.freeze({
            canonicalEntityId: id,
            confidence: 0.5,
            rationale:
              "Multiple valid canonical candidates; consumer must resolve ambiguity.",
          }),
        ),
      ) as readonly ResolutionCandidate[];

      return Object.freeze({
        state: "contested",
        candidates,
      });
    },

    listAliases(ctx, canonicalEntityId) {
      const a = assertAuthority(ctx);
      const entity = entities.get(canonicalEntityId);
      if (!entity) return [];
      denyCrossWorkspace(a.workspaceId, entity.workspaceId);
      return aliases.filter(
        (x) =>
          x.canonicalEntityId === canonicalEntityId &&
          x.provenance.workspaceId === a.workspaceId,
      );
    },
  };
}
