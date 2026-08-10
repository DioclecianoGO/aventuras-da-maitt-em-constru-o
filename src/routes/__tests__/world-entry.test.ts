/**
 * Route-level regression coverage for world entry.
 * Spec: docs/technical/CONTENT-ORCHESTRATION.md §1, docs/ux/NAVIGATION.md
 *
 * The previous registry populated module-level Maps through import-time side
 * effects. Registry-only unit tests passed while the built app tree-shook the
 * registration calls away and every world resolved to notFound. These tests
 * exercise the router loader boundary and the Overworld link target instead.
 */
import { describe, expect, it } from "vitest";
import { createMemoryHistory, createRouter } from "@tanstack/react-router";

import { routeTree } from "@/routeTree.gen";
import { getWorld, listWorlds } from "@/game/content";
import { SCIENCE_WORLD_ID } from "@/game/content/science/slice-a";
import { PLACEHOLDER_WORLD_ID } from "@/game/content/placeholder-fixture";
import { overworldRegions } from "@/visual/world-config";

async function loadRoute(path: string) {
  const router = createRouter({
    routeTree,
    history: createMemoryHistory({ initialEntries: [path] }),
    context: { queryClient: undefined as never },
  });
  await router.load();
  return router;
}

describe("world entry", () => {
  it("registers every authored world without import-order side effects", () => {
    const ids = listWorlds().map((world) => world.id);
    expect(ids).toContain(PLACEHOLDER_WORLD_ID);
    expect(ids).toContain(SCIENCE_WORLD_ID);
  });

  it("routes the Science Overworld region to the generic world route", () => {
    const region = overworldRegions.find((entry) => entry.id === "region-science");
    expect(region?.worldId).toBe(SCIENCE_WORLD_ID);
    expect(`/mundo/${region?.worldId}`).toBe("/mundo/world-science-oceano");
  });

  it("resolves the Science world through the route loader", async () => {
    const router = await loadRoute(`/mundo/${SCIENCE_WORLD_ID}`);
    const match = router.state.matches.find((m) => m.routeId === "/mundo/$worldId");
    expect(match?.params).toMatchObject({ worldId: SCIENCE_WORLD_ID });
    expect(match?.status).toBe("success");
    expect(getWorld(SCIENCE_WORLD_ID)?.slots.length).toBeGreaterThan(0);
  });

  it("resolves the Mathematics world through the route loader", async () => {
    const router = await loadRoute(`/mundo/${PLACEHOLDER_WORLD_ID}`);
    const match = router.state.matches.find((m) => m.routeId === "/mundo/$worldId");
    expect(match?.status).toBe("success");
  });

  it("still 404s an unknown world id", async () => {
    const router = await loadRoute("/mundo/world-does-not-exist");
    const match = router.state.matches.find((m) => m.routeId === "/mundo/$worldId");
    expect(match?.status).not.toBe("success");
  });
});
