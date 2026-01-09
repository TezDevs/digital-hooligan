import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

export default defineConfig([
  // Override default ignores of eslint-config-next.
  globalIgnores([
    "**/.next/**",
    "**/node_modules/**",
    "**/.turbo/**",
    "**/.vercel/**",
    "**/dist/**",
    "**/out/**",
    "**/.data/**",
  ]),

  ...nextVitals,
  ...nextTs,

  // Route handlers often need flexible JSON payload typing. Limit this exemption
  // strictly to Next route files to avoid weakening lint elsewhere.
  {
    files: ["app/api/**/route.ts", "app/api/**/route.tsx"],
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
    },
  },
]);
