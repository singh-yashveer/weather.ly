import { createLazyFileRoute } from "@tanstack/react-router";

import { useTheme } from "../contexts/useTheme";

export const Route = createLazyFileRoute("/")({
  component: Index,
});

function Index() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className={`App ${theme}`}>
      <header className="App-header">
        <h1>React App with Tailwind CSS</h1>
        <button className="btn-toggle" onClick={toggleTheme}>
          Toggle {theme === "light" ? "Dark" : "Light"} Mode
        </button>
      </header>
      <h3>Welcome Home!</h3>
    </div>
  );
}
