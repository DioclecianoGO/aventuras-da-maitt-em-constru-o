# Gate B1-B — Grounded Breathing Proof — PASS

**Date:** 2026-08-21

**Branch:** `benchmark/character-animation-architecture`

**Parent:** `GATE-B1-RIVE-HYBRID-PREPARATION-PROOF.md`

## Result

**PASS — grounded breathing from a single approved transparent raster is visually successful in Rive.**

User review after editor execution: **“ficou perfeito.”**

## Implementation actually proven

- Source: approved transparent Maittê raster derivative (`maitte-idle-curious-full-color.png`).
- No whole-character translateY was used.
- Auto-traced ~668-vertex mesh was rejected as unnecessarily dense for this micro-motion.
- Mesh was reset to the default rectangular contour.
- A minimal semantic torso cage was authored manually with 8 internal vertices:
  - shoulder pair;
  - chest pair;
  - waist pair;
  - shirt-hem pair.
- Animation: `idle-breathing-proof`.
- Duration: 4 seconds.
- Neutral keys: 0 s and 4 s.
- Inspiration key: 2 s.
- Motion was localized to shoulder/chest vertices while lower torso anchors, skirt, legs and feet remained stationary by design.
- Rive vertex animation/keying was confirmed in Animate mode.
- Final user visual assessment: grounded breathing reads correctly and the result is considered perfect for the proof.

## Benchmark consequence

B1-B pass criterion is satisfied:

> reads as breathing, not bobbing/floating; feet remain fixed.

This is material evidence that Maittê does **not** require a fully decomposed paper-doll asset just to obtain subtle idle breathing. A single approved watercolor raster can support localized organic micro-motion through a small semantic Rive mesh.

## Freeze rule

Do not modify the approved breathing proof while testing subsequent motion classes. Preserve it as the control/reference implementation for B1.

## Next authorized proof

Proceed to **B1-C — local hair secondary motion**, preferably in a duplicated Rive file/artboard so the grounded breathing pass remains recoverable.

B1-C acceptance criteria remain:

- motion limited to selected curl/tip regions;
- skull-adjacent roots remain visually stable;
- face and glasses do not warp;
- no seam or silhouette artifact;
- motion remains subtle and secondary to breathing.

No runtime integration or promotion to `main` is authorized by this pass.