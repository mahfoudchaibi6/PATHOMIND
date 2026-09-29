/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['Sora', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      colors: {
        ink: {
          DEFAULT: '#080d1a',
          2: '#1a2540',
          3: '#2d3f60',
        },
        blue: {
          DEFAULT: '#1246a8',
          2: '#1a5cd4',
          3: '#3a7ff5',
        },
        purple: {
          DEFAULT: '#4c1d95',
          2: '#6d28d9',
          3: '#7c3aed',
          4: '#a78bfa',
          5: '#c4b5fd',
        },
        sky: '#a78bfa',
        ice: '#ede9fe',
        frost: '#f5f3ff',
        offwhite: '#f7f9fc',
        border: '#dce4f0',
        muted: '#7a8fae',
        text: '#2a3550',
      },
    },
  },
  plugins: [],
}
