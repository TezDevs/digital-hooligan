import {
  assertAuthority,
  type AuthorityContext,
} from "@digitalhooligan/shared-platform-primitives";
import {
  buildAuthorityContext,
  type AuthorityContextInput,
} from "./authorityContext";

export type ContextPackId = string;

export type ContextPack = Readonly<{
  id: ContextPackId;
  workspaceId: string;
  createdAt: string;
  // Context is descriptive only; no workflow semantics allowed here.
  assumptions: readonly string[];
  constraints: readonly string[];
  evidenceRefs: readonly string[];
  entityRefs: readonly string[];
  freshness: Readonly<{ retrievedAt: string; decayHint?: string }>;
}>;

/**
 * Pondus adapter boundary error.
 * - No authority implied.
 * - Used for fail-closed boundary enforcement (missing client, invalid inputs).
 */
export class PondusAdapterError extends Error {
  public readonly code: string;

  constructor(code: string, message: string) {
    super(message);
    this.name = "PondusAdapterError";
    this.code = code;
  }
}

/**
 * Pondus client contract:
 * - This adapter does NOT implement Pondus storage.
 * - It only defines the boundary + enforcement rules.
 */
export interface PondusClient {
  getContextPack(
    ctx: AuthorityContext,
    id: ContextPackId,
  ): Promise<ContextPack | null>;
  listContextPacksForEntity(
    ctx: AuthorityContext,
    entityId: string,
  ): Promise<readonly ContextPackId[]>;
}

export function buildContextClient(
  input: AuthorityContextInput,
  client: PondusClient,
): { ctx: AuthorityContext; client: PondusClient } {
  if (!client)
    throw new PondusAdapterError(
      "PONDUS_CLIENT_MISSING",
      "PondusClient is required.",
    );

  const ctx = buildAuthorityContext(input);

  // Fail-closed: validate ctx now, not later.
  assertAuthority(ctx);

  return Object.freeze({ ctx, client });
}
