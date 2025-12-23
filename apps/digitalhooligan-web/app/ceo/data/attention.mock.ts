import type { AttentionItem } from '../components/AttentionPanel'

export const attentionMock: AttentionItem[] = [
  {
    id: 'attn-001',
    level: 'critical',
    title: 'Payment Processor Incident',
    description: 'INC-PAY-004 is unresolved and impacting live transactions.',
    source: 'incidents',
    actionLabel: 'View incident',
    actionHref: '/ceo/incidents/INC-PAY-004',
    timestamp: new Date().toISOString(),
  },
  {
    id: 'attn-002',
    level: 'warning',
    title: 'Service Degradation Detected',
    description: 'Latency elevated on PennyWize API for 15+ minutes.',
    source: 'health',
    actionLabel: 'View health',
    actionHref: '/ceo/health',
    timestamp: new Date().toISOString(),
  },
  {
    id: 'attn-003',
    level: 'info',
    title: 'Deployment Completed',
    description: 'DropSignal web deployed successfully to production.',
    source: 'deployments',
    actionLabel: 'View deployments',
    actionHref: '/ceo/deployments',
    timestamp: new Date().toISOString(),
  },
]
