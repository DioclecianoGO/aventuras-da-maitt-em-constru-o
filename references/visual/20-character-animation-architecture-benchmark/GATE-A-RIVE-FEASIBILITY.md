# Character Animation Architecture Benchmark — Gate A — Rive Feasibility

**Status:** PASS CONDITIONAL — RIVE IS VIABLE FOR A MAITTÊ LAYER/RIG PROOF; NO PRODUCTION ADOPTION AUTHORIZED

**Date:** 2026-08-21

Governing benchmark:

`docs/design/CHARACTER-ANIMATION-ARCHITECTURE-BENCHMARK.md`

Frozen control:

`snapshot/maitte-idle-curious-gate5-2026-08-21`

Experiment branch:

`benchmark/character-animation-architecture`

## 1. Executive result

Gate A finds no architectural, licensing, Web/React, or raster-rigging blocker that would prevent a narrow Maittê proof in Rive.

Rive is therefore authorized to advance to **Gate B — Maittê layer-preparation proof**, but it is **not** selected as the production character runtime yet.

Two uncertainties remain load-bearing and must be proven rather than assumed:

1. **restoration compatibility:** the project must prove that named grayscale/color restoration layers remain perfectly aligned while raster meshes/bones deform; the official material reviewed does not establish a one-click dynamic grayscale filter for our imported watercolor raster workflow;
2. **authoring workflow:** rigging/mesh weighting remains an editor-centric visual-authoring task. Rive has an in-editor AI Agent, but no installed ChatGPT Rive connector was found and Rive itself still describes external-agent/MCP connectivity as exploratory work. The proof must therefore measure how much manual Rive-editor work remains in practice.

## 2. Primary-source findings

### 2.1 Raster watercolor is technically supported

Rive supports imported raster images and documents PNG/JPG/WebP import. It also supports PSD import; Rive's published mesh/PSD workflow states that PSD imports retain layer position, order, and names.

More importantly for this benchmark, Rive explicitly supports **mesh deformation on raster graphics**, including binding meshes to bones and weighting vertices. Rive's own examples name skin flex, fabric ripple and hair flow as raster-mesh use cases.

Primary sources:

- Rive — `Mesh deformation and PSD support`
- Rive — `Intro to meshes`
- Rive docs — `Bones`
- Rive docs — `Manipulating Shapes Overview`
- Rive docs — `Fundamentals Overview`

**Gate finding:** the approved watercolor Maittê does not need to be redrawn as pure vector art merely to use Rive.

### 2.2 Skeletal/body articulation is a native capability

Bones can form hierarchical chains and can either parent artwork directly or deform bound meshes through vertex weighting. This directly supports the benchmark's future arm/forearm/hand gesture requirement without requiring a separately regenerated full-body image for every gesture.

**Gate finding:** P5 (arm gesture) is architecturally plausible and is exactly the kind of problem Rive's bone/mesh system is designed to solve.

### 2.3 State Machine / semantic adapter is a strong fit

Rive State Machines model animation states and transitions. Current runtime documentation emphasizes controlling them through Data Binding rather than tightly coupling application code to internal animation state.

Data Binding supports at least:

- Boolean;
- Number;
- String;
- Color;
- Trigger;
- Enum;
- Image;
- Artboard;
- List.

This maps cleanly onto an application adapter such as:

```text
actingState       -> enum
animated          -> boolean
reducedMotion     -> boolean
restoreHeart      -> boolean
restoreGlasses    -> boolean
restoreHair       -> boolean
...
gesture           -> trigger/enum
```

No curriculum/evaluation/persistence data needs to enter the Rive file.

Primary sources:

- Rive docs — `State Machine Playback`
- Rive docs — `Property Types`
- Rive docs — `Data Binding`

**Gate finding:** the existing `MaitteActor` semantic boundary can remain authoritative.

## 3. React/Web runtime feasibility

Rive has an official React runtime with TypeScript support. The current recommended high-capability renderer is:

`@rive-app/react-webgl2`

It wraps the WebGL2 Rive runtime and exposes `useRive`, the Rive instance and a React `RiveComponent`. `useStateMachineInput` and Data Binding/runtime APIs provide the control surface needed by a future presentation adapter.

The Web runtime can load a `.riv` through a public/app-relative URL, an `ArrayBuffer`, or a cached parsed Rive file.

