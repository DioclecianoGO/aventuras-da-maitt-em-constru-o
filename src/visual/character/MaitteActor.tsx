/**
 * Maittê presentation resolver — the single seam between "what acting state
 * should she be in" and "what actually renders".
 * Spec: docs/design/VISUAL-ASSET-CONTRACT.md, docs/design/ASSET-PRODUCTION-PIPELINE.md,
 *       docs/design/CHARACTER-ART.md.
 *
 * Step 2B-M1: callers provide ONE `MaitteActingState`, exactly once. This
 * resolves the matching `character.maitte.<state>` logical key through the
 * registry AND forwards that same state to whatever component the resolved
 * descriptor wraps — today, always the existing vector scaffold
 * (`MaitteFigure`), which still owns its own POSES table and needs `state`
 * itself to pick a pose. There is no externally representable seam where a
 * caller could supply a logical key and an acting state that disagree: this
 * component derives the key, it never accepts one.
 *
 * When `character.maitte.*` keys are eventually promoted to authored art,
 * only this file (and the registry) needs to learn how a variant resolves —
 * every caller keeps passing exactly the same `state` prop it does today.
 */
import { getAsset } from "@/visual/assetRegistry";
import { Illustration } from "@/visual/illustration";
import type { MaitteActingState } from "@/visual/character/acting";
import type { CharacterRegionId } from "@/visual/world-config/types";

export type MaitteActorProps = {
  /** Acting state. Also the sole input to the resolved logical key. */
  state: MaitteActingState;
  /** Regions currently restored. Always contains "heart" upstream. */
  restored: ReadonlySet<CharacterRegionId> | CharacterRegionId[];
  /** Idle breathing/blink. Disabled for SSR and reduced motion. */
  animated?: boolean;
  title?: string;
};

export function MaitteActor({ state, restored, animated = true, title }: MaitteActorProps) {
  const asset = getAsset(`character.maitte.${state}`);
  return (
    <Illustration
      asset={asset}
      restored={restored}
      state={state}
      animated={animated}
      {...(title !== undefined ? { title } : {})}
    />
  );
}
