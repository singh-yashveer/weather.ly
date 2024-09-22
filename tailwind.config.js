/** @type {import('tailwindcss').Config} */

const theme = {
  primary: "#70778f",
  secondary: "#c7b8bf",
  accent: "#b19f9a",
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
      },
      colors: {
        primary: theme.primary,
        secondary: theme.secondary,
        accent: theme.accent,
      },
    },
  },
  plugins: [],
};
