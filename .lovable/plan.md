# Phase 1B — Character, Art, Motion & Audio Foundation

Experience-layer only. Phase 0 domain/evaluation/persistence and Phase 1A spatial architecture are preserved unchanged.

## P1 — Current-state audit

**Reusable as-is (no change)**
- `src/game/domain/*`, `src/game/evaluation/*`, `src/game/state/*`, `src/game/persistence/*`, `PuzzleTemplateHost`, `contract.ts` (template still emits only `UserResponse`).
- Route hierarchy `/`, `/mundo/$worldId`, `/mundo/$worldId/desafio/$slotId`.
- `RestoreGroup` / `RestorationLayer` mask-based restoration, derived from persisted facts.
- `assetRegistry` logical-key indirection, `world-config` separation, `motion.ts` (`useReducedMotion`, `useHydrated`), CSS motion tokens in `styles.css`.
- Folded-map navigation, Maittê region model (`heart` always restored, no encoded order).

**Reusable with visual replacement (same API, richer art)**
- `OverworldArt` (color/ink split kept; interiors redrawn with vegetation, terrain, depth).
- `DunasDouradasArt` (band structure kept; redrawn as layered dunes + fg/mg/bg).
- `SlotObjectArt` (kind + state contract kept; objects redrawn organically).
- `MaitteFigure` (region ids kept; redrawn and re-authored into acting-state groups).
- `ChallengeStageShell` (props kept; internal layout replaced by a staged desert scene).

**Insufficient for Phase 1B (must be extended/replaced)**
- `CompanionArt` — single static creature, no species identity, no acting states, sits as a corner sticker. Replace with a real concept pet + state prop.
- `MaitteAvatar` — no acting state input; only progress/position.
- `PlaceholderOrderTemplate` — web buttons + generic green `Pronto`.
- Feedback in the challenge route — plain text string in a bubble; no character/world/audio channel.
- No audio layer of any kind exists; no narration configuration exists.

**Architecturally off-limits**
- Adding visual/audio/narration metadata to `src/game/domain/schemas.ts`.
- Moving any evaluation into the visual layer or reading correctness from audio/animation.
- Binding a pet id to a subject/skill; hardcoding the instruction sentence in a pet, template or shell.
- Adding an animation or audio dependency (none is needed).

## P2 — Art upgrade plan

### Overworld
- **Issue:** primitive silhouettes, large empty areas, reads as a diagram.
- **Upgrade:** per-region interiors gain vegetation clusters of varied scale, a few buildings/landmarks per region, terrain hatching and dune/wave/canopy texture, organic biome borders instead of clean polygons, foreground framing (branches, rocks, grass tufts at the frame edge), midground routes, faint background ridge line + atmospheric ink softening, and micro-details (birds, a kite, a lamp, animal tracks). Line-weight hierarchy: heavy foreground, medium midground, `INK_SOFT` background. A breathing ring of low detail is kept around each region label and hit area.
- **Affected:** `OverworldArt.tsx` (split into `OverworldColor`, `OverworldInk`, plus per-region detail sub-components), `ink.tsx` (extra hatch/stipple/paper-grain patterns), `OverworldScene.tsx` only for an ambient-motion group.
- **Replaceability:** same two exported layers behind the same registry keys; region ids, centroids and hits stay in `world-config`.
- **Acceptance:** with zero progress the Overworld reads as an illustrated storybook map; labels and targets are never overlapped by new detail.

### Dunas Douradas
- **Issue:** three smooth bands plus a sun; empty midground.
- **Upgrade:** 5–6 layered dune ridges with crest highlights and wind ripple texture; foreground stones, dry grasses and a half-buried object; midground trail with scattered pebbles and small creature tracks; background distant ruins and an atmospheric horizon haze; a subtle drifting-sand ambient group. Detail deliberately thins along the trail and around slot anchors.
- **Affected:** `DunasDouradasArt.tsx`, `NavigationArt.tsx` (rock arch redraw), `SlotObjectArt.tsx`.
- **Replaceability:** scene box 1600x900, route path and landmark anchors stay in `world-config`; nothing curricular enters scenery.
- **Acceptance:** the board shows foreground/midground/background separation and at least eight non-interactive details, while slot objects remain the most legible shapes on screen.