Rive recommends sharing an offscreen renderer when multiple WebGL Rive instances appear on a page; the React runtime defaults its offscreen-renderer option to the safe shared behavior.

Primary sources:

- Rive docs — `React`
- Rive docs — `Parameters and Return Values`
- Rive docs — `Web (JS) — Getting Started`
- Rive docs — `Canvas vs WebGL2`
- Rive docs — `Rive Parameters`

### SSR/hydration boundary

The Rive component ultimately requires a browser canvas and does not instantiate until that canvas is mounted. A future TanStack adapter should therefore be treated as a client presentation component, with a stable static/fallback representation available before hydration or when animation is disabled.

No change to domain/evaluation/persistence is implied.

## 4. Runtime weight / delivery

Rive's January-2026 runtime-size table reports compressed WASM sizes approximately:

- canvas-lite: `222 KB`;
- canvas: `567 KB`;
- webgl2: `648 KB`.

These figures are runtime/WASM cost and do not include the Maittê `.riv` and external raster assets.

`webgl2` should be the benchmark runtime because it is Rive's recommended high-capability web renderer and avoids prematurely constraining mesh/advanced rendering behavior.

The proof must measure the actual generated Maittê file and raster-layer footprint before Gate F.

Primary source:

- Rive docs — `Runtime Sizes`

## 5. WASM / deployment policy

By default the JS/React runtimes may retrieve the Rive WASM from `unpkg`. Rive explicitly documents self-hosting/preloading the WASM for reliability and load control.

**Recommended project policy if Rive is adopted:**

- pin the Rive React/runtime version;
- self-host the matching WASM through the application's own build/deployment path rather than make child-facing runtime availability depend on an external CDN request;
- test high-DPI sizing and real-device canvas memory during the runtime gate.

Primary source:

- Rive docs — `Preloading WASM`

## 6. Raster asset strategy

Rive supports embedded, referenced/out-of-band and hosted assets. The React runtime documentation specifically supports externally loading/replacing image assets and notes advantages such as smaller `.riv` files and reuse of application-bundled images.

For the Maittê benchmark, the recommended first proof is:

```text
Rive .riv
  -> rig / meshes / state machine / authored transforms

repository PNG layers
  -> watercolor character layer assets
```

Prefer **referenced/out-of-band repository raster layers** during the benchmark rather than hiding every source image inside the `.riv` binary. This keeps the approved image derivatives independently hashable/auditable and lets us compare them directly to the source master.

After performance measurement, embedding can be reconsidered if it materially improves delivery.

Primary sources:

- Rive React docs — `Loading Assets`
- Rive Web docs — `Data Binding` (image properties/runtime replacement)

## 7. Restoration architecture — feasible hypothesis, still a Gate-C proof

No primary source reviewed establishes that our imported watercolor raster can simply receive the equivalent of the current CSS `grayscale(1)` while preserving all other requirements.

Therefore Gate A does **not** claim that grayscale restoration is solved natively.

The proposed benchmark architecture is instead:

```text
ONE shared rig / bone / mesh coordinate system

base character layers
  -> grayscale derivative presentation

named restoration overlays
  -> color heart
  -> color glasses frame
  -> color hairStreak
  -> color hair
  -> color shirt
  -> color skirt
  -> color socks
  -> color shoes

fullyRestored
  -> switch/crossfade the remaining non-region base pixels to the approved full-color presentation
```

The critical difference from today's flat overlay approach is that grayscale and color derivatives must be children of / bound to the **same authored rig coordinate system**, so animation is shared rather than independently realigned after motion.

This is a hypothesis to prove, not a final architecture decision.

### Required restoration proof

Gate C must show, while the character is breathing/blinking/moving hair/gesturing:

1. heart-only stolen state;
2. a partial state including glasses and at least one deforming body/hair region;
3. fully restored;
4. no lens-interior face-color leak;
5. no grayscale/color registration drift;
6. no duplicate/ghost edges through mesh deformation.

If this cannot be achieved without duplicating whole authored character states or maintaining parallel independent rigs, Rive fails a mandatory benchmark dimension.

## 8. Layer-preparation feasibility

The approved source remains immutable.

A Rive rig cannot obtain real articulation from one flattened 1024×1536 painting without preparing separable art. Gate B should produce only the minimum derivative layers required for P1–P8.

