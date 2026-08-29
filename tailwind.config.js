/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          950: '#05070a',
          900: '#080b10',
          800: '#0c1118',
          700: '#121924',
          600: '#1b2533',
          500: '#2a3a4d',
        },
        ember: {
          50: '#fff7ed',
          100: '#ffedd5',
          300: '#fdba74',
          400: '#fb923c',
          500: '#f97316',
          600: '#ea580c',
        },
        aurora: {
          300: '#5eead4',
          400: '#2dd4bf',
          500: '#14b8a6',
          600: '#0d9488',
        },
        signal: {
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
        },
        success: '#34d399',
        warning: '#fbbf24',
        error: '#f87171',
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
        sans: ['"Inter"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
        serif: ['"Fraunces"', 'Georgia', 'serif'],
      },
      letterSpacing: {
        ultra: '0.35em',
        '2xl': '0.1em',
      },
      animation: {
        'fade-up': 'fadeUp 1s cubic-bezier(0.16,1,0.3,1) forwards',
        'fade-in': 'fadeIn 1.2s ease forwards',
        'grain': 'grain 8s steps(10) infinite',
        'marquee': 'marquee 40s linear infinite',
        'pulse-slow': 'pulseSlow 4s ease-in-out infinite',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(28px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        grain: {
          '0%,100%': { transform: 'translate(0,0)' },
          '10%': { transform: 'translate(-5%,-10%)' },
          '30%': { transform: 'translate(3%,-15%)' },
          '50%': { transform: 'translate(-8%,5%)' },
          '70%': { transform: 'translate(5%,12%)' },
          '90%': { transform: 'translate(-3%,8%)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        pulseSlow: {
          '0%,100%': { opacity: '0.4' },
          '50%': { opacity: '0.9' },
        },
      },
    },
  },
  plugins: [],
};