### Maittê
- **Issue:** icon-like construction, one pose, single idle heart pulse.
- **Upgrade:** redrawn concept figure with rounded confident varied-weight line work, expressive eyes/brows/mouth and roughly eight-year-old proportions, with every `MAITTE.md` identity feature preserved; authored as transform groups (`head`, `face`, `hairFront`, `hairBack`, `torso`, `armL`, `armR`, `legs`) plus swappable face parts (eyes open/closed/happy/thinking, mouth neutral/smile/open, brows).
- **Affected:** `MaitteFigure.tsx`, `MaitteAvatar.tsx` (accepts `state`), registry key unchanged.
- **Replaceability:** colour region ids and the `restored` prop are unchanged; no restoration order is encoded.
- **Acceptance:** at board and stage scale her expression and pose are readable and clearly not an icon.

### Companion
- **Issue:** generic creature, static, decorative.
- **Upgrade:** one concept pet — **Burpee** (blue-merle Border Collie, blue eyes) as the Phase 1B demo configuration only, chosen for a sequencing demo; the pet id stays in `world-config` and can be switched to Pipoca, Will or Lyra with no code change. Layered groups (`body`, `head`, `ears`, `muzzle/mouth`, `tail`, `eyes`) drive the five acting states.
- **Affected:** new `src/assets/game/characters/pets/BurpeeArt.tsx`; `CompanionArt.tsx` becomes a resolver by `petId` + `state`; registry key `character.pet.burpee`.
- **Replaceability:** the resolver falls back to the current concept creature if a pet asset is missing.
- **Acceptance:** the pet reads as a dog with personality, and its speaking state is obvious with sound off.

### Challenge Stage
- **Issue:** dialog + header + centred card reads as a web form over scenery.
- **Upgrade:** full-bleed Dunas Douradas cutaway that visibly continues the board (same dune shapes, camera pushed in); companion staged left on the sand at world scale, Maittê staged right watching; the instruction caption rendered as a small sand-etched plate near the companion rather than a header; the diegetic folded map returns to the trail; a large speaker/shell replay object beside the companion; interaction on a cleared patch of sand in the centre with generous negative space.
- **Affected:** `ChallengeStageShell.tsx`, the desert skin, `mundo.$worldId.desafio.$slotId.tsx` (composition only).
- **Replaceability:** shell props remain `worldId/title/onClose/children/feedback` plus new presentation props; skin selection stays config-driven.
- **Acceptance:** a reviewer cannot describe the screen as "a card with a prompt and a button".

### Puzzle objects
- **Issue:** four blob-buttons with numerals.
- **Upgrade:** four carved desert stone tablets resting in shallow sand hollows, each with a hand-carved mark, varied silhouettes and a lift/settle response. Sockets in the sand show the four ordered positions left to right.
- **Affected:** new `src/assets/game/objects/OrderStoneArt.tsx`; `PlaceholderOrderTemplate.tsx` presentation only.
- **Replaceability:** labels still come from `item.options`; stones stay generic and encode no curriculum truth.
- **Acceptance:** the interaction looks like moving stones in Dunas Douradas, and both drag and tap-to-place still work.

## P3 — Character acting plan

