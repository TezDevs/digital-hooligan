import type { HealthCheckId, IsoDateTimeString } from "./ids";
import type { DataSource } from "./metrics";

/**
 * v1 health model: simple composite score with explicit breakdown.
 * No inferred values; everything is manual/mock/integration.
 */
export interface HealthBreakdown {
  hours: number; // 0-100
  cognitive: number; // 0-100
  bus: number; // 0-100 (business continuity / "bus factor" resilience)
  stress: number; // 0-100 (higher = better, i.e., lower stress)
  leverage: number; // 0-100 (systems + delegation)
}

export interface HealthCheck {
  id: HealthCheckId;
  occurredAt: IsoDateTimeString;

  /**
   * 0-100 composite. Derived deterministically from breakdown in v1.
   * If you want a different formula later, change computeCompositeHealthScore().
   */
  compositeScore: number;

  breakdown: HealthBreakdown;

  source: DataSource;
  lastUpdatedAt: IsoDateTimeString;
}

export interface HealthWeights {
  hours: number;
  cognitive: number;
  bus: number;
  stress: number;
  leverage: number;
}

/**
 * Default weights (sum to 1.0).
 * Adjust later via Decision if desired.
 */
export const DEFAULT_HEALTH_WEIGHTS: HealthWeights = {
  hours: 0.2,
  cognitive: 0.25,
  bus: 0.25,
  stress: 0.15,
  leverage: 0.15,
};

export function computeCompositeHealthScore(
  breakdown: HealthBreakdown,
  weights: HealthWeights = DEFAULT_HEALTH_WEIGHTS
): number {
  const raw =
    breakdown.hours * weights.hours +
    breakdown.cognitive * weights.cognitive +
    breakdown.bus * weights.bus +
    breakdown.stress * weights.stress +
    breakdown.leverage * weights.leverage;

  // clamp 0..100 and round to nearest integer for stable UI
  const clamped = Math.max(0, Math.min(100, raw));
  return Math.round(clamped);
}
