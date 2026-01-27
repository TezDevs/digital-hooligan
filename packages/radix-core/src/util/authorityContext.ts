import {
  assertAuthority,
  type ActorType,
  type AuthorityContext,
  type DataClass,
  type Environment,
} from "@digitalhooligan/shared-platform-primitives";

/**
 * Radix-core edge builder for AuthorityContext.
 *
 * Invariants:
 * - Fail-closed: no defaults are applied.
 * - No silent authority: every field must be explicitly supplied.
 * - Workspace isolation: carried explicitly via workspaceId (never inferred).
 */
export type AuthorityContextInput = Readonly<{
  workspaceId: string;

  actorType: ActorType;
  actorId: string;

  appId: string;
  environment: Environment;
  version: string;
  buildTimestamp: string;

  requestId: string;
  traceId: string;

  dataClass: DataClass;
}>;

export function buildAuthorityContext(
  input: AuthorityContextInput,
): AuthorityContext {
  // assertAuthority performs strict validation + freezes output (fail-closed)
  return assertAuthority(input);
}
