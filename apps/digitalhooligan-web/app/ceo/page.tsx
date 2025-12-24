import DecisionExplanationPanel from '@/components/ceo/DecisionExplanationPanel';

export default function CeoDashboardPage() {
  // Temporary mock — mirrors current decision logic
  const decisionState: 'ACT' | 'MONITOR' | 'NOMINAL' = 'ACT';

  const decisionRules = [
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
  ] as const;

  return (
    <main className="space-y-6 p-6">
      {/* Existing CEO panels live above */}

      <DecisionExplanationPanel
        state={decisionState}
        rules={decisionRules}
        completeness={67}
      />
    </main>
  );
}