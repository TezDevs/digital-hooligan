import "server-only";
import fs from "fs";
import path from "path";
import { DecisionEntry, DecisionEntrySummary } from "./decisionEntryTypes";

const DATA_DIR = path.resolve(process.cwd(), "apps/digitalhooligan-web/data");

const DATA_FILE = path.join(DATA_DIR, "decision-entries.json");

/**
 * Dev-only seed summaries.
 * NEVER written to disk.
 */
const DEV_SEED_SUMMARIES: DecisionEntrySummary[] = [
  {
    id: "decision-local-001",
    state: "draft",
    updatedAt: new Date("2025-12-27T09:12:00Z").toISOString(),
  },
  {
    id: "decision-local-002",
    state: "review",
    updatedAt: new Date("2025-12-27T10:41:00Z").toISOString(),
  },
  {
    id: "decision-local-003",
    state: "approved",
    updatedAt: new Date("2025-12-26T18:03:00Z").toISOString(),
  },
  {
    id: "decision-local-004",
    state: "rejected",
    updatedAt: new Date("2025-12-25T14:55:00Z").toISOString(),
  },
];

function ensureStore() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }

  if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, JSON.stringify([]));
  }
}

/**
 * ✅ FULL DOMAIN LOAD
 * Used by API routes, persistence, mutations.
 */
export function loadDecisionEntries(): DecisionEntry[] {
  ensureStore();
  const raw = fs.readFileSync(DATA_FILE, "utf-8");
  return JSON.parse(raw) as DecisionEntry[];
}

/**
 * ✅ READ-ONLY SUMMARY LOAD
 * Used ONLY by list / dashboard pages.
 */
function mapDomainStateToSummaryState(
  state: DecisionEntry["state"]
): DecisionEntrySummary["state"] {
  switch (state) {
    case "draft":
      return "draft";
    case "final":
      // Conservative default for now
      return "approved";
    default:
      return "draft";
  }
}
export function loadDecisionEntrySummaries(): DecisionEntrySummary[] {
  const entries = loadDecisionEntries();

  if (entries.length === 0 && process.env.NODE_ENV !== "production") {
    return DEV_SEED_SUMMARIES;
  }

  return entries.map((entry) => ({
    id: entry.id,
    state: mapDomainStateToSummaryState(entry.state),
    updatedAt: entry.updatedAt,
  }));
}

/**
 * Persist full entries only.
 */
export function saveDecisionEntries(entries: DecisionEntry[]) {
  ensureStore();
  fs.writeFileSync(DATA_FILE, JSON.stringify(entries, null, 2));
}

export function persistDecisionEntry(entry: DecisionEntry) {
  const entries = loadDecisionEntries();
  entries.push(entry);
  saveDecisionEntries(entries);
}
