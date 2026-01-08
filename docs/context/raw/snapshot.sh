#!/usr/bin/env bash
set -euo pipefail

ROOT="$(git rev-parse --show-toplevel)"
cd "$ROOT"

OUT="docs/context/raw"
mkdir -p "$OUT"

echo "== BASIC ==" > "$OUT/00_basic.txt"
pwd >> "$OUT/00_basic.txt"
date >> "$OUT/00_basic.txt"
node -v 2>/dev/null || true
pnpm -v 2>/dev/null || true

echo "== GIT STATE ==" > "$OUT/01_git_state.txt"
git status -sb >> "$OUT/01_git_state.txt" || true
echo "" >> "$OUT/01_git_state.txt"
git log --oneline -n 30 >> "$OUT/01_git_state.txt" || true
echo "" >> "$OUT/01_git_state.txt"
git branch --sort=-committerdate | head -n 25 >> "$OUT/01_git_state.txt" || true

echo "== ROOT LIST ==" > "$OUT/02_root_ls.txt"
ls -la >> "$OUT/02_root_ls.txt" || true

echo "== WORKSPACE FILES ==" > "$OUT/03_workspace_files.txt"
for f in package.json pnpm-workspace.yaml turbo.json; do
  if [ -f "$f" ]; then
    echo "--- $f ---" >> "$OUT/03_workspace_files.txt"
    sed -n '1,220p' "$f" >> "$OUT/03_workspace_files.txt"
    echo "" >> "$OUT/03_workspace_files.txt"
  fi
done

echo "== KEY CONFIG FILE NAMES ==" > "$OUT/04_config_filenames.txt"
ls -1a | egrep -i "next\.config|tsconfig|tailwind|postcss|eslint|prettier|turbo" >> "$OUT/04_config_filenames.txt" || true

echo "== DIGITALHOOLIGAN-WEB LISTING ==" > "$OUT/10_web_ls.txt"
ls -la apps 2>/dev/null >> "$OUT/10_web_ls.txt" || true
ls -la apps/digitalhooligan-web 2>/dev/null >> "$OUT/10_web_ls.txt" || true

echo "== APP ROUTES (FILES ONLY) ==" > "$OUT/11_app_routes_files.txt"
git ls-files "apps/digitalhooligan-web/app/**" 2>/dev/null | sort >> "$OUT/11_app_routes_files.txt" || true

echo "== API ROUTES (FILES ONLY) ==" > "$OUT/12_api_routes_files.txt"
git ls-files "apps/digitalhooligan-web/app/api/**" 2>/dev/null | sort >> "$OUT/12_api_routes_files.txt" || true

echo "== ROUTE.TS LIST (FILES ONLY) ==" > "$OUT/13_route_ts_files.txt"
git ls-files | grep -E "route\.ts$" | sort >> "$OUT/13_route_ts_files.txt" || true

echo "== ENV VAR NAMES (NO VALUES) ==" > "$OUT/14_env_var_names.txt"
if command -v rg >/dev/null 2>&1; then
  rg -h --no-filename "process\.env\.[A-Z0-9_]+" apps/digitalhooligan-web \
    | sed -E "s/.*process\.env\.([A-Z0-9_]+).*/\1/" \
    | sort -u >> "$OUT/14_env_var_names.txt" || true
else
  grep -Roh "process\.env\.[A-Z0-9_]\+" apps/digitalhooligan-web \
    | sed -E "s/.*process\.env\.([A-Z0-9_]+).*/\1/" \
    | sort -u >> "$OUT/14_env_var_names.txt" || true
fi

echo "Snapshot written to $OUT/"
