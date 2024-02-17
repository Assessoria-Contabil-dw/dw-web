import Providers from '@/provider/query.provider'
import { ReactNode } from 'react'
import { inter, montserrat } from '../fonts'
import PrivateLayout from '@/components/Layouts/PrivateLayout'
import '@/app/globals.css'
import NavigationBody from '@/components/private/Header/NavBody'
import { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL(String(process.env.NEXT_PUBLIC_HOST_URL)),
  title: 'CDW | Contabilidade Partidária',
  description: 'Contabilidade para partidos políticos',  
  keywords: ['Partidária', 'Contabilidade', 'Assessoria'],  
  openGraph: {
      title: 'CDW | Contabilidade Partidária',
      description: 'Simplifique a contabilidade partidárias, com um sistema que centraliza suas informações.',
      url: process.env.NEXT_PUBLIC_HOST_URL,
      siteName: 'CWD',
      images: [
        {
          url: '/og.png',
          width: 1200,
          height: 630,
        },
      ],
      locale: 'pt_BR',
      type: 'website',
    },
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-br">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className={`${montserrat.variable} font-montserrat bg-gray-50`}>
        <Providers>
          <PrivateLayout>
            <main className={`${inter.variable} font-inter relative flex h-[calc(100vh-3.5rem)]`}>
              {children}
              <NavigationBody />
            </main>
          </PrivateLayout>
        </Providers>
      </body>
    </html>
  )
}
