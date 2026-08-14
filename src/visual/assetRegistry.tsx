/**
 * Logical asset registry.
 * Spec: docs/design/VISUAL-IMPLEMENTATION.md §"Asset strategy",
 *       docs/design/ASSET-PRODUCTION-PIPELINE.md.
 *
 * Scenery is referenced by LOGICAL KEY, never by file path, so concept art can
 * be swapped for final art without touching scenes, routes or game logic. A
 * missing key degrades to a quiet placeholder instead of crashing the app.
 *
 * Step 1 (production presentation seam): a registry entry is now an
 * `IllustrationAsset` DESCRIPTOR rather than a bare component. Every entry
 * below is still `vector-component` — the existing inline-SVG scaffolding,
 * unchanged in appearance and behaviour.
 *
 * Promoting a STATIC entry (a full-scene background, an ink layer, a
 * landmark, a stage skin — one fixed image, no runtime variant) to a
 * "raster" descriptor is a one-line change here; the call site does not
 * change, provided it already declares the right `as` embedding context (see
 * `src/visual/illustration.tsx`). A PARAMETERIZED entry — one whose call site
 * passes runtime props to select a variant or acting state, e.g.
 * "character.companion" and "object.slot" below — is NOT a one-line swap: it
 * needs an approved variant/identity asset contract.
 *
 * Step 2B-M1 (docs/design/VISUAL-ASSET-CONTRACT.md): the `character.maitte.*`
 * keys are one entry PER ACTING STATE (resolved by `MaitteActor`, never
 * requested with a bare "character.maitte" key — that key has been removed).
 * Each key still looks like a single static descriptor, but is NOT eligible
 * for the naive one-line raster promotion described above: Maittê's seven
 * independently-restorable colour regions (glasses, hairStreak, hair, shirt,
 * skirt, socks, shoes; heart is always saturated) currently render UNDER a
 * shared ink layer inside the SAME component for every state. Swapping one
 * `character.maitte.<state>` entry to a flattened raster image would freeze
 * that pose at whatever restoration level the raster happened to depict,
 * silently breaking restoration for every other progress value. Do not
 * promote any `character.maitte.*` key to `raster` until a restoration-
 * compositing contract for character poses is separately designed and
 * approved (tracked as a named `PRODUCTION-ASSET-GAP` / blocker, not solved
 * here).
 */
import { CompanionArt } from "@/assets/game/characters/CompanionArt";
import { MaitteFigure } from "@/assets/game/characters/MaitteFigure";
import { DunasDouradasColor, DunasDouradasInk } from "@/assets/game/board/DunasDouradasArt";
import {
  PraiaDasConchasColor,
  PraiaDasConchasInk,
} from "@/assets/game/board/PraiaDasConchasArt";
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
import {
  CoastStageSkinArt,
  DefaultStageSkinArt,
  DesertStageSkinArt,
} from "@/assets/game/stage/StageSkinArt";
import { type IllustrationAsset, vectorAsset } from "@/visual/illustration";

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

const MISSING_ASSET: IllustrationAsset = vectorAsset(MissingAsset);

const registry: Record<string, IllustrationAsset> = {
  "overworld.color": vectorAsset(OverworldColor),
  "overworld.ink": vectorAsset(OverworldInk),
  "overworld.base": vectorAsset(BaseDaEsperancaArt),
  "board.dunas-douradas.color": vectorAsset(DunasDouradasColor),
  "board.dunas-douradas.ink": vectorAsset(DunasDouradasInk),
  "board.praia-das-conchas.color": vectorAsset(PraiaDasConchasColor),
  "board.praia-das-conchas.ink": vectorAsset(PraiaDasConchasInk),
  "landmark.rock-arch": vectorAsset(RockArchArt),
  "object.slot": vectorAsset(SlotObjectArt),
  "object.folded-map": vectorAsset(FoldedMapArt),
  "object.backpack": vectorAsset(BackpackArt),
  "character.maitte.idle-curious": vectorAsset(MaitteFigure),
  "character.maitte.listen-think": vectorAsset(MaitteFigure),
  "character.maitte.success": vectorAsset(MaitteFigure),
  "character.maitte.retry-thinking": vectorAsset(MaitteFigure),
  "character.maitte.move": vectorAsset(MaitteFigure),
  "character.companion": vectorAsset(CompanionArt),
  "stage-skin.desert": vectorAsset(DesertStageSkinArt),
  "stage-skin.coast": vectorAsset(CoastStageSkinArt),
  "stage-skin.default": vectorAsset(DefaultStageSkinArt),
};

export function getAsset(key: string): IllustrationAsset {
  return registry[key] ?? MISSING_ASSET;
}

export function hasAsset(key: string): boolean {
  return key in registry;
}
