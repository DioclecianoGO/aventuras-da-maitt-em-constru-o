/**
 * TECHNICAL PLACEHOLDER — not final gameplay, not curriculum.
 *
 * Exists to prove one thing: the tablet interaction path. It offers BOTH
 * pointer drag and tap-to-place, because tap-to-place is the accessible
 * fallback when drag is unreliable on touch (technical risk register R1).
 *
 * It emits an ordering UserResponse and knows nothing about correctness.
 */
import * as React from "react";
import type { PuzzleTemplateProps } from "@/game/templates/contract";
import { cn } from "@/lib/utils";

export function PlaceholderOrderTemplate({
  item,
  onRespond,
  disabled = false,
}: PuzzleTemplateProps) {
  const [order, setOrder] = React.useState(() => item.options.map((option) => option.id));
  const [selectedId, setSelectedId] = React.useState<string | null>(null);
  const dragIdRef = React.useRef<string | null>(null);

  React.useEffect(() => {
    setOrder(item.options.map((option) => option.id));
    setSelectedId(null);
  }, [item]);

  const labelOf = (id: string) =>
    item.options.find((option) => option.id === id)?.label ?? id;

  function move(sourceId: string, targetId: string) {
    if (sourceId === targetId) return;
    setOrder((current) => {
      const next = [...current];
      const from = next.indexOf(sourceId);
      const to = next.indexOf(targetId);
      if (from < 0 || to < 0) return current;
      next.splice(from, 1);
      next.splice(to, 0, sourceId);
      return next;
    });
  }

  /** Tap-to-place: first tap selects, second tap places. */
  function handleTap(id: string) {
    if (disabled) return;
    if (selectedId === null) {
      setSelectedId(id);
      return;
    }
    move(selectedId, id);
    setSelectedId(null);
  }

  return (
    <div className="flex flex-col gap-4">
      <p className="text-lg font-medium text-foreground">{item.prompt}</p>

      <ul className="flex flex-wrap gap-3" role="list">
        {order.map((id) => {
          const isSelected = selectedId === id;
          return (
            <li key={id}>
              <button
                type="button"
                disabled={disabled}
                draggable={!disabled}
                aria-pressed={isSelected}
                onClick={() => handleTap(id)}
                onDragStart={() => {
                  dragIdRef.current = id;
                }}
                onDragOver={(event) => event.preventDefault()}
                onDrop={(event) => {
                  event.preventDefault();
                  if (dragIdRef.current) move(dragIdRef.current, id);
                  dragIdRef.current = null;
                }}
                className={cn(
                  "min-h-16 min-w-16 rounded-xl border-2 px-5 py-3 text-xl font-semibold transition-colors",
                  "touch-manipulation select-none",
                  isSelected
                    ? "border-primary bg-primary/15 text-primary"
                    : "border-border bg-card text-card-foreground hover:border-primary/50",
                  disabled && "opacity-60",
                )}
              >
                {labelOf(id)}
              </button>
            </li>
          );
        })}
      </ul>

      <button
        type="button"
        disabled={disabled}
        onClick={() => onRespond({ kind: "ordering", orderedIds: order })}
        className="self-start rounded-xl bg-primary px-6 py-3 text-lg font-semibold text-primary-foreground disabled:opacity-60"
      >
        Confirmar
      </button>
    </div>
  );
}