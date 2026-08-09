# Specifications — Aventuras da Maittê

This directory is the versioned source of truth for product and implementation decisions.

## Structure

```text
docs/
├── product/
│   ├── PRODUCT-VISION.md
│   ├── DESIGN-PRINCIPLES.md
│   ├── GAME-LOOP.md
│   └── MVP-SCOPE.md
├── narrative/
│   ├── UNIVERSE.md
│   ├── STORY.md
│   ├── MAITTE.md
│   ├── VILLAIN.md
│   ├── PET-COMPANIONS.md
│   └── LACKEYS.md
├── worlds/
│   ├── OVERWORLD.md
│   ├── MATHEMATICS-WORLD.md
│   ├── PORTUGUESE-WORLD.md
│   ├── SCIENCE-WORLD.md
│   ├── HISTORY-WORLD.md
│   ├── GEOGRAPHY-WORLD.md
│   └── ENGLISH-WORLD.md
├── ux/
│   ├── NAVIGATION.md
│   ├── WORLD-BOARD.md
│   ├── CHALLENGE-STAGE.md
│   ├── FEEDBACK.md
│   └── TRANSITIONS.md
├── gameplay/
│   ├── PUZZLE-SYSTEM.md
│   ├── ACTIVITY-SLOTS.md
│   ├── SUPPORT-LEVELS.md
│   ├── PROGRESSION.md
│   └── XP.md
├── design/
│   ├── ART-DIRECTION.md
│   ├── COLOR-RESTORATION.md
│   ├── ANIMATION.md
│   ├── AUDIO.md
│   └── RESPONSIVE.md
├── pedagogy/
│   ├── LEARNING-MODEL.md
│   ├── CONTENT-PARAMETRIZATION.md
│   ├── MATHEMATICS-GRADE-2.md
│   └── CURRICULUM-SOURCES.md
├── technical/
│   ├── ARCHITECTURE.md
│   ├── CONFIG-SCHEMAS.md
│   ├── STATE.md
│   └── PERSISTENCE.md
└── adr/
```

The tree above is the agreed target structure. Files are added as their contents are consolidated; an absent file must not be interpreted as permission to invent its decisions.

## Status vocabulary

`DECIDED` — approved and binding.  
`PROVISIONAL` — accepted direction, still refinable.  
`FUTURE` — planned outside the current delivery.  
`OUT_OF_SCOPE` — explicitly excluded.

Open gaps must be identified rather than silently resolved by an implementation agent.
