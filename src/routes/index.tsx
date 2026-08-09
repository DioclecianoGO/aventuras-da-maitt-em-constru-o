/**
 * Overworld route — spatial layer 1.
 * Spec: docs/worlds/OVERWORLD.md, docs/ux/NAVIGATION.md
 *
 * The route resolves derived state and hands it to the visual layer. All
 * illustration, layout and motion live in src/visual/**.
 */
import { createFileRoute } from "@tanstack/react-router";

import { placeholderWorld } from "@/game/content/placeholder-fixture";
import { useGameState } from "@/game/state/GameStateProvider";
import { selectAvatarRestoration, selectRegionRestoration } from "@/game/state/selectors";
import { OverworldScene } from "@/visual/scenes/OverworldScene";
import { overworldRegions } from "@/visual/world-config";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Aventuras da Maittê — Mapa do Mundo" },
      {
        name: "description",
        content:
          "Explore o mapa de Aventuras da Maittê e devolva a cor a cada região resolvendo desafios.",
      },
      { property: "og:title", content: "Aventuras da Maittê — Mapa do Mundo" },
      {
        property: "og:description",
        content: "Explore o mapa e devolva a cor a cada região resolvendo desafios.",
      },
    ],
  }),
  component: Overworld,
});

function Overworld() {
  const { facts } = useGameState();

  const regionProgress: Record<string, number> = {};
  for (const region of overworldRegions) {
    regionProgress[region.id] = region.worldId
      ? selectRegionRestoration(facts, placeholderWorld)
      : 0;
  }

  return (
    <main className="h-[100svh] w-full">
      <h1 className="sr-only">Aventuras da Maittê — mapa do mundo</h1>
      <OverworldScene
        regionProgress={regionProgress}
        avatarProgress={selectAvatarRestoration(facts, [placeholderWorld])}
      />
    </main>
  );
}
