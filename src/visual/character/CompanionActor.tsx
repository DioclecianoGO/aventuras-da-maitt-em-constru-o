/**
 * Companion presentation resolver — the petId-aware seam a caller uses when
 * it only knows "there is a configured companion", not which one.
 * Spec: docs/narrative/PET-COMPANIONS.md ("no pet permanently bound to a
 *       subject/skill"), docs/design/VISUAL-ASSET-CONTRACT.md.
 *
 * Step 2B-M2. Dependency direction (bottom to top), by design, to avoid a
 * cycle through `assetRegistry` (which already imports `CompanionArt`):
 *
 *   assets/scaffolds (BurpeeArt, CompanionArt)
 *     ← assetRegistry (wraps them behind stable logical keys)
 *       ← BurpeeActor (resolves character.burpee.<state>)
 *         ← CompanionActor (THIS FILE — decides Burpee vs. generic fallback)
 *           ← scene/call sites (ChallengeStageShell, future Board/Overworld)
 *
 * `CompanionArt.tsx` is never imported here or by `BurpeeActor`: it stays
 * pure asset-layer code, reached only indirectly — through the registry's
 * generic `"character.companion"` key — for any pet without its own
 * per-state keys yet (Pipoca, Will, Lyra today). Do not import
 * `CompanionArt` into this file; resolve the fallback through `getAsset`
 * instead, exactly like every other registry-backed asset.
 */
import { getAsset } from "@/visual/assetRegistry";
import { Illustration } from "@/visual/illustration";
import { BurpeeActor } from "@/visual/character/BurpeeActor";
import type { CompanionActingState } from "@/visual/character/acting";

export type CompanionActorProps = {
  /** Configured pet id. Unknown/absent ids fall back gracefully. */
  petId?: string;
  state?: CompanionActingState;
  animated?: boolean;
};

export function CompanionActor({ petId = "", state = "idle", animated = true }: CompanionActorProps) {
  if (petId === "burpee") {
    return <BurpeeActor state={state} animated={animated} />;
  }
  const asset = getAsset("character.companion");
  return <Illustration asset={asset} petId={petId} state={state} animated={animated} />;
}
