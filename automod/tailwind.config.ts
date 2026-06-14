import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg:           '#0C0C0E',
        surface:      '#141416',
        'surface-hi': '#1C1C1F',
        border:       '#2A2A2E',
        muted:        '#6B6B72',
        accent:       '#F97316',
        'accent-dim': '#7C3810',
        danger:       '#EF4444',
        success:      '#22C55E',
      },
      fontFamily: {
        sans:  ['Inter', 'system-ui', 'sans-serif'],
        mono:  ['JetBrains Mono', 'monospace'],
      },
    },
  },
  plugins: [],
};
export default config;
