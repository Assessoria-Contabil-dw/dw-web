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
        xs: '475px',
        ...defaultTheme.screens,
      },
      fontFamily: {
        montserrat: ['var(--font-montserrat)'],
        inter: ['var(--font-inter)'],
        lexend: ['var(--font-lexend)'],
      },
      colors: {
        primary: '#feea51',
        primaryHover: '#f9dd04',
        second: '#22C55E',
        secondHover: '#16A34A',
      },
      slate: {
        50: '#f8fafc',
        100: '#f1f5f9',
        200: '#e2e8f0',
        300: '#cbd5e1',
        400: '#94a3b8',
        500: '#64748b',
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
