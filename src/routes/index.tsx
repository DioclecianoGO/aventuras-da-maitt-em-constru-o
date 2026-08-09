/**
 * Overworld — PHASE 0 STRUCTURAL SKELETON.
 * Spec: docs/ux/NAVIGATION.md, docs/worlds/OVERWORLD.md
 *
 * Proves the spatial hierarchy Overworld -> World Board -> Challenge Stage
 * and that region colour is derived from persisted facts. Art is placeholder.
 */
import { createFileRoute, Link } from "@tanstack/react-router";

import { placeholderWorld } from "@/game/content/placeholder-fixture";
import { RestorationLayer } from "@/game/restoration/RestorationLayer";
import { useGameState } from "@/game/state/GameStateProvider";
import { selectRegionRestoration } from "@/game/state/selectors";

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
  const restoration = selectRegionRestoration(facts, placeholderWorld);

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-5xl flex-col gap-8 px-6 py-12">
      <header className="flex flex-col gap-2">
        <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          Aventuras da Maittê
        </h1>
        <p className="text-lg text-muted-foreground">
          Fase 0 — esqueleto técnico. Arte, história e conteúdo ainda são provisórios.
        </p>
      </header>

      <section aria-labelledby="regions-heading" className="flex flex-col gap-4">
        <h2 id="regions-heading" className="text-2xl font-semibold text-foreground">
          Regiões
        </h2>

        <Link
          to="/mundo/$worldId"
          params={{ worldId: placeholderWorld.id }}
          className="group block rounded-2xl border border-border focus-visible:outline-2"
        >
          <RestorationLayer progress={restoration} className="rounded-2xl">
            <div className="flex min-h-40 flex-col justify-end gap-1 rounded-2xl bg-linear-to-br from-primary/30 to-accent/40 p-6">
              <span className="text-xl font-semibold text-foreground">
                {placeholderWorld.name}
              </span>
              <span className="text-sm text-muted-foreground">
                Cor restaurada: {Math.round(restoration * 100)}%
              </span>
            </div>
          </RestorationLayer>
        </Link>
      </section>
    </main>
  );
}
