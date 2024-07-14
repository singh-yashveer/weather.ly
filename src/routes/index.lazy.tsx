import { createLazyFileRoute } from "@tanstack/react-router";

import ThemeToggle from "../global/themeToggle";

export const Route = createLazyFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div>
      <header>
        <h1>React App with Tailwind CSS</h1>
      </header>
      <h3>Welcome Home!</h3>
      <ThemeToggle />
    </div>
  );
}
