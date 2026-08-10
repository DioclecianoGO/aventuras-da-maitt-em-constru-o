/**
 * Generic placement interaction (group sorting / pair matching).
 * Spec: docs/gameplay/PUZZLE-SYSTEM.md, ADR-009, ADR-010
 *
 * Interaction ONLY. It knows items, targets and where the child put things.
 * It never knows categories, biology, skills or whether an arrangement is
 * right. It emits `UserResponse { kind: "placement" }` and nothing else.
 *
 * Tablet rules: drag is available, and every drag has an equivalent two-tap
 * fallback (tap the card, then tap the destination) so imprecise pointers can
 * never manufacture a wrong attempt.
 */
import * as React from "react";

import type { PuzzleTemplateProps } from "@/game/templates/contract";

type Placed = Record<string, string | undefined>;

export function PlacementTemplate({
  item,
  onRespond,
  disabled,
  confirmLabel,
  variant = "groups",
}: PuzzleTemplateProps & { variant?: "groups" | "pairs" }) {
  const [placed, setPlaced] = React.useState<Placed>({});
  const [selectedId, setSelectedId] = React.useState<string | null>(null);

  // Reset on AUTHORED item identity only (Phase 1B.1a): an orchestration
  // re-render must never wipe the child's arrangement.
  React.useEffect(() => {
    setPlaced({});
    setSelectedId(null);
  }, [item.id]);

  const place = React.useCallback(
    (itemId: string, targetId: string) => {
      if (disabled) return;
      setPlaced((prev) => ({ ...prev, [itemId]: targetId }));
      setSelectedId(null);
    },
    [disabled],
  );

  const unplace = (itemId: string) => {
    if (disabled) return;
    setPlaced((prev) => ({ ...prev, [itemId]: undefined }));
  };

  const pending = item.options.filter((option) => !placed[option.id]);
  const allPlaced = pending.length === 0 && item.options.length > 0;

  const confirm = () => {
    if (disabled || !allPlaced) return;
    onRespond({
      kind: "placement",
      placements: item.options.map((option) => ({
        itemId: option.id,
        targetId: placed[option.id] as string,
      })),
    });
  };

  return (
    <div className="flex flex-col gap-4">
      <p className="sr-only">{item.prompt}</p>

      {/* Cards still to be placed */}
      <ul
        className="flex flex-wrap items-center justify-center gap-3"
        aria-label="Cartões para colocar"
      >
        {pending.map((option) => {
          const selected = selectedId === option.id;
          return (
            <li key={option.id}>
              <button
                type="button"
                draggable={!disabled}
                onDragStart={(event) => event.dataTransfer.setData("text/plain", option.id)}
                onClick={() => setSelectedId(selected ? null : option.id)}
                disabled={disabled}
                aria-pressed={selected}
                className={`min-h-14 min-w-32 rounded-2xl border-2 border-[var(--ink)] px-4 py-3 text-base font-semibold text-ink transition-transform duration-200 motion-reduce:transition-none ${
                  selected
                    ? "-translate-y-1 bg-[var(--hope)]/25 shadow-[0_6px_0_var(--ink-soft)]"
                    : "bg-[var(--paper-deep)] hover:-translate-y-0.5"
                } disabled:opacity-60`}
              >
                {option.label}
              </button>
            </li>
          );
        })}
        {pending.length === 0 ? (
          <li className="text-sm text-ink-soft">Tudo colocado. Confira antes de mostrar.</li>
        ) : null}
      </ul>

      {/* Destinations */}
      <div
        className={`grid gap-3 ${variant === "pairs" ? "sm:grid-cols-1" : "sm:grid-cols-2"}`}
        role="group"
        aria-label="Lugares para colocar os cartões"
      >
        {item.targets.map((target) => {
          const contents = item.options.filter((option) => placed[option.id] === target.id);
          return (
            <div
              key={target.id}
              onDragOver={(event) => event.preventDefault()}
              onDrop={(event) => {
                event.preventDefault();
                const dragged = event.dataTransfer.getData("text/plain");
                if (dragged) place(dragged, target.id);
              }}
              className="rounded-3xl border-2 border-dashed border-[var(--ink-soft)] bg-[var(--paper)]/70 p-3"
            >
              <button
                type="button"
                onClick={() => selectedId && place(selectedId, target.id)}
                disabled={disabled || !selectedId}
                className="min-h-12 w-full rounded-2xl px-3 py-2 text-left text-sm font-semibold tracking-wide text-ink uppercase focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--hope)] disabled:cursor-default"
                aria-label={`Colocar aqui: ${target.label}`}
              >
                {target.label}
              </button>
              <ul className="mt-2 flex min-h-14 flex-wrap gap-2">
                {contents.map((option) => (
                  <li key={option.id}>
                    <button
                      type="button"
                      onClick={() => unplace(option.id)}
                      disabled={disabled}
                      className="min-h-12 rounded-2xl border-2 border-[var(--ink)] bg-[var(--paper-deep)] px-3 py-2 text-base font-semibold text-ink disabled:opacity-70"
                      aria-label={`Tirar ${option.label} de ${target.label}`}
                    >
                      {option.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>

      <div className="flex justify-center">
        <button
          type="button"
          onClick={confirm}
          disabled={disabled || !allPlaced}
          className="min-h-14 rounded-full border-2 border-[var(--ink)] bg-[var(--hope)]/30 px-7 py-3 text-base font-semibold text-ink transition-transform duration-200 hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--hope)] disabled:opacity-50 motion-reduce:transition-none"
        >
          {confirmLabel ?? "Mostrar"}
        </button>
      </div>
    </div>
  );
}

export function GroupSortTemplate(props: PuzzleTemplateProps) {
  return <PlacementTemplate {...props} variant="groups" />;
}

export function PairMatchTemplate(props: PuzzleTemplateProps) {
  return <PlacementTemplate {...props} variant="pairs" />;
}