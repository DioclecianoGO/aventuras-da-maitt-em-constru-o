/**
 * World Board scene — an illustrated journey through one zone.
 * Spec: docs/ux/BOARDS.md, docs/worlds/MATHEMATICS-WORLD.md,
 *       docs/design/COLOR-RESTORATION.md
 *
 * The board is a place, not a level select: no cards, no rectangles, no
 * percentages. Slots are scenery objects along an illustrated route. All
 * progress values arrive already derived.
 */
import { Link } from "@tanstack/react-router";

import { InkDefs } from "@/assets/game/ink";
import { RestoreBloom, RestoreGroup } from "@/visual/RestoreGroup";
import { MaitteAvatar } from "@/visual/character/MaitteAvatar";
import { getAsset } from "@/visual/assetRegistry";
import { useHydrated } from "@/visual/motion";
import { getSlotVisual, getWorldVisual } from "@/visual/world-config";

export type BoardSlotView = {
  id: string;
  /** Neutral spatial anchor from the domain, in 0..100 board units. */
  anchor: { x: number; y: number };
  state: "locked" | "available" | "completed";
  isCurrent: boolean;
};

export function WorldBoardScene({
  worldId,
  slots,
  worldProgress,
  avatarProgress,
  currentSlotId,
}: {
  worldId: string;
  slots: BoardSlotView[];
  worldProgress: number;
  avatarProgress: number;
  currentSlotId: string | null;
}) {
  const hydrated = useHydrated();
  const visual = getWorldVisual(worldId);
  const { width, height } = visual.scene;

  const toScene = (anchor: { x: number; y: number }) => ({
    x: (anchor.x / 100) * width,
    y: (anchor.y / 100) * height,
  });

  const Color = getAsset(`${visual.sceneAssetKey}.color`);
  const Ink = getAsset(`${visual.sceneAssetKey}.ink`);
  const SlotObject = getAsset("object.slot");
  const FoldedMap = getAsset("object.folded-map");

  const current = slots.find((slot) => slot.id === currentSlotId) ?? slots[0];
  const avatarPoint = current
    ? toScene(current.anchor)
    : { x: width * 0.12, y: height * 0.82 };

  return (
    <div className="world-surface relative isolate h-full w-full overflow-hidden">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="world-settle h-full w-full"
        preserveAspectRatio="xMidYMid slice"
        role="img"
        aria-label={`${visual.displayName} — zona ${visual.zoneName}`}
      >
        <InkDefs prefix="bd" />
        <rect x="0" y="0" width={width} height={height} fill="var(--paper)" />

        <RestoreGroup
          id={`board-${worldId}`}
          kind="wipe"
          x={0}
          width={width}
          progress={worldProgress}
          extra={slots
            .filter((slot) => slot.state === "completed")
            .map((slot) => {
              const point = toScene(slot.anchor);
              return (
                <RestoreBloom
                  key={slot.id}
                  cx={point.x}
                  cy={point.y}
                  r={getSlotVisual(slot.id).bloomRadius ?? 280}
                />
              );
            })}
        >
          <Color />
        </RestoreGroup>

        <Ink prefix="bd" />

        {/* Illustrated route — a worn trail, never a progress bar. */}
        <path
          d={visual.routePath}
          fill="none"
          stroke="var(--ink-soft)"
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray="2 18"
          opacity="0.85"
        />

        {visual.landmarks.map((landmark) => {
          const Landmark = getAsset(landmark.assetKey);
          return (
            <g
              key={landmark.id}
              transform={`translate(${landmark.anchor.x} ${landmark.anchor.y}) scale(${landmark.scale ?? 1})`}
            >
              <title>{landmark.label}</title>
              <Landmark />
            </g>
          );
        })}

        {slots.map((slot) => {
          const point = toScene(slot.anchor);
          const slotVisual = getSlotVisual(slot.id);
          const offset = slotVisual.offset ?? { x: 0, y: 0 };
          return (
            <g key={slot.id} transform={`translate(${point.x + offset.x} ${point.y + offset.y})`}>
              <SlotObject kind={slotVisual.objectKind} state={slot.state} animated={hydrated} />
            </g>
          );
        })}

        <MaitteAvatar
          progress={avatarProgress}
          x={Math.max(110, avatarPoint.x - 116)}
          y={avatarPoint.y + 10}
          scale={0.66}
          animated={hydrated}
          title="Maittê na trilha"
        />

        <rect x="0" y="0" width={width} height={height} fill="url(#bd-vignette)" pointerEvents="none" />
      </svg>

      {/* Interaction layer */}
      <div className="pointer-events-none absolute inset-0">
        {slots.map((slot) => {
          const style = {
            left: `${slot.anchor.x}%`,
            top: `${slot.anchor.y}%`,
          };
          const slotVisual = getSlotVisual(slot.id);

          if (slot.state === "locked") {
            return (
              <span
                key={slot.id}
                aria-disabled="true"
                className="absolute block h-24 w-24 -translate-x-1/2 -translate-y-full"
                style={style}
                title={`${slotVisual.label} — ainda distante`}
              />
            );
          }

          return (
            <Link
              key={slot.id}
              to="/mundo/$worldId/desafio/$slotId"
              params={{ worldId, slotId: slot.id }}
              style={style}
              aria-label={
                slot.state === "completed"
                  ? `Voltar a ${slotVisual.label}`
                  : `Chegar até ${slotVisual.label}`
              }
              className="pointer-events-auto absolute flex h-28 w-28 -translate-x-1/2 -translate-y-full items-end justify-center rounded-full transition-transform duration-200 hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--hope)] motion-reduce:transition-none"
            >
              <span className="sr-only">{slotVisual.label}</span>
              {slot.isCurrent ? (
                <span
                  aria-hidden
                  className="mb-1 inline-block h-2.5 w-2.5 rounded-full bg-[var(--hope)]"
                />
              ) : null}
            </Link>
          );
        })}
      </div>

      {/* Diegetic navigation: the folded map is the way back to the Overworld. */}
      <Link
        to="/"
        aria-label="Abrir o mapa dobrado e voltar ao mundo"
        className="absolute bottom-5 left-5 flex items-center gap-3 rounded-2xl px-3 py-2 text-ink transition-transform duration-200 hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--hope)] motion-reduce:transition-none"
      >
        <svg viewBox="0 0 76 60" className="h-11 w-14" aria-hidden>
          <FoldedMap />
        </svg>
        <span className="text-sm font-semibold tracking-wide">Mapa</span>
      </Link>

      {/* Place name, written on the map itself. */}
      <div className="pointer-events-none absolute top-6 left-1/2 -translate-x-1/2 text-center">
        <p className="text-[clamp(1.1rem,2.4vw,1.9rem)] leading-tight font-semibold text-ink">
          {visual.zoneName}
        </p>
        <p className="text-[0.72rem] tracking-[0.28em] text-ink-soft uppercase">
          {visual.displayName}
        </p>
      </div>
    </div>
  );
}