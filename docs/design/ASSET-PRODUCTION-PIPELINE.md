# Illustrated Asset Production Pipeline

**Status:** DECIDED production direction and initial character-production workflow; exact runtime file formats and restoration-layer contract remain PROVISIONAL until Production Proof 01.

## Decision

Production-quality characters, pets, world scenes, landmarks and decorative scenery for **Aventuras da Maittê** are authored illustration assets that the application composes, animates and connects to game state.

The implementation layer is not expected to manufacture final illustration quality by accumulating hand-written JSX/SVG primitives and path data.

Programmatic SVG remains useful for technical placeholders, simple diegetic controls, masks, hit areas, lightweight procedural effects and deliberately simple assets. It is not the default production pipeline for high-detail character or environment art.

## Why

Phase 1B/1B.1 proved that the application architecture supports layered presentation, acting states, touch interaction, narration, derived color restoration, persistent progress reconstruction and replaceable visual registries/configuration.

It also exposed a practical quality ceiling: more code-generated curves, strokes and paths do not reliably produce the intended illustrated-storybook richness.

Current code-drawn art therefore remains functional/concept scaffolding, not the final visual bar.

## Production responsibility split

Preferred boundary:

`illustration asset -> asset registry/config -> scene composition -> animation/restoration/hit areas -> game state`

Illustration assets own visual craft such as silhouette, anatomy, facial appeal, line quality, texture, clothing detail and scenic richness.

Application code owns positioning, scale, responsive composition, transitions, acting-state swaps, masking, restoration state, interaction hit areas, accessibility metadata and progression-driven visibility.

Educational/domain logic remains unaware of the concrete physical art file.

## Layered scene model

Where useful, a world/board scene may decompose into replaceable presentation layers such as:

1. background / atmospheric field;
2. terrain or biome base;
3. line-art / stolen-colour layer;
4. restored-colour layer or restorable object groups;
5. landmarks and environmental detail;
6. characters / companions / lackeys;
7. foreground accents;
8. invisible interaction/hit-area layer.

This is a presentation model, not a mandatory literal file count.

## Restoration compatibility

Persisted facts remain authoritative and drive derived visual restoration.

A replacement illustration may implement restoration using masks, alternate layers, object swaps, opacity, reveal animation or another presentation technique, provided that:

- no new authoritative visual progress field is persisted;
- the same gameplay facts reconstruct the same restored result after reload;
- restoration remains perceivable through more than hue alone where practical;
- replacing art does not change progression/evaluation semantics.

## Character and pet assets

Maittê and companion artwork must preserve approved Character Masters and locks.

Where acting states are required, production assets may use separate poses/expressions, layered parts, sprite-like state sets or another replaceable representation. The acting-state API may remain stable even if rendering changes.

The visual target remains original stylized storybook/colouring-book illustration with watercolor warmth and light anime influence, without direct imitation of a named living artist/studio.

## Character scaffold replacement strategy

**DECIDED:** approved Character Masters, not current programmatic SVG scaffolds, are the identity authority.

Current `MaitteFigure`, `BurpeeArt`, `PipocaArt`, `WillArt` and `LyraArt`-style components are **TECHNICAL / CONCEPT RUNTIME SCAFFOLDS**. They prove acting-state vocabulary, logical-key resolution, viewport/framing, animation hooks and scene integration. They are replaceable.

Production replacement direction:

`approved Character Master -> reviewed pose/state variant -> production preparation/export -> stable character.<id>.<state> key -> Actor -> scene`

Binding rules:

- do not ask a coding assistant to recreate approved watercolor/storybook art by manually expanding JSX/SVG paths;
- do not use the scaffold as identity source of truth when it differs from the approved Character Master;
- a scaffold may provide pose/structure/composition guidance only;
- prefer controlled edits/variants derived from the approved master over full identity regeneration from prose;
- preserve approved face/anatomy, proportions, coat/hair markings, clothing/accessories, palette and texture across variants unless explicitly unlocked;
- require human/product approval before a production variant becomes authoritative;
- replace concept scaffolds behind stable logical registry keys without changing curriculum/evaluator/persistence/gameplay contracts.

Visual fidelity is judged against the Character Master and relevant locks, not against temporary SVG fidelity.

## Character production workflow — selected

The two-round benchmark is closed for workflow selection. See:

