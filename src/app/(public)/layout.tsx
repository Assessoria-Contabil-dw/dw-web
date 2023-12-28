import React from 'react'
import ToastProvider from '@/provider/toast.provider'
import Providers from '@/provider/query.provider'
import { inter, montserrat } from '@/app/fonts'
import '@/app/(public)/style.css'

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
        className={`${inter.className}  ${montserrat.className} flex flex-col bg-gray-50 font-sans`}
      >
        <Providers>
          <ToastProvider>{children}</ToastProvider>
        </Providers>
      </body>
    </html>
  )
}
