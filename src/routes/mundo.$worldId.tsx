/**
 * World Board — PERSISTENT LAYOUT.
 * Spec: docs/ux/BOARDS.md, docs/ux/TRANSITIONS.md
 *
 * The board never unmounts when a Challenge Stage opens: the stage is a child
 * route rendered as an overlay through <Outlet />. This preserves board scroll,
 * avatar position and restoration animation continuity across attempts.
 */
import { Link, Outlet, createFileRoute, notFound } from "@tanstack/react-router";

import { PLACEHOLDER_WORLD_ID, placeholderWorld } from "@/game/content/placeholder-fixture";
import { RestorationLayer } from "@/game/restoration/RestorationLayer";
import { useGameState } from "@/game/state/GameStateProvider";
import {
  selectCurrentSlot,
  selectSegmentRestoration,
  selectSlotState,
  selectWorldRestoration,
} from "@/game/state/selectors";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/mundo/$worldId")({
  loader: ({ params }) => {
    if (params.worldId !== PLACEHOLDER_WORLD_ID) throw notFound();
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
  const { facts } = useGameState();
  const world = placeholderWorld;
  const currentSlot = selectCurrentSlot(facts, world);
  const worldRestoration = selectWorldRestoration(facts, world);

  return (
    <div className="relative min-h-screen">
      <main className="mx-auto flex w-full max-w-5xl flex-col gap-8 px-6 py-10">
        <header className="flex flex-col gap-2">
          <Link to="/" className="w-fit text-sm text-muted-foreground underline-offset-4 hover:underline">
            ← Mapa do mundo
          </Link>
          <h1 className="text-3xl font-bold text-foreground">{world.name}</h1>
          <p className="text-sm text-muted-foreground">
            Cor restaurada: {Math.round(worldRestoration * 100)}%
          </p>
        </header>

        {world.segments.map((segment) => {
          const segmentRestoration = selectSegmentRestoration(facts, world, segment.id);
          const slots = world.slots
            .filter((slot) => slot.segmentId === segment.id)
            .sort((a, b) => a.order - b.order);

          return (
            <section key={segment.id} className="flex flex-col gap-3">
              <h2 className="text-lg font-semibold text-foreground">
                {segment.label}{" "}
                <span className="text-sm font-normal text-muted-foreground">
                  ({Math.round(segmentRestoration * 100)}%)
                </span>
              </h2>

              <RestorationLayer progress={segmentRestoration} className="rounded-2xl">
                <ul className="flex flex-wrap gap-3 rounded-2xl bg-linear-to-r from-secondary to-accent/50 p-5">
                  {slots.map((slot) => {
                    const state = selectSlotState(facts, world, slot.id);
                    const isCurrent = currentSlot?.id === slot.id;
                    return (
                      <li key={slot.id}>
                        {state === "locked" ? (
                          <span
                            aria-disabled
                            className="flex min-h-16 min-w-24 items-center justify-center rounded-xl border-2 border-dashed border-border px-4 text-sm text-muted-foreground"
                          >
                            Bloqueado
                          </span>
                        ) : (
                          <Link
                            to="/mundo/$worldId/desafio/$slotId"
                            params={{ worldId: world.id, slotId: slot.id }}
                            className={cn(
                              "flex min-h-16 min-w-24 items-center justify-center rounded-xl border-2 px-4 text-sm font-semibold transition-colors",
                              state === "completed"
                                ? "border-primary/60 bg-primary/10 text-primary"
                                : "border-primary bg-card text-card-foreground",
                              isCurrent && "ring-2 ring-primary ring-offset-2",
                            )}
                          >
                            {state === "completed" ? "Concluído" : "Desafio"}
                          </Link>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </RestorationLayer>
            </section>
          );
        })}
      </main>

      {/* Challenge Stage overlay. The board above stays mounted underneath. */}
      <Outlet />
    </div>
  );
}