# Character Animation Architecture Benchmark

**Status:** BENCHMARK OPEN — PLAN / EVIDENCE PHASE ONLY

**Date opened:** 2026-08-21

## 1. Decision being tested

The project has validated a production-quality illustrated raster identity, region-based color restoration, stable character-state seams and localized CSS/SVG motion for Maittê.

The remaining strategic question is whether the project should continue scaling character motion through flattened raster/mask/overlay techniques, or adopt a dedicated **2D character animation runtime** for rigging, deformation and reusable acting states while preserving the current application/game architecture.

This benchmark is specifically intended to prevent a future combinatorial production problem where every new expression, blink, arm gesture or secondary movement requires another full-frame illustration or fragile local overlay.

## 2. What this benchmark does NOT decide

This benchmark does not authorize:

- migration to Unity, Godot or another full game engine;
- replacement of React/TanStack/application routing;
- changes to game domain, curriculum, evaluation, persistence or progression;
- redesign of Maittê's approved visual identity;
- mass conversion of every character before one narrow proof succeeds;
- automatic adoption of Rive, Spine, Live2D or any other tool merely because it supports rigging;
- a pixel-art redesign of the entire product.

The application/game runtime remains authoritative. The benchmark evaluates only the **character presentation/animation layer**.

## 3. Baseline / control implementation

The current control is the frozen Maittê `idle-curious` implementation documented in:

`references/visual/19-maitte-overworld-main/ANIMATION-ARCHITECTURE-PIVOT-CHECKPOINT.md`

Rollback snapshot:

`snapshot/maitte-idle-curious-gate5-2026-08-21`

Experiment branch:

`benchmark/character-animation-architecture`

The baseline already proves:

- approved watercolor identity;
- raster runtime integration;
- grayscale/color restoration by named regions;
- heart pulse;
- technical blink proof;
- reduced motion;
- stable `character.maitte.<state>` seam.

The baseline's main weaknesses are:

- blink compositing complexity in partial restoration states;
- whole-character breathing reads as bobbing rather than anatomical micro-motion;
- no independent hair motion;
- poor scalability toward arm/hand gestures and many expressions without multiplying assets/overlays.

## 4. Candidate architectures

### Candidate A — current raster + restoration-raster + CSS/SVG motion

This remains the control.

Advantages already proven:

- maximum literal-pixel fidelity to approved art;
- current code exists and is tested;
- restoration semantics already work;
- very low runtime/tooling complexity for static or lightly animated states.

Known limitation:

- increasing motion complexity tends to require additional masks, overlays, underpaint or alternative frames;
- body articulation is difficult without segmentation/rigging.

### Candidate B — Rive-based rigged 2D character

**Primary benchmark candidate.**

Intent to test:

- preserve raster/watercolor visual treatment where practical;
- segment Maittê into authored layers;
- rig those layers with bones/meshes/deformations;
- expose semantic animation/state-machine inputs to the existing React character seam;
- combine restoration state with the same rigged geometry instead of creating independently aligned full-body variants.

Rive is not pre-approved. It wins only if the proof meets the acceptance criteria below.

### Candidate C — Spine 2D

**Fallback comparative candidate if Rive fails a critical requirement or authoring workflow.**

The same Maittê proof should be reproducible conceptually with skeletal/mesh animation and layered image attachments. Do not run this candidate unless the Rive proof exposes a meaningful architectural or visual limitation worth comparing.

### Candidate D — Live2D Cubism

**Optional comparative candidate, primarily if face/hair deformation proves substantially stronger than the primary candidate while full-body interaction remains acceptable.**

Do not run by default.

### Pixel-art alternative

Pixel art is recorded as a **separate art-direction/product spike**, not the primary solution to this animation benchmark.

Potential future use:

- small Overworld/Board navigation avatar in a Zelda-like/chibi visual language;
- watercolor/illustrated rig retained for narrative and exercise-stage character presence.

Reason for separation:

changing Maittê to pixel art changes the product's visual language and must be evaluated as an intentional art-direction decision, not treated merely as an engineering optimization.

## 5. Central architectural hypothesis

The target architecture, if a rigged runtime wins, is:

```text
Game / learning state
        |
        | semantic presentation inputs only
        | state="idle-curious"
        | restored={...}
        | speaking=false
        | reducedMotion=false
        v
MaitteActor / character presentation adapter
        |
        v
2D animation runtime
        |
        +-- authored art layers / meshes
        +-- skeleton / deformers
        +-- acting-state machine
        +-- face / blink / gaze
        +-- ambient motion
        +-- restoration visibility/color inputs
        v
Rendered character
```

The character runtime must not know curriculum truth, evaluation results, persistence structure or restoration reward order.

The existing logical key vocabulary remains the application-facing contract unless the benchmark proves a narrower adapter is required.

