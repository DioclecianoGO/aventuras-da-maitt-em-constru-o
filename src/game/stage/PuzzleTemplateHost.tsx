/**
 * PuzzleTemplateHost — the seam between the Challenge Stage and templates.
 * Spec: docs/technical/ARCHITECTURE.md, docs/adr/ADR-009
 *
 * It resolves the template by id, feeds it neutral item data, receives the
 * UserResponse and hands it to the evaluation pipeline. The template itself
 * stays unaware of skills, packs, answers and game state.
 */
import * as React from "react";
import type { Activity, ActivitySlot, ContentPack, PackItem } from "@/game/domain/schemas";
import type { AttemptResult, UserResponse } from "@/game/domain/responses";
import { resolveAttempt } from "@/game/evaluation/orchestrator";
import { getTemplate } from "@/game/registries";

export function PuzzleTemplateHost({
  activity,
  slot,
  pack,
  item,
  onAttempt,
  disabled,
  confirmLabel,
}: {
  activity: Activity;
  slot: ActivitySlot;
  pack: ContentPack;
  item: PackItem;
  onAttempt(attempt: AttemptResult): void;
  disabled?: boolean;
  /** Presentation copy passed through from narration config. Never content. */
  confirmLabel?: string;
}) {
  const [supportUsed, setSupportUsed] = React.useState(false);

  React.useEffect(() => {
    setSupportUsed(false);
  }, [item.id]);

  const definition = getTemplate(activity.templateId);

  /**
   * Phase 1B.1a: the template item view is memoized on the AUTHORED item
   * identity. Previously a fresh wrapper object was allocated on every render,
   * so any orchestration re-render (attempt state, narration, restoration)
   * looked like a brand-new authored item and reset the template's local
   * response state — wiping the child's solved arrangement.
   */
  const itemView = React.useMemo(
    () => ({
      id: item.id,
      prompt: item.prompt,
      options: item.options,
      targets: item.targets,
      parts: item.parts,
    }),
    [item.id, item.prompt, item.options, item.targets, item.parts],
  );

  const handleRespond = React.useCallback(
    (response: UserResponse) => {
      // Presentation guard only: a frozen stage must not emit a second attempt.
      if (disabled) return;
      onAttempt(resolveAttempt({ activity, slot, pack, item, response, supportUsed }));
    },
    [activity, slot, pack, item, supportUsed, onAttempt, disabled],
  );

  if (!definition) {
    return (
      <p className="rounded-lg border border-destructive/40 bg-destructive/10 p-4 text-sm">
        Template “{activity.templateId}” não está registrado.
      </p>
    );
  }

  const Template = definition.component;

  return (
    <Template
      item={itemView}
      onRespond={handleRespond}
      onSupportUsed={() => setSupportUsed(true)}
      {...(confirmLabel === undefined ? {} : { confirmLabel })}
      {...(disabled === undefined ? {} : { disabled })}
    />
  );
}
