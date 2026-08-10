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
  PLACEHOLDER_WORLD_ID,
  findActivity,
  findSlot,
  placeholderPack,
  placeholderWorld,
} from "@/game/content/placeholder-fixture";
import type { AttemptResult } from "@/game/domain/responses";
import { toEvidence } from "@/game/evaluation/orchestrator";
import { PuzzleTemplateHost } from "@/game/stage/PuzzleTemplateHost";
import { useGameState } from "@/game/state/GameStateProvider";
import { selectAvatarRestoration } from "@/game/state/selectors";
import { playSfx } from "@/audio/sfx";
import { useNarration } from "@/audio/useNarration";
import type { CompanionActingState, MaitteActingState } from "@/visual/character/acting";
import { getChallengeNarration } from "@/visual/world-config/narration";
import { ChallengeStageShell } from "@/visual/stage/ChallengeStageShell";

/**
 * Bounded success reaction before the stage closes. PROVISIONAL choreography
 * (docs/ux/PHASE-1B-1A-SUCCESS-RETURN-HOTFIX.md): long enough to perceive the
 * success, short enough to preserve flow. It never waits for narration, SFX or
 * animation, because audio may be blocked or unavailable.
 */
export const SUCCESS_REACTION_MS = 1600;

export const Route = createFileRoute("/mundo/$worldId/desafio/$slotId")({
  loader: ({ params }) => {
    if (params.worldId !== PLACEHOLDER_WORLD_ID || !findSlot(params.slotId)) throw notFound();
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

  const slot = findSlot(slotId);
  const activityId = slot?.sequence.challenge[0];
  const activity = activityId ? findActivity(activityId) : null;
  const item = placeholderPack.items[0];

  // Narration copy is configuration, resolved by placement. Nothing spoken here
  // is authored by the template, the pet component or the domain layer.
  const narrationConfig = getChallengeNarration(slotId, activityId);
  const line =
    lastAttempt === null
      ? narrationConfig.instruction
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

  const solved = lastAttempt?.outcome === "correct";

  /**
   * Automatic success return. The completion facts are already committed by
   * handleAttempt (synchronously, before this effect runs), so the Board can
   * derive its restored state the moment it reappears.
   */
  React.useEffect(() => {
    if (!solved) return;
    const timer = window.setTimeout(close, SUCCESS_REACTION_MS);
    return () => window.clearTimeout(timer);
  }, [solved, close]);

  const handleAttempt = React.useCallback(
    (attempt: AttemptResult) => {
      setLastAttempt(attempt);
      playSfx(attempt.outcome === "correct" ? "success" : "retry");
      dispatch({
        type: "RECORD_ATTEMPT",
        evidence: toEvidence(attempt),
        slotId: attempt.slotId,
        activityId: attempt.activityId,
        outcome: attempt.outcome,
        mode: attempt.mode,
      });

      if (attempt.outcome === "correct") {
        playSfx("restore");
        const slots = [...placeholderWorld.slots].sort((a, b) => a.order - b.order);
        const nextSlot = slots[slots.findIndex((entry) => entry.id === attempt.slotId) + 1];
        dispatch({
          type: "SLOT_COMPLETED",
          slotId: attempt.slotId,
          worldId: attempt.worldId,
          ...(nextSlot ? { nextSlotId: nextSlot.id } : {}),
        });
      }
    },
    [dispatch],
  );

  if (!slot || !activity || !item) return null;

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
      title="Pedra esculpida"
      onClose={close}
      caption={line.captionText}
      narrationStatus={narration.status}
      audioUnavailable={narration.audioUnavailable}
      onReplay={narration.play}
      petId={narrationConfig.petId}
      petDisplayName={narrationConfig.petDisplayName}
      maitteState={maitteState}
      companionState={companionState}
      avatarProgress={selectAvatarRestoration(facts, [placeholderWorld])}
      feedback={
        lastAttempt && lastAttempt.outcome !== "correct" ? (
          <span role="status">
            {lastAttempt.outcome === "partially-correct"
              ? placeholderPack.feedback.firstError
              : placeholderPack.feedback.repeatedError}
          </span>
        ) : undefined
      }
    >
      <PuzzleTemplateHost
        activity={activity}
        slot={slot}
        pack={placeholderPack}
        item={item}
        confirmLabel={narrationConfig.confirmLabel}
        disabled={solved}
        onAttempt={handleAttempt}
      />
    </ChallengeStageShell>
  );
}