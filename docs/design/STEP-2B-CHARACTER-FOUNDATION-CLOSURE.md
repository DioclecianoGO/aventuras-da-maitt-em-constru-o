# Step 2B — Character Foundation Closure

**Status:** **COMPLETE — DECIDED.** M1–M5 are integrated and verified on `main`. Step 2B is closed; final authored character art remains a separate `PRODUCTION-ASSET-GAP` governed by the production workflow and Production Proof 01.

**Closure verification commit:** `8769533c9fae707fc8819941d050c40082328582` (`feat: add Lyra companion actor seam`, squash merge of PR #24).

## Purpose

This document records the closure state of Step 2B as an auditable product/architecture gate rather than relying on conversational history or current runtime appearance.

Step 2B deliberately separates three concerns:

1. **Character Master** — approved visual identity authority;
2. **technical/concept runtime scaffold** — temporary code-drawn representation used to prove acting states, framing and integration;
3. **presentation seam** — stable logical keys + Actor/dispatch path that allows final authored art to replace scaffolds later without changing gameplay/domain contracts.

Final production artwork is **not** a Step 2B completion requirement. Missing final authored variants remain `PRODUCTION-ASSET-GAP` and are handled after this closure.

## Required named-character set

Step 2B covers:

- Maittê;
- Burpee;
- Pipoca;
- Will;
- Lyra.

## Closure matrix

| Character | Approved Character Master | Technical scaffold | Presentation seam | Step 2B disposition |
|---|---|---|---|---|
| Maittê | `MAITTE_MASTER_APPROVED.png` | `MaitteFigure` | `MaitteActor` + `character.maitte.*` | COMPLETE |
| Burpee | `BURPEE_MASTER_APPROVED.png` | `BurpeeArt` | `BurpeeActor` + `character.burpee.*` | COMPLETE |
| Pipoca | `PIPOCA_MASTER_APPROVED.png` | `PipocaArt` | `PipocaActor` + `character.pipoca.*` | COMPLETE |
| Will | `WILL_MASTER_APPROVED.png` | `WillArt` | `WillActor` + `character.will.*` | COMPLETE |
| Lyra | `LYRA_MASTER_APPROVED.png` | `LyraArt` | `LyraActor` + `character.lyra.*` | COMPLETE |

## Binding classification

### Character Masters

**DECIDED identity authority.**

The approved masters govern identity/style fidelity for later production variants.

They are not automatically runtime sprites and must not be replaced by the current technical SVG scaffold as source of truth.

### Current code-drawn character/pet art

`MaitteFigure`, `BurpeeArt`, `PipocaArt`, `WillArt`, and `LyraArt` are:

**TECHNICAL / CONCEPT RUNTIME SCAFFOLDS.**

They prove:

- acting-state vocabulary;
- logical-key resolution;
- Actor seams;
- per-pet framing/viewBox behavior;
- basic animation hooks;
- scene compatibility;
- fallback/non-regression behavior.

They are not the final illustrated visual bar.

### Presentation seams

Stable presentation path:

`state/context -> character.<id>.<state> -> asset registry -> Actor/Illustration -> scene`

Educational/domain/evaluation/persistence logic remains independent of the concrete physical art file.

## Acting-state coverage

Maittê keeps her approved protagonist acting-state vocabulary.

Companions use the shared five-state contract:

- `idle`;
- `speak`;
- `watch`;
- `success-reaction`;
- `retry-reaction`.

Identity/personality differentiation is expressed through visual acting, not through separate domain contracts per pet.

## Named-companion dispatch end-state — VERIFIED

`CompanionActor` resolves all four named pets specifically:

- `burpee -> BurpeeActor`;
- `pipoca -> PipocaActor`;
- `will -> WillActor`;
- `lyra -> LyraActor`.

The generic `character.companion` / `CompanionArt` path remains a **technical graceful-degradation fallback** only for:

- absent pet id;
- unknown pet id;
- future/unconfigured ids.

No named canonical companion requires the generic fallback after Step 2B closure.

## Companion viewport end-state — VERIFIED

Per-pet framing remains presentation-owned.

The resolver uses:

- `BURPEE_BOX`;
- `PIPOCA_BOX`;
- `WILL_BOX`;
- `LYRA_BOX`;
- generic fallback box for unknown/absent/future ids.

Exact numerical viewBox equality/distinctness is not a product requirement. A test must not force artificial numerical differences merely to distinguish characters.

## Final-art status

For all five named characters, polished authored production variants remain:

**`PRODUCTION-ASSET-GAP`**

This does not reopen Step 2B.

Binding replacement direction:

`approved Character Master -> reviewed production pose/state variant -> production preparation/export -> existing logical key -> Actor -> scene`

## Closure acceptance criteria — VERIFIED

Step 2B is **COMPLETE** because:

1. all five canonical Character Masters are present;
2. Maittê and all four companions have stable presentation seams;
3. the four named companions resolve through their own Actor paths;
4. generic companion fallback is reserved for unknown/absent/future ids;
5. per-pet viewport resolution includes all four companions;
6. shared companion acting-state contract remains unchanged;
7. the externally audited M5 patch was reconstructed byte-for-byte from SHA-256 `d5d06e200b5ded16d4034d43541ce5d0222d0ed0ab85029a81f5d22e1693a5a3` before integration;
8. M5 verified exact 13-file source/test scope and zero changes under protected game/domain paths;
9. integration validation passed the full test suite and `tsc --noEmit`;
10. final authored art remains explicitly classified as a separate production gap.

## Post-closure history

The controlled Character Production Asset Benchmark was executed after Step 2B closure:

1. Round 1 — Maittê `listen-think`;
2. Round 2 — Lyra `watch` identity-drift stress test.

Benchmark status:

**COMPLETE FOR WORKFLOW SELECTION.**

See:

- `CHARACTER-PRODUCTION-BENCHMARK.md`;
- `CHARACTER-PRODUCTION-BENCHMARK-CLOSURE.md`;
- `CHARACTER-PRODUCTION-WORKFLOW-DECISION.md`.

Selected production workflow:

- ChatGPT Images — primary;
- Gemini / Nano Banana — fallback;
- Photoshop — preferred finishing/preparation environment.

## Current next gate

The current visual-production gate is no longer benchmark generation.

Proceed to:

`docs/design/MAITTE-PRODUCTION-PROOF-01.md`

Target:

**Maittê — `listen-think`.**

Purpose:

prove the first real transparent/layered/restoration-aware production asset contract behind the existing presentation seam before broad Step 2C work.

## Step 2C state

**NOT STARTED.**

Step 2B closure and benchmark completion do not by themselves authorize a broad Step 2C build. Step 2C remains governed by `VISUAL-PRODUCTION-STEP-2-GATE.md`, approved Overworld north stars and the result of Production Proof 01.