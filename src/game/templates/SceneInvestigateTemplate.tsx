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
import { speakLabel } from "@/audio/labelSpeech";

export function SceneInvestigateTemplate({
  item,
  onRespond,
  onObserve,
  disabled,
  confirmLabel,
  presentation,
}: PuzzleTemplateProps) {
  /**
   * Multiple observations are supported whenever the authored content asks for
   * them. With no authored constraint the template stays single-selection, so
   * existing scene activities behave exactly as before.
   */
  const minDistinct = Math.max(1, item.selection?.minDistinct ?? 1);
  const maxSelections = item.selection?.maxSelections;
  const multi = minDistinct > 1 || (maxSelections !== undefined && maxSelections > 1);
  const [selected, setSelected] = React.useState<string[]>([]);

  React.useEffect(() => {
    setSelected([]);
  }, [item.id]);

  const scene = presentation?.scene;
  const hotspots = scene?.interactive ? scene.hotspots : [];

  const pick = (optionId: string) => {
    if (disabled) return;
    const already = selected.includes(optionId);
    let next: string[];
    if (!multi) {
      next = already ? [] : [optionId];
    } else if (already) {
      // Touching the same object again is not a new distinct observation; it
      // simply un-observes it.
      next = selected.filter((id) => id !== optionId);
    } else if (maxSelections !== undefined && selected.length >= maxSelections) {
      next = selected;
    } else {
      next = [...selected, optionId];
    }
    setSelected(next);

    if (!already && next.includes(optionId)) {
      const label =
        item.options.find((entry) => entry.id === optionId)?.label ??
        hotspots.find((entry) => entry.optionId === optionId)?.label;
      // Accessibility read-aloud of the visible object name. Not a hint and
      // never a submission (docs/ux/EMERGENT-READER-SUPPORT.md).
      if (label) speakLabel(label);
      // Presentation-only signal so the companion can react to WHAT was
      // touched. The most recent observation is FIRST, followed by the earlier
      // ones, so a consumer can react to the new object and still know how
      // many distinct observations exist.
      onObserve?.([optionId, ...selected.filter((id) => id !== optionId)]);
    }
  };

  const confirm = () => {
    if (disabled || selected.length < minDistinct) return;
    onRespond({ kind: "selection", optionIds: selected });
  };

  const canConfirm = selected.length >= minDistinct;
  const remaining = Math.max(0, minDistinct - selected.length);

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
            const isSelected = selected.includes(hotspot.optionId);
            const option = item.options.find((entry) => entry.id === hotspot.optionId);
            return (
              <button
                key={hotspot.optionId}
                type="button"
                disabled={disabled}
                aria-pressed={isSelected}
                aria-label={option?.label ?? hotspot.label}
                onClick={() => pick(hotspot.optionId)}
                className={`absolute rounded-full border-[3px] transition-transform duration-200 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--hope)] motion-reduce:transition-none ${
                  isSelected
                    ? "scene-observed border-[var(--ink)] bg-[var(--paper)]/10 shadow-[0_0_0_4px_var(--hope)]"
                    : "border-transparent hover:border-[var(--ink-soft)]"
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
            const isSelected = selected.includes(option.id);
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

      {multi ? (
        <p className="text-center text-sm text-ink-soft" role="status">
          {selected.length === 0
            ? "Toque em duas coisas que fazem parte deste ambiente."
            : remaining > 0
              ? "Toque em mais uma coisa que faz parte deste ambiente."
              : "Você já observou várias coisas. Pode mostrar."}
        </p>
      ) : null}

      <div className="flex justify-center">
        <button
          type="button"
          onClick={confirm}
          disabled={disabled || !canConfirm}
          className="min-h-14 rounded-full border-2 border-[var(--ink)] bg-[var(--hope)]/30 px-7 py-3 text-base font-semibold text-ink transition-transform duration-200 hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--hope)] disabled:opacity-50 motion-reduce:transition-none"
        >
          {confirmLabel ?? "Mostrar"}
        </button>
      </div>
    </div>
  );
}
