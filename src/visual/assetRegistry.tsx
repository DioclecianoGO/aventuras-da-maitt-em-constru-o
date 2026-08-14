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
 *
 * Step 2B-M2: `character.burpee.*` follows the same one-entry-per-acting-
 * state pattern, resolved by `BurpeeActor`. Unlike Maittê, the current
 * `BurpeeArt` scaffold has NO restoration-region model at all (no `restored`
 * prop, no per-region opacity gating) — so today there is no compositing
 * hazard to warn about, but there will be the moment a stolen-color/
 * restoration treatment is designed for companions: at that point these keys
 * need the same "not eligible for naive raster promotion" caveat Maittê's
 * keys already carry. Tracked as `PRODUCTION-ASSET-GAP`: companion
 * restoration / stolen-color contract — not solved here.
 *
 * Step 2B-M3: `character.pipoca.*` follows the identical pattern, resolved
 * by `PipocaActor`, pointing at the new concept scaffold `PipocaArt` (also
 * region-free, same as `BurpeeArt`). Same "not eligible for naive raster
 * promotion" caveat applies once a companion restoration/stolen-color
 * contract is designed — Pipoca's white coat additionally compounds that
 * future problem with a legibility concern (white-on-paper contrast), noted
 * in `references/visual/14-pipoca-character-master/README.md` and
 * `docs/design/COLOR-RESTORATION.md`, neither resolved by this entry.
 *
 * Step 2B-M4: `character.will.*` follows the identical pattern, resolved by
 * `WillActor`, pointing at the new concept scaffold `WillArt` (also
 * region-free). Same "not eligible for naive raster promotion" caveat
 * applies once a companion restoration/stolen-color contract is designed.
 *
 * The generic `"character.companion"` key is unchanged and still resolves to
 * `CompanionArt` directly (imported below, exactly as before) — it remains
 * the real fallback for any configured pet without its own per-state keys
 * yet (Lyra today). `BurpeeActor`/`PipocaActor`/`WillActor`/`CompanionActor`
 * (`src/visual/character/`) never import `CompanionArt` themselves; they
 * only ever reach it indirectly through this registry, which is what keeps
 * the dependency graph acyclic (this file already imports `CompanionArt`, so
 * `CompanionArt` itself must never import anything that imports this file).
 */
import { CompanionArt } from "@/assets/game/characters/CompanionArt";
import { BurpeeArt } from "@/assets/game/characters/pets/BurpeeArt";
import { PipocaArt } from "@/assets/game/characters/pets/PipocaArt";
import { WillArt } from "@/assets/game/characters/pets/WillArt";
import { MaitteFigure } from "@/assets/game/characters/MaitteFigure";
import { DunasDouradasColor, DunasDouradasInk } from "@/assets/game/board/DunasDouradasArt";
import { PraiaDasConchasColor, PraiaDasConchasInk } from "@/assets/game/board/PraiaDasConchasArt";
import { INK_SOFT, PAPER_DEEP } from "@/assets/game/ink";
import { BackpackArt, FoldedMapArt, RockArchArt } from "@/assets/game/objects/NavigationArt";
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
  "character.burpee.idle": vectorAsset(BurpeeArt),
  "character.burpee.speak": vectorAsset(BurpeeArt),
  "character.burpee.watch": vectorAsset(BurpeeArt),
  "character.burpee.success-reaction": vectorAsset(BurpeeArt),
  "character.burpee.retry-reaction": vectorAsset(BurpeeArt),
  "character.pipoca.idle": vectorAsset(PipocaArt),
  "character.pipoca.speak": vectorAsset(PipocaArt),
  "character.pipoca.watch": vectorAsset(PipocaArt),
  "character.pipoca.success-reaction": vectorAsset(PipocaArt),
  "character.pipoca.retry-reaction": vectorAsset(PipocaArt),
  "character.will.idle": vectorAsset(WillArt),
  "character.will.speak": vectorAsset(WillArt),
  "character.will.watch": vectorAsset(WillArt),
  "character.will.success-reaction": vectorAsset(WillArt),
  "character.will.retry-reaction": vectorAsset(WillArt),
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
