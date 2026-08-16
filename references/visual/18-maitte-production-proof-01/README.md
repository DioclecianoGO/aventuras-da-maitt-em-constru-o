# Maittê Production Proof 01 — Evidence Workspace

**Status:** ADOBE PREPARATION COMPLETE — awaiting runtime integration proof.

Binding spec:

`docs/design/MAITTE-PRODUCTION-PROOF-01.md`

Current result record:

`PROOF-RESULT.md`

## Purpose

Store reviewable evidence for the first real production-character preparation/runtime proof using Maittê `listen-think`.

This folder is not a benchmark workspace. Generator selection is already closed.

## Identity authority

`references/visual/12-maitte-character-master/MAITTE_MASTER_APPROVED.png`

## Production-proof source

Current proof source:

`references/visual/17-character-production-benchmark/maitte-listen-think/maitte-listen-think-chatgpt-candidate-01.png`

Classification:

**PRODUCTION-PROOF SOURCE / NOT FINAL PRODUCTION ASSET.**

## Adobe preparation result

The Adobe/Photoshop connector successfully validated:

- transparent full-character cutout;
- grayscale/stolen presentation derived from the same painting;
- always-on green heart;
- independent masks for glasses, hair, shirt, skirt, socks and shoes;
- a technically workable `hairStreak` mask with a remaining cleanup gap;
- mixed partial-restoration composites using the original full-color pixels.

Full details and current governance classification are recorded in `PROOF-RESULT.md`.

Adobe Firefly Board evidence:

`https://firefly.adobe.com/boards/id/urn:aaid:sc:US:75b80a5d-56b5-4baf-a281-083e547783a8`

## Canonical proof asset names

Upload the Adobe proof exports here using these names:

- `maitte-listen-think-full-color.png`;
- `maitte-listen-think-mask-heart.png`;
- `maitte-listen-think-mask-glasses.png`;
- `maitte-listen-think-mask-hair-streak.png`;
- `maitte-listen-think-mask-hair.png`;
- `maitte-listen-think-mask-shirt.png`;
- `maitte-listen-think-mask-skirt.png`;
- `maitte-listen-think-mask-socks.png`;
- `maitte-listen-think-mask-shoes.png`.

Optional proof-only comparison renders:

- `maitte-listen-think-proof-stolen.png`;
- `maitte-listen-think-proof-heart-glasses.png`;
- `maitte-listen-think-proof-heart-glasses-hair.png`.

## Known gap

`maitte-listen-think-mask-hair-streak.png` may contain minor residual lower-leg/sock-edge artifacts from Adobe Accessories detection.

Classification:

**MINOR MASK-CLEANUP GAP — NON-BLOCKING FOR RUNTIME PROOF / BLOCKING FOR FINAL PRODUCTION PROMOTION.**

## PSD/source policy

The connector proof did not create a layered PSD.

A PSD or equivalent editable production source may still be required later if precise cleanup/versioning cannot be handled safely through connector outputs alone.

The PSD is a production source, not a runtime dependency.

If a PSD is later created and remains reasonably sized and repository policy permits, it may be stored here under an explicit production-source name. If impractically large, preserve reviewable exports and record its location/version/checksum in `PROOF-RESULT.md`.

## Binary safety

Upload binary files already using their intended names.

Do not rename or rewrite image/PSD binaries through text-editor workflows.

## Approval rule

Storage is not approval.

No proof export becomes a production runtime asset until the runtime proof receives an explicit disposition:

- `PASS — CONTRACT PROMOTED`, or
- `FAIL — FALLBACK CONTRACT REQUIRED`.

## Next gate

After the canonical binary assets above are present in this folder, Claude Code must plan and implement a narrowly scoped runtime proof for **`character.maitte.listen-think` only**.

Do not convert the other Maittê states or any pet during this gate.

Step 2C remains **NOT STARTED** while this proof is open.
