/**
 * Logical asset registry.
 * Spec: docs/design/VISUAL-IMPLEMENTATION.md §"Asset strategy"
 *
 * Scenery is referenced by LOGICAL KEY, never by file path, so concept art can
 * be swapped for final art without touching scenes, routes or game logic. A
 * missing key degrades to a quiet placeholder instead of crashing the app.
 */
import type { ComponentType } from "react";

import { CompanionArt } from "@/assets/game/characters/CompanionArt";
import { MaitteFigure } from "@/assets/game/characters/MaitteFigure";
import { DunasDouradasColor, DunasDouradasInk } from "@/assets/game/board/DunasDouradasArt";
import { INK_SOFT, PAPER_DEEP } from "@/assets/game/ink";
import {
  BackpackArt,
  FoldedMapArt,
  RockArchArt,
} from "@/assets/game/objects/NavigationArt";
import { SlotObjectArt } from "@/assets/game/objects/SlotObjectArt";
import {
  BaseDaEsperancaArt,
  OverworldColor,
  OverworldInk,
} from "@/assets/game/overworld/OverworldArt";

function MissingAsset() {
  return (
    <g>
      <rect
        x="-30"
        y="-30"
        width="60"
        height="60"
        rx="10"
        fill={PAPER_DEEP}
        stroke={INK_SOFT}
        strokeWidth="2.4"
        strokeDasharray="6 6"
      />
    </g>
  );
}

/* eslint-disable @typescript-eslint/no-explicit-any -- registry is intentionally heterogeneous */
const registry: Record<string, ComponentType<any>> = {
  "overworld.color": OverworldColor,
  "overworld.ink": OverworldInk,
  "overworld.base": BaseDaEsperancaArt,
  "board.dunas-douradas.color": DunasDouradasColor,
  "board.dunas-douradas.ink": DunasDouradasInk,
  "landmark.rock-arch": RockArchArt,
  "object.slot": SlotObjectArt,
  "object.folded-map": FoldedMapArt,
  "object.backpack": BackpackArt,
  "character.maitte": MaitteFigure,
  "character.companion": CompanionArt,
};
/* eslint-enable @typescript-eslint/no-explicit-any */

export function getAsset(key: string): ComponentType<Record<string, unknown>> {
  return registry[key] ?? MissingAsset;
}

export function hasAsset(key: string): boolean {
  return key in registry;
}