import { ReactNode } from 'react'
import ToastProvider from '@/provider/toast.provider'
import Providers from '@/provider/query.provider'
import { montserrat } from '@/app/fonts'
import '@/app/globals.css'
import { METADATA } from '../metadata'


export const metadata = METADATA

export default function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <html lang="pt-br">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body
        className={`${montserrat.className} flex flex-col bg-gray-50`}
      >
        <Providers>
          <ToastProvider>{children}</ToastProvider>
        </Providers>
      </body>
    </html>
  )
}
