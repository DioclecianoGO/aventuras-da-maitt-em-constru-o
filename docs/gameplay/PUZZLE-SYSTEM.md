# Puzzle System

**Status:** DECIDED architecture; individual templates are implemented progressively.

## Principle
Puzzles are reusable interaction templates fed by parametrized educational content. A workbook page is never itself a UI specification.

## Challenge library vision
The platform should be capable of progressively supporting:
- drag and drop;
- matching / connect image to word or concept;
- connect-the-dots;
- crossword;
- maze;
- memory;
- jigsaw/puzzle assembly;
- hangman/letter discovery where pedagogically appropriate;
- typing/writing;
- spoken response through microphone;
- syllable/word block assembly;
- scrambled letters/words;
- ordering/sequencing;
- selection/classification;
- dictated audio;
- letter and syllable sounds;
- animated story interactions;
- mathematical manipulatives and operation builders.

Not every template belongs to the Mathematics MVP. The list preserves the product direction for later subjects, especially literacy.

## Template contract
Each challenge instance should be able to reference:
- subject;
- curriculum skill;
- learning objective;
- content pack/item;
- puzzle template;
- difficulty;
- support level;
- learning mode (`discover`, `practice`, `challenge`);
- guide pet/character when applicable;
- Activity Slot;
- feedback rules;
- result/mastery evidence.

## Pedagogical safety
Visual tricks must not accidentally reveal answers. Assistance must not be counted as independent mastery. A template can be entertaining only if the targeted skill remains the actual cause of success.
