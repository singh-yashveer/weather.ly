/** @type {import('tailwindcss').Config} */

const theme = {
  primary: "#70778f",
  secondary: "#c7b8bf",
  accent: "#ec5a38",
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
      animation: {
        "fade-in": "fadeIn 0.5s ease-in-out",
        "slide-up": "slideUp 0.3s ease-out",
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(10px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
      },
      boxShadow: {
        glass: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
        "glass-dark": "0 8px 32px 0 rgba(0, 0, 0, 0.37)",
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [],
};
