import { Lexend, Montserrat } from 'next/font/google'

export const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
})

export const lexend = Lexend({
  subsets: ['latin'],
  variable: '--font-lexend',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
})

// export const titillium_web = Titillium_Web({
//   subsets: ['latin'],
//   variable: '--font-lexend',
//   weight: ['200', '300', '400', '600', '700', '900'],
// })
