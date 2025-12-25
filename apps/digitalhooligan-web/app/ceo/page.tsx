import DecisionMetadataPanel from "@/components/ceo/DecisionMetadataPanel";
import DecisionHistoryPanel from "@/components/ceo/DecisionHistoryPanel";
import DecisionReplayPanel from "@/components/ceo/DecisionReplayPanel";
import DecisionActionsPanel from "@/components/ceo/DecisionActionsPanel";
import DecisionExplanationPanel from "@/components/ceo/DecisionExplanationPanel";
import DecisionInputsInspector from "@/components/ceo/DecisionInputsInspector";

import EvidenceTrailPanel from "@/components/ceo/EvidenceTrailPanel";

import { evaluateDecision } from "@/lib/decisionEngine";
import { getDecisionInputs } from "@/lib/decisionSources";
import { deriveDecisionConfidence } from "@/lib/decisionConfidence";
import { evaluateDecisionActions } from "@/lib/decisionActions";
import { replayDecision } from "@/lib/decisionReplay";
import { diffDecisions } from "@/lib/decisionDiff";
import DecisionInputsInspector from "@/components/ceo/DecisionInputsInspector";

import {
  DecisionEvent,
  DecisionSnapshot,
  EvidenceItem,
} from "@/lib/decisionTypes";

export default async function CeoDashboardPage() {
  const inputs = await getDecisionInputs();
  const evaluated = evaluateDecision(inputs);

  const confidence = deriveDecisionConfidence(
    evaluated.state,
    evaluated.completeness
  );

  const actions = evaluateDecisionActions(
    evaluated.state,
    confidence,
    { blocked: false, reasons: [], allowedState: evaluated.state },
    evaluated.metadata.snapshotId
  );

  const snapshot: DecisionSnapshot = {
    id: evaluated.metadata.snapshotId,
    evaluatedAt: evaluated.metadata.evaluatedAt,
    inputs,
    result: {
      state: evaluated.state,
      confidence,
      actions,
    },
  };

  const replayed = replayDecision(snapshot);
  const diff = diffDecisions(snapshot, replayed);

  const history: DecisionEvent[] = [
    {
      id: "evt-1",
      state: "NOMINAL",
      summary: "All systems healthy",
      evaluatedAt: "2025-12-24T12:30Z",
    },
    {
      id: "evt-2",
      state: "MONITOR",
      summary: "Data freshness degraded",
      evaluatedAt: "2025-12-24T13:45Z",
    },
    {
      id: "evt-3",
      state: "ACT",
      summary: "Incidents opened and health degraded",
      evaluatedAt: "2025-12-24T14:32Z",
    },
  ];

  const evidence: EvidenceItem[] = [
    {
      id: "incidents-api",
      source: "Incident Service",
      signal: "Open incident count",
      status: "used",
      timestamp: snapshot.evaluatedAt,
    },
    {
      id: "health-monitor",
      source: "Health Monitor",
      signal: "Degraded system count",
      status: "used",
      timestamp: snapshot.evaluatedAt,
    },
    {
      id: "data-poller",
      source: "Data Poller",
      signal: "Freshness check",
      status: "stale",
      timestamp: snapshot.evaluatedAt,
    },
  ];

  return (
    <main className="space-y-6 p-6">
      <DecisionMetadataPanel
        snapshotId={snapshot.id}
        evaluatedAt={snapshot.evaluatedAt}
        confidence={confidence}
      />
      <DecisionReplayPanel diff={diff} />
      <DecisionHistoryPanel events={history} />

      <DecisionActionsPanel actions={actions} />

      <DecisionExplanationPanel
        state={evaluated.state}
        rules={evaluated.rules}
        completeness={evaluated.completeness}
      />

      <EvidenceTrailPanel items={evidence} />
      <DecisionInputsInspector />
    </main>
  );
}
