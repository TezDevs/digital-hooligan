import DecisionExplanationPanel from '@/components/ceo/DecisionExplanationPanel';
import EvidenceTrailPanel from '@/components/ceo/EvidenceTrailPanel';
import { evaluateDecision } from '@/lib/decisionEngine';

export default function CeoDashboardPage() {
  const decision = evaluateDecision({
    unresolvedIncidents: 2,
    degradedSystems: 1,
    dataFresh: false,
  });

  type EvidenceItem = {
  id: string;
  source: string;
  signal: string;
  status: 'used' | 'missing' | 'stale';
  timestamp?: string;
};

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
      <DecisionExplanationPanel
        state={decision.state}
        rules={decision.rules}
        completeness={decision.completeness}
      />

      <EvidenceTrailPanel items={evidence} />
    </main>
  );
}