import { assertAuthority, type AuthorityContext } from "./authority";
import { generateOpaqueId } from "./identity";
import { PrimitiveError } from "./_errors";
import { sha256Hex } from "./hashing";

export type AuditId = string;

export type AuditAction =
  | "create"
  | "update"
  | "delete"
  | "read"
  | "export"
  | "permission_change"
  | "login"
  | "token_rotate"
  | "audit_write_failure";

export type AuditEvent = Readonly<{
  auditId: AuditId;
  timestamp: string;

  actorType: "user" | "service" | "breakglass";
  actorId: string;

  appId: string;
  environment: "dev" | "staging" | "prod";
  version: string;
  buildTimestamp: string;

  workspaceId: string;

  requestId: string;
  traceId: string;

  action: AuditAction;
  objectType: string;
  objectId?: string;
  objectIds?: readonly string[];

  fieldMask?: readonly string[];

  result: "success" | "denied" | "error" | "partial";
  errorCode?: string;

  integrity: Readonly<{
    previousAuditId?: string;
    eventHash: string;
    payloadHash?: string;
  }>;

  dataClass: "none" | "internal" | "pii" | "phi" | "restricted";
  containsSensitive: boolean;
}>;

export interface AuditSink {
  append(event: AuditEvent): Promise<void>;
}

/**
 * Best-effort audit emitter:
 * - Never blocks the caller by throwing (except invalid ctx/input).
 * - If sink fails, returns a second "audit_write_failure" event to be emitted to telemetry by the caller.
 */
export async function emitAudit(
  ctx: AuthorityContext,
  sink: AuditSink,
  input: Omit<
    AuditEvent,
    "auditId" | "timestamp" | "integrity" | "containsSensitive"
  > & {
    previousAuditId?: string;
    payloadForHash?: unknown;
  },
): Promise<{ primary: AuditEvent; auditWriteFailure?: AuditEvent }> {
  const a = assertAuthority(ctx);
  if (!sink)
    throw new PrimitiveError("INVALID_INPUT", "AuditSink is required.");

  const timestamp = new Date().toISOString();
  const normalized = JSON.stringify({
    ...input,
    payloadForHash: undefined,
  });

  const payloadHash =
    input.payloadForHash !== undefined
      ? sha256Hex(JSON.stringify(input.payloadForHash))
      : undefined;

  const integrity = Object.freeze({
    ...(input.previousAuditId
      ? { previousAuditId: input.previousAuditId }
      : {}),
    eventHash: sha256Hex(normalized),
    ...(payloadHash ? { payloadHash } : {}),
  });

  // Omit optional keys when undefined (exactOptionalPropertyTypes).
  const primary: AuditEvent = Object.freeze({
    auditId: generateOpaqueId(),
    timestamp,
    actorType: a.actorType,
    actorId: a.actorId,
    appId: a.appId,
    environment: a.environment,
    version: a.version,
    buildTimestamp: a.buildTimestamp,
    workspaceId: a.workspaceId,
    requestId: a.requestId,
    traceId: a.traceId,
    action: input.action,
    objectType: input.objectType,
    ...(input.objectId ? { objectId: input.objectId } : {}),
    ...(input.objectIds
      ? { objectIds: Object.freeze([...input.objectIds]) }
      : {}),
    ...(input.fieldMask
      ? { fieldMask: Object.freeze([...input.fieldMask]) }
      : {}),
    result: input.result,
    ...(input.errorCode ? { errorCode: input.errorCode } : {}),
    integrity,
    dataClass: a.dataClass,
    containsSensitive: a.dataClass !== "none" && a.dataClass !== "internal",
  });

  try {
    await sink.append(primary);
    return { primary };
  } catch {
    // Honest partial failure; never silent.
    const failureIntegrity = Object.freeze({
      previousAuditId: primary.auditId,
      eventHash: sha256Hex(JSON.stringify({ failureOf: primary.auditId })),
      // payloadHash intentionally omitted
    });

    const failure: AuditEvent = Object.freeze({
      ...primary,
      auditId: generateOpaqueId(),
      action: "audit_write_failure",
      result: "partial",
      errorCode: "AUDIT_WRITE_FAILED",
      integrity: failureIntegrity,
    });

    return { primary, auditWriteFailure: failure };
  }
}
