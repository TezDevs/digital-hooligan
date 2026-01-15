import type { IsoDateTimeString, ModuleId } from "./ids";
import type { DataSource } from "./metrics";

export type ModuleStatus =
  | "healthy"
  | "degraded"
  | "offline"
  | "mock"
  | "not_connected";

export interface Module {
  id: ModuleId;
  key:
    | "gravity"
    | "pennywize"
    | "dropsignal"
    | "hypewatch"
    | "ops_toys"
    | "opsos_platform";
  label: string;
  status: ModuleStatus;
  summary?: string;

  source: DataSource;
  lastCheckedAt: IsoDateTimeString;
}
