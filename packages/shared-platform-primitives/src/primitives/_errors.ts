export type PrimitiveErrorCode =
  | "AUTHORITY_MISSING"
  | "WORKSPACE_MISSING"
  | "ACTOR_MISSING"
  | "ENV_MISSING"
  | "APP_MISSING"
  | "VERSION_MISSING"
  | "DATA_CLASS_INVALID"
  | "CROSS_WORKSPACE_DENIED"
  | "AMBIGUOUS_RESOLUTION"
  | "PROHIBITED_FIELD"
  | "PONDUS_CLIENT_MISSING"
  | "AUDIT_WRITE_FAILED"
  | "INVALID_INPUT";

export class PrimitiveError extends Error {
  public readonly code: PrimitiveErrorCode;
  // With exactOptionalPropertyTypes, prefer explicit union over optional property assignment.
  public readonly details: Record<string, unknown> | undefined;

  constructor(
    code: PrimitiveErrorCode,
    message: string,
    details?: Record<string, unknown>,
  ) {
    super(message);
    this.name = "PrimitiveError";
    this.code = code;
    this.details = details;
  }
}
