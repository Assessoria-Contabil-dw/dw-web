/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        // sans: 'var(--font-roboto)',
        alt: 'var(--font-montserrat)',
      },
      colors: {
        primary: '#DAFF02',
        primaryHover: '#D7F116',
        second: '#B2E500',
        secondHover: '#91D800',
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
