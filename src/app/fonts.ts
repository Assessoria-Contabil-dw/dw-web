import { Inter, Lexend, Montserrat } from 'next/font/google'

export const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
})

export const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-mono',
})

export const lexend = Lexend({
  subsets: ['latin'],
  variable: '--font-serif',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
})
