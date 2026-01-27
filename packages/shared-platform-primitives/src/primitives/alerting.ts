import { assertAuthority, type AuthorityContext } from "./authority";
import { PrimitiveError } from "./_errors";
import { sha256Hex } from "./hashing";

export type AlertTransport = "email" | "webhook" | "queue";

export type AlertDispatch = Readonly<{
  transport: AlertTransport;
  destination: string; // address or endpoint identifier (no secrets)
  payload: unknown;
}>;

export type AlertDispatchLog = Readonly<{
  dispatchedAt: string;
  workspaceId: string;
  transport: AlertTransport;
  destination: string;

  // payload fidelity preserved for consumers, but logs must not include PII/PHI secrets
  payloadHash: string;
  payloadPointer?: string;
}>;

export interface AlertSink {
  dispatch(ctx: AuthorityContext, d: AlertDispatch): Promise<void>;
}

/**
 * Meaning-free alert transport:
 * - does not infer severity/importance
 * - does not modify payload
 * - logs use pointer/hash strategy for sensitive classes
 */
export async function sendAlert(
  ctx: AuthorityContext,
  sink: AlertSink,
  dispatch: AlertDispatch & { payloadPointerForSensitive?: string },
): Promise<AlertDispatchLog> {
  const a = assertAuthority(ctx);
  if (!sink)
    throw new PrimitiveError("INVALID_INPUT", "AlertSink is required.");
  if (!dispatch.transport)
    throw new PrimitiveError("INVALID_INPUT", "transport is required.");
  if (!dispatch.destination)
    throw new PrimitiveError("INVALID_INPUT", "destination is required.");

  // No silent authority: refuse semantic "severity/priority" fields in the transport layer.
  const payloadStr = JSON.stringify(dispatch.payload ?? null);
  if (payloadStr.includes('"severity"') || payloadStr.includes('"priority"')) {
    throw new PrimitiveError(
      "PROHIBITED_FIELD",
      "Alert transport refuses semantic fields like severity/priority.",
    );
  }

  await sink.dispatch(
    a,
    Object.freeze({
      transport: dispatch.transport,
      destination: dispatch.destination,
      payload: dispatch.payload,
    }),
  );

  const dispatchedAt = new Date().toISOString();
  const payloadHash = sha256Hex(payloadStr);

  const isSensitive =
    a.dataClass === "pii" ||
    a.dataClass === "phi" ||
    a.dataClass === "restricted";
  const payloadPointer = isSensitive
    ? dispatch.payloadPointerForSensitive
    : undefined;

  // With exactOptionalPropertyTypes, omit optional keys rather than setting `undefined`.
  const log: AlertDispatchLog = Object.freeze({
    dispatchedAt,
    workspaceId: a.workspaceId,
    transport: dispatch.transport,
    destination: dispatch.destination,
    payloadHash,
    ...(payloadPointer ? { payloadPointer } : {}),
  });

  return log;
}
