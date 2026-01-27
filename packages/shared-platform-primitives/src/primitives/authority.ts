import { PrimitiveError } from "./_errors";

export type Environment = "dev" | "staging" | "prod";
export type ActorType = "user" | "service" | "breakglass";

export type DataClass = "none" | "internal" | "pii" | "phi" | "restricted";

export type AuthorityContext = Readonly<{
  workspaceId: string;
  actorType: ActorType;
  actorId: string;

  appId: string;
  environment: Environment;
  version: string;
  buildTimestamp: string;

  requestId: string;
  traceId: string;

  // Data sensitivity of the operation context (defaulting is forbidden; must be explicit)
  dataClass: DataClass;
}>;

export function assertAuthority(ctx: AuthorityContext): AuthorityContext {
  if (!ctx) {
    throw new PrimitiveError(
      "AUTHORITY_MISSING",
      "AuthorityContext is required (fail-closed).",
    );
  }
  if (!ctx.workspaceId)
    throw new PrimitiveError("WORKSPACE_MISSING", "workspaceId is required.");
  if (!ctx.actorId || !ctx.actorType)
    throw new PrimitiveError("ACTOR_MISSING", "actor identity is required.");
  if (!ctx.appId) throw new PrimitiveError("APP_MISSING", "appId is required.");
  if (!ctx.environment)
    throw new PrimitiveError("ENV_MISSING", "environment is required.");
  if (!ctx.version)
    throw new PrimitiveError("VERSION_MISSING", "version is required.");
  if (!ctx.buildTimestamp)
    throw new PrimitiveError("VERSION_MISSING", "buildTimestamp is required.");
  if (!ctx.requestId)
    throw new PrimitiveError("INVALID_INPUT", "requestId is required.");
  if (!ctx.traceId)
    throw new PrimitiveError("INVALID_INPUT", "traceId is required.");

  const allowed: Set<string> = new Set([
    "none",
    "internal",
    "pii",
    "phi",
    "restricted",
  ]);
  if (!allowed.has(ctx.dataClass)) {
    throw new PrimitiveError(
      "DATA_CLASS_INVALID",
      "dataClass must be one of none|internal|pii|phi|restricted.",
      {
        got: ctx.dataClass,
      },
    );
  }

  return Object.freeze({ ...ctx });
}

export function denyCrossWorkspace(
  currentWorkspaceId: string,
  targetWorkspaceId: string,
): void {
  if (
    !currentWorkspaceId ||
    !targetWorkspaceId ||
    currentWorkspaceId !== targetWorkspaceId
  ) {
    throw new PrimitiveError(
      "CROSS_WORKSPACE_DENIED",
      "Cross-workspace access is denied by default.",
      {
        currentWorkspaceId,
        targetWorkspaceId,
      },
    );
  }
}
