#!/usr/bin/env node
/**
 * IGR-0.7 Content Gate — deterministic, changed-files-only (INCLUDING untracked)
 *
 * Explainability Surface classification (deterministic):
 *   guardrail-scope: explainabilitysurface
 *
 * High-risk escalation marker (deterministic):
 *   guardrail-user-facing: true  OR  guardrail-release-facing: true
 *
 * Scans:
 *   - Tracked changed files vs base (git diff --name-only base...HEAD)
 *   - Untracked files (git ls-files --others --exclude-standard)
 *
 * Hard exclusions (deterministic, path-based):
 *   - The standard itself: docs/governance/igr/IGR-0.7.md
 *   - PR template files: .github/pull_request_template.md
 *
 * Fails (exit 1) on any BLOCKER; emits clear messages referencing rule IDs.
 * No heuristics, no reviewer discretion.
 */

import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const ALLOWED_EXT = new Set([
  ".md", ".mdx", ".txt",
  ".ts", ".tsx", ".js", ".jsx",
  ".json", ".yml", ".yaml"
]);

const DEFAULT_BASE = "origin/main";

// Deterministic hard excludes (exact repo-relative paths)
const EXCLUDE_PATHS = new Set([
  "docs/governance/igr/IGR-0.7.md",
  ".github/pull_request_template.md",
]);

function run(cmd) {
  return execSync(cmd, { stdio: ["ignore", "pipe", "pipe"], encoding: "utf8" }).trim();
}

function fileExists(p) {
  try { fs.accessSync(p, fs.constants.R_OK); return true; } catch { return false; }
}

function isTextCandidate(fp) {
  const ext = path.extname(fp).toLowerCase();
  return ALLOWED_EXT.has(ext);
}

function readFileSafe(fp) {
  try { return fs.readFileSync(fp, "utf8"); } catch { return null; }
}

