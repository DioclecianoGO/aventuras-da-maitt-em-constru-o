/**
 * TECHNICAL PLACEHOLDER — not final gameplay, not curriculum.
 *
 * Exists to prove one thing: the tablet interaction path. It offers BOTH
 * pointer drag and tap-to-place, because tap-to-place is the accessible
 * fallback when drag is unreliable on touch (technical risk register R1).
 *
 * Phase 1B change is PRESENTATION ONLY: the option buttons became carved
 * desert stones resting in sand sockets, and the generic `Pronto` submit
 * became a diegetic confirmation seal. The template still emits exactly one
 * ordering UserResponse per confirmation and still knows nothing about
 * correctness. Labels come from item data; the art encodes no answer.
 *
 * Confirmation, not auto-evaluation: every permutation is technically
 * "complete", so evaluating each swap would turn touch slips and intermediate
 * arrangements into educational evidence. The seal stays inert until the child
 * has actually moved a stone, which also prevents accidental first-tap submits.
 *
 * Phase 1B.1: each stone now has a handcrafted silhouette that belongs to the
 * OPTION, not to the position. The identity map is built once per item from the
 * authored option order and looked up by option id, so dragging a stone never
 * changes its body (docs/design/PHASE-1B-1-VISUAL-POLISH.md, Correction 3).
 */
import * as React from "react";

import { playSfx } from "@/audio/sfx";
import {
  ConfirmSealArt,
  OrderStoneArt,
  SandSocketArt,
} from "@/assets/game/objects/DesertPuzzleArt";
import type { PuzzleTemplateProps } from "@/game/templates/contract";
import { buildStoneIdentities, getStoneIdentity } from "@/visual/puzzle/stoneIdentity";
import { cn } from "@/lib/utils";

export function PlaceholderOrderTemplate({
  item,
  onRespond,
  disabled = false,
  confirmLabel = "Confirmar",
}: PuzzleTemplateProps) {
  const [order, setOrder] = React.useState(() => item.options.map((option) => option.id));
  const [selectedId, setSelectedId] = React.useState<string | null>(null);
  const [touched, setTouched] = React.useState(false);
  const [settling, setSettling] = React.useState<string | null>(null);
  const dragIdRef = React.useRef<string | null>(null);

  /**
   * Stable presentation identity, seeded by the AUTHORED option order — never
   * by the current position, the label or the accepted answer.
   */
  const stoneIdentities = React.useMemo(
    () => buildStoneIdentities(item.options.map((option) => option.id)),
    [item.options],
  );

  /**
   * Phase 1B.1a: reset ONLY when the authored item actually changes. Keying
   * this on the item object reference made every parent re-render (including
   * the one caused by a correct attempt) reset the solved arrangement.
   */
  const itemId = item.id;
  React.useEffect(() => {
    setOrder(item.options.map((option) => option.id));
    setSelectedId(null);
    setTouched(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemId]);

  const labelOf = (id: string) => item.options.find((option) => option.id === id)?.label ?? id;

  function move(sourceId: string, targetId: string) {
    if (disabled || sourceId === targetId) return;
    setOrder((current) => {
      const next = [...current];
      const from = next.indexOf(sourceId);
      const to = next.indexOf(targetId);
      if (from < 0 || to < 0) return current;
      next.splice(from, 1);
      next.splice(to, 0, sourceId);
      return next;
    });
    setTouched(true);
    setSettling(sourceId);
    playSfx("place");
    window.setTimeout(() => setSettling(null), 340);
  }

  /** Tap-to-place: first tap lifts a stone, second tap swaps it into place. */
  function handleTap(id: string) {
    if (disabled) return;
    if (selectedId === null) {
      setSelectedId(id);
      playSfx("select");
      return;
    }
    if (selectedId === id) {
      setSelectedId(null);
      return;
    }
    move(selectedId, id);
    setSelectedId(null);
  }

  return (
    <div className="flex w-full flex-col items-center gap-5">
      {/* The visible instruction lives on the stage caption plate; this keeps
          the same sentence available to assistive technology. */}
      <p className="sr-only">{item.prompt}</p>

      <ul className="flex flex-wrap items-end justify-center gap-2 sm:gap-4" role="list">
        {order.map((id, index) => {
          const isSelected = selectedId === id;
          return (
            <li key={id}>
              <button
                type="button"
                disabled={disabled}
                draggable={!disabled}
                aria-pressed={isSelected}
                aria-label={`Pedra ${labelOf(id)}, posição ${index + 1} de ${order.length}`}
                onClick={() => handleTap(id)}
                onDragStart={() => {
                  dragIdRef.current = id;
                  setSelectedId(id);
                }}
                onDragEnd={() => setSelectedId(null)}
                onDragOver={(event) => event.preventDefault()}
                onDrop={(event) => {
                  event.preventDefault();
                  if (disabled) return;
                  if (dragIdRef.current) move(dragIdRef.current, id);
                  dragIdRef.current = null;
                  setSelectedId(null);
                }}
                className={cn(
                  "touch-manipulation rounded-3xl p-1 transition-transform duration-200 select-none",
                  "focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-[var(--hope)]",
                  "motion-reduce:transition-none",
                  isSelected ? "-translate-y-2" : "hover:-translate-y-1",
                  disabled && "opacity-60",
                )}
              >
                <svg
                  viewBox="-60 -86 120 116"
                  className="h-24 w-20 sm:h-28 sm:w-24"
                  aria-hidden
                >
                  <g transform="translate(0 18)">
                    <SandSocketArt index={index} />
                  </g>
                  <g
                    className={
                      settling === id ? "stone-settle" : isSelected ? "stone-lift" : undefined
                    }
                  >
                  <OrderStoneArt
                    label={labelOf(id)}
                    shape={getStoneIdentity(stoneIdentities, id).shape}
                    detail={getStoneIdentity(stoneIdentities, id).detail}
                    tilt={getStoneIdentity(stoneIdentities, id).tilt}
                    selected={isSelected}
                  />
                  </g>
                </svg>
              </button>
            </li>
          );
        })}
      </ul>

      {/* Diegetic confirmation: a carved hand-print seal, not a form button. */}
      <button
        type="button"
        disabled={disabled || !touched}
        aria-label={confirmLabel}
        onClick={() => {
          if (disabled || !touched) return;
          onRespond({ kind: "ordering", orderedIds: order });
        }}
        className={cn(
          "flex items-center gap-3 rounded-full px-3 py-2 text-ink transition-transform duration-200",
          "focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-[var(--hope)]",
          "motion-reduce:transition-none",
          touched ? "hover:scale-105" : "opacity-45",
        )}
      >
        <svg viewBox="-52 -52 104 104" className="h-16 w-16" aria-hidden>
          <ConfirmSealArt ready={touched && !disabled} />
        </svg>
        <span className="text-base font-semibold">{confirmLabel}</span>
      </button>
    </div>
  );
}