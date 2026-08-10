 * When the presentation configuration supplies a scene, it is rendered above
 * the choices as VISIBLE EVIDENCE so the child can reason from what is on
 * screen instead of remembering a previous screen. The scene is scenery only.
 */
/**
 * Generic multi-part interaction (e.g. conclusion + supporting observation).
 * Spec: ADR-009 (template emits raw response), ADR-010 (generic composition).
 *
 * The template renders one row per authored part and emits the raw
 * `UserResponse { kind: "composition" }`. Part ids are opaque authored strings:
 * this component does not know what a "conclusion" or an "evidence" is, and it
 * never judges whether the chosen pair holds together.
 */
import * as React from "react";

import type { PuzzleTemplateProps } from "@/game/templates/contract";

export function CompositionTemplate({
  item,
  onRespond,
  disabled,
  confirmLabel,
  presentation,
}: PuzzleTemplateProps) {
  const [chosen, setChosen] = React.useState<Record<string, string | undefined>>({});

  React.useEffect(() => {
    setChosen({});
  }, [item.id]);

  const complete = item.parts.every((part) => chosen[part.id]);

  const confirm = () => {
    if (disabled || !complete) return;
    onRespond({
      kind: "composition",
      parts: item.parts.map((part) => ({
        partId: part.id,
        targetId: chosen[part.id] as string,
      })),
    });
  };

  return (
    <div className="flex flex-col gap-4">
      <p className="sr-only">{item.prompt}</p>

      {presentation?.scene ? (
        <div
          className="relative mx-auto w-full max-w-2xl overflow-hidden rounded-[2rem] border-2 border-[var(--ink)] shadow-[0_6px_0_var(--ink-soft)]"
          style={{ aspectRatio: `${presentation.scene.width} / ${presentation.scene.height}` }}
        >
          <svg
            viewBox={`0 0 ${presentation.scene.width} ${presentation.scene.height}`}
            className="absolute inset-0 h-full w-full"
            role="img"
            aria-label="O ambiente observado"
            preserveAspectRatio="xMidYMid slice"
          >
            {presentation.scene.render()}
          </svg>
        </div>
      ) : null}

      {item.parts.map((part) => (
        <fieldset key={part.id} className="rounded-3xl border-2 border-[var(--ink)] bg-[var(--paper)]/80 p-3">
          <legend className="px-2 text-sm font-semibold tracking-wide text-ink uppercase">
            {part.label}
          </legend>
          <ul className="flex flex-col gap-2 sm:flex-row sm:flex-wrap">
            {item.options
              .filter((option) => option.partId === part.id)
              .map((option) => {
                const selected = chosen[part.id] === option.id;
                return (
                  <li key={option.id} className="sm:flex-1">
                    <button
                      type="button"
                      disabled={disabled}
                      aria-pressed={selected}
                      onClick={() => setChosen((prev) => ({ ...prev, [part.id]: option.id }))}
                      className={`min-h-14 w-full rounded-2xl border-2 border-[var(--ink)] px-4 py-3 text-left text-base font-medium text-ink transition-transform duration-200 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--hope)] motion-reduce:transition-none ${
                        selected
                          ? "bg-[var(--hope)]/25 shadow-[0_5px_0_var(--ink-soft)]"
                          : "bg-[var(--paper-deep)] hover:-translate-y-0.5"
                      } disabled:opacity-60`}
                    >
                      <span aria-hidden className="mr-2 inline-block">
                        {selected ? "◉" : "○"}
                      </span>
                      {option.label}
                    </button>
                  </li>
                );
              })}
          </ul>
        </fieldset>
      ))}

      <div className="flex justify-center">
        <button
          type="button"
          onClick={confirm}
          disabled={disabled || !complete}
          className="min-h-14 rounded-full border-2 border-[var(--ink)] bg-[var(--hope)]/30 px-7 py-3 text-base font-semibold text-ink transition-transform duration-200 hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--hope)] disabled:opacity-50 motion-reduce:transition-none"
        >
          {confirmLabel ?? "Mostrar"}
        </button>
      </div>
    </div>
  );
}