## 6. Restoration hypothesis

Restoration is a mandatory benchmark dimension, not an afterthought.

The preferred rigged model is that grayscale and color presentation share the **same deformation coordinate system**.

Conceptual example:

```text
hair rig / mesh
  -> grayscale presentation
  -> color/restored presentation

shirt rig / mesh
  -> grayscale presentation
  -> color/restored presentation
```

The runtime receives the existing named restored regions:

- heart;
- glasses;
- hairStreak;
- hair;
- shirt;
- skirt;
- socks;
- shoes.

The benchmark must prove that changing restoration visibility/state does not break blink, breathing, hair motion or body articulation.

The green heart remains the always-restored anchor.

## 7. Single-character proof scope

Only **Maittê** is authorized for the first benchmark proof.

Use the approved `idle-curious` master as identity authority.

Do not rig Burpee, Pipoca, Will or Lyra before the Maittê proof is externally reviewed.

The minimum rig should expose enough anatomy to test future scalability, approximately:

- root / hips;
- torso/chest;
- neck/head;
- hair back;
- hair front / fringe / accent where separable;
- left upper arm;
- left forearm;
- left hand;
- right upper arm;
- right forearm;
- right hand;
- legs/feet sufficient for stable grounding;
- eyes / lids;
- brows if needed;
- mouth/expression layer if needed;
- heart as independent presentation element.

Exact segmentation is a production decision during proof preparation, not a new identity redesign.

## 8. Required proof behaviors

A candidate architecture must demonstrate the SAME Maittê identity performing all of the following without requiring a separately regenerated full-body character for each item:

### P1 — neutral approved rest

- visually matches the approved watercolor Maittê;
- no unintended vector/cartoon simplification;
- no visible seams at rest;
- feet fixed to the ground.

### P2 — natural breathing

Required read:

- feet remain stationary;
- no whole-character bobbing;
- chest/torso produces a barely perceptible inhale/exhale deformation;
- head/hair may respond secondarily only if subtle;
- nearby scene objects never inherit character breathing.

### P3 — blink

Required read:

- upper eyelid primarily closes downward;
- lower eyelid movement is small or visually subordinate;
- no eye-less-face underlay appearance;
- blink works in grayscale/partial-restored and fully-restored states;
- glasses do not suppress the blink.

### P4 — hair secondary motion

- small physically plausible delayed response;
- does not create duplicate hair, holes or ghosting;
- preserves the approved hairstyle and accent/streak identity.

### P5 — arm gesture

Demonstrate at least one meaningful full-body articulation, preferably:

- small wave; or
- pointing/raising one arm toward an activity object.

This is the key proof that the architecture scales beyond facial microanimation.

### P6 — expression change

At minimum:

- neutral/curious;
- success/happy OR thinking/retry.

The face should remain recognizably the same character without a regenerated full-body image.

### P7 — restoration while moving

Demonstrate at least:

- stolen/heart-only;
- one intermediate region combination;
- fully restored.

During breathing, blink, hair movement and arm gesture:

- restoration boundaries remain aligned;
- no colored-face leak through transparent glasses;
- no drift between grayscale and color layers.

### P8 — reduced motion

Provide a safe static or near-static presentation consistent with existing accessibility rules.

## 9. Runtime integration proof

A winning candidate must integrate through a narrow presentation adapter and must not require game-state redesign.

Minimum integration proof:

```text
<MaitteActor
  state="idle-curious"
  restored={restoredRegions}
  animated={true}
/>
```

or an equivalently narrow existing seam.

The adapter may internally translate semantic inputs into animation-runtime booleans/triggers/numbers.

Examples of acceptable internal runtime inputs:

- `actingState`;
- `isRestoredHair`;
- `isRestoredGlasses`;
- `isRestoredShirt`;
- `blinkEnabled`;
- `reducedMotion`;
- `gestureTrigger`.

Examples of forbidden coupling:

- skill IDs inside the rig;
- correct/incorrect evaluator logic inside the rig;
- persisted game facts inside the rig;
- curriculum-specific animation state names.

## 10. Benchmark evaluation matrix

Score each candidate from 0–5 for every category.

| Category | Weight | Gate question |
|---|---:|---|
| Identity / watercolor fidelity | 25% | Does it still look like the approved Maittê rather than a simplified replacement? |
| Motion quality | 20% | Are breathing, blink, hair and arm gesture natural and grounded? |
| Restoration compatibility | 20% | Can named grayscale/color regions remain aligned through motion? |
| Production scalability | 15% | Can new expressions/gestures be authored without new full-body renders for every state? |
| Runtime integration | 10% | Can it live behind the existing presentation seam without changing protected game layers? |
| Authoring workflow / maintainability | 5% | Can the team realistically create and revise characters without excessive manual reconstruction? |
| Performance / delivery footprint | 5% | Is the result acceptable at target devices and real app scales? |

