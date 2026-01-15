#!/usr/bin/env bash
set -euo pipefail

ROOT="apps/digitalhooligan-web"

echo "== Preflight: ensure we're in repo root =="
test -d "$ROOT" || { echo "Missing $ROOT. Run from repo root."; exit 1; }

echo "== 0) Show current hits (baseline) =="
rg -n "/ceo\b|/api/ceo\b|ceo-gate|CEO Cockpit|ceoPath|ceo-dashboard" "$ROOT" || true

echo "== 1) Remove /ceo route tree and ceo APIs if they still exist =="
rm -rf "$ROOT/app/ceo" || true
rm -rf "$ROOT/app/api/ceo" || true
rm -rf "$ROOT/app/api/ceo-login" || true
rm -rf "$ROOT/app/api/ceo-gate" || true
rm -rf "$ROOT/lib/ceo-gate" || true

echo "== 2) Remove CEO components folder (fossils) if present =="
rm -rf "$ROOT/components/ceo" || true

echo "== 3) Redirect entrypoints away from /ceo =="
# admin-login and ce-login currently redirect("/ceo") -> redirect("/")
for f in "$ROOT/app/admin-login/page.tsx" "$ROOT/app/ce-login/page.tsx"; do
  if test -f "$f"; then
    perl -0777 -pi -e 's/redirect\(\s*["'\'']\/ceo["'\'']\s*\)\s*;?/redirect("\/");/g' "$f"
  fi
done

echo "== 4) Remove /ceo from GlobalNav + FooterGate =="
NAV="$ROOT/components/nav/GlobalNav.tsx"
FOOT="$ROOT/components/layout/FooterGate.tsx"

if test -f "$NAV"; then
  # Remove the CEO Cockpit nav item line and any standalone "/ceo" literal lines in arrays
  perl -pi -e 's/^\s*\/\/\s*Canonical CEO gateway.*\n//g' "$NAV"
  perl -pi -e 's/^\s*\{\s*label:\s*"CEO Cockpit"\s*,\s*href:\s*"\/ceo"\s*\}\s*,?\s*\n//g' "$NAV"
  perl -pi -e 's/^\s*"\/ceo"\s*,?\s*\n//g' "$NAV"
fi

if test -f "$FOOT"; then
  perl -pi -e 's/^\s*"\/ceo"\s*,?\s*\n//g' "$FOOT"
fi

echo "== 5) Remove ceo-gate wiring from middleware.ts =="
MW="$ROOT/middleware.ts"
if test -f "$MW"; then
  # Drop ceo-gate import lines
  perl -pi -e 's/^import\s+\{.*\}\s+from\s+"\.\/*lib\/ceo-gate\/constants";\s*\n//g' "$MW"
  perl -pi -e 's/^import\s+\{\s*hasValidCeoGateCookie\s*\}\s+from\s+"\.\/*lib\/ceo-gate\/cookies";\s*\n//g' "$MW"
  perl -pi -e 's/^import\s+\{\s*getCeoGatePassword\s*,\s*isProduction\s*\}\s+from\s+"\.\/*lib\/ceo-gate\/env";\s*\n//g' "$MW"

  # Remove ceo pathname checks (common patterns)
  perl -0777 -pi -e 's/\s*pathname\s*===\s*"\/ceo"\s*\|\|\s*\n?\s*pathname\.startsWith\("\/ceo\/"\)\s*\|\|\s*\n//g' "$MW"
  perl -0777 -pi -e 's/\s*pathname\s*===\s*"\/api\/ceo"\s*\|\|\s*\n?\s*pathname\.startsWith\("\/api\/ceo\/"\)\s*\|\|\s*\n//g' "$MW"

  # Remove matcher entries for /ceo and /api/ceo
  perl -pi -e 's/"\/ceo\/:path\*"\s*,?\s*//g' "$MW"
  perl -pi -e 's/"\/api\/ceo\/:path\*"\s*,?\s*//g' "$MW"

  # If matcher array left with double commas or stray spaces, normalize a bit
  perl -pi -e 's/,\s*,/, /g' "$MW"
fi

echo "== 6) Remove registry advertising of /ceo surfaces =="
REG_API="$ROOT/app/api/registry/apps/route.ts"
if test -f "$REG_API"; then
  # Drop object properties like: ceo: "/ceo/apps?appId=..."
  perl -pi -e 's/^\s*ceo:\s*"\/ceo[^"]*"\s*,?\s*\n//g' "$REG_API"
fi

LABS_PAGE="$ROOT/app/labs/app-registry/page.tsx"
if test -f "$LABS_PAGE"; then
  # Remove direct href="/ceo" and href="/ceo/apps" lines
  perl -pi -e 's/^\s*href="\/ceo"\s*\n//g' "$LABS_PAGE"
  perl -pi -e 's/^\s*href="\/ceo\/apps"\s*\n//g' "$LABS_PAGE"
  # Also handle href="/ceo" as inline prop
  perl -pi -e 's/href=\{\s*"\/ceo"\s*\}//g' "$LABS_PAGE"
  perl -pi -e 's/href=\{\s*"\/ceo\/apps"\s*\}//g' "$LABS_PAGE"
fi

APP_REG_API="$ROOT/app/api/apps/registry/route.ts"
if test -f "$APP_REG_API"; then
  # Remove "ceo-dashboard" entries line (safe minimal)
  perl -pi -e 's/^\s*\{\s*id:\s*"ceo-dashboard".*\}\s*,?\s*\n//g' "$APP_REG_API"
fi

echo "== 7) Stop exporting /api/ai/ceo-copilot from health listing (advertising only) =="
AI_HEALTH="$ROOT/app/api/health/ai/route.ts"
if test -f "$AI_HEALTH"; then
  perl -pi -e 's/^\s*path:\s*"\/api\/ai\/ceo-copilot"\s*,?\s*\n//g' "$AI_HEALTH"
fi

echo "== 8) Remove ceo-dashboard from health mock (advertising only) =="
HEALTH_LIB="$ROOT/lib/health.ts"
if test -f "$HEALTH_LIB"; then
  perl -pi -e 's/^\s*\{\s*appId:\s*"ceo-dashboard".*\}\s*,?\s*\n//g' "$HEALTH_LIB"
fi

echo "== 9) If radix components import from deleted app/ceo paths, remove those imports now (build-break fix) =="
# These were explicitly found by your rg. We'll just hard-delete the files (cleanest stop-the-bleeding).
# NOTE: If these are used elsewhere, build will complain about missing modules; you'll then remove the usages.
rm -f "$ROOT/components/radix/beacon/RadixBeaconPanel.tsx" || true
rm -f "$ROOT/components/radix/rituals/RadixRitualsPanel.tsx" || true
rm -f "$ROOT/components/radix/switchboard/RadixSwitchboardPanel.tsx" || true
rm -f "$ROOT/components/radix/core/RadixCorePanel.tsx" || true
rm -f "$ROOT/components/radix/pulse/RadixPulsePanel.tsx" || true

echo "== 10) Re-scan for remaining hits =="
if rg -n "/ceo\b|/api/ceo\b|ceo-gate|CEO Cockpit|ceoPath|ceo-dashboard" "$ROOT"; then
  echo
  echo "ERROR: Remaining forbidden references found. Fix manually and re-run scan."
  exit 2
fi

echo "== 11) Done. Next: run build and address any missing imports/usages from deleted radix panels =="
