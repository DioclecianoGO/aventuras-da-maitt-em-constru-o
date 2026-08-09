# Audio

**Status:** DECIDED product behavior; final voices/music/SFX assets PROVISIONAL.

## Purpose

Audio supports comprehension, character presence and feedback. It is especially important for essential instructions because the initial learner is still consolidating literacy.

Audio must enhance understanding without becoming a prerequisite for accessibility: every essential spoken instruction also has a visible text/caption or equivalent visual support.

## Audio categories

### A — Spoken guidance — MVP essential

- companion introduction;
- essential challenge instruction;
- repeat instruction;
- authorized hint/support narration;
- short success/retry reactions.

### B — Interaction feedback — Phase 1B foundation

- selection/place confirmation;
- success chime;
- gentle retry cue;
- restoration/color-return cue.

These may use concept/placeholder assets in Phase 1B.

### C — Ambience/music — enrichment/future

- biome ambience;
- music beds;
- longer narrative scoring.

Final music production is not required for the useful MVP.

## Essential instruction rule

**DECIDED:** essential challenge instructions must be capable of spoken delivery and replay.

The instruction sentence belongs to activity/challenge content or presentation configuration, not to the pet component. A companion supplies identity/voice/presence; it does not hardcode the pedagogical instruction.

## Narration contract

Conceptually, a challenge instruction must be able to resolve:

- short visible caption/text;
- spoken text or an audio asset reference;
- optional language/locale;
- optional companion/voice profile;
- replay capability.

Exact TypeScript field names remain an implementation decision, but the contract must preserve content parametrization and must not couple narration to a specific Puzzle Template.

## Voice source strategy

Phase 1B may support two interchangeable sources:

1. **Recorded/generated audio asset** — preferred when an approved voice asset exists.
2. **System/browser speech synthesis fallback** — allowed for MVP validation when no approved recording exists.

System speech synthesis is a fallback, not the canonical identity of Burpee, Pipoca, Will or Lyra. Voice selection varies by device/browser and must not become product truth.

Do not add a remote speech API/backend merely to satisfy Phase 1B unless separately approved.

## Playback behavior

- only one spoken narration should be primary at a time;
- starting/replaying an instruction should cancel or fade the previous narration rather than overlap;
- route/challenge exit cancels relevant narration;
- short SFX must not drown out speech;
- focused narration should reduce/duck non-essential ambience if ambience exists;
- repeated taps on replay must not create stacked audio.

## Browser autoplay constraint

Audio must respect browser autoplay/user-gesture rules.

Preferred path: challenge opening follows a child tap on an Activity Slot, so narration may begin from that interaction when allowed.

If playback is blocked:

- do not fail silently;
- keep the caption visible;
- present an obvious diegetic replay/speaker affordance;
- let the child start narration with one tap.

## Replay affordance

A replay control must be available while an essential instruction is relevant.

It should:

- be visually integrated into the Challenge Stage;
- use a recognizable sound/speaker symbol or equivalent;
- have a large tablet-friendly touch target;
- have a programmatic accessible label such as `Ouvir instrução novamente`;
- not be hidden behind parent/settings menus.

## Pet voice identity

Each companion may later have a distinct voice profile/personality, but Phase 1B must not hardcode production voice casting.

Direction:

- Burpee — clear, thoughtful, strategic rhythm;
- Pipoca — energetic, quick, adventurous;
- Will — curious, playful, investigative;
- Lyra — calm, observant, precise.

These are acting/tone directions, not requirements for specific gender, accent or external voice service.

## Instruction writing

Spoken instructions should be short, concrete and action-first.

Prefer one action per sentence when possible.

For example, a generic ordering mechanic can use a spoken structure such as:

`Vamos colocar do menor para o maior.`

Do not require the child to parse long explanatory paragraphs before interacting.

## Feedback sounds

Success:

- warm/positive;
- short;
- may combine with character reaction and restoration;
- avoid casino/reward-machine intensity.

Retry/error:

- soft and non-punitive;
- no harsh buzzer/alarm;
- paired with thinking/retry character behavior rather than failure/shame framing.

## Accessibility / controls

Phase 1B should allow the experience to remain usable when:

- device is muted;
- browser speech synthesis is unavailable;
- an audio asset fails to load;
- the user prefers reduced motion;
- audio output is temporarily unavailable.

Visible instruction/caption remains the fallback.

A future global mute/volume control is allowed, but a full settings system is not required by Phase 1B.

## Microphone

Microphone capture and speech recognition are FUTURE. Phase 1B must not request microphone permission.

Future ASR must distinguish recognition uncertainty from learner error so a speech-recognition failure is never presented as proof that the child said the educational answer incorrectly.

## Asset isolation

Audio files and voice configuration must remain replaceable and separate from evaluator/domain logic. Audio playback must not determine correctness or progression.

## Acceptance criteria — Phase 1B

1. The current challenge can speak its essential instruction.
2. The instruction can be replayed.
3. Caption/text remains available.
4. Playback does not overlap uncontrollably on repeated taps.
5. Exiting the challenge stops/cancels narration.
6. Autoplay failure has a visible recovery path.
7. One companion can visually act as the speaker without hardcoding the sentence in the companion component.
8. Synthetic/system speech, if used, is clearly an implementation fallback and independently replaceable.
9. Success/retry cues are non-punitive.
10. No microphone permission is requested.