Recommended **minimum proof inventory**, not final production segmentation:

- anchored lower-body/feet base;
- torso/chest;
- head/face base;
- hair back;
- hair front/fringe/accent where separable;
- left upper arm;
- left forearm/hand (or a combined arm layer for the first wave proof if sufficient);
- right arm equivalent only if needed to avoid seam artifacts;
- eyes/open-eye region;
- closed-lid/eyelid presentation derived locally, not a regenerated face;
- glasses frame only — lens interiors excluded;
- green heart;
- the existing restoration regions as color overlays/derivatives where required.

### Underpaint is the real art-preparation risk

Moving an arm or hair layer exposes pixels that were hidden in the approved flat painting. Those hidden pixels do not exist in the master.

Therefore some neutral **underpaint** will likely be required behind separated moving layers.

Rules:

- underpaint may exist only as an occlusion-support derivative;
- it must not redesign visible Maittê pixels at the approved neutral pose;
- the untouched approved master remains the visual authority for the neutral/rest frame;
- Gate B must compare the reassembled neutral layered Maittê against the approved source before rigging.

This is likely the highest-fidelity risk of the entire Rive proof.

## 9. Adobe-assisted preparation

The existing Adobe connector remains useful for body-part selections/masks, including hair, eyes, pupils, arms, hands, legs, shoes, clothing and glasses.

However, the currently exposed Adobe tool surface in this ChatGPT session did **not** expose a direct layered-PSD assembly/export operation for Photoshop.

Therefore the proof should not depend on the user manually learning Photoshop merely to create a PSD.

Recommended Gate-B path:

```text
approved Maittê master
  -> existing transparent production source / Adobe selections
  -> deterministic mask-based extraction into transparent PNG layers
  -> controlled underpaint only where articulation exposes hidden pixels
  -> import PNG layers individually into Rive
```

Rive's PSD import remains an optional convenience if a clean layered PSD becomes available later, not a benchmark prerequisite.

## 10. Rive Editor / AI / manual-work finding

Rive currently has an in-editor AI Agent. Current Rive material describes it as able to help write code, design and animate, and the April-2026 Rive announcement makes limited Agent access available on Free accounts.

Rive also explicitly states that connection of **external agents/MCP** to the Rive Editor is still being explored.

A plugin search in this ChatGPT environment found **no Rive integration** available to install.

Consequences:

- ChatGPT cannot currently operate the Rive Editor directly the way the project operated Adobe through its connector;
- the Rive in-editor Agent can reduce the learning burden and can be driven through prompts we prepare;
- visual rig setup, mesh topology/weights and quality review may still require editor interaction;
- Gate B/C must measure actual human/editor effort, because authoring maintainability is part of the benchmark score.

Primary sources:

- Rive docs — `AI Agent`
- Rive — `Free Rive AI Agent` (2026-04-30)
- Rive — `How to use the AI Coding Agent for real scripting`

## 11. Licensing / cost

Current Rive pricing (reviewed 2026-08-21):

- Free: `$0`; suitable for learning/creation in the Editor;
- Cadet: `$9/seat/month` on annual billing (`$108/year`) or `$17/month` monthly; up to 3 seats; includes runtime `.riv` export;
- Voyager: `$32/seat/month` annually (higher monthly rate), intended for larger collaboration/Libraries;
- Enterprise applies to large organizations and adds enterprise controls/support.

Rive states:

- the runtimes are open-source under MIT;
- there is no runtime fee;
- `.riv` production export requires a paid plan;
- previously exported files continue running if the subscription later ends.

### Benchmark implication

Gate B/C editor exploration can begin without committing to a paid runtime deployment. Before Gate D integrates our own exported Maittê `.riv`, at least a Cadet-capable export path is required.

Primary sources:

- Rive Pricing
- Rive docs — `Pricing`
- Rive — `Rive's new $9/mo plan`
- Rive docs — `Exporting for Runtime`
- Rive Runtimes

## 12. Repository/versioning policy

Rive defines `.riv` as the optimized binary consumed by runtimes. Rive defines `.rev` backup exports as containing full project information that is stripped from the runtime export.

**If Rive is adopted, `.riv` must not be the sole source-of-truth artifact.**

Proposed benchmark layout:

