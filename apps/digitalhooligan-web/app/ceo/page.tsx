import DecisionExplanationPanel from '@/components/ceo/DecisionExplanationPanel';
import { evaluateDecision } from '@/lib/decisionEngine';

export default function CeoDashboardPage() {
  const decision = evaluateDecision({
    unresolvedIncidents: 2,
    degradedSystems: 1,
    dataFresh: false,
  });

  return (
    <main className="space-y-6 p-6">
      <DecisionExplanationPanel
        state={decision.state}
        rules={decision.rules}
        completeness={decision.completeness}
      />
    </main>
  );
}