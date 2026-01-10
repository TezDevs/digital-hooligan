// scripts/check-env.mjs
import { existsSync, copyFileSync } from "node:fs";
import path from "node:path";

const root = process.cwd();

const targets = [
  {
    name: "digitalhooligan-web",
    envLocal: "apps/digitalhooligan-web/.env.local",
    envExample: "apps/digitalhooligan-web/.env.example",
  },
  {
    name: "pennywize-web",
    envLocal: "apps/pennywize-web/.env.local",
    envExample: "apps/pennywize-web/.env.example",
  },
  {
    name: "sneakerscout-web",
    envLocal: "apps/sneakerscout-web/.env.local",
    envExample: "apps/sneakerscout-web/.env.example",
  },
];

let warnings = 0;

for (const t of targets) {
  const envLocal = path.join(root, t.envLocal);
  const envExample = path.join(root, t.envExample);

  const hasLocal = existsSync(envLocal);
  const hasExample = existsSync(envExample);

  if (hasLocal) {
    console.log(`✅ ${t.name}: .env.local present`);
    continue;
  }

  if (hasExample) {
    copyFileSync(envExample, envLocal);
    console.log(
      `⚠️  ${t.name}: .env.local was missing — copied from .env.example`
    );
    warnings++;
  } else {
    console.log(
      `⚠️  ${t.name}: .env.local missing (no .env.example found to copy)`
    );
    warnings++;
  }
}

if (warnings > 0) {
  console.log(
    "\nℹ️  Env note: copied files may need real values before everything runs clean."
  );
} else {
  console.log("\n✅ Env looks good.");
}
