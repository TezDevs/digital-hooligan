import {
  assertAuthority,
  denyCrossWorkspace,
  type AuthorityContext,
} from "./authority";
import { generateOpaqueId, type ProvenanceEnvelope } from "./identity";
import { PrimitiveError } from "./_errors";

export type TimelineId = string;
export type EventId = string;

export type TimelineEvent = Readonly<{
  id: EventId;
  timelineId: TimelineId;
  workspaceId: string;

  occurredAt: string; // authoritative timestamp (ISO)
  ingestedAt: string; // ingestion timestamp (ISO)

  entityIds: readonly string[];
  type: string;

  // meaning-free payload
  payloadRef?: Readonly<{ pointer: string; payloadHash: string }>;

  provenance: ProvenanceEnvelope;
}>;

export interface EventTimelineStore {
  createTimeline(
    ctx: AuthorityContext,
  ): Readonly<{ id: TimelineId; workspaceId: string; createdAt: string }>;
  append(
    ctx: AuthorityContext,
    input: Omit<
      TimelineEvent,
      "id" | "workspaceId" | "ingestedAt" | "provenance"
    > & { provenance?: ProvenanceEnvelope },
  ): TimelineEvent;
  read(ctx: AuthorityContext, timelineId: TimelineId): readonly TimelineEvent[];
}

export function createInMemoryEventTimelineStore(): EventTimelineStore {
  const timelines = new Map<
    TimelineId,
    { workspaceId: string; createdAt: string }
  >();
  const eventsByTimeline = new Map<TimelineId, TimelineEvent[]>();

  return {
    createTimeline(ctx) {
      const a = assertAuthority(ctx);
      const id = generateOpaqueId();
      const createdAt = new Date().toISOString();
      timelines.set(id, { workspaceId: a.workspaceId, createdAt });
      eventsByTimeline.set(id, []);
      return Object.freeze({ id, workspaceId: a.workspaceId, createdAt });
    },

    append(ctx, input) {
      const a = assertAuthority(ctx);
      if (!input.timelineId)
        throw new PrimitiveError("INVALID_INPUT", "timelineId is required.");
      if (!input.occurredAt)
        throw new PrimitiveError("INVALID_INPUT", "occurredAt is required.");
      if (!input.type)
        throw new PrimitiveError("INVALID_INPUT", "type is required.");
      const t = timelines.get(input.timelineId);
      if (!t)
        throw new PrimitiveError("INVALID_INPUT", "timelineId does not exist.");

      denyCrossWorkspace(a.workspaceId, t.workspaceId);

      const ingestedAt = new Date().toISOString();
      const prov: ProvenanceEnvelope =
        input.provenance ??
        Object.freeze({
          sourceSystem: a.appId,
          actorId: a.actorId,
          actorType: a.actorType,
          environment: a.environment,
          createdAt: ingestedAt,
          workspaceId: a.workspaceId,
        });

      const ev: TimelineEvent = Object.freeze({
        id: generateOpaqueId(),
        timelineId: input.timelineId,
        workspaceId: a.workspaceId,
        occurredAt: input.occurredAt,
        ingestedAt,
        entityIds: Object.freeze([...(input.entityIds ?? [])]),
        type: input.type,
        ...(input.payloadRef
          ? { payloadRef: Object.freeze({ ...input.payloadRef }) }
          : {}),
        provenance: Object.freeze({ ...prov }),
      });

      // append-only
      const arr = eventsByTimeline.get(input.timelineId)!;
      arr.push(ev);
      return ev;
    },

    read(ctx, timelineId) {
      const a = assertAuthority(ctx);
      const t = timelines.get(timelineId);
      if (!t) return Object.freeze([]);
      denyCrossWorkspace(a.workspaceId, t.workspaceId);

      // Deterministic ordering: by occurredAt then ingestedAt then id
      const sorted = [...(eventsByTimeline.get(timelineId) ?? [])].sort(
        (x, y) => {
          if (x.occurredAt !== y.occurredAt)
            return x.occurredAt < y.occurredAt ? -1 : 1;
          if (x.ingestedAt !== y.ingestedAt)
            return x.ingestedAt < y.ingestedAt ? -1 : 1;
          return x.id < y.id ? -1 : 1;
        },
      );

      return Object.freeze(sorted.map((e) => Object.freeze({ ...e })));
    },
  };
}