### Minimum acceptance rule

A new architecture must:

- score at least **4/5** in Identity / watercolor fidelity;
- score at least **4/5** in Restoration compatibility;
- score at least **4/5** in Production scalability;
- have no protected-layer coupling;
- demonstrate P1–P8 without a blocking visual defect.

If it does not clearly outperform the baseline's scalability while preserving its fidelity/restoration strengths, the project keeps the existing architecture and improves it deliberately rather than adopting new tooling for novelty.

## 11. Evidence package

Create a dedicated evidence workspace before any benchmark implementation is promoted:

`references/visual/20-character-animation-architecture-benchmark/`

Expected evidence, progressively:

- README / benchmark status;
- Maittê layer-separation plan;
- screenshots of the rig/layer structure;
- neutral-rest proof;
- breathing proof;
- blink proof;
- hair-motion proof;
- arm-gesture proof;
- expression proof;
- restoration-state proof;
- real runtime screenshots/video/GIF only as evidence, not runtime assets;
- benchmark scorecard and decision record.

Do not store proprietary/editor cache files unless needed for reproducibility and permitted by the tool/license.

## 12. Gate sequence

### Gate A — tool/repository feasibility

Confirm:

- runtime package/license constraints;
- React/Web integration path;
- asset/file format strategy;
- repository storage policy;
- whether raster watercolor layers can be preserved acceptably;
- whether the selected tool can be operated through available integrations or requires a manual editor step.

**No rig construction before Gate A is documented.**

### Gate B — Maittê layer-preparation proof

Prepare only the minimum layer set necessary for P1–P8.

The approved master remains immutable.

Any extracted/separated derivative must be traceable to the master and treated as benchmark evidence until approved.

### Gate C — rig / animation proof

Implement P1–P8 inside the candidate animation runtime.

Do not integrate with the game yet.

### Gate D — isolated runtime adapter proof

Mount the candidate behind a temporary/non-production Maittê presentation seam.

Prove semantic inputs and restoration compatibility.

### Gate E — Lovable/external real-scale review

Review at minimum:

- Overworld scale;
- World Board scale;
- Challenge Stage/character presentation scale where relevant;
- reduced motion;
- partial restoration;
- fully restored;
- arm gesture/expression transitions.

### Gate F — architecture decision

Possible dispositions:

- `ADOPT RIVE CHARACTER RUNTIME`;
- `COMPARE AGAINST SPINE`;
- `COMPARE AGAINST LIVE2D`;
- `KEEP CURRENT RASTER/CSS ARCHITECTURE`;
- `OPEN PIXEL-ART PRODUCT SPIKE`;
- `BENCHMARK INCONCLUSIVE — NO PRODUCTION CHANGE`.

No mass character production begins until Gate F is explicitly approved.

## 13. Rollback / branch governance

The benchmark is intentionally isolated.

### Immutable rollback snapshot

`snapshot/maitte-idle-curious-gate5-2026-08-21`

Purpose:

- recover the exact pre-benchmark Maittê Gate-5 state;
- compare baseline behavior;
- prevent the experiment from making current production work unrecoverable.

Do not commit experimental work to this branch.

### Benchmark branch

`benchmark/character-animation-architecture`

Purpose:

- benchmark documentation;
- evidence/reference paths;
- temporary adapter/proof code if later authorized.

### Main

`main` remains untouched until an explicit Gate-F architecture decision and later reviewed promotion plan.

No benchmark branch should be merged directly to `main` merely because a proof works.

## 14. Stop conditions

Stop and report instead of expanding scope if:

- approved watercolor fidelity cannot be preserved;
- restoration requires duplicating every complete character state;
- the rig requires game/domain/persistence changes;
- browser/device delivery is materially worse than the current baseline without compensating value;
- authoring requires an unsustainable manual process for every small expression;
- the tool/runtime introduces unacceptable licensing/deployment constraints;
- the proof cannot keep feet grounded while producing believable micro-motion;
- the character becomes visually generic, overly vectorized or loses the approved identity.

## 15. Immediate next action

Execute **Gate A — tool/repository feasibility for Rive only**.

Before authoring or rigging:

1. inspect current Rive web/runtime/editor capabilities and licensing from primary documentation;
2. determine whether the approved watercolor master can be preserved through the intended image/mesh/layer workflow;
3. identify the minimum required source-layer preparation;
4. determine how a `.riv` artifact would be stored/versioned in this repository;
5. design the React adapter boundary without implementing it;
6. document risks, blockers and exact manual-tool requirements;
7. return for explicit approval before Gate B.

The current Maittê implementation remains frozen during Gate A.