| Character | State | Visual pose/expression | Motion | Trigger | Reduced-motion |
|---|---|---|---|---|---|
| Maittê | idle-curious | weight on one leg, head slightly turned, eyes open, faint smile | breath scale on torso, blink swap, 4s loop | default in world/board | static pose, blink only |
| Maittê | listen-think | turned toward companion, brow raised, hand near chin | one-off head tilt, then slow breath | narration playing | pose applied instantly |
| Maittê | success | upright, arms slightly out, happy eyes, open smile | small hop + heart pulse burst | `outcome === "correct"` | pose + heart pulse |
| Maittê | retry-thinking | gaze down to the stones, brow lightly furrowed, hand at side | slow head turn toward manipulables | incorrect/partial outcome | pose swap only |
| Maittê | move | walking silhouette, forward lean | translate along path + subtle vertical bob | current slot changes | direct reposition, short fade |
| Burpee | idle | seated, tail resting, ears up | breath, ear twitch, blink | stage open, not narrating | static |
| Burpee | speak | leaning forward, muzzle open, ear forward, speech cue arc near head | 2-state mouth alternation ~180ms + small head bob | narration active | mouth open + cue shown, no bob |
| Burpee | listen/watch | head turned toward stones, ears forward, tail low | slow gaze/head turn | child interacting | pose swap |
| Burpee | success-reaction | standing, tail up, happy squint | tail wag + one hop | correct outcome | tail-up pose |
| Burpee | retry/hint-reaction | head tilt, one ear down, curious eyes, nose toward stones | head tilt tween | incorrect outcome or hint | tilted pose |
| Burpee | entrance (optional) | trots in from the dune edge | translate + fade, 500ms | stage mount | fade in only |

## P4 — Audio architecture plan

Dependency flow:

```text
world-config/narration.ts (presentation config, keyed by activityId/slotId)
        |  { captionText, spokenText, audioKey?, locale, voiceProfileKey? }
        v
useNarration()  --->  audio/narrationService.ts
        |                  |- audioRegistry (logical key -> file URL)  [preferred]
        |                  |- speechSynthesis fallback                 [MVP]
        v
ChallengeStageShell: caption plate + replay object + companion `speaking` flag
```

- **Ownership:** narration content lives in the visual/presentation config layer (`src/visual/world-config/narration.ts`), never in `src/game/domain` schemas, and never inside the pet, template or shell.
- **Service:** a single module-level controller with `speak(request)`, `stop()` and `state` (`idle | speaking | blocked | unsupported`). Only one narration at a time; `speak` always cancels the previous one, so repeated replay taps cannot stack.
- **Asset registry:** `audioRegistry` maps logical keys (`vo.slot-1.instruction`, `sfx.select`, `sfx.place`, `sfx.success`, `sfx.retry`, `sfx.restore`) to files. A missing key or load error falls through to speech synthesis; if both are unavailable the state becomes `unsupported`.
- **Fallback:** feature-detect `window.speechSynthesis`; when unsupported the caption stays and the replay control carries a "sem áudio neste aparelho" accessible label.
- **Autoplay:** narration is requested on stage mount, which follows the child's slot tap. If it throws or emits no `start` within roughly 600ms the state becomes `blocked`, the replay object pulses visibly and the caption gains a hint; one tap plays it.
- **Cleanup:** stage unmount and route change call `stop()`; the companion speaking state clears with it.
- **SFX:** short one-shots at low gain, ducked or skipped while narration is speaking. No SFX ever determines correctness.
- **Accessibility:** caption always rendered; large replay target (at least 64px); `aria-label="Ouvir instrução novamente"`; `role="status"` for narration state changes; no microphone.

## P5 — Current challenge transformation

1. The child taps the carved stone on the Dunas Douradas trail; the stone lifts slightly and a soft place-sound plays.
2. The camera pushes into that stretch of dune — the stage keeps the same dune silhouettes, so it reads as continuing rather than navigating away.
3. Burpee trots in from the left dune edge and sits in the sand facing the child; Maittê stands to the right and turns into `listen-think`.
4. Burpee enters `speak`: mouth alternates, head bobs, a small speech cue arc appears near his head, and the narration says "Vamos colocar do menor para o maior."
5. Simultaneously a short caption appears on a sand-etched plate under him with the same sentence. If audio was blocked the plate stays and the shell-shaped replay object beside Burpee pulses.
6. Four carved stone tablets sit in a row of shallow sand sockets in the cleared centre. Ambient sand drift pauses. Tapping a stone lifts it with a soft click; tapping another swaps them with a settle and a small sand puff. Dragging works identically.
7. Burpee switches to `listen/watch`, nose toward the stones.
8. **Success:** the stones settle in sequence with a warm short chime, Burpee's tail wags with a hop, Maittê hops and her heart pulses, colour blooms outward from the stone group, then the camera pulls back to the board where the local bloom persists and Maittê walks to the next slot.
9. **Retry:** a soft low tone, the stones nudge gently back into their sockets (nothing resets), Burpee tilts his head with one ear down, Maittê moves to `retry-thinking` looking at the stones, the caption plate shows the supportive line from the content pack, and the replay object brightens. No red, no X, no progress lost.

