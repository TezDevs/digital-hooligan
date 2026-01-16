import { buildCeoDashboardView } from "radix-core";
import type { Mode } from "radix-core";

export async function getCeoDashboardView(mode: Mode) {
  return buildCeoDashboardView({ mode });
}
