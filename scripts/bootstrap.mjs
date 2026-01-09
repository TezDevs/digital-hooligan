#!/usr/bin/env node
/**
 * Digital Hooligan LLC — repo bootstrap
 * One command:
 *  - validates Node
 *  - checks pnpm is available
 *  - runs pnpm install
 *  - validates env file presence (warns)
 *  - starts Next.js dev server
 */

import { spawnSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import process from "node:process";

const MIN_NODE = "18.17.0";
const WEB_APP_DIR = "apps/digitalhooligan-web";
const ENV_CANDIDATES = [".env.local", ".env"];

function log(msg = "") {
  process.stdout.write(`${msg}\n`);
}
function warn(msg) {
  process.stdout.write(`⚠️  ${msg}\n`);
}
function die(msg, code = 1) {
  process.stderr.write(`❌ ${msg}\n`);
  process.exit(code);
}

function parseSemver(v) {
  // Accepts: "18.17.0", "v18.17.0", "18.17.0-alpha"
  const cleaned = String(v).trim().replace(/^v/, "");
  const main = cleaned.split("-")[0];
  const parts = main.split(".").map((n) => Number(n));
  if (parts.length < 2 || parts.some((n) => Number.isNaN(n))) return null;
  const [maj, min, pat = 0] = parts;
  return { maj, min, pat };
}

function cmpSemver(a, b) {
  if (a.maj !== b.maj) return a.maj - b.maj;
  if (a.min !== b.min) return a.min - b.min;
  return a.pat - b.pat;
}

function run(cmd, args, opts = {}) {
  const res = spawnSync(cmd, args, {
    stdio: "inherit",
    shell: false,
    ...opts,
  });
  if (res.error) {
    die(`Failed to run "${cmd} ${args.join(" ")}": ${res.error.message}`);
  }
  if (typeof res.status === "number" && res.status !== 0) {
    process.exit(res.status);
  }
}

function runCapture(cmd, args, opts = {}) {
  const res = spawnSync(cmd, args, {
    encoding: "utf8",
    shell: false,
    ...opts,
  });
  if (res.error) return { ok: false, out: "", err: res.error.message };
  return {
    ok: res.status === 0,
    out: String(res.stdout || "").trim(),
    err: String(res.stderr || "").trim(),
  };
}

function ensureRepoRoot() {
  const pkg = join(process.cwd(), "package.json");
  if (!existsSync(pkg)) {
    die(
      `Run this from the repo root (package.json not found at ${pkg}).\n` +
        `Tip: cd ~/Projects/Digital-Hooligan`
    );
  }
}

function ensureNode() {
  const current = parseSemver(process.version);
  const min = parseSemver(MIN_NODE);
  if (!current || !min) {
    warn(`Could not parse Node version; current="${process.version}"`);
    return;
  }
  if (cmpSemver(current, min) < 0) {
    die(
      `Node ${MIN_NODE}+ required. Current is ${process.version}.\n` +
        `Fix: install/use Node ${MIN_NODE}+ (nvm use, fnm, volta, etc.)`
    );
  }
}

function ensurePnpm() {
  const res = runCapture("pnpm", ["-v"]);
  if (!res.ok) {
    die(
      `pnpm is not available in PATH.\n` +
        `Fix (recommended):\n` +
        `  corepack enable\n` +
        `  corepack prepare pnpm@latest --activate\n` +
        `Or install pnpm globally:\n` +
        `  npm i -g pnpm`
    );
  }
}

function checkEnvFiles() {
  const appPath = join(process.cwd(), WEB_APP_DIR);
  if (!existsSync(appPath)) {
    warn(`Web app folder not found: ${WEB_APP_DIR} (skipping env checks)`);
    return;
  }

  const found = ENV_CANDIDATES.find((f) => existsSync(join(appPath, f)));
  if (!found) {
    warn(
      `No env file found in ${WEB_APP_DIR} (checked: ${ENV_CANDIDATES.join(
        ", "
      )}).\n` + `If you use env vars locally, create ${WEB_APP_DIR}/.env.local`
    );
    return;
  }

  // Light sanity check: file is readable and not empty
  const envPath = join(appPath, found);
  try {
    const content = readFileSync(envPath, "utf8");
    if (!content.trim()) warn(`${WEB_APP_DIR}/${found} exists but is empty.`);
  } catch (e) {
    warn(`Could not read ${WEB_APP_DIR}/${found}: ${e?.message || e}`);
  }
}

function main() {
  log("🧪 Digital Hooligan — Bootstrap");
  ensureRepoRoot();
  ensureNode();
  ensurePnpm();

  log("\n📦 Installing dependencies (pnpm install)...");
  run("pnpm", ["install"]);

  log("\n🔎 Checking env...");
  checkEnvFiles();

  log(`\n🚀 Starting dev server (${WEB_APP_DIR})...`);
  run("pnpm", ["-C", WEB_APP_DIR, "dev"]);
}

main();
