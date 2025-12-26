import fs from "fs";
import path from "path";
import { DecisionReviewAuditEvent } from "./decisionReviewAuditLog";

const LOG_FILE_PATH = path.join(process.cwd(), ".decision-review-audit.log");

function ensureLogFileExists() {
  if (!fs.existsSync(LOG_FILE_PATH)) {
    fs.writeFileSync(LOG_FILE_PATH, "", { encoding: "utf8" });
  }
}

export function writeDecisionReviewAuditLog(entry: DecisionReviewAuditEvent) {
  ensureLogFileExists();

  const line = JSON.stringify(entry) + "\n";
  fs.appendFileSync(LOG_FILE_PATH, line, { encoding: "utf8" });
}
