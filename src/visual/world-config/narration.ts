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
  /**
   * Optional in-character reaction to WHAT the child touched, keyed by the
   * authored option id. Discover mode only: informative, never corrective, and
   * never a correctness signal (docs/ux/CHALLENGE-STAGE.md, FEEDBACK.md).
   */
  observations?: Record<string, NarrationLine>;
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
/* --------------------------------------------------------------------------
 * Science Slice A — Oceano das Descobertas / Praia das Conchas.
 * Spoken instruction copy only. No answer, no evaluation, no curriculum data.
 * Spec: docs/design/AUDIO.md, docs/pedagogy/SCIENCE-SLICE-A-BUILD-GATE.md
 * ----------------------------------------------------------------------- */
function coastLine(
  instruction: string,
  success = "Muito bem! Esta parte da praia recuperou a cor.",
  retry = "Vamos observar de novo, com calma.",
  observations?: Record<string, string>,
): ChallengeNarration {
  return {
    petId: "burpee",
    petDisplayName: "Burpee",
    locale: "pt-BR",
    instruction: { captionText: instruction, spokenText: instruction },
    success: { captionText: success, spokenText: success },
    retry: { captionText: retry, spokenText: retry },
    ...(observations
      ? {
          observations: Object.fromEntries(
            Object.entries(observations).map(([optionId, text]) => [
              optionId,
              { captionText: text, spokenText: text },
            ]),
          ),
        }
      : {}),
    confirmLabel: "Mostrar para Burpee",
  };
}

const SCIENCE_INSTRUCTIONS: Record<string, string> = {
  "activity-sci-s1-discover": "Observe o ambiente e toque no que faz parte dele.",
  /**
   * CORRECTION: the previous line described a natural × artificial criterion,
   * which is NOT what this Activity assesses. The authored targets are
   * "Seres vivos" × "Não vivos", so the spoken instruction must say that.
   */
  "activity-sci-s1-practice":
    "Você encontrou várias coisas aqui. Agora vamos separar o que tem vida do que não tem vida.",
  "activity-sci-s1-challenge": "Olhe o ambiente e escolha a conclusão e a pista que apoia ela.",
  "activity-sci-s2-discover": "Olhe este ambiente brasileiro e toque no que você reconhece.",
  "activity-sci-s2-practice": "Ligue cada ambiente brasileiro ao seu nome.",
  "activity-sci-s2-challenge": "Diga qual é o ambiente e mostre a pista que apoia ela.",
  "activity-sci-s3-discover": "Procure onde cada animal vive nesta cena.",
  "activity-sci-s3-practice": "Ligue cada animal ao seu habitat.",
  "activity-sci-s3-challenge": "Escolha o habitat do animal e mostre a pista que apoia ela.",
  "activity-sci-s4-discover": "Observe quem vive na terra e quem vive na água.",
  "activity-sci-s4-practice": "Separe os animais de terra dos animais de água.",
  "activity-sci-s4-challenge": "Escolha onde o animal vive e mostre a pista que apoia ela.",
  "activity-sci-s5-discover": "Olhe o corpo dos animais e toque no que ajuda cada um a viver ali.",
  "activity-sci-s5-practice": "Ligue cada característica ao que ela ajuda o animal a fazer.",
  "activity-sci-s5-challenge": "Escolha a adaptação e mostre a pista que apoia ela.",
  "activity-sci-s6-discover": "Procure o animal escondido nesta cena.",
  "activity-sci-s6-practice": "Ligue cada animal ao lugar onde ele se camufla.",
  "activity-sci-s6-challenge": "Explique por que ele se esconde bem e mostre a pista.",
};

function scienceNarration(): Record<string, ChallengeNarration> {
  return Object.fromEntries(
    Object.entries(SCIENCE_INSTRUCTIONS).map(([id, text]) => [
      id,
      coastLine(
        text,
        undefined,
        undefined,
        SCIENCE_OBSERVATIONS[id],
      ),
    ]),
  );
}

/**
 * Object-specific observation reactions (Discover only). Keyed by activity id
 * and then by authored option id. Presentation copy: no new science claim, no
 * evaluation, no answer.
 */
const SCIENCE_OBSERVATIONS: Record<string, Record<string, string>> = {
  "activity-sci-s1-discover": {
    "obs-planta": "Isso. A planta faz parte deste ambiente.",
    "obs-passaro": "Boa observação! O pássaro também está neste ambiente.",
    "obs-pedra": "Você encontrou a pedra. Ela também está aqui neste ambiente.",
    "obs-agua": "Você encontrou a água. Ela também faz parte deste ambiente.",
  },
};

/** Companion reaction to the object the child just touched, when configured. */
export function getObservationLine(
  narration: ChallengeNarration,
  optionId: string,
): NarrationLine | undefined {
  return narration.observations?.[optionId];
}

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