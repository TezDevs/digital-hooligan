import "server-only";
import fs from "fs";
import path from "path";
import { DecisionEntry } from "./decisionEntryTypes";

const DATA_DIR = path.join(process.cwd(), ".data");
const DATA_FILE = path.join(DATA_DIR, "decision-entries.json");

function ensureStore() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }

  if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, JSON.stringify([]));
  }
}

export function loadDecisionEntries(): DecisionEntry[] {
  ensureStore();
  const raw = fs.readFileSync(DATA_FILE, "utf-8");
  return JSON.parse(raw) as DecisionEntry[];
}

export function saveDecisionEntries(entries: DecisionEntry[]) {
  ensureStore();
  fs.writeFileSync(DATA_FILE, JSON.stringify(entries, null, 2));
}

export function persistDecisionEntry(entry: DecisionEntry) {
  const entries = loadDecisionEntries();
  entries.push(entry);
  saveDecisionEntries(entries);
}
