import { DecisionConfidence, DecisionState } from "./decisionTypes";

export type ActionAuditEntry = {
  id: string;
  snapshotId: string;
  actionId: string;
  actionLabel: string;
  enabled: boolean;
  reason?: string;
  decisionState: DecisionState;
  confidence: DecisionConfidence;
  evaluatedAt: string;
};
