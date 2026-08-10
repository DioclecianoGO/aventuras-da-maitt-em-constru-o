/**
 * Overworld route — spatial layer 1.
 * Spec: docs/worlds/OVERWORLD.md, docs/ux/NAVIGATION.md
 *
 * The route resolves derived state and hands it to the visual layer. All
 * illustration, layout and motion live in src/visual/**.
 */
import { createFileRoute } from "@tanstack/react-router";

import { getWorld, listWorlds } from "@/game/content";
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
  const worlds = listWorlds();

  const regionProgress: Record<string, number> = {};
  for (const region of overworldRegions) {
    // Each region reads ITS OWN world. No subject is hardcoded here.
    const world = region.worldId ? getWorld(region.worldId) : null;
    regionProgress[region.id] = world ? selectRegionRestoration(facts, world) : 0;
  }

  return (
    <main className="h-[100svh] w-full">
      <h1 className="sr-only">Aventuras da Maittê — mapa do mundo</h1>
      <OverworldScene
        regionProgress={regionProgress}
        avatarProgress={selectAvatarRestoration(facts, worlds)}
      />
    </main>
  );
}
