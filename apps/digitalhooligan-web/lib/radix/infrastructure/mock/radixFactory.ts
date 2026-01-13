// apps/digitalhooligan-web/lib/radix/infrastructure/mock/radixFactory.ts
import type { ActorRef, AuditFields, EntityId, ISODateTime } from "../../domain/radixTypes";

export const V1_ACTOR: ActorRef = { actorId: "ceo", actorLabel: "CEO" };

export function nowISO(): ISODateTime {
  return new Date().toISOString();
}

/**
 * v1-safe ID generator for local/mock usage.
 * Opaque, no meaning encoded; stable enough for UI.
 *
 * NOTE: Tailwind's content scanner can misinterpret certain bracket-pattern text
 * (even inside comments) as a class candidate and emit invalid CSS. Avoid writing
 * bracketed character-class examples literally in this repo's source.
 */
export function makeEntityId(prefix: string, at: ISODateTime = nowISO()): EntityId {
  const rand = Math.random().toString(16).slice(2, 10);

  // Compact ISO without using bracketed regex patterns that Tailwind might scan.
  const compact = at
    .replaceAll("-", "")
    .replaceAll(":", "")
    .replaceAll(".", "")
    .replaceAll("T", "")
    .replaceAll("Z", "");

  return `${prefix}_${compact}_${rand}`;
}

export function makeAudit(
  createdAt: ISODateTime = nowISO(),
  actor: ActorRef = V1_ACTOR
): AuditFields {
  return {
    createdAt,
    createdBy: actor,
  };
}
