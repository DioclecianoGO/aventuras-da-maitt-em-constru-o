/**
 * Challenge Stage — PROVISIONAL OVERLAY.
 * Spec: docs/ux/CHALLENGE-STAGE.md, docs/ux/TRANSITIONS.md
 *
 * PROVISIONAL PRESENTATION: overlay vs full-screen stage is not DECIDED.
 * It is an overlay here so that board continuity can be tested first.
 *
 * This route owns orchestration only: it resolves slot -> activity -> pack ->
 * item, hosts the template, receives the AttemptResult and commits facts.
 * It never evaluates a response itself.
 */
import * as React from "react";
import { createFileRoute, notFound, useNavigate } from "@tanstack/react-router";

import {
  getActivityContent,
  getSlot,
  isSlotSequenceComplete,
  requireWorld,
  resolveNextActivityId,
  sequencePosition,
} from "@/game/content";
import type { AttemptResult } from "@/game/domain/responses";
import { toEvidence } from "@/game/evaluation/orchestrator";
import { PuzzleTemplateHost } from "@/game/stage/PuzzleTemplateHost";
import { useGameState } from "@/game/state/GameStateProvider";
import { selectAvatarRestoration } from "@/game/state/selectors";
import { playSfx } from "@/audio/sfx";
import { useNarration } from "@/audio/useNarration";
import type { CompanionActingState, MaitteActingState } from "@/visual/character/acting";
import { getChallengeNarration, getObservationLine } from "@/visual/world-config/narration";
import { getItemPresentation } from "@/visual/world-config/item-presentation";
import { ChallengeStageShell } from "@/visual/stage/ChallengeStageShell";
import { getSlotVisual } from "@/visual/world-config";
import { useSuccessReturn } from "@/game/stage/useSuccessReturn";

export const Route = createFileRoute("/mundo/$worldId/desafio/$slotId")({
  loader: ({ params }) => {
    if (!getSlot(params.worldId, params.slotId)) throw notFound();
    return null;
  },
  head: () => ({
    meta: [
      { title: "Desafio — Aventuras da Maittê" },
      {
        name: "description",
        content: "Resolva o desafio para devolver a cor a este trecho do mundo.",
      },
      { property: "og:title", content: "Desafio — Aventuras da Maittê" },
      {
        property: "og:description",
        content: "Resolva o desafio para devolver a cor a este trecho do mundo.",
      },
    ],
  }),
  component: ChallengeStage,
});