## P6 — `Pronto` decision

**DIEGETIC CONFIRMATION.**

Auto-evaluation is unsafe for this mechanic: the ordering interaction has no unambiguous completed state — the four stones always occupy a complete permutation, including the initial shuffled one, so "all placed" is already true before the child has done anything. Evaluating on every swap would record touch slips and intermediate arrangements as attempt evidence, corrupting the Phase 0 evidence trail, and would fire a retry reaction while the child is still mid-thought. Debouncing only hides the same problem.

Phase 1B therefore keeps an explicit confirmation, but as a world object rather than a form control: a carved sand seal / hand-print stone beside the row, tablet-sized, with an accessible label ("Mostrar para o Burpee"), which Burpee looks toward. It stays inert until the child has moved at least one stone, which removes the accidental first-tap submission. This decision is scoped to the ordering mechanic and is not proposed as a universal rule.

## P7 — Motion plan

| Motion | Purpose | Technique | Priority | Reduced-motion | Risk |
|---|---|---|---|---|---|
| Maittê idle (breath/blink) | character life | CSS keyframes on SVG group + timed face part swap | enrichment | static pose | low |
| Maittê listen/think | shows attention to narration | CSS transition on head group transform | essential | instant pose | low |
| Maittê success | success channel | CSS hop keyframe + heart pulse | essential | pose + pulse | low |
| Maittê move between slots | spatial causality | CSS transform transition (already present) | essential | instant reposition | low |
| Companion entrance | stage becomes an event | CSS translate + opacity, 500ms | enrichment | fade only | low |
| Companion speak | identifies the speaker | React state from narration + 2-state mouth swap on interval | essential | open mouth + cue, no bob | interval cleanup on stop |
| Companion success/retry | non-punitive feedback | CSS keyframes on tail/head groups | essential | pose swap | low |
| Stone select/place | touch acknowledgement | CSS transform transition + sand puff opacity | essential | opacity/outline only | must not gate response emit |
| Restoration bloom | cause and effect | existing mask radius transition | essential | immediate final mask | already proven |
| Ambient sand drift | living world | CSS `drift-slow` on a low-opacity group, paused in stage | enrichment | not rendered | keep off the puzzle area |

No animation dependency is added. No state change listens to an animation-end event; every visual state is derived from React state that is already committed.

## P8 — Asset plan

| Asset | Type | Format |
|---|---|---|
| Overworld ink/colour redraw + region detail parts | functional concept asset | inline SVG components |
| Extra ink patterns (stipple, paper grain, soft haze) | functional concept asset | inline SVG defs |
| Dunas Douradas layered scene redraw | functional concept asset | inline SVG components |
| Rock arch, ruins, dry plants, stones | functional concept asset | inline SVG components |
| Maittê figure with acting groups and face parts | functional concept asset | inline SVG component |
| Burpee concept pet with acting states | functional concept asset | inline SVG component |
| Order stone tablets, sand sockets, confirmation seal | functional concept asset | inline SVG components |
| Replay speaker/shell object | functional concept asset | inline SVG component |
| Caption plate / sand-etched panel | functional concept asset | inline SVG + HTML text |
| Instruction narration for the placeholder challenge | replaceable placeholder | browser speech synthesis, audio key reserved |
| SFX: select, place, success, retry, restore | replaceable placeholder | short audio files or generated tones |
| Final pet voices, music, production SFX, remaining three pets, other five worlds | future production replacement | out of Phase 1B |

## P9 — Acceptance matrix

