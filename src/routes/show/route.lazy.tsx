import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/show")({
  component: () => <div>Hello /show!</div>,
});
