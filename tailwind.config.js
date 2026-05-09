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
          DEFAULT: '#060d1a',
          2: '#1a2540',
          3: '#2d3f60',
        },
        blue: {
          DEFAULT: '#1246a8',
          2: '#1a5cd4',
          3: '#3a7ff5',
        },
        sky: '#6baef8',
        ice: '#d6e8ff',
        frost: '#eef4ff',
        offwhite: '#f7f9fc',
        border: '#dce4f0',
        muted: '#7a8fae',
        text: '#2a3550',
      },
      letterSpacing: {
        widest2: '.18em',
      },
      animation: {
        breathe: 'breathe 4s ease-in-out infinite',
        scan: 'scan 3s linear infinite',
        scanpulse: 'scanpulse 3s ease-in-out infinite',
      },
      keyframes: {
        breathe: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.04)' },
        },
        scan: {
          from: { top: '0%' },
          to: { top: '100%' },
        },
        scanpulse: {
          '0%, 100%': { boxShadow: '0 0 0 4px rgba(58,127,245,0.1)' },
          '50%': { boxShadow: '0 0 0 8px rgba(58,127,245,0.05)' },
        },
      },
    },
  },
  plugins: [],
}
