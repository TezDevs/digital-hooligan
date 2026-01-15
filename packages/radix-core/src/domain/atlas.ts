import type { AtlasOperatorId, IsoDateTimeString } from "./ids";

export type OperatorStatus = "ready" | "draft" | "deprecated";

export interface MasterPromptRef {
  /**
   * v1: metadata only. Do not embed secrets.
   * - repo_path: relative path in repo (preferred later)
   * - url: external (only if safe/public)
   * - note: descriptive text if no link available
   */
  kind: "repo_path" | "url" | "note";
  ref: string;
  version?: string;
}

export interface AtlasOperator {
  id: AtlasOperatorId;
  name: string;
  role: string;
  status: OperatorStatus;

  description: string;

  scopeTags: string[];

  expectedInputs: string[];
  expectedOutputs: string[];

  masterPrompt: MasterPromptRef;

  updatedAt: IsoDateTimeString;
}
