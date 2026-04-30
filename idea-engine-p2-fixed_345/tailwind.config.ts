import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'Courier New', 'monospace'],
      },
      colors: {
        bg:            '#0A0A0B',
        surface:       '#111113',
        'surface-high':'#18181B',
        border:        '#27272A',
        accent:        '#10B981',
        'accent-muted':'#064E3B',
        muted:         '#A1A1AA',
        danger:        '#EF4444',
      },
    },
  },
  plugins: [],
};

export default config;
