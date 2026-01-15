import type { AtlasOperator } from "../domain/atlas";
import type { Workflow, WorkflowStep } from "../domain/workflows";

import { ATLAS_REGISTRY_MOCK } from "../mocks/atlasRegistry.mock";

export interface AiHubReferenceIssue {
  type: "missing_operator";
  operatorId: string;
  workflowId: string;
  workflowStepId: string;
  message: string;
}

export interface AiHubView {
  operators: AtlasOperator[];
  workflows: Workflow[];

  /**
   * v1: explicit issues for missing references.
   * UI can show these in a “Registry Health” panel.
   */
  issues: AiHubReferenceIssue[];
}

export function buildAiHubView(): AiHubView {
  const operators = ATLAS_REGISTRY_MOCK.operators;
  const workflows = ATLAS_REGISTRY_MOCK.workflows;

  const operatorById = new Map<string, AtlasOperator>();
  for (const op of operators) operatorById.set(op.id, op);

  const issues: AiHubReferenceIssue[] = [];

  // Validate workflow operator references
  for (const wf of workflows) {
    for (const step of wf.steps) {
      if (!operatorById.has(step.operatorId)) {
        issues.push(missingOperatorIssue(wf.id, step));
      }
    }
  }

  // Stable sort: operators by name, workflows by name
  const sortedOperators = [...operators].sort((a, b) =>
    a.name.localeCompare(b.name)
  );
  const sortedWorkflows = [...workflows].sort((a, b) =>
    a.name.localeCompare(b.name)
  );

  return {
    operators: sortedOperators,
    workflows: sortedWorkflows,
    issues,
  };
}

function missingOperatorIssue(
  workflowId: string,
  step: WorkflowStep
): AiHubReferenceIssue {
  return {
    type: "missing_operator",
    operatorId: step.operatorId,
    workflowId,
    workflowStepId: step.id,
    message: `Workflow "${workflowId}" step "${step.id}" references missing operator "${step.operatorId}".`,
  };
}
