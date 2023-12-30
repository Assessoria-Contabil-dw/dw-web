import Providers from '@/provider/query.provider'
import { ReactNode } from 'react'
import { inter, lexend, montserrat } from '../fonts'
import PrivateLayout from '@/components/Layouts/PrivateLayout'
import '@/app/globals.css'
import NavigationBody from '@/components/private/Header/NavBody'

export const metadata = {
  title: 'DW',
  description: 'Contabilidade para partidos políticos',
  icon: ['/favicon.icon'],
}
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body
        className={`${montserrat.variable} ${inter.variable} ${lexend.variable} bg-gray-50 font-sans`}
      >
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