function escapeRegExp(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function hasMarker(content, key, value) {
  const re = new RegExp(`^\\s*${escapeRegExp(key)}\\s*:\\s*${escapeRegExp(value)}\\s*$`, "im");
  return re.test(content);
}

function hasBoolMarker(content, key) {
  const re = new RegExp(`^\\s*${escapeRegExp(key)}\\s*:\\s*true\\s*$`, "im");
  return re.test(content);
}

function uniq(list) {
  return Array.from(new Set(list));
}

function getTrackedChangedFiles(base) {
  const out = run(`git diff --name-only ${base}...HEAD`);
  return out.split("\n").map(s => s.trim()).filter(Boolean);
}

function getUntrackedFiles() {
  const out = run(`git ls-files --others --exclude-standard`);
  return out ? out.split("\n").map(s => s.trim()).filter(Boolean) : [];
}

// BLOCKER patterns (IGR-0.7 detectable red flags)
// NOTE: LINT-BND-03 is tightened to avoid flagging the required non-authority disclaimer:
// "This is not a decision, approval, certification, or enforcement action."
const BLOCKER_PATTERNS = [
  // LINT-LANG-01 — No outcome guarantees
  { id: "LINT-LANG-01", re: /\b(guarantees?|will ensure|ensures?|prevents?|eliminates?|cannot fail|never fails|100%)\b/i },
  { id: "LINT-LANG-01", re: /\b(always|never|definitely|proves)\b/i },

  // LINT-LANG-02 — No authority leakage
  { id: "LINT-LANG-02", re: /\b(approved|certified|authorized|cleared|endorsed)\b/i },
  { id: "LINT-LANG-02", re: /\b(regulator-approved|official|compliance confirmed)\b/i },
  { id: "LINT-LANG-02", re: /\b(this approves|this authorizes|this certifies)\b/i },

  // LINT-LANG-03 — No prescriptive directives in explainability surfaces
  { id: "LINT-LANG-03", re: /\b(should|must|recommended|need to|required to)\b/i },
  { id: "LINT-LANG-03", re: /\b(we advise|do not do|take action|proceed with)\b/i },

  // LINT-SOL-02 — No fiduciary / buy-sell framing
  { id: "LINT-SOL-02", re: /\b(buy|sell|hold|financial advice|fiduciary|guaranteed return|risk-free)\b/i },

  // LINT-SOL-05 — No “Solum knows/decides/confirms”
  { id: "LINT-SOL-05", re: /\b(Solum\s+(knows|decides|confirms|verified|verifies correctness))\b/i },

  // LINT-BND-01 — No implied Decision emission
  { id: "LINT-BND-01", re: /\b(triggers?|logs?|creates?)\s+(a\s+)?RadixOS\s+Decision\b/i },

  // LINT-BND-02 — No signal/alert/inference emission claims
  { id: "LINT-BND-02", re: /\b(signals?|alerts?|risk flags?)\b/i },

  // LINT-BND-03 — No enforcement claims (Custos boundary)
  // (intentionally does NOT match "enforcement action" to avoid false positives on the required disclaimer)
  { id: "LINT-BND-03", re: /\b(enforced|controls were enforced|actions were compelled)\b/i },
];

// WARN-only (non-failing)
const WARN_ONLY = [
  { id: "LINT-LANG-05", re: /\b(confirms?|verified|guarantee)\b/i },
];

// Required disclosures (BLOCKER if missing) for explainability surfaces:
const REQUIRED_DISCLOSURES = [
  {
    id: "LINT-DISC-01",
    re: /Scope\s*&\s*Limits\s*:/i,
    msg: "Missing required scope declaration label: 'Scope & Limits:'"
  },
  {
    id: "LINT-DISC-02",
    re: /This\s+is\s+not\s+a\s+decision,\s*approval,\s*certification,\s*or\s*enforcement\s+action\./i,
    msg: "Missing required non-authority disclaimer sentence."
  },
  {
    id: "LINT-DISC-03",
    re: /Any\s+outcomes\s+or\s+next\s+steps\s+require\s+designated\s+human\s+review\s+and\s+the\s+appropriate\s+RadixOS\s+decision\s+process\./i,
    msg: "Missing required human ownership handoff sentence (RadixOS decision process)."
  },
];

// Time-bounded scoping: WARN normally; BLOCKER if release/user-facing marker present.
const TIME_SCOPING = {
  id: "LINT-LANG-04",
  re: /\b(during this review|as observed|based on the provided inputs|within the scope)\b/i,
  msg: "Missing time-bounded scoping phrase (e.g., 'during this review', 'as observed', 'based on the provided inputs')."
};

// Entity typing (LINT-ENT-01): enforced deterministically only when an "Entities" heading exists.
const ENTITY_TYPES = new Set([
  "company","ticker","repo","service","endpoint","feature","person","regulation","document","dataset","other"
]);

function parseEntitiesSection(content) {
  const lines = content.split(/\r?\n/);
  const start = lines.findIndex(l => /^\s{0,3}#{1,6}\s+Entities\s*$/i.test(l));
  if (start === -1) return null;

  const out = [];
  for (let i = start + 1; i < lines.length; i++) {
    const line = lines[i];
    if (/^\s{0,3}#{1,6}\s+\S+/.test(line)) break;
    if (/^\s*[-*]\s+/.test(line)) out.push(line.trim());
  }
  return out;
}

function entityLineHasType(line) {
  const m1 = line.match(/\[([a-z]+)\]\s*$/i);
  if (m1 && ENTITY_TYPES.has(m1[1].toLowerCase())) return true;

  const m2 = line.match(/\(\s*type\s*:\s*([a-z]+)\s*\)\s*$/i);
  if (m2 && ENTITY_TYPES.has(m2[1].toLowerCase())) return true;

  return false;
}

function main() {
  const args = process.argv.slice(2);
  const baseIdx = args.findIndex(a => a === "--base");
  const base = baseIdx >= 0 ? args[baseIdx + 1] : DEFAULT_BASE;

  if (!base) {
    console.error("IGR-0.7: Missing --base <ref|sha> value.");
    process.exit(2);
  }

  let trackedChanged = [];
  try {
    trackedChanged = getTrackedChangedFiles(base);
  } catch (e) {
    console.error(`IGR-0.7: Failed to compute tracked changed files vs base '${base}'.`);
    console.error(String(e?.message || e));
    process.exit(2);
  }

  let untracked = [];
  try {
    untracked = getUntrackedFiles();
  } catch (e) {
    console.error("IGR-0.7: Failed to compute untracked files.");
    console.error(String(e?.message || e));
    process.exit(2);
  }

  const changedAll = uniq([...trackedChanged, ...untracked])
    .filter(fp => !EXCLUDE_PATHS.has(fp));

  const candidates = changedAll
    .filter(fp => isTextCandidate(fp) && fileExists(fp));

  const blockers = [];
  const warns = [];

  for (const fp of candidates) {
    const content = readFileSafe(fp);
    if (content == null) continue;

    const isExplainabilitySurface = hasMarker(content, "guardrail-scope", "explainabilitysurface");
    const isUserFacing = hasBoolMarker(content, "guardrail-user-facing");
    const isReleaseFacing = hasBoolMarker(content, "guardrail-release-facing");
    const isHighRisk = isUserFacing || isReleaseFacing;

    // Global red-flag pattern enforcement on scanned files
    for (const p of BLOCKER_PATTERNS) {
      if (p.re.test(content)) {
        blockers.push({ file: fp, id: p.id, detail: `Matched blocked pattern: ${p.re}` });
      }
    }

    for (const w of WARN_ONLY) {
      if (w.re.test(content)) {
        warns.push({ file: fp, id: w.id, detail: `Matched warn pattern: ${w.re}` });
      }
    }

    // Explainability-Surface-only requirements
    if (isExplainabilitySurface) {
      for (const req of REQUIRED_DISCLOSURES) {
        if (!req.re.test(content)) {
          blockers.push({ file: fp, id: req.id, detail: req.msg });
        }
      }

      const hasTimeScope = TIME_SCOPING.re.test(content);
      if (!hasTimeScope) {
        if (isHighRisk) blockers.push({ file: fp, id: TIME_SCOPING.id, detail: TIME_SCOPING.msg });
        else warns.push({ file: fp, id: TIME_SCOPING.id, detail: TIME_SCOPING.msg });
      }

      const entityLines = parseEntitiesSection(content);
      if (entityLines && entityLines.length > 0) {
        for (const line of entityLines) {
          if (!entityLineHasType(line)) {
            blockers.push({
              file: fp,
              id: "LINT-ENT-01",
              detail: `Untyped entity line in Entities section: '${line}'. Expected 'Name [type]' or 'Name (type: type)'.`
            });
          }
        }
      }
    }
  }

  console.log(`IGR-0.7 Content Gate (base=${base}) — scanned ${candidates.length}/${changedAll.length} changed files (tracked+untracked; exclusions applied)`);

  if (warns.length) {
    console.log("\nWARN:");
    for (const w of warns) console.log(`- ${w.id} (${w.file}): ${w.detail}`);
  }

  if (blockers.length) {
    console.log("\nBLOCKER:");
    for (const b of blockers) console.log(`- ${b.id} (${b.file}): ${b.detail}`);
    console.log("\nRESULT: FAIL (BLOCKER violations detected).");
    process.exit(1);
  }

  console.log("\nRESULT: PASS (no BLOCKER violations detected).");
  process.exit(0);
}

main();
