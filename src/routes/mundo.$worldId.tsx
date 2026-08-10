/**
 * World Board — PERSISTENT LAYOUT.
 * Spec: docs/ux/BOARDS.md, docs/ux/TRANSITIONS.md
 *
 * The board never unmounts when a Challenge Stage opens: the stage is a child
 * route rendered as an overlay through <Outlet />. This preserves board scroll,
 * avatar position and restoration animation continuity across attempts.
 */
import { Outlet, createFileRoute, notFound } from "@tanstack/react-router";

import { getWorld, requireWorld } from "@/game/content";
import { useGameState } from "@/game/state/GameStateProvider";
import {
  selectAvatarRestoration,
  selectCurrentSlot,
  selectSlotState,
  selectWorldRestoration,
} from "@/game/state/selectors";
import { WorldBoardScene, type BoardSlotView } from "@/visual/scenes/WorldBoardScene";
import { getWorldVisual } from "@/visual/world-config";

export const Route = createFileRoute("/mundo/$worldId")({
  loader: ({ params }) => {
    // Generic resolution: any registered world can render this board.
    if (!getWorld(params.worldId)) throw notFound();
    return null;
  },
  head: () => ({
    meta: [
      { title: "Tabuleiro do Mundo — Aventuras da Maittê" },
      {
        name: "description",
        content:
          "Percorra o tabuleiro do mundo, abra desafios e veja a cor voltar a cada trecho concluído.",
      },
      { property: "og:title", content: "Tabuleiro do Mundo — Aventuras da Maittê" },
      {
        property: "og:description",
        content: "Percorra o tabuleiro do mundo e veja a cor voltar a cada trecho concluído.",
      },
    ],
  }),
  component: WorldBoardLayout,
});

function WorldBoardLayout() {
  const { worldId } = Route.useParams();
  const { facts } = useGameState();
  const world = requireWorld(worldId);
  const visual = getWorldVisual(world.id);
  const currentSlot = selectCurrentSlot(facts, world);
  const worldRestoration = selectWorldRestoration(facts, world);

  const slots: BoardSlotView[] = [...world.slots]
    .sort((a, b) => a.order - b.order)
    .map((slot) => ({
      id: slot.id,
      anchor: slot.anchor,
      state: selectSlotState(facts, world, slot.id),
      isCurrent: currentSlot?.id === slot.id,
    }));

  return (
    <div className="relative h-[100svh] w-full">
      <h1 className="sr-only">
        {visual.displayName} — {visual.zoneName}
      </h1>
      <WorldBoardScene
        worldId={world.id}
        slots={slots}
        worldProgress={worldRestoration}
        avatarProgress={selectAvatarRestoration(facts, [world])}
        currentSlotId={currentSlot?.id ?? null}
      />

      {/* Challenge Stage overlay. The board stays mounted underneath. */}
      <Outlet />
    </div>
  );
}