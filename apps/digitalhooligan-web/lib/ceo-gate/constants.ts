// apps/digitalhooligan-web/lib/ceo-gate/constants.ts

export const CEO_GATE_COOKIE_NAME = "dh_ceo_gate";

// 7 days (baseline). Adjust if you want shorter.
export const CEO_GATE_COOKIE_MAX_AGE_SECONDS = 60 * 60 * 24 * 7;

// Where unauthenticated users should be sent.
// Middleware will append ?next=<path>
export const CEO_GATE_ENTRY_PATH = "/ceo/login";

// API endpoints that must not be blocked by the gate
export const CEO_GATE_API_ALLOWLIST = new Set<string>([
  "/api/ceo/login",
  "/api/ceo/logout",
]);
