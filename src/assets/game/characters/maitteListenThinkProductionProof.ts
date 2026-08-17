/**
 * Maittê `listen-think` — Production Proof 01 runtime asset.
 * Spec: docs/design/MAITTE-PRODUCTION-PROOF-01.md,
 *       references/visual/18-maitte-production-proof-01/PROOF-RESULT.md,
 *       docs/design/COLOR-RESTORATION.md.
 *
 * Source of truth for these bytes: the Adobe-prepared proof exports under
 * `references/visual/18-maitte-production-proof-01/` (documentation/
 * provenance storage, never served). The files imported below are runtime
 * copies of those SAME bytes, not a redraw or a re-export.
 *
 * `sourceContentBox` is a one-time measurement (Pillow `Image.split()[-1]
 * .getbbox()`) of the alpha-opaque footprint of `full-color.png` within its
 * 1024x1536 canvas: x=263, y=103, width=471, height=1329. If that file is
 * ever re-exported/re-cropped, this constant needs re-measuring — no
 * automated drift check exists yet (tracked as a GAP, not solved here).
 *
 * This module integrates `character.maitte.listen-think` ONLY. The other
 * four Maittê acting states remain `vectorAsset(MaitteFigure)`.
 */
import { MAITTE_BOX } from "@/assets/game/characters/MaitteFigure";
import type { RestorationRasterIllustrationAsset } from "@/visual/illustration";
import type { CharacterRegionId } from "@/visual/world-config/types";

import fullColor from "@/assets/game/characters/production-proof/maitte-listen-think-full-color.png";
import maskHeart from "@/assets/game/characters/production-proof/maitte-listen-think-mask-heart.png";
import maskGlasses from "@/assets/game/characters/production-proof/maitte-listen-think-mask-glasses.png";
import maskHairStreak from "@/assets/game/characters/production-proof/maitte-listen-think-mask-hair-streak.png";
import maskHair from "@/assets/game/characters/production-proof/maitte-listen-think-mask-hair.png";
import maskShirt from "@/assets/game/characters/production-proof/maitte-listen-think-mask-shirt.png";
import maskSkirt from "@/assets/game/characters/production-proof/maitte-listen-think-mask-skirt.png";
import maskSocks from "@/assets/game/characters/production-proof/maitte-listen-think-mask-socks.png";
import maskShoes from "@/assets/game/characters/production-proof/maitte-listen-think-mask-shoes.png";

/**
 * Compile-time-checked against `CharacterRegionId`: this object must have
 * all eight keys and no others to type-check, so a missing or misspelled
 * region becomes a build failure, not a silent runtime gap.
 */
const maitteListenThinkRegionMasks = {
  heart: maskHeart,
  glasses: maskGlasses,
  hairStreak: maskHairStreak,
  hair: maskHair,
  shirt: maskShirt,
  skirt: maskSkirt,
  socks: maskSocks,
  shoes: maskShoes,
} satisfies Record<CharacterRegionId, string>;

export const maitteListenThinkProductionProof: RestorationRasterIllustrationAsset = {
  kind: "restoration-raster",
  fullColor,
  regionMasks: maitteListenThinkRegionMasks,
  sourceContentBox: { x: 263, y: 103, width: 471, height: 1329 },
  width: 1024,
  height: 1536,
  renderBox: MAITTE_BOX,
  alt: "Maittê, atenta e pensativa",
};
