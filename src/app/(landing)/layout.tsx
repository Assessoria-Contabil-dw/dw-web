import React from 'react'
import { inter, montserrat } from '@/app/fonts'
import '@/app/globals.css'
import Footer from '@/components/public/Footer'
import Navbar from '@/components/public/Headers/Navbar'

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
  return (
    <html lang="en">
      <body
        className={`${inter.className} flex flex-col bg-gray-50`}
      >
        <Navbar />
        <main className='overflow-x-hidden'>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
