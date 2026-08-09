# Pet Companions

**Status:** DECIDED identities/functions; assignment by activity and final voice assets PROVISIONAL.

Maittê's real pets are recurring inhabitants and Companion Guides. They are not permanently locked to one subject.

## Burpee

Border Collie blue merle, blue eyes. Intelligent, rational, strategic. Natural affinity with logic, patterns and sequencing.

Voice/acting direction: clear, thoughtful, observant, confident without sounding like an adult teacher.

## Pipoca

White Maltese with slightly curly fur. Adventurous, energetic, brave and quick to explore. Natural affinity with movement, mazes and dynamic discovery.

Voice/acting direction: energetic, curious, quick, encouraging.

## Will

Orange mixed-breed cat. Curious, meddlesome/exploratory and motivated to understand what objects or clues mean.

Voice/acting direction: playful, investigative, slightly mischievous.

## Lyra

Tricolor mixed-breed cat. Observant, calmer, attentive to details. Natural affinity with matching, memory and classification.

Voice/acting direction: calm, precise, reassuring and observant.

## Companion Guide functions

A companion may:

- be visible in the world before the challenge;
- introduce a mission/challenge;
- speak the essential instruction;
- visually demonstrate attention toward relevant objects;
- repeat the instruction on request;
- provide a hint when support is requested/triggered;
- react to success;
- react supportively to retry;
- remain near the edge of the Challenge Stage without blocking manipulables.

Essential challenge instructions must be capable of spoken delivery because the initial learner is still consolidating literacy.

## Assignment rule

Affinities guide tone; they do not create permanent subject ownership.

Companion assignment must be configurable per Activity/content context.

Do not hardcode:

- Burpee = Mathematics;
- Lyra = memory only;
- Pipoca = mazes only;
- Will = exploration only.

Any pet can appear in any world when narrative/content context supports it.

## Content / character separation

The pet component owns:

- pet identity;
- visual asset;
- acting state;
- optional voice-profile key;
- entrance/reaction behavior.

The pet component does **not** own:

- answer rules;
- skill ids;
- the instructional sentence;
- mastery decisions;
- permanent subject assignment.

Spoken/text instruction comes from challenge/activity content or presentation configuration and is delivered through the selected companion.

## Acting states

The character system should support at least:

- idle;
- speak;
- watch/listen;
- success-reaction;
- retry/hint-reaction.

An entrance state is desirable for Phase 1B but may degrade to a simple fade/translate.

Complex lip-sync is not required.

## Spoken guidance

Audio behavior follows `docs/design/AUDIO.md`.

When a companion is the active narrator:

- the child should be able to identify visually who is speaking;
- narration should not overlap itself on repeated replay taps;
- instruction can be replayed;
- if audio is unavailable, caption/visual support remains;
- browser/system TTS may be used as an MVP fallback but is not the final canonical pet voice.

## Hint behavior

Companion guidance must not reveal the answer unless the activity is explicitly in Discover mode or the configured support level authorizes stronger assistance.

A hint may direct attention through gaze/gesture before verbally revealing more information.

Exact support escalation remains governed by the support model when that spec is completed.

## Phase 1B

One pet must be usable in runtime to validate:

`entrance/presence → spoken instruction → replay → watch interaction → success/retry reaction`

The pet id must be configuration-driven.

All four production-ready character sheets and final voice casting are not required in Phase 1B.

## Future

Future multi-pet scenes/comedy are allowed, but essential instructional speech should remain clear and avoid multiple characters talking over one another.