- `CHARACTER-PRODUCTION-BENCHMARK-CLOSURE.md`;
- `CHARACTER-PRODUCTION-WORKFLOW-DECISION.md`.

**DECIDED initial workflow:**

1. **ChatGPT Images — PRIMARY generation/editing workflow**;
2. **Gemini / Nano Banana — FALLBACK generation/editing workflow**;
3. **Adobe Firefly — REJECTED as primary character generator for the current production pass**;
4. **Adobe Photoshop — PREFERRED finishing / masking / layer-preparation / export environment**.

Tools remain production tools, not sources of truth or architectural dependencies.

## Production character variant workflow

**DECIDED:**

1. select the approved Character Master and required acting state/context;
2. if useful, supply a technical scaffold render or approved sketch only as pose/structure guidance;
3. generate/edit a candidate with identity/style locked to the Character Master;
4. review identity drift, anatomy, markings, texture, silhouette, scale and state readability;
5. perform localized corrections instead of regenerating unaffected identity regions where practical;
6. prepare transparency/layers/masks/exports in Photoshop or another approved finishing environment;
7. explicitly approve the physical production asset;
8. replace the concept scaffold behind the existing logical registry key;
9. run visual/runtime regressions at actual target scales.

Micro-animation may reuse the same authored illustration where breathing, blinking, small head/body movement, bounce or independent tail motion preserves quality. Larger acting changes may use separate authored variants.

## Production Proof 01

Before broad character conversion or Step 2C, the project must prove the real physical preparation/runtime composition strategy on:

**Maittê — `listen-think`**

Binding proof spec:

`docs/design/MAITTE-PRODUCTION-PROOF-01.md`

Current hypothesis under test:

`one aligned full-color painting -> colorless base + independent restoration masks -> runtime reveal from the same painting`

This hypothesis is **PROVISIONAL** until the proof passes.

The proof must preserve Maittê's existing independent restoration-region vocabulary and the always-saturated green-heart anchor.

## Authoring-tool policy

**DECIDED:** tool choice does not redefine approved identity, logical asset keys or architecture.

For the current production pass:

- ChatGPT generates/edits primary character variants;
- Gemini is available as fallback when it materially produces a better compliant result;
- Photoshop owns finishing concerns such as transparency, masks, layer preparation, edge cleanup, localized repair and export comparison;
- Illustrator may support vector masks/overlays/icons/simple vector assets but is not required merely because placeholders are SVG;
- Claude/Claude Code/Codex/Copilot/Lovable are specification/implementation/integration assistants unless separately benchmarked for an image-production role.

A future tool may replace any production tool without changing Character Masters or runtime/domain contracts.

## File-format policy

**PROVISIONAL:** runtime/source formats may include transparent PNG/WebP, authored SVG, layered raster exports, grayscale masks or another web-suitable representation.

The format must be selected based on visual quality, transparency, scaling, animation/restoration needs, performance and runtime weight.

PSD may be used as an editable production source, but it is not a runtime dependency.

The architecture must not require every production asset to be a hand-authored React component.

## Asset registry and naming

Production assets enter through stable presentation keys/registry entries rather than ad hoc imports in game/domain code.

Changing a physical visual file behind a stable key must not require changes to curriculum, evaluator rules, persistence facts or mastery evidence.

## Current programmatic art

Existing Phase 1B/1B.1 and Step 2B programmatic SVG drawings are **concept/technical assets** unless explicitly promoted later.

They may remain while production illustrations are developed, and may remain as fallback/test scaffolds where useful.

Further work must not spend disproportionate effort trying to reach final storybook-art quality by expanding those SVG components.

## Acceptance for future asset replacement

A production replacement succeeds when:

- it materially raises illustrated visual quality;
- approved Character Master identity/locks remain recognizable;
- existing routes/interactions work;
- restoration derives from the same facts;
- touch targets remain reliable;
- acting states remain available;
- no evaluator/evidence/curriculum contract changes merely because art changed;
- tablet-first performance remains acceptable;
- physical format/layers do not leak into domain/persistence contracts.

## Scope relationship

Educational implementation and visual-asset production remain separate responsibilities.

The benchmark is complete for workflow selection, but final production-character preparation is **not** complete until Production Proof 01 resolves the first real raster/layer/mask composition strategy.

Broad Step 2C Overworld production composition remains blocked until that proof provides a usable asset preparation/composition contract.