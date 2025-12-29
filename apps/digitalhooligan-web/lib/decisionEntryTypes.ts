export interface EvidenceItem {
  id: string;
  label: string;
  source: string;
  reliability: number; // 0–100
}

export interface DecisionEntry {
  id: string;
  title: string;
  createdAt: string;
  state: string;
  confidence: number;
  confidenceBaseline: number;
  evidence: EvidenceItem[];
}
