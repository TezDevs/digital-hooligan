import { PrimitiveError } from "./_errors";

export type Completeness = "complete" | "partial" | "unknown";

export type ExplainabilitySurface = Readonly<{
  completeness: Completeness;
  uncertainties: readonly string[];

  provenanceTrail: readonly Readonly<{
    objectType: string;
    objectId: string;
    createdAt: string;
    sourceSystem: string;
    actorId: string;
  }>[];

  evidenceIds: readonly string[];
  contextPackIds: readonly string[];
}>;

/**
 * "Explainability without advice":
 * - exposes what is known and what is missing
 * - forbids recommendation-like fields (fail-closed)
 */
export function createExplainabilitySurface(
  input: ExplainabilitySurface,
): ExplainabilitySurface {
  if (!input)
    throw new PrimitiveError(
      "INVALID_INPUT",
      "ExplainabilitySurface input is required.",
    );
  const s = JSON.stringify(input);
  const prohibited = [
    "recommend",
    "should",
    "action",
    "execute",
    "approve",
    "priority",
  ];
  for (const p of prohibited) {
    if (s.includes(`"${p}"`)) {
      throw new PrimitiveError(
        "PROHIBITED_FIELD",
        `Explainability surface contains prohibited advice-like field: ${p}`,
      );
    }
  }
  return Object.freeze({
    completeness: input.completeness,
    uncertainties: Object.freeze([...(input.uncertainties ?? [])]),
    provenanceTrail: Object.freeze(
      [...(input.provenanceTrail ?? [])].map((x) => Object.freeze({ ...x })),
    ),
    evidenceIds: Object.freeze([...(input.evidenceIds ?? [])]),
    contextPackIds: Object.freeze([...(input.contextPackIds ?? [])]),
  });
}
