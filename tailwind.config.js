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
        sans: 'var(--font-roboto)',
        alt: 'var(--font-montserrat)',
      },
      colors: {
        primary: '#50cd89',
        secundary: '#00b2ff',

        'primary-hover': '#1e3a8a',
        'secondary-hover': '#ea580c',
        white: '#ffffff',
      },
      gray: {
        100: '#f8f9fc',
        200: '#f1f3f9',
        300: '#dee3ed',
        400: '#c2c9d6',
        500: '#8f96a3',
        600: '#5e636e',
        700: '#2f3237',
        800: '#1d1e20',
        900: '#111213',
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