```text
references/visual/20-character-animation-architecture-benchmark/rive/
  source-layers/
    *.png
  authoring/
    maitte-idle-curious-rig.rev
  runtime/
    maitte-idle-curious-rig.riv
  SHA256.txt
  README.md
```

For the benchmark:

- commit the small number of `.rev`/`.riv` proof binaries directly and record hashes;
- do not introduce Git LFS before actual file sizes justify it;
- if iterative `.rev` history becomes materially large, evaluate Git LFS before production-scale character rollout;
- source PNG layers remain independently stored and traceable to the approved master.

Primary sources:

- Rive docs — `Format`
- Rive docs — `Exporting for Runtime`
- Rive docs — `Exporting for Backup`

## 13. Accessibility / reduced motion

The existing application-level `animated` / reduced-motion decision should remain authoritative.

The rig needs a deterministic neutral state that is valid with the State Machine paused or with ambient-motion inputs disabled.

No accessibility state should be persisted inside Rive.

**Gate finding:** no architecture blocker identified.

## 14. Gate-A risk register

### R1 — watercolor neutral-frame fidelity — MEDIUM / LOAD-BEARING

Rive can deform raster art, but layer separation and underpaint may create seams. Gate B must prove byte/visual neutral reconstruction before motion.

### R2 — restoration under deformation — HIGH / LOAD-BEARING

Technically plausible through shared rig geometry and paired grayscale/color derivatives, but not yet demonstrated. This is the highest architecture-specific proof requirement.

### R3 — manual rigging effort — MEDIUM/HIGH

Rive Agent can help, but no external ChatGPT/MCP integration is available today. Mesh topology and weighting may need manual editor work.

### R4 — runtime footprint — LOW/MEDIUM

~648 KB compressed WebGL2 WASM before character assets is meaningful but reasonable for a character system if the scalability benefit is real. Must be measured in the app.

### R5 — WebGL/browser behavior — MEDIUM

Rive recommends WebGL2 and shared offscreen rendering. Real target-device testing is mandatory before adoption.

### R6 — binary authoring/version diffability — MEDIUM

`.rev`/`.riv` are binary artifacts. Hashes, source layers and explicit evidence records are required; Git LFS may become useful later.

### R7 — subscription/export dependency — LOW

Production export requires paid Rive plan, but runtime is MIT/no per-runtime fee and exports remain usable.

## 15. Gate-A score — feasibility only

This is not the final weighted architecture score; it evaluates whether a proof is justified.

| Gate-A dimension | Finding |
|---|---|
| Preserve raster/watercolor source | PASS — supported in principle through raster images/meshes |
| Bone/mesh articulation | PASS |
| Hair deformation capability | PASS in principle |
| Natural grounded breathing capability | PASS in principle |
| Top-down blink capability | PASS in principle; still requires authored lid solution |
| State-machine semantic adapter | PASS |
| Official React/Web runtime | PASS |
| Reduced-motion control | PASS |
| Named restoration while deforming | CONDITIONAL — mandatory proof required |
| Tool/editor automation from this ChatGPT | CONDITIONAL — no direct connector/MCP today |
| Repository reproducibility | PASS WITH `.rev` + `.riv` + source-layer policy |
| Licensing for a small proof/product | PASS WITH PAID EXPORT REQUIREMENT |

## 16. Disposition

`GATE A — PASS CONDITIONAL`

Rive has enough native raster-mesh, bone, State Machine and React runtime capability to justify the next narrow Maittê proof.

The benchmark is **not** authorized to jump directly to game integration or production adoption.

## 17. Recommended immediate next action — Gate B

Prepare a **minimal Maittê layer-separation proof**, before building a rig.

Gate B must answer one question first:

> Can the approved watercolor Maittê be decomposed into a small, riggable layer inventory and then reassembled in the exact neutral pose without visible seams or identity drift?

Minimum Gate-B deliverable:

1. immutable reference to the approved master;
2. transparent layer set for the minimum rig inventory;
3. neutral underpaint only where needed;
4. exact/reviewable re-composition of the neutral pose;
5. glasses frame corrected to exclude lens interiors;
6. eyelid/blink source strategy identified;
7. source-layer SHA manifest;
8. before/after visual board at review scale and real Overworld scale;
9. human approval before any Rive mesh/bone work begins.

If neutral layer reassembly fails fidelity review, stop before investing in rigging.
