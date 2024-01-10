import React from 'react'
import ToastProvider from '@/provider/toast.provider'
import Providers from '@/provider/query.provider'
import { inter, montserrat } from '@/app/fonts'
import '@/app/globals.css'

export const metadata = {
  title: 'CDW Contabilidade Partidária',
  description: 'Contabilidade para partidos políticos',
  icon: ['/favicon.ico'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-br">
      <body
        className={`${inter.className}  ${montserrat.className} flex  flex-col bg-gray-50 font-sans`}
      >
        <Providers>
          <ToastProvider>{children}</ToastProvider>
        </Providers>
      </body>
    </html>
  )
}
