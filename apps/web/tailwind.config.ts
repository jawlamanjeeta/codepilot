import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        void: "var(--bg-void)",
        panel: "var(--bg-panel)",
        "panel-raised": "var(--bg-panel-raised)",
        line: "var(--line)",
        "text-primary": "var(--text-primary)",
        "text-secondary": "var(--text-secondary)",
        accepted: "var(--accepted)",
        wrong: "var(--wrong)",
        pending: "var(--pending)",
        signal: "var(--signal)",
      },
      fontFamily: {
        display: ["var(--font-display)"],
        body: ["var(--font-body)"],
        mono: ["var(--font-mono)"],
      },
      borderRadius: {
        sm: "var(--radius-sm)",
        md: "var(--radius-md)",
        none: "var(--radius-full)",
      },
      maxWidth: {
        shell: "var(--max-width)",
      },
      transitionTimingFunction: {
        "expo-out": "var(--ease-out-expo)",
        press: "var(--ease-press)",
      },
    },
  },
  plugins: [],
};

export default config;