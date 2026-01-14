// apps/digitalhooligan-web/lib/ceo-gate/env.ts

export function getCeoGatePassword(): string | null {
  const v = process.env.DH_CEO_GATE_PASSWORD;
  const trimmed = typeof v === "string" ? v.trim() : "";
  if (!trimmed) return null;
  return trimmed;
}

export function isProduction(): boolean {
  return process.env.NODE_ENV === "production";
}
