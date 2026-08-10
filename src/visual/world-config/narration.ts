/**
 * Narration / caption CONFIGURATION.
 * Spec: docs/design/AUDIO.md ("Essential instruction rule", "Narration
 *       contract"), docs/ux/CHALLENGE-STAGE.md, docs/ux/FEEDBACK.md
 *
 * The essential instruction sentence and the supporting presentation copy live
 * HERE — in the presentation/narration layer — not in domain schemas, not in
 * the companion component and not in the Puzzle Template. Educational answer
 * and evaluation data stays in the content pack; spoken/caption/reaction copy
 * stays here. Nothing in this file evaluates anything.
 *
 * Entries are keyed by stable slot id with an activity-level fallback, so
 * narration can be authored per placement or reused across placements.
 */

export type NarrationLine = {
  /** Short visible caption. Always rendered. */
  captionText: string;
  /** Sentence spoken by the recording or the speech fallback. */
  spokenText: string;
  /** Logical audio key; resolved through the audio registry when it exists. */
  audioKey?: string;
};

export type ChallengeNarration = {
  /** Configured companion for this challenge. Not bound to a subject/skill. */
  petId: string;
  petDisplayName: string;
  locale: string;
  /** Reserved: per-companion voice profile once approved voices exist. */
  voiceProfileKey?: string;
  instruction: NarrationLine;
  /** Non-punitive reaction copy. Presentation only. */
  success: NarrationLine;
  retry: NarrationLine;
  /** Diegetic confirmation affordance copy. */
  confirmLabel: string;
};

const DEFAULT_NARRATION: ChallengeNarration = {
  petId: "burpee",
  petDisplayName: "Burpee",
  locale: "pt-BR",
  instruction: {
    captionText: "Vamos colocar do menor para o maior.",
    spokenText: "Vamos colocar do menor para o maior.",
    audioKey: "vo.pt-BR.burpee.ordering.instruction",
  },
  success: {
    captionText: "Isso! A cor voltou para este trecho da trilha.",
    spokenText: "Isso! A cor voltou para este trecho da trilha.",
  },
  retry: {
    captionText: "Vamos olhar mais uma vez, começando pela menor.",
    spokenText: "Vamos olhar mais uma vez, começando pela menor.",
  },
  confirmLabel: "Mostrar para Burpee",
};

/** Keyed by slot id. Absent keys fall back to the activity/default entry. */
const bySlot: Record<string, ChallengeNarration> = {
  "slot-1": DEFAULT_NARRATION,
  "slot-2": DEFAULT_NARRATION,
  "slot-3": DEFAULT_NARRATION,
};

/** Keyed by activity id, used when a slot has no dedicated narration. */
const byActivity: Record<string, ChallengeNarration> = {
  "activity-placeholder-challenge": DEFAULT_NARRATION,
  ...scienceNarration(),
};

export function getChallengeNarration(
  slotId: string,
  activityId?: string,
): ChallengeNarration {
  return (
    // Activity-first: a Slot runs a SEQUENCE of activities, so the spoken
    // instruction belongs to the activity. Slot entries remain a fallback.
    (activityId ? byActivity[activityId] : undefined) ??
    bySlot[slotId] ??
    DEFAULT_NARRATION
  );
}