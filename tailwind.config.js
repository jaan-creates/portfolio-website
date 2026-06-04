/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#0D0D0F',
        'off-white': '#FAFAF9',
        accent: {
          purple: '#7F77DD',
          green: '#22C55E',
          orange: '#F97316',
        },
        muted: {
          DEFAULT: '#6B7280',
          dark: '#3F3F46',
          light: '#A1A1AA',
        },
        surface: {
          DEFAULT: '#131316',
          raised: '#1A1A1F',
          border: 'rgba(255,255,255,0.06)',
        },
      },
      fontFamily: {
        display: ['"Clash Display"', 'sans-serif'],
        sans: ['Satoshi', 'sans-serif'],
      },
      fontSize: {
        '7xl': ['4.5rem', { lineHeight: '1.05', letterSpacing: '-0.02em' }],
        '8xl': ['6rem', { lineHeight: '1.0', letterSpacing: '-0.03em' }],
        '9xl': ['8rem', { lineHeight: '0.95', letterSpacing: '-0.04em' }],
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease forwards',
        'slide-up': 'slideUp 0.8s ease forwards',
      },
      keyframes: {
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        slideUp: {
          from: { opacity: '0', transform: 'translateY(24px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};
