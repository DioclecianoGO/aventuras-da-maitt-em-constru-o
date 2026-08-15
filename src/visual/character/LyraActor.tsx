/**
 * Lyra presentation resolver — the single seam between "what acting state
 * should Lyra be in" and "what actually renders".
 * Spec: docs/design/VISUAL-ASSET-CONTRACT.md, docs/design/ASSET-PRODUCTION-PIPELINE.md,
 *       docs/design/CHARACTER-ART.md, references/visual/16-lyra-character-master/README.md.
 *
 * Step 2B-M5: callers provide ONE `CompanionActingState`, exactly once. This
 * resolves the matching `character.lyra.<state>` logical key through the
 * registry AND forwards that same state to whatever component the resolved
 * descriptor wraps — today, always the concept scaffold (`LyraArt`), which
 * still owns its own POSES table and needs `state` itself to pick a pose.
 * `LyraActorProps` has no key/assetKey/petId field: there is no externally
 * representable seam where a caller could supply a logical key, a pet
 * identity or an acting state that disagree.
 *
 * Mirrors `src/visual/character/WillActor.tsx` exactly, one character over:
 * this component is Lyra-specific on purpose. A caller that doesn't yet know
 * which pet it wants goes through `CompanionActor` instead, which decides
 * whether to delegate here.
 */
import { getAsset } from "@/visual/assetRegistry";
import { Illustration } from "@/visual/illustration";
import type { CompanionActingState } from "@/visual/character/acting";

export type LyraActorProps = {
  /** Acting state. Also the sole input to the resolved logical key. */
  state: CompanionActingState;
  /** Idle motion. Disabled for SSR and reduced motion. */
  animated?: boolean;
};

export function LyraActor({ state, animated = true }: LyraActorProps) {
  const asset = getAsset(`character.lyra.${state}`);
  return <Illustration asset={asset} state={state} animated={animated} />;
}
