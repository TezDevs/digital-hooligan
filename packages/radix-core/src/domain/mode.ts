/**
 * CEO operational context.
 * Mode affects prioritization/emphasis, not truth.
 */
export type Mode = "Founder" | "Owner" | "Operator";

export const MODES: readonly Mode[] = ["Founder", "Owner", "Operator"] as const;
