import fs from "node:fs";
import path from "node:path";

const REPO_ROOT = process.cwd();

const bannedTopLevelDirs = ["shared", "primitives_boundary_tests"];

const prohibitedSemanticKeys = [
  "decision",
  "execute",
  "recommend",
  "approval",
  "signalScore",
  "verdict",
  "severity",
  "priority",
];

const primitivesImportMatchers = [
  /from\s+["']@digitalhooligan\/shared-platform-primitives["']/,
  /require\(["']@digitalhooligan\/shared-platform-primitives["']\)/,
];

// Heuristic tripwire: importing primitives must mention AuthorityContext/assertAuthority
const mustMentionAuthorityTokens = [/AuthorityContext/, /assertAuthority\s*\(/];

const includeExt = new Set([".ts", ".tsx", ".js", ".jsx", ".mjs", ".cjs"]);
const excludeDirs = new Set([
  "node_modules",
  "dist",
  ".next",
  ".turbo",
  ".git",
]);

function walk(dir) {
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (excludeDirs.has(entry.name)) continue;
      out.push(...walk(full));
    } else if (entry.isFile()) {
      if (includeExt.has(path.extname(entry.name))) out.push(full);
    }
  }
  return out;
}

function rel(p) {
  return path.relative(REPO_ROOT, p);
}

function fail(msg) {
  console.error(`\n[GUARDRAILS_FAIL] ${msg}\n`);
  process.exitCode = 1;
}

function checkBannedTopLevelDirs() {
  for (const d of bannedTopLevelDirs) {
    const p = path.join(REPO_ROOT, d);
    if (fs.existsSync(p) && fs.statSync(p).isDirectory()) {
      fail(
        `Top-level folder "${d}/" is not allowed. Shared code must live under /packages/*.`,
      );
    }
  }
}

function checkAuthorityUsage(files) {
  for (const f of files) {
    const text = fs.readFileSync(f, "utf8");
    const importsPrimitives = primitivesImportMatchers.some((rx) =>
      rx.test(text),
    );
    if (!importsPrimitives) continue;

    const hasAuthorityToken = mustMentionAuthorityTokens.some((rx) =>
      rx.test(text),
    );
    if (!hasAuthorityToken) {
      fail(
        `File imports shared primitives but does not reference AuthorityContext/assertAuthority (fail-closed policy). File: ${rel(
          f,
        )}`,
      );
    }
  }
}

function checkProhibitedSemanticKeys(files) {
  // Only scan likely boundary files to reduce noise
  const boundaryHints = [
    /ContextPack/,
    /createContextPack\s*\(/,
    /sendAlert\s*\(/,
    ...primitivesImportMatchers,
  ];

  for (const f of files) {
    const text = fs.readFileSync(f, "utf8");
    if (!boundaryHints.some((rx) => rx.test(text))) continue;

    for (const key of prohibitedSemanticKeys) {
      const rx = new RegExp(`["']${key}["']\\s*:`, "g");
      if (rx.test(text)) {
        fail(
          `Prohibited semantic key "${key}" found in boundary-context code. Primitives must remain meaning-free. File: ${rel(
            f,
          )}`,
        );
      }
    }
  }
}

function main() {
  checkBannedTopLevelDirs();

  const files = walk(REPO_ROOT);

  checkAuthorityUsage(files);
  checkProhibitedSemanticKeys(files);

  if (process.exitCode === 1) {
    console.error("[GUARDRAILS] One or more guardrails failed.");
    process.exit(1);
  }

  console.log("[GUARDRAILS] OK");
}

main();
