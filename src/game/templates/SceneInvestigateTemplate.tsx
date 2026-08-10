/**
 * Generic illustrated scene investigation.
 * Spec: docs/gameplay/PUZZLE-SYSTEM.md, ADR-009
 *
 * The child inspects a scene and taps what they noticed. Emits
 * `UserResponse { kind: "selection" }`. The template has no idea which
 * observation is meaningful; every option is treated identically.
 *
 * Touch areas are deliberately generous: no pixel-perfect hunting, because a
 * missed tap would otherwise become false pedagogical evidence.
 */
import * as React from "react";

import type { PuzzleTemplateProps } from "@/game/templates/contract";

export function SceneInvestigateTemplate({
  item,
  onRespond,
  disabled,
  confirmLabel,
}: PuzzleTemplateProps) {
  const [selected, setSelected] = React.useState<string | null>(null);

  React.useEffect(() => {
    setSelected(null);
  }, [item.id]);

  const confirm = () => {
    if (disabled || !selected) return;
    onRespond({ kind: "selection", optionIds: [selected] });
  };

  return (
    <div className="flex flex-col gap-4">
      <p className="sr-only">{item.prompt}</p>

      <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3" aria-label="O que você observou">
        {item.options.map((option) => {
          const isSelected = selected === option.id;
          return (
            <li key={option.id}>
              <button
                type="button"
                disabled={disabled}
                aria-pressed={isSelected}
                onClick={() => setSelected(isSelected ? null : option.id)}
                className={`flex min-h-24 w-full items-end rounded-3xl border-2 border-[var(--ink)] px-4 py-3 text-left text-base font-semibold text-ink transition-transform duration-200 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--hope)] motion-reduce:transition-none ${
                  isSelected
                    ? "-translate-y-1 bg-[var(--hope)]/25 shadow-[0_6px_0_var(--ink-soft)]"
                    : "bg-[var(--paper-deep)] hover:-translate-y-0.5"
                } disabled:opacity-60`}
              >
                <span className="flex items-center gap-2">
                  <span aria-hidden className="text-lg">
                    {isSelected ? "◉" : "○"}
                  </span>
                  {option.label}
                </span>
              </button>
            </li>
          );
        })}
      </ul>

      <div className="flex justify-center">
        <button
          type="button"
          onClick={confirm}
          disabled={disabled || !selected}
          className="min-h-14 rounded-full border-2 border-[var(--ink)] bg-[var(--hope)]/30 px-7 py-3 text-base font-semibold text-ink transition-transform duration-200 hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--hope)] disabled:opacity-50 motion-reduce:transition-none"
        >
          {confirmLabel ?? "Mostrar"}
        </button>
      </div>
    </div>
  );
}