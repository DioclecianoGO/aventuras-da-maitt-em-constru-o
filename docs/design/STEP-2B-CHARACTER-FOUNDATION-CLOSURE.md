# Step 2B — Character Foundation Closure

**Status:** APPROVED FOR CLOSURE — M1–M4 integrated; M5 Lyra build externally audited and approved; final `main` integration verification still required before marking Step 2B COMPLETE.

## Purpose

This document records the closure state of Step 2B as an auditable product/architecture gate rather than relying on conversational history or current runtime appearance.

Step 2B deliberately separates three concerns that must not be conflated:

1. **Character Master** — approved visual identity authority;
2. **technical/concept runtime scaffold** — temporary code-drawn representation used to prove acting states, framing and integration;
3. **presentation seam** — stable logical keys + Actor/dispatch path that allows final authored art to replace scaffolds later without changing gameplay/domain contracts.

Final production artwork is **not** a Step 2B completion requirement. Missing final authored variants remain `PRODUCTION-ASSET-GAP` and are handled by the production-character workflow after this closure.

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
| Lyra | `LYRA_MASTER_APPROVED.png` | `LyraArt` | `LyraActor` + `character.lyra.*` | APPROVED / PENDING MAIN INTEGRATION VERIFICATION |

## Binding classification

### Character Masters

**DECIDED identity authority.**

The approved masters govern identity/style fidelity for later production variants.

They are not automatically runtime sprites and must not be replaced by the current technical SVG scaffold as source of truth.

### Current code-drawn character/pet art

`MaitteFigure`, `BurpeeArt`, `PipocaArt`, `WillArt`, and planned/integration-approved `LyraArt` are:

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

The stable presentation path is:

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

## Named-companion dispatch end-state

After M5 is verified on `main`, `CompanionActor` must resolve all four named pets specifically:

- `burpee -> BurpeeActor`;
- `pipoca -> PipocaActor`;
- `will -> WillActor`;
- `lyra -> LyraActor`.

The generic `character.companion` / `CompanionArt` path remains a **technical graceful-degradation fallback** only for:

- absent pet id;
- unknown pet id;
- future/unconfigured ids.

No currently named canonical companion should require the generic fallback after Step 2B closure.

## Companion viewport end-state

Per-pet framing remains presentation-owned.

After M5, the resolver must use the scaffold-owned boxes:

- `BURPEE_BOX`;
- `PIPOCA_BOX`;
- `WILL_BOX`;
- `LYRA_BOX`;
- generic fallback box for unknown/absent/future ids.

Exact numerical viewBox equality/distinctness is not itself a product requirement. A test must not force artificial numerical differences merely to distinguish characters. The owned geometry and correct framing are authoritative.

## Final-art status

For all five named characters, polished authored production variants remain:

**`PRODUCTION-ASSET-GAP`**

This is expected and does not reopen Step 2B.

The next production stage must derive final visual variants from the approved Character Masters rather than trying to polish the temporary SVGs into final watercolor/storybook art.

Binding replacement direction:

`approved Character Master -> reviewed production pose/state variant -> production export -> existing logical key -> Actor -> scene`

## Closure acceptance criteria

Step 2B becomes **COMPLETE** only when all of the following are verified on `main`:

1. all five canonical Character Masters are present and explicitly approved;
2. Maittê and all four companions have stable presentation seams;
3. the four named companions resolve through their own Actor paths;
4. generic companion fallback is reserved for unknown/absent/future ids;
5. per-pet viewport resolution includes all four companions;
6. shared companion acting-state contract remains unchanged;
7. protected gameplay/domain/evaluation/persistence/content layers were not modified merely to integrate character presentation;
8. M5 Lyra integration is present on `main` and its approved tests/validation are not lost during integration;
9. final authored art remains explicitly classified as a separate production gap rather than silently treating scaffolds as final.

## Next gate after closure

**DECIDED sequencing:** the next visual-production activity is the controlled Character Production Asset Benchmark defined in:

`docs/design/CHARACTER-PRODUCTION-BENCHMARK.md`

First benchmark target:

**Lyra — `watch`**.

The benchmark selects a production workflow while keeping Character Masters authoritative. It precedes broad Step 2C Overworld production composition.

## Step 2C state

**NOT STARTED.**

Step 2B closure does not itself authorize a broad Step 2C build. Step 2C remains governed by `VISUAL-PRODUCTION-STEP-2-GATE.md`, the approved Overworld north stars and the production-asset contracts.
