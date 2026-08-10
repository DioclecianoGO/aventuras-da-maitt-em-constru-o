/**
 * Stable PRESENTATION identity for movable puzzle objects.
 * Spec: docs/design/PHASE-1B-1-VISUAL-POLISH.md (Correction 3 — "Stable
 *       identity rule"), docs/ux/CHALLENGE-STAGE.md ("Puzzle-object physical
 *       identity"), docs/design/ART-DIRECTION.md ("Handcrafted object rule").
 *
 * Why this exists: the stone art used to be selected from the option's CURRENT
 * position index, so a stone changed silhouette the moment the child moved it.
 * A physical object must keep its body when it is picked up.
 *
 * How the assignment is made, and what it deliberately is NOT:
 *
 *  - the map is built ONCE per item, from the authored option order, and is
 *    then keyed by option id, so the identity travels with the object;
 *  - the seed is the object's position in the AUTHORED option list, which is
 *    the neutral presentation order the content pack ships. It is not the
 *    label, not the numeric value, not the accepted answer order and not any
 *    correctness signal, so the art cannot correlate with the answer;
 *  - nothing here is hashed from the id STRING, so ids that happen to encode
 *    semantics ("opt-3") cannot leak into the artwork;
 *  - this is presentation-only configuration. It must never be written into an
 *    educational/domain schema, persisted, or read by an evaluator.
 *
 * The three decorative traits advance on different co-prime strides so four
 * neighbouring options never collapse into the same-looking stone.
 */

export type StoneIdentity = {
  /** Index into the silhouette catalog. */
  shape: number;
  /** Index into the surface-detail catalog (cracks, pecked marks, chips). */
  detail: number;
  /** Small settling lean, in degrees. Never large enough to affect the target. */
  tilt: number;
};

/** Neutral leans. Symmetric around zero so no stone reads as "more important". */
const TILTS = [-4, 3, -2, 5, -5, 2, 4, -3];

export function buildStoneIdentities(authoredOptionIds: string[]): Record<string, StoneIdentity> {
  const identities: Record<string, StoneIdentity> = {};
  authoredOptionIds.forEach((id, seed) => {
    identities[id] = {
      shape: seed,
      detail: (seed * 3 + 1) % 7,
      tilt: TILTS[(seed * 5 + 2) % TILTS.length]!,
    };
  });
  return identities;
}

export const FALLBACK_STONE_IDENTITY: StoneIdentity = { shape: 0, detail: 0, tilt: 0 };

export function getStoneIdentity(
  identities: Record<string, StoneIdentity>,
  optionId: string,
): StoneIdentity {
  return identities[optionId] ?? FALLBACK_STONE_IDENTITY;
}
