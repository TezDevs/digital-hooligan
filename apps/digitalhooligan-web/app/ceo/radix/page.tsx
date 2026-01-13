// apps/digitalhooligan-web/app/ceo/radix/page.tsx
import { RadixCockpitLayout } from "../../../components/radix/RadixCockpitLayout";
import { RadixCorePanel } from "../../../components/radix/core/RadixCorePanel";
import { RadixPulsePanel } from "../../../components/radix/pulse/RadixPulsePanel";
import { RadixRitualsPanel } from "../../../components/radix/rituals/RadixRitualsPanel";
import { RadixSwitchboardPanel } from "../../../components/radix/switchboard/RadixSwitchboardPanel";
import { RadixBeaconPanel } from "../../../components/radix/beacon/RadixBeaconPanel";

import { createInMemoryRadixRepository } from "../../../lib/radix/infrastructure/repositories/inMemoryRadixRepository";
import { buildOpsSnapshot } from "../../../lib/radix/assembly/buildOpsSnapshot";

export default async function RadixPage() {
  const repo = createInMemoryRadixRepository();

  const [decisions, pulseEntries, rituals, workModes, signals] =
    await Promise.all([
      repo.listDecisions(),
      repo.listPulseEntries(),
      repo.listRituals(),
      repo.listWorkModes(),
      repo.listSignals(),
    ]);

  const snapshot = buildOpsSnapshot({
    asOf: new Date().toISOString(),
    decisions,
    pulseEntries,
    rituals,
    workModes,
    signals,
  });

  return (
    <RadixCockpitLayout>
      <RadixCorePanel snapshot={snapshot} />
      <RadixPulsePanel snapshot={snapshot} />
      <RadixRitualsPanel snapshot={snapshot} />
      <RadixSwitchboardPanel snapshot={snapshot} />
      <RadixBeaconPanel snapshot={snapshot} />
    </RadixCockpitLayout>
  );
}
