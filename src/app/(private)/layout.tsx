import Providers from '@/provider/query.provider'
import { ReactNode } from 'react'
import { montserrat } from '../fonts'
import PrivateLayout from '@/components/Layouts/PrivateLayout'
import '@/app/globals.css'


export default function RootLayout({ children }: { children: ReactNode }) {


  return (

    <html lang="en">
      <body className={`${montserrat.variable} bg-gray-50 font-sans`}>
        <Providers>
          <PrivateLayout>
            {children}
          </PrivateLayout>
        </Providers>
      </body>
    </html>
  )
}
