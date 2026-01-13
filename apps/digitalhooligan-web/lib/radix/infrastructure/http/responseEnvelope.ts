import { ApiEnvelope, ApiError, IdentityMeta, ISODateTime } from "../../domain/radixTypes";

function nowIso(): ISODateTime {
  return new Date().toISOString();
}

/**
 * v1: identity meta is explicit.
 * - appId is hard-coded for this app
 * - environment tries to read NODE_ENV but does not infer anything else
 * - version/buildTimestamp are safe placeholders until you wire a real build identity
 */
export function getIdentityMeta(): IdentityMeta {
  const env = process.env.NODE_ENV ?? "dev";
  return {
    appId: "digitalhooligan-web",
    environment: env,
    version: "0.0.0-dev",
    buildTimestamp: nowIso(),
  };
}

export function ok<T>(data: T): ApiEnvelope<T> {
  return { data, error: null, meta: getIdentityMeta() };
}

export function fail(message: string, code?: string, details?: unknown): ApiEnvelope<null> {
  const error: ApiError = { message, code, details };
  return { data: null, error, meta: getIdentityMeta() };
}
