import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: "#F7F6F2",
        surface: "#FFFFFF",
        ink: "#1B2028",
        "ink-soft": "#5B616D",
        primary: "#26456B",
        "primary-soft": "#E8EEF4",
        accent: "#C08A3E",
        "accent-soft": "#F5EBD9",
        line: "#E3E1D8",
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "serif"],
        body: ["var(--font-plex)", "sans-serif"],
      },
      maxWidth: {
        content: "1100px",
      },
    },
  },
  plugins: [],
};
export default config;
