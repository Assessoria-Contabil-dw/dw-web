import React from 'react'
import ToastProvider from '@/provider/toast.provider'
import Providers from '@/provider/query.provider'
import { inter, montserrat } from '@/app/fonts'
import '@/app/(public)/style.css'
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
      <body className={`${inter.className} bg-gray-50 font-sans flex flex-col`}>
        <Providers>
          <ToastProvider>
            {children}
          </ToastProvider>
        </Providers>
      </body>
    </html>
  )
}
