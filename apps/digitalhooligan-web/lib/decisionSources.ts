export type DecisionSourceInput = {
  unresolvedIncidents?: number;
  degradedSystems?: number;
  dataFresh?: boolean;
};

/**
 * Incident summary adapter
 * Replace internals with real API call later
 */
async function getIncidentSummary(): Promise<number | undefined> {
  // MOCK
  return 2;
}

/**
 * Health summary adapter
 */
async function getHealthSummary(): Promise<number | undefined> {
  // MOCK
  return 1;
}

/**
 * Data freshness adapter
 */
async function getFreshnessStatus(): Promise<boolean | undefined> {
  // MOCK: false = not fresh
  return false;
}

/**
 * Aggregate all sources into a normalized input
 */
export async function getDecisionInputs(): Promise<DecisionSourceInput> {
  const [
    unresolvedIncidents,
    degradedSystems,
    dataFresh,
  ] = await Promise.all([
    getIncidentSummary(),
    getHealthSummary(),
    getFreshnessStatus(),
  ]);

  return {
    unresolvedIncidents,
    degradedSystems,
    dataFresh,
  };
}