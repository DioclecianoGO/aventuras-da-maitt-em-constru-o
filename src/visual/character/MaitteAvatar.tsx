/**
 * Maittê as she appears in the world, at a walkable scale.
 * Spec: docs/narrative/MAITTE.md, docs/design/COLOR-RESTORATION.md
 *
 * The colour regions restored here are resolved from CONFIGURATION plus the
 * derived 0..1 avatar restoration. Regions are independently addressable; the
 * arrangement used is provisional configuration, not a decided reward order.
 *
 * Step 2B-M1: rendering goes through `MaitteActor`, not `MaitteFigure`
 * directly, so this wrapper only ever supplies an acting state — it never
 * resolves or names a logical asset key itself.
 */
import { MAITTE_BOX } from "@/assets/game/characters/MaitteFigure";
import { MaitteActor } from "@/visual/character/MaitteActor";
import type { MaitteActingState } from "@/visual/character/acting";
import { characterVisual } from "@/visual/world-config";
import type { CharacterRegionId, CharacterVisualConfig } from "@/visual/world-config/types";

export function resolveRestoredRegions(
  progress: number,
  config: CharacterVisualConfig = characterVisual,
): Set<CharacterRegionId> {
  const restored = new Set<CharacterRegionId>(config.alwaysRestored);
  const clamped = Math.min(1, Math.max(0, progress));
  const count = Math.round(clamped * config.provisionalSequence.length);
  for (const region of config.provisionalSequence.slice(0, count)) restored.add(region);
  return restored;
}

export function MaitteAvatar({
  progress,
  x,
  y,
  scale = 1,
  animated = true,
  state = "idle-curious",
  title = "Maittê",
}: {
  progress: number;
  /** Scene-space position of Maittê's feet. */
  x: number;
  y: number;
  scale?: number;
  animated?: boolean;
  /** Acting state. Presentation only — never derived from correctness here. */
  state?: MaitteActingState;
  title?: string;
}) {
  const restored = resolveRestoredRegions(progress);
  return (
    <g
      transform={`translate(${x - (MAITTE_BOX.width / 2) * scale} ${y - MAITTE_BOX.height * scale}) scale(${scale})`}
      style={{ transition: "transform var(--motion-travel) var(--ease-travel)" }}
    >
      <MaitteActor restored={restored} state={state} animated={animated} title={title} />
    </g>
  );
}