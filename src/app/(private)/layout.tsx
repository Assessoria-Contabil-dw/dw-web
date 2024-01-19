import Providers from '@/provider/query.provider'
import { ReactNode } from 'react'
import { montserrat } from '../fonts'
import PrivateLayout from '@/components/Layouts/PrivateLayout'
import '@/app/globals.css'
import NavigationBody from '@/components/private/Header/NavBody'
import { METADATA } from '../metadata'

export const metadata = METADATA

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-br">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className={`${montserrat.variable} bg-gray-50`}>
        <Providers>
          <PrivateLayout>
            <main className="relative flex h-[calc(100vh-3.5rem)]">
              {children}
              <NavigationBody />
            </main>
          </PrivateLayout>
        </Providers>
      </body>
    </html>
  )
}