| # | Criterion | Status | Post-build human test |
|---|---|---|---|
| 1 | Maittê concept art with idle/listen-think/success/move | PASSABLE BY PLAN | Open board and stage, trigger success and retry, confirm four distinct poses |
| 2 | One companion with idle/speaking/reaction states | PASSABLE BY PLAN | Watch Burpee through narration, success and retry |
| 3 | Essential instruction spoken and replayable | PASSABLE BY PLAN | Open the challenge, hear it, tap replay twice — no overlap |
| 4 | Instruction from configuration, not pet JSX | PASSABLE BY PLAN | Edit the narration config text; screen and speech both change |
| 5 | Autoplay/failure fallback | PASSABLE BY PLAN | Block autoplay in the browser; caption stays and replay pulses |
| 6 | Completable with audio muted | PASSABLE BY PLAN | Mute the device and solve the challenge using caption plus visuals |
| 7 | No generic form presentation | PASSABLE BY PLAN | Visual review of the stage screenshot |
| 8 | Auto-eval or diegetic confirmation | PASSABLE BY PLAN | Confirm the sand seal, not a green button, submits |
| 9 | Richer Overworld and Dunas Douradas | NEEDS DECISION | Side-by-side screenshot review against Phase 1A; owner judges "materially richer" |
| 10 | Motion follows ANIMATION.md priority/attention rules | PASSABLE BY PLAN | Confirm ambient motion pauses during the challenge |
| 11 | Reduced motion preserves comprehension | PASSABLE BY PLAN | Enable prefers-reduced-motion and complete the loop |
| 12 | Non-punitive success/retry | PASSABLE BY PLAN | Answer wrong; confirm no red/X/buzzer and no progress loss |
| 13 | Companion assignment configurable | PASSABLE BY PLAN | Change `petId` in config; a different pet appears |
| 14 | No microphone | PASSABLE BY PLAN | No permission prompt; no getUserMedia in the bundle |
| 15 | Phase 0 boundaries intact | PASSABLE BY PLAN | Diff shows no change under domain, evaluation or persistence |
| 16 | Assets independently replaceable | PASSABLE BY PLAN | Swap a registry key to a stub; the app degrades rather than crashes |
| 17 | Tests/lint pass | PASSABLE BY PLAN | Run the existing suite and lint |

Criterion 9 is subjective by definition and requires the owner's visual review; nothing blocks building toward it.

## P10 — GAP / CONFLICT / ASSUMPTION

| Item | Type | Must resolve before Build? |
|---|---|---|
| Burpee chosen as the Phase 1B demo companion for the ordering mechanic; configuration only, no subject binding | ASSUMPTION | NO |
| No approved recorded voice asset exists, so browser speech synthesis is the Phase 1B narration source with an audio key reserved for later files | ASSUMPTION | NO |
| SFX will be short synthesized tones or placeholder files, not a licensed library | ASSUMPTION | NO |
| Confirmation affordance wording "Mostrar para o Burpee" is provisional copy | ASSUMPTION | NO |
| CHALLENGE-STAGE.md allows overlay or full-bleed staging; the plan assumes full-bleed continuation of the dune | ASSUMPTION | NO |
| Portuguese (pt-BR) is the only narration locale in Phase 1B | ASSUMPTION | NO |
| No global mute/volume control is built (AUDIO.md marks it optional) | GAP | NO |

## P11 — Build scope

Four coherent increments:

1. **Character system** — redraw Maittê with acting groups; add the Burpee concept pet with five states; extend `MaitteAvatar` and `CompanionArt` to take a `state` prop; add character motion CSS with reduced-motion fallbacks.
2. **Audio and narration** — narration presentation config, narration service resolving audio registry then speech synthesis, `useNarration` hook, replay/blocked/cancel/cleanup behaviour, SFX helper.
3. **Challenge Stage transformation** — full-bleed desert stage, staged companion and Maittê, caption plate, diegetic replay object, carved stone tablets with sockets, diegetic confirmation seal, character and world success/retry feedback, ambient-motion suppression. `PuzzleTemplateHost` and the evaluation path untouched.
4. **World art density** — Dunas Douradas layered redraw plus ambient sand, then Overworld enrichment, then a full pass on screenshots, reduced motion, muted audio, keyboard, lint and tests.

Nothing in this sequence touches curriculum, mastery, XP or Number Sense content, so the build stops cleanly at the Phase 1B review gate.

## P12 — Build readiness

`PHASE 1B READY FOR BUILD`