function ChallengeStage() {
  const { slotId, worldId } = Route.useParams();
  const navigate = useNavigate();
  const { facts, dispatch } = useGameState();
  const [lastAttempt, setLastAttempt] = React.useState<AttemptResult | null>(null);
  /**
   * While a success reaction plays, the committed fact has already advanced the
   * sequence. Pinning keeps the finished Activity on screen until the stage
   * either advances deliberately or returns to the board.
   */
  const [pinnedActivityId, setPinnedActivityId] = React.useState<string | null>(null);
  /**
   * What the child is currently pointing at. Presentation only: it drives the
   * companion's in-character reaction and never affects evaluation, evidence
   * or progression.
   */
  const [observedOptionId, setObservedOptionId] = React.useState<string | null>(null);

  const world = requireWorld(worldId);
  const slot = getSlot(worldId, slotId);
  const completedActivityIds = facts.slots[slotId]?.completedActivityIds ?? [];
  const nextActivityId = slot ? resolveNextActivityId(slot, completedActivityIds) : null;
  const activityId = pinnedActivityId ?? nextActivityId ?? undefined;
  const resolved = activityId ? getActivityContent(activityId) : null;
  const activity = resolved?.activity ?? null;
  const pack = resolved?.pack ?? null;
  const item = resolved?.item ?? null;

  // Narration copy is configuration, resolved by placement. Nothing spoken here
  // is authored by the template, the pet component or the domain layer.
  const narrationConfig = getChallengeNarration(slotId, activityId);
  const observationLine = observedOptionId
    ? getObservationLine(narrationConfig, observedOptionId)
    : undefined;
  const line =
    lastAttempt === null
      ? (observationLine ?? narrationConfig.instruction)
      : lastAttempt.outcome === "correct"
        ? narrationConfig.success
        : narrationConfig.retry;

  const narration = useNarration(
    {
      captionText: line.captionText,
      spokenText: line.spokenText,
      locale: narrationConfig.locale,
      ...(line.audioKey ? { audioKey: line.audioKey } : {}),
      ...(narrationConfig.voiceProfileKey
        ? { voiceProfileKey: narrationConfig.voiceProfileKey }
        : {}),
    },
    { autoPlay: true },
  );

  const close = React.useCallback(() => {
    void navigate({ to: "/mundo/$worldId", params: { worldId } });
  }, [navigate, worldId]);

  /** Slot completes only when EVERY activity in its sequence is done. */
  const slotComplete = slot ? isSlotSequenceComplete(slot, completedActivityIds) : false;

  const afterSuccess = React.useCallback(() => {
    if (slotComplete) {
      close();
      return;
    }
    // Stay in the stage and continue the sequence with the next activity.
    setPinnedActivityId(null);
    setLastAttempt(null);
    setObservedOptionId(null);
  }, [close, slotComplete]);

  /**
   * Automatic success return. Completion facts are already committed by
   * handleAttempt before this runs, so the Board derives its restored state
   * the moment it reappears. `frozen` locks the template during the reaction.
   */
  const { frozen } = useSuccessReturn(lastAttempt?.outcome ?? null, afterSuccess);

  const handleAttempt = React.useCallback(
    (attempt: AttemptResult) => {
      setLastAttempt(attempt);
      setObservedOptionId(null);
      setPinnedActivityId(attempt.activityId);
      playSfx(attempt.outcome === "correct" ? "success" : "retry");
      dispatch({
        type: "RECORD_ATTEMPT",
        evidence: toEvidence(attempt),
        slotId: attempt.slotId,
        activityId: attempt.activityId,
        outcome: attempt.outcome,
        mode: attempt.mode,
      });

      if (attempt.outcome !== "correct" || !slot) return;

      const done = completedActivityIds.includes(attempt.activityId)
        ? completedActivityIds
        : [...completedActivityIds, attempt.activityId];
      if (!isSlotSequenceComplete(slot, done)) return;

      playSfx("restore");
      const slots = [...world.slots].sort((a, b) => a.order - b.order);
      const nextSlot = slots[slots.findIndex((entry) => entry.id === attempt.slotId) + 1];
      dispatch({
        type: "SLOT_COMPLETED",
        slotId: attempt.slotId,
        worldId: attempt.worldId,
        ...(nextSlot ? { nextSlotId: nextSlot.id } : {}),
      });
    },
    [completedActivityIds, dispatch, slot, world],
  );

  if (!slot || !activity || !item || !pack) return null;

  const position = sequencePosition(slot, activity.id);

  // Acting states are read from an ALREADY COMMITTED result. Presentation only.
  const maitteState: MaitteActingState =
    lastAttempt === null
      ? "listen-think"
      : lastAttempt.outcome === "correct"
        ? "success"
        : "retry-thinking";
  const companionState: CompanionActingState =
    lastAttempt === null
      ? "watch"
      : lastAttempt.outcome === "correct"
        ? "success-reaction"
        : "retry-reaction";

  return (
    <ChallengeStageShell
      worldId={worldId}
      title={`${getSlotVisual(slotId).label} — etapa ${position.index + 1} de ${position.total}`}
      onClose={close}
      caption={line.captionText}
      narrationStatus={narration.status}
      audioUnavailable={narration.audioUnavailable}
      onReplay={narration.play}
      petId={narrationConfig.petId}
      petDisplayName={narrationConfig.petDisplayName}
      maitteState={maitteState}
      companionState={companionState}
      avatarProgress={selectAvatarRestoration(facts, [world])}
      feedback={
        lastAttempt && lastAttempt.outcome !== "correct" ? (
          <span role="status">
            {lastAttempt.outcome === "partially-correct"
              ? pack.feedback.firstError
              : pack.feedback.repeatedError}
          </span>
        ) : undefined
      }
    >
      <PuzzleTemplateHost
        activity={activity}
        slot={slot}
        pack={pack}
        item={item}
        confirmLabel={narrationConfig.confirmLabel}
        disabled={frozen}
        {...(getItemPresentation(item.id)
          ? { presentation: getItemPresentation(item.id)! }
          : {})}
        onObserve={(optionIds) => setObservedOptionId(optionIds[0] ?? null)}
        onAttempt={handleAttempt}
      />
    </ChallengeStageShell>
  );
}
