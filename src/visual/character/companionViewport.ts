/**
 * Companion viewport resolver — the single presentation-only source of truth
 * for "what ambient SVG viewBox should a companion be framed inside", by
 * petId (Step 2B-M4).
 * Spec: docs/design/VISUAL-ASSET-CONTRACT.md.
 *
 * `ChallengeStageShell.tsx` used to wrap every companion in a hardcoded
 * `viewBox="-140 -160 260 205"` — Burpee's own `BURPEE_BOX.viewBox` — which
 * silently mis-scaled/mis-positioned any other pet (Pipoca already had a
 * different real box; Will now does too). This module reads each pet's own
 * exported `*_BOX` constant directly from its scaffold — the same box the
 * scaffold itself was drawn against — instead of a second, independently
 * maintained copy of the numbers (that duplication is exactly what let the
 * old `CompanionArt.tsx` helper's Burpee value drift stale; see its removal
 * note there).
 *
 * Dependency direction (bottom to top), consistent with
 * `CompanionActor.tsx`: this file imports only `*_BOX` constants from the
 * assets/scaffolds layer. It does NOT import `CompanionArt`, `CompanionActor`
 * or `assetRegistry`, so it stays safely below `CompanionActor` with no risk
 * of an import cycle. `FALLBACK_PET_VIEWBOX` is imported from `CompanionArt`
 * because it is the one already-correct geometry for `FallbackCompanionArt`
 * — that import is a normal downward reference to the scaffolds layer, the
 * same kind `assetRegistry.tsx` and `CompanionActor.tsx` already make.
 */
import { BURPEE_BOX } from "@/assets/game/characters/pets/BurpeeArt";
import { PIPOCA_BOX } from "@/assets/game/characters/pets/PipocaArt";
import { WILL_BOX } from "@/assets/game/characters/pets/WillArt";
import { FALLBACK_PET_VIEWBOX } from "@/assets/game/characters/CompanionArt";

/** Resolves the ambient SVG viewBox a companion should be framed inside. */
export function getCompanionViewBox(petId?: string): string {
  if (petId === "burpee") return BURPEE_BOX.viewBox;
  if (petId === "pipoca") return PIPOCA_BOX.viewBox;
  if (petId === "will") return WILL_BOX.viewBox;
  return FALLBACK_PET_VIEWBOX;
}
