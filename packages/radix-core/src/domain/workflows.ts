import type {
  AtlasOperatorId,
  IsoDateTimeString,
  WorkflowId,
  WorkflowStepId,
} from "./ids";

export type WorkflowStatus = "ready" | "draft" | "deprecated";

export interface PromptTemplate {
  title: string;
  body: string;
}

export interface WorkflowStep {
  id: WorkflowStepId;
  order: number;
  operatorId: AtlasOperatorId;
  purpose: string;

  requiredInputs: string[];
  produces: string[];

  promptTemplate: PromptTemplate;
}

export interface Workflow {
  id: WorkflowId;
  name: string;
  status: WorkflowStatus;

  description: string;
  tags: string[];

  outputs: string[];
  steps: WorkflowStep[];

  updatedAt: IsoDateTimeString;
}
