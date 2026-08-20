/**
 * Maittê `idle-curious` — Overworld Main production asset.
 * Spec: docs/design/CHARACTER-MOTION.md, docs/design/COLOR-RESTORATION.md,
 *       docs/design/CHARACTER-PRODUCTION-WORKFLOW-DECISION.md,
 *       references/visual/19-maitte-overworld-main/README.md,
 *       references/visual/19-maitte-overworld-main/GATE-2A-PROOF-RESULT.md,
 *       references/visual/19-maitte-overworld-main/GATE-2B-MOTION-FEASIBILITY.md,
 *       references/visual/19-maitte-overworld-main/ASSET-PERSISTENCE.md.
 *
 * Source of truth for these bytes: `MAITTE_MASTER_APPROVED.png` itself is
 * both the identity authority AND the literal approved pixel source for
 * this state (no new pose was generated). The 11 files imported below are
 * repository-persisted runtime copies of the Adobe Gate 2A/2B preparation
 * outputs; integrity is recorded in
 * `references/visual/19-maitte-overworld-main/RUNTIME-ASSET-SHA256.txt`.
 *
 * `sourceContentBox` is the Gate 2A-measured non-transparent content box of
 * `maitte-idle-curious-full-color.png` within its 1024x1536 canvas — reused
 * verbatim from that gate's record (x=292, y=113, width=461, height=1314);
 * an independent re-measurement this turn landed within 1px on every edge,
 * confirming no drift.
 *
 * Motion origins (`originXPercent`/`originYPercent` below) are one-time
 * measurements (Pillow, luminance bbox for the mask PNGs) of the committed
 * bytes, expressed as a percentage of the native 1024x1536 canvas — the
 * SAME coordinate system `transform-box: fill-box` resolves against for the
 * heart-pulse/blink layers in `illustration.tsx`, since those layers span
 * the full canvas like every other layer:
 *  - heart mask bbox (435,568)-(603,727) -> centre (519, 647.5) -> 50.6836% / 42.1550%
 *  - eyes+pupil mask bbox (441,316)-(590,346) -> centre (515.5, 331) -> 50.3418% / 21.5495%,
 *    matching GATE-2B-MOTION-FEASIBILITY.md's own recorded normalized bbox exactly.
 * If any of these source PNGs are ever re-exported/re-cropped, these
 * constants need re-measuring — no automated drift check exists yet
 * (tracked as a GAP, same as `listen-think`'s equivalent note).
 *
 * This module integrates `character.maitte.idle-curious` ONLY. The other
 * four Maittê acting states remain `vectorAsset(MaitteFigure)`.
 *
 * Authorized motion scope for this slice (GATE-3): breathing, heart-pulse,
 * deterministic blink, reduced-motion. Independent hair/hairStreak
 * secondary motion is NOT authorized and is intentionally absent from this
 * module — it remains an open `MOTION-ASSET-GAP` per GATE-2B.
 */
import { MAITTE_BOX } from "@/assets/game/characters/MaitteFigure";
import type { RestorationRasterIllustrationAsset } from "@/visual/illustration";
import type { CharacterRegionId } from "@/visual/world-config/types";

import fullColor from "@/assets/game/characters/production-proof/maitte-idle-curious-full-color.png";
import maskHeart from "@/assets/game/characters/production-proof/maitte-idle-curious-mask-heart.png";
import maskGlasses from "@/assets/game/characters/production-proof/maitte-idle-curious-mask-glasses.png";
import maskHairStreak from "@/assets/game/characters/production-proof/maitte-idle-curious-mask-hair-streak.png";
import maskHair from "@/assets/game/characters/production-proof/maitte-idle-curious-mask-hair.png";
import maskShirt from "@/assets/game/characters/production-proof/maitte-idle-curious-mask-shirt.png";
import maskSkirt from "@/assets/game/characters/production-proof/maitte-idle-curious-mask-skirt.png";
import maskSocks from "@/assets/game/characters/production-proof/maitte-idle-curious-mask-socks.png";
import maskShoes from "@/assets/game/characters/production-proof/maitte-idle-curious-mask-shoes.png";
import maskEyesPupil from "@/assets/game/characters/production-proof/maitte-idle-curious-mask-eyes-pupil.png";
import blinkUnderlay from "@/assets/game/characters/production-proof/maitte-idle-curious-blink-underlay.png";

/**
 * Compile-time-checked against `CharacterRegionId`: this object must have
 * all eight keys and no others to type-check, so a missing or misspelled
 * region becomes a build failure, not a silent runtime gap.
 */
const maitteIdleCuriousRegionMasks = {
  heart: maskHeart,
  glasses: maskGlasses,
  hairStreak: maskHairStreak,
  hair: maskHair,
  shirt: maskShirt,
  skirt: maskSkirt,
  socks: maskSocks,
  shoes: maskShoes,
} satisfies Record<CharacterRegionId, string>;

export const maitteIdleCuriousProductionProof: RestorationRasterIllustrationAsset = {
  kind: "restoration-raster",
  fullColor,
  regionMasks: maitteIdleCuriousRegionMasks,
  sourceContentBox: { x: 292, y: 113, width: 461, height: 1314 },
  width: 1024,
  height: 1536,
  renderBox: MAITTE_BOX,
  alt: "Maittê, curiosa e à vontade",
  motion: {
    breathing: true,
    heartPulse: { originXPercent: 50.6836, originYPercent: 42.155 },
    blink: {
      eyeMask: maskEyesPupil,
      underlay: blinkUnderlay,
      originXPercent: 50.3418,
      originYPercent: 21.5495,
    },
  },
};
