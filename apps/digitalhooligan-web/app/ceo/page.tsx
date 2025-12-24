import DecisionExplanationPanel from '@/components/ceo/DecisionExplanationPanel';

type DecisionRule = {
  id: string;
  label: string;
  description: string;
  status: 'passed' | 'failed' | 'unknown';
};

export default function CeoDashboardPage() {
  const decisionState: 'ACT' | 'MONITOR' | 'NOMINAL' = 'ACT';

  const decisionRules: DecisionRule[] = [
    {
      id: 'incidents-open',
      label: 'Unresolved Incidents',
      description: 'One or more incidents are currently unresolved',
      status: 'passed',
    },
    {
      id: 'health-degraded',
      label: 'Degraded Health Signals',
      description: 'At least one system reports degraded health',
      status: 'passed',
    },
    {
      id: 'data-freshness',
      label: 'Data Freshness',
      description: 'All sources reporting within expected interval',
      status: 'unknown',
    },
  ];

  return (
    <main className="space-y-6 p-6">
      <DecisionExplanationPanel
        state={decisionState}
        rules={decisionRules}
        completeness={67}
      />
    </main>
  );
}