import { useState } from "react";

export function useTheme() {
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.classList.toggle("dark-mode", newTheme === "dark");
  };

  return { theme, toggleTheme };
}
