/**
 * Attached read-aloud affordance.
 * Spec: docs/ux/EMERGENT-READER-SUPPORT.md ("Interaction behavior")
 *
 * Used when the primary tap on an element already has another semantic action
 * (placing a card, choosing a category) and adding speech to that tap would be
 * ambiguous. Pressing it ONLY speaks the visible text: it never moves an item,
 * never selects, never submits and never counts as a hint.
 *
 * Touch-first: it is a real button with a tablet-sized hit area. Hover is not
 * required anywhere.
 */
import * as React from "react";

import { speakLabel } from "@/audio/labelSpeech";

export function SpeakerButton({
  text,
  locale,
  audioKey,
  disabled,
  className,
}: {
  text: string;
  locale?: string;
  audioKey?: string;
  disabled?: boolean;
  className?: string;
}) {
  const speak = (event: React.MouseEvent) => {
    // The parent may be a placement target or a choice; listening must never
    // trigger that action.
    event.preventDefault();
    event.stopPropagation();
    speakLabel({ text, ...(locale ? { locale } : {}), ...(audioKey ? { audioKey } : {}) });
  };

  return (
    <button
      type="button"
      onClick={speak}
      disabled={disabled}
      data-read-aloud="true"
      aria-label={`Ouvir: ${text}`}
      className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-[var(--ink)] bg-[var(--paper)] text-lg text-ink transition-transform duration-200 hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--hope)] disabled:opacity-50 motion-reduce:transition-none ${className ?? ""}`}
    >
      <span aria-hidden>🔊</span>
    </button>
  );
}
