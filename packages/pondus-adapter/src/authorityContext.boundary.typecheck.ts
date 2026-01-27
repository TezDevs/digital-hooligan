import {
  assertAuthority,
  type AuthorityContext,
} from "@digitalhooligan/shared-platform-primitives";
import { buildAuthorityContext } from "./authorityContext";
import { buildContextClient, type PondusClient } from "./index";

const ok = buildAuthorityContext({
  workspaceId: "w1",
  actorType: "service",
  actorId: "svc-pondus",
  appId: "pondus-adapter",
  environment: "dev",
  version: "0.1.0",
  buildTimestamp: "build",
  requestId: "req",
  traceId: "trace",
  dataClass: "internal",
});

assertAuthority(ok);

// Prove: cannot build ctx with missing fields
// @ts-expect-error - missing workspaceId
buildAuthorityContext({
  actorType: "service",
  actorId: "svc-pondus",
  appId: "pondus-adapter",
  environment: "dev",
  version: "0.1.0",
  buildTimestamp: "build",
  requestId: "req",
  traceId: "trace",
  dataClass: "internal",
});

// Prove: cannot call assertAuthority without ctx
// @ts-expect-error
assertAuthority(undefined);

// Prove: cannot “fake” AuthorityContext without required keys
// @ts-expect-error
const bad: AuthorityContext = { workspaceId: "w1" };
void bad;

// Prove: Pondus adapter requires a client (no silent internal reach-through)
const fakeClient: PondusClient = {
  async getContextPack() {
    return null;
  },
  async listContextPacksForEntity() {
    return [];
  },
};

buildContextClient(
  {
    workspaceId: "w1",
    actorType: "service",
    actorId: "svc-pondus",
    appId: "pondus-adapter",
    environment: "dev",
    version: "0.1.0",
    buildTimestamp: "build",
    requestId: "req",
    traceId: "trace",
    dataClass: "internal",
  },
  fakeClient,
);
