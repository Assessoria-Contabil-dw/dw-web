/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      screens: {
        'xs': '475px',
        ...defaultTheme.screens,
      },
      fontFamily: {
        montserrat: 'var(--font-montserrat)',
        inter: 'var(--font-inter)',
        lexend: 'var(--font-lexend)',
        alt: 'var(--font-montserrat)',
      },
      colors: {
        primary: '#feea51',
        primaryHover: '#f9dd04',
        second: '#01eaa0',
        secondHover: '#05be84',
      },
      slate: {
        50: '#F8FAFC',
        100: '#F1F5F9',
        200: '#E2E8F0',
        300: '#CBD5E1',
        400: '#94A3B8',
        500: '#64748B',
        600: '#475569',
        700: '#334155',
        800: '#1E293B',
        900: '#0F172A',
      },
      yellow: '#f6e909',
      red: '#ef4444',
      orange: '#ffb560',
      blue: '#38bdf8',
      green: {
        400: '#4ade80',
        800: '#009037',
      },
    },
  },
  plugins: [],
}
