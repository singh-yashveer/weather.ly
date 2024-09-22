/** @type {import('tailwindcss').Config} */

const theme = {
  primary: "#70778f",
  secondary: "#c7b8bf",
  accent: "#b19f9a",
  dark: "#0d151c",
  light: "#e3ebf2",
};
export default {
  content: ["index.html", "./src/**/*.{js,jsx,ts,tsx}", "main.tsx"],
  darkMode: "class",
  theme: {
    extend: {
      backgroundColor: {
        primary: theme.primary,
        secondary: theme.secondary,
        accent: theme.accent,
        dark: theme.dark,
        light: theme.light,
      },
      colors: {
        primary: theme.primary,
        secondary: theme.secondary,
        accent: theme.accent,
        dark: theme.dark,
        light: theme.light,
      },
    },
  },
  plugins: [],
};
