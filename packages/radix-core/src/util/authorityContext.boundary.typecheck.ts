import {
  assertAuthority,
  type AuthorityContext,
} from "@digitalhooligan/shared-platform-primitives";
import { buildAuthorityContext } from "./authorityContext";

// Valid context compiles
const ok = buildAuthorityContext({
  workspaceId: "w1",
  actorType: "service",
  actorId: "svc-1",
  appId: "radix-core",
  environment: "dev",
  version: "0.1.0",
  buildTimestamp: "build",
  requestId: "req",
  traceId: "trace",
  dataClass: "internal",
});

assertAuthority(ok);

// Prove: cannot construct AuthorityContext with missing fields (fail-closed)
// @ts-expect-error - missing workspaceId
buildAuthorityContext({
  actorType: "service",
  actorId: "svc-1",
  appId: "radix-core",
  environment: "dev",
  version: "0.1.0",
  buildTimestamp: "build",
  requestId: "req",
  traceId: "trace",
  dataClass: "internal",
});

// Prove: primitives cannot be called without AuthorityContext
// @ts-expect-error - ctx missing
assertAuthority(undefined);

// Prove: cannot “lie” about type; still requires required keys
// @ts-expect-error - incomplete AuthorityContext
const bad: AuthorityContext = {
  workspaceId: "w1",
};
void bad;
