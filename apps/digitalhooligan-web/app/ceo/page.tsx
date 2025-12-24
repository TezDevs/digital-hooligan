import DecisionMetadataPanel from '@/components/ceo/DecisionMetadataPanel';
import DecisionHistoryPanel from '@/components/ceo/DecisionHistoryPanel';
import DecisionExplanationPanel from '@/components/ceo/DecisionExplanationPanel';
import EvidenceTrailPanel from '@/components/ceo/EvidenceTrailPanel';
import { evaluateDecision } from '@/lib/decisionEngine';
import {
  EvidenceItem,
  DecisionEvent,
} from '@/lib/decisionTypes';


export default function CeoDashboardPage() {
  const decision = evaluateDecision({
    unresolvedIncidents: 2,
    degradedSystems: 1,
    dataFresh: false,
  });

  const history: DecisionEvent[] = [
  {
    id: 'evt-1',
    state: 'NOMINAL',
    summary: 'All systems healthy',
    evaluatedAt: '2025-12-24T12:30Z',
  },
  {
    id: 'evt-2',
    state: 'MONITOR',
    summary: 'Data freshness degraded',
    evaluatedAt: '2025-12-24T13:45Z',
  },
  {
    id: 'evt-3',
    state: 'ACT',
    summary: 'Incidents opened and health degraded',
    evaluatedAt: '2025-12-24T14:32Z',
  },
];

  const evidence: EvidenceItem[] = [
  {
    id: 'incidents-api',
    source: 'Incident Service',
    signal: 'Open incident count',
    status: 'used',
    timestamp: '2025-12-24T14:32Z',
  },
  {
    id: 'health-monitor',
    source: 'Health Monitor',
    signal: 'Degraded system count',
    status: 'used',
    timestamp: '2025-12-24T14:31Z',
  },
  {
    id: 'data-poller',
    source: 'Data Poller',
    signal: 'Freshness check',
    status: 'stale',
    timestamp: '2025-12-24T13:55Z',
  },
];

  return (
    <main className="space-y-6 p-6">
      <DecisionMetadataPanel
        snapshotId={decision.metadata.snapshotId}
        evaluatedAt={decision.metadata.evaluatedAt}
      />

      <DecisionHistoryPanel events={history} />

      <DecisionExplanationPanel
        state={decision.state}
        rules={decision.rules}
        completeness={decision.completeness}
      />

      <EvidenceTrailPanel items={evidence} />
    </main>
  );
}