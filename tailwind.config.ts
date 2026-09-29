import type { Config } from 'tailwindcss'
import animate from 'tailwindcss-animate'

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './lib/**/*.{ts,tsx}'],
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: '1.25rem', md: '2rem' },
      screens: { '2xl': '1200px' },
    },
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        serif: ['var(--font-serif)', 'Georgia', 'serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'monospace'],
      },
      colors: {
        // Design system PathoMind
        ink: {
          950: '#070B16', // noir médical — fond principal
          900: '#0B1224', // bleu nuit — sections alternées
          800: '#111A33', // surfaces
          700: '#1A2544', // bordures accentuées
        },
        brand: {
          50: '#F5F3FF',
          100: '#EDE9FE',
          200: '#DDD6FE',
          300: '#C4B5FD',
          400: '#A78BFA',
          500: '#8B5CF6',
          600: '#7C3AED', // violet PathoMind
          700: '#6D28D9',
          800: '#5B21B6',
        },
        accent: {
          300: '#67E8F9',
          400: '#22D3EE', // cyan — usage ponctuel
          500: '#06B6D4',
        },
        paper: '#F7F8FC',
        // Tokens shadcn/ui
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: { DEFAULT: 'hsl(var(--primary))', foreground: 'hsl(var(--primary-foreground))' },
        muted: { DEFAULT: 'hsl(var(--muted))', foreground: 'hsl(var(--muted-foreground))' },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      boxShadow: {
        glow: '0 0 0 1px rgba(167,139,250,.18), 0 20px 60px -20px rgba(124,58,237,.45)',
        product: '0 1px 2px rgba(7,11,22,.06), 0 30px 80px -24px rgba(7,11,22,.55)',
        soft: '0 1px 2px rgba(15,23,42,.04), 0 12px 32px -12px rgba(15,23,42,.12)',
      },
      keyframes: {
        'fade-up': {
          from: { opacity: '0', transform: 'translate3d(0,16px,0)' },
          to: { opacity: '1', transform: 'none' },
        },
        drift: {
          '0%, 100%': { transform: 'translate3d(0,0,0) scale(1)' },
          '50%': { transform: 'translate3d(2%, -3%, 0) scale(1.06)' },
        },
      },
      animation: {
        drift: 'drift 22s ease-in-out infinite',
        'fade-up': 'fade-up .7s cubic-bezier(.22,1,.36,1) both',
      },
    },
  },
  plugins: [animate],
}

export default config
