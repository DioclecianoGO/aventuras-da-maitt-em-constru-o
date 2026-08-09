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
import { ChallengeStageShell } from "@/visual/stage/ChallengeStageShell";

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
  const { dispatch } = useGameState();
  const [lastAttempt, setLastAttempt] = React.useState<AttemptResult | null>(null);

  const slot = findSlot(slotId);
  const activityId = slot?.sequence.challenge[0];
  const activity = activityId ? findActivity(activityId) : null;
  const item = placeholderPack.items[0];

  const close = React.useCallback(() => {
    void navigate({ to: "/mundo/$worldId", params: { worldId } });
  }, [navigate, worldId]);

  const handleAttempt = React.useCallback(
    (attempt: AttemptResult) => {
      setLastAttempt(attempt);
      dispatch({
        type: "RECORD_ATTEMPT",
        evidence: toEvidence(attempt),
        slotId: attempt.slotId,
        activityId: attempt.activityId,
        outcome: attempt.outcome,
        mode: attempt.mode,
      });

      if (attempt.outcome === "correct") {
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

  return (
    <ChallengeStageShell
      worldId={worldId}
      title="Pedra esculpida"
      onClose={close}
      feedback={
        lastAttempt ? (
          <span role="status">
            {lastAttempt.outcome === "correct"
              ? "Isso! A cor voltou a este trecho da trilha."
              : lastAttempt.outcome === "partially-correct"
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
        onAttempt={handleAttempt}
      />
    </ChallengeStageShell>
  );
}