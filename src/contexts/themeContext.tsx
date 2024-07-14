import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

import { Theme, ThemeVariant } from "../types/theme";
import StorageUtil from "../utils/storageUtils";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [theme, setTheme] = useState<Theme>(ThemeVariant.Light);

  useEffect(() => {
    const savedTheme = StorageUtil.getItem("theme") as Theme;
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.toggle(
        "dark-mode",
        savedTheme === "dark"
      );
    }
  }, []);

  const toggleTheme = () => {
    const newTheme =
      theme === ThemeVariant.Light ? ThemeVariant.Dark : ThemeVariant.Light;
    setTheme(newTheme);
    StorageUtil.setItem("theme", newTheme);
    document.documentElement.classList.toggle(
      "dark-mode",
      newTheme === ThemeVariant.Dark
    );
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
