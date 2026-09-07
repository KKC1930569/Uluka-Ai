/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        navy: {
          950: '#070a12',
          900: '#0B0F19',
          850: '#0F1523',
          800: '#141D30',
          750: '#19243C',
          700: '#1E2B47',
          600: '#2A3C63',
        },
        intel: {
          blue: '#38BDF8',
          cyan: '#06B6D4',
          accent: '#2563EB',
          highlight: '#0284C7',
          gold: '#F59E0B',
          warning: '#EAB308',
          danger: '#EF4444',
          success: '#10B981',
          muted: '#64748B',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['JetBrains Mono', 'Menlo', 'Monaco', 'Courier New', 'monospace']
      }
    },
  },
  plugins: [],
}
