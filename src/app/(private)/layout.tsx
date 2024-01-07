import Providers from '@/provider/query.provider'
import { ReactNode } from 'react'
import { montserrat } from '../fonts'
import PrivateLayout from '@/components/Layouts/PrivateLayout'
import '@/app/globals.css'
import NavigationBody from '@/components/private/Header/NavBody'

export const metadata = {
  title: 'CDW Contabilidade Partidária',
  description: 'Contabilidade para partidos políticos',
  icon: ['/favicon.ico'],
}
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt_BR">
      <body className={`${montserrat.variable}  bg-gray-50 font-sans`}>
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
