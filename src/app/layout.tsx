import Providers from '../services/query.provider'
import './globals.css'
import { Montserrat } from 'next/font/google'
import React from 'react'
import ToastProvider from '@/services/toast.provider'
import Head from 'next/head'

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
})

export const metadata = {
  title: 'DW',
  description: 'Contabilidade para partidos políticos',
  icon: ['/favicon.icon'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  console.log('RootLayout')
  return (
    <html lang="en">
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body className={`${montserrat.variable} bg-gray-50 font-sans`}>
        <Providers>
          <ToastProvider>{children}</ToastProvider>
        </Providers>
      </body>
    </html>
  )
}
