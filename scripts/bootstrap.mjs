// scripts/bootstrap.mjs
import { existsSync } from "node:fs";
import { spawn } from "node:child_process";
import path from "node:path";

function run(cmd, args, opts = {}) {
  return new Promise((resolve, reject) => {
    const p = spawn(cmd, args, { stdio: "inherit", shell: false, ...opts });
    p.on("close", (code) => {
      if (code === 0) resolve();
      else
        reject(new Error(`${cmd} ${args.join(" ")} exited with code ${code}`));
    });
  });
}

function parseArgs(argv) {
  const args = { app: "dh", noDev: false };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--no-dev") args.noDev = true;
    if (a === "--app") args.app = argv[i + 1] ?? "dh";
  }
  return args;
}

const { app, noDev } = parseArgs(process.argv.slice(2));

const root = process.cwd();
const workspaceFile = path.join(root, "pnpm-workspace.yaml");
if (!existsSync(workspaceFile)) {
  console.error("❌ pnpm-workspace.yaml not found. Run this from repo root.");
  process.exit(1);
}

console.log("🧰 Digital Hooligan — Bootstrap");
console.log(`• repo: ${root}`);
console.log(`• app:  ${app}`);
console.log(`• dev:  ${noDev ? "no" : "yes"}`);
console.log("");

try {
  // 1) Install deps
  console.log("1) Installing dependencies (pnpm -w install)...");
  await run("pnpm", ["-w", "install"]);

  // 2) Env checks (and safe copy from .env.example if missing)
  console.log("\n2) Checking env files...");
  await run("node", ["scripts/check-env.mjs"]);

  // 3) Start dev (optional)
  if (!noDev) {
    console.log("\n3) Starting dev server...");
    const map = {
      dh: "dev:dh",
      penny: "dev:penny",
      sneaker: "dev:sneaker",
      all: "dev:all",
    };
    const script = map[app] ?? "dev:dh";
    await run("pnpm", ["-w", "run", script]);
  } else {
    console.log("\n✅ Bootstrap complete (dev skipped).");
  }
} catch (err) {
  console.error("\n❌ Bootstrap failed.");
  console.error(err?.message ?? err);
  process.exit(1);
}
