# Maittê `idle-curious` — Pre-BUILD Integration Gate

**Disposition:** PASS — READY FOR EXPLICIT GATE 3 BUILD AUTHORIZATION

This checkpoint closes the two integration prerequisites recorded after Gate 2B without starting the `idle-curious` runtime implementation.

## Branch isolation

All pre-BUILD work is isolated on:

`feat/maitte-idle-curious-prebuild`

The branch was created from current `main` at:

`525147bf574d582d3ee0bfd271d697fd65b79aa6`

`main` remained untouched throughout asset persistence and construction-base reconciliation.

## 1. Stable binary persistence — PASS

The audited Adobe Gate 2A / Gate 2B outputs are now repository-native PNG files under:

`src/assets/game/characters/production-proof/`

Persisted `idle-curious` package:

- `maitte-idle-curious-full-color.png`
- `maitte-idle-curious-mask-heart.png`
- `maitte-idle-curious-mask-glasses.png`
- `maitte-idle-curious-mask-hair-streak.png`
- `maitte-idle-curious-mask-hair.png`
- `maitte-idle-curious-mask-shirt.png`
- `maitte-idle-curious-mask-skirt.png`
- `maitte-idle-curious-mask-socks.png`
- `maitte-idle-curious-mask-shoes.png`
- `maitte-idle-curious-mask-eyes-pupil.png`
- `maitte-idle-curious-blink-underlay.png`

Transport provenance:

`references/visual/19-maitte-overworld-main/ASSET-PERSISTENCE.md`

Integrity manifest:

`references/visual/19-maitte-overworld-main/RUNTIME-ASSET-SHA256.txt`

Recorded SHA-256 values:

- blink underlay: `044bc9acf270a3805f47831bfa06793ca51e9341b32eacbf69584dd9f0c1b8ba`
- full color: `267f770662d98a3cac4dd5d7264dfff9f2dcc2e656ee4a5dbbd390414d3f3fd8`
- eyes + pupil mask: `983b5adc2ff723614374dad08453d13db5e340ae0fd26a4bb2436a85e9b845b7`
- glasses mask: `e16e70f578a67ee55859fd4310833c28e2a81e03879787c34ebf46da278f412e`
- hairStreak mask: `811a300b7fe76fbfeace0658d2c4a85b273931ad9d97fed924a878a231cdea3a`
- hair mask: `e0b177d769ace5e5fc45460abae3ba988b96bb8d01854c33c5237e1c516b9314`
- heart mask: `548222abcbc6397878a0c9607e99fcafdbd8c6a435eea1ab6cbbb6409f9aabef`
- shirt mask: `79a89046c3d8a50f9d7b3462f3f4623c8d45521b567be08da471441daf4ff994`
- shoes mask: `776e04450f8cd2fb8d4817305d39b14301255e3c69ea4d5fdfcbe9cb0b00f188`
- skirt mask: `59f80e755f151c17982a13c5c542beb6fb8cf0f67c1656116173052a915b5f9c`
- socks mask: `d3029ad47d1d45f945729c768f241f42d7144a2bcf166650b958067a6b1b3a47`

The one-time transport workflow removed itself after committing the assets. No runtime dependency points at Adobe temporary URLs or Firefly Boards.

## 2. Unified construction base — PASS

The externally audited Production Proof 01 runtime implementation from:

`feat/maitte-production-proof-01-runtime-audit`

source audit commit:

`50f18ecb62984241512429219ffc35132a2be87c`

was reconciled into the pre-BUILD branch through PR #25.

Pre-BUILD merge commit:

`a23b4dc71e2838645239abf6b9afe3ac6f2c264a`

This brings the proven `restoration-raster` renderer, `listen-think` production descriptor/assets, and its audited tests together with current `main` governance and the persisted `idle-curious` package.

## 3. Critical runtime-state verification — PASS

Verified after reconciliation:

- `src/visual/illustration.tsx` contains the audited reusable `restoration-raster` renderer;
- `character.maitte.listen-think` resolves to `maitteListenThinkProductionProof`;
- `character.maitte.idle-curious` still resolves to `vectorAsset(MaitteFigure)`;
- therefore Gate 3 implementation has **not** started accidentally;
- other Maittê states remain on their existing scaffold;
- companion presentation remains outside this slice.

## 4. Motion scope ready for Gate 3

Authorized technical proof scope, subject to explicit BUILD authorization:

- breathing / idle life — whole-composite presentation transform;
- green-heart pulse — heart-localized presentation treatment derived from approved source + heart mask;
- blink — deterministic approved-source composition using `Eyes + Pupil` mask, blink underlay and original eye pixels vertically squashed/reopened;
- reduced-motion behavior for all authorized motion.

Not solved / not authorized as completed:

- independent hair secondary motion;
- independent `hairStreak` sway.

These remain explicit motion-production backlog items and must not be faked with ghost-prone duplicated-layer transforms.

## 5. Known final-promotion notes remain binding

Gate 2A precision notes are not erased by this gate:

- glasses mask requires final target-scale precision review;
- hairStreak raw-mask cleanup/readability requires final target-scale review;
- Overworld / Board / Challenge Stage scale and framing remain product-review gates.

## 6. Gate 3 target

The next implementation target remains exactly:

`character.maitte.idle-curious`

No new logical key is authorized.

Mandatory real-call-site validation after implementation:

- Overworld (`scale=0.5` current caller behavior);
- World Board (`scale=0.66` current caller behavior);
- Challenge Stage default/resting Maittê.

## Current gate status

- Gate 1 — runtime inspection: **PASS**
- Gate 2A — core production preparation: **PASS FOR BUILD INPUT**
- Gate 2B — motion feasibility: **PASS FOR BREATHING / HEART / BLINK; HAIR SECONDARY MOTION OPEN**
- Pre-BUILD asset persistence: **PASS**
- Pre-BUILD construction-base reconciliation: **PASS**
- Gate 3 runtime implementation: **NOT STARTED — READY FOR EXPLICIT AUTHORIZATION**
- Gate 4 external audit: **PENDING**
- Gate 5 isolated Lovable review: **PENDING**

## Final disposition

`PRE-BUILD INTEGRATION GATE — PASS`

`MAIN — UNTOUCHED`

`GATE 3 BUILD — READY, NOT YET AUTHORIZED`
