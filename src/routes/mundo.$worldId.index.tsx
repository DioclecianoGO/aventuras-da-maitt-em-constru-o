import { createFileRoute } from "@tanstack/react-router";

/** No overlay open: the board layout alone is the view. */
export const Route = createFileRoute("/mundo/$worldId/")({
  component: () => null,
});