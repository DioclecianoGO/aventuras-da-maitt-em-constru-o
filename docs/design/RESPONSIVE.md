# Responsive Behavior

**Status:** DECIDED priorities; exact breakpoints PROVISIONAL.

## Target order
1. Landscape tablet — primary product target.
2. Desktop / large screen — fully usable for development, review and play.
3. Narrow/mobile viewport — supported gracefully, but it does not dictate the visual architecture of the MVP.

## Overworld
The Overworld remains one spatial illustrated composition at all supported widths. It must not collapse into a vertical card/list interface.

Allowed adaptation strategies:
- focal-point crop;
- controlled panning;
- camera framing changes;
- proportional viewBox changes;
- alternate framing of the same world composition.

All six subject regions should remain discoverable without turning the experience into dashboard navigation.

## World Board
A Zone is an illustrated chunk rather than an endless board. Phase 1A may use controlled horizontal/scene panning or fit the current chunk to the viewport. Exact route length is not fixed by responsive implementation.

Maittê, Activity Slots and landmarks must preserve their relative spatial relationships when scaling.

## Challenge Stage
The focused interaction area must retain large touch targets and enough world context around it to preserve spatial continuity. On narrower screens the frame may occupy more of the viewport, but it must not become an unrelated generic form page.

## Touch
Core child interactions must be comfortably operable by touch. If precise dragging can create false educational errors, maintain the approved tap-select/tap-place alternative.

## Text and controls
Essential text remains legible without dominating the illustration. Diegetic controls retain accessible hit areas and visible focus states.

## Breakpoints
Exact numeric breakpoints remain PROVISIONAL. Prefer content/aspect-driven layout rules over device-name breakpoints.
