# Activity Slots

**Status:** DECIDED architecture; count/object art PROVISIONAL.

## Role
An Activity Slot is the world-positioned node that assigns one or more Activities to a location on the World Board. Activity itself remains location-agnostic.

## Ownership
Activity Slot owns:
- board/world position;
- Activity assignment/reference;
- progression availability/completion relation;
- optional spatial anchor already supported by the runtime contract.

Activity does not own its world location.

## Presentation separation
The core educational/domain model must not gain asset URLs, artwork imports or presentation-specific `visualKind` values merely to render Phase 1A.

**DECIDED:** visual treatment belongs in a separate world/scenery presentation configuration keyed by stable world/zone/slot identifiers. Existing neutral spatial anchors may be consumed by that layer.

This keeps a Slot movable/re-skinnable without changing curriculum or Activity definitions.

## Derived player-facing states
At minimum the presentation must distinguish:
- `completed`: traversed/restored;
- `current/available`: the next actionable position, with Maittê nearby/on it;
- `future/locked`: visible but not yet reached.

Exact technical enum names may differ. `current` may be derived from progress rather than persisted.

## Visual language
Slots must be embedded artistically into the world — stones, signs, flowers, bridges, footprints, doors, ruins or other biome objects are valid classes of treatment.

Avoid using generic numbered circles, rectangular level buttons, large lock icons or business-application disabled controls as the primary child-facing representation.

Future/locked spaces should communicate “the adventure has not reached here yet”, not “access denied”.

## Count and route
Exact Slot count per Zone remains PROVISIONAL. Zones should support adding/reordering content without redesigning the whole subject world.
