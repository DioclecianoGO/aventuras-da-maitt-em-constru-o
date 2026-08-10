/**
 * Generic illustrated scene investigation.
 * Spec: docs/gameplay/PUZZLE-SYSTEM.md, docs/ux/CHALLENGE-STAGE.md, ADR-009
 *
 * The child inspects an illustrated scene and TOUCHES THE OBJECT ITSELF. Each
 * authored option resolves to a generous transparent hotspot supplied by the
 * presentation configuration; without that configuration the template falls
 * back to a plain labelled list, so the interaction contract never depends on
 * art being ready.
 *
 * It still emits the same generic `UserResponse { kind: "selection" }`. The
 * template has no idea which observation is meaningful; every option is
 * treated identically and no correctness lives in the scene component.
 */
import * as React from "react";

import type { PuzzleTemplateProps } from "@/game/templates/contract";

export function SceneInvestigateTemplate({
  item,
  onRespond,
  onObserve,
  disabled,
  confirmLabel,
  presentation,
}: PuzzleTemplateProps) {
  const [selected, setSelected] = React.useState<string | null>(null);

  React.useEffect(() => {
    setSelected(null);
  }, [item.id]);

  const scene = presentation?.scene;
  const hotspots = scene?.interactive ? scene.hotspots : [];

  const pick = (optionId: string) => {
    if (disabled) return;
    const next = selected === optionId ? null : optionId;
    setSelected(next);
    // Presentation-only signal so the companion can react to WHAT was touched.
    if (next) onObserve?.([next]);
  };

  const confirm = () => {
    if (disabled || !selected) return;
    onRespond({ kind: "selection", optionIds: [selected] });
  };

  return (
    <div className="flex flex-col gap-4">
      <p className="sr-only">{item.prompt}</p>

      {scene && hotspots.length > 0 ? (
        <div
          className="relative mx-auto w-full max-w-3xl overflow-hidden rounded-[2rem] border-2 border-[var(--ink)] shadow-[0_8px_0_var(--ink-soft)]"
          style={{ aspectRatio: `${scene.width} / ${scene.height}` }}
        >
          <svg
            viewBox={`0 0 ${scene.width} ${scene.height}`}
            className="absolute inset-0 h-full w-full"
            aria-hidden
            preserveAspectRatio="xMidYMid slice"
          >
            {scene.render()}
          </svg>

          {hotspots.map((hotspot) => {
            const isSelected = selected === hotspot.optionId;
            const option = item.options.find((entry) => entry.id === hotspot.optionId);
            return (
              <button
                key={hotspot.optionId}
                type="button"
                disabled={disabled}
                aria-pressed={isSelected}
                aria-label={option?.label ?? hotspot.label}
                onClick={() => pick(hotspot.optionId)}
                className={`absolute rounded-full border-2 transition-transform duration-200 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--hope)] motion-reduce:transition-none ${
                  isSelected
                    ? "scene-observed scale-105 border-[var(--ink)] bg-[var(--hope)]/25"
                    : "border-transparent hover:border-[var(--ink-soft)] hover:bg-[var(--paper)]/20"
                } disabled:pointer-events-none`}
                style={{
                  left: `${((hotspot.cx - hotspot.rx) / scene.width) * 100}%`,
                  top: `${((hotspot.cy - hotspot.ry) / scene.height) * 100}%`,
                  width: `${((hotspot.rx * 2) / scene.width) * 100}%`,
                  height: `${((hotspot.ry * 2) / scene.height) * 100}%`,
                }}
              >
                {isSelected ? (
                  <span
                    aria-hidden
                    className="absolute -top-3 -right-2 flex h-8 w-8 items-center justify-center rounded-full border-2 border-[var(--ink)] bg-[var(--paper)] text-base"
                  >
                    ✦
                  </span>
                ) : null}
              </button>
            );
          })}
        </div>
      ) : (
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3" aria-label="O que você observou">
          {item.options.map((option) => {
            const isSelected = selected === option.id;
            return (
              <li key={option.id}>
                <button
                  type="button"
                  disabled={disabled}
                  aria-pressed={isSelected}
                  onClick={() => pick(option.id)}
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
      )}

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
