import React from 'react'
import { inter, lexend, montserrat } from '@/app/fonts'
import '@/app/globals.css'
import Footer from '@/components/public/Footer'
import Navbar from '@/components/public/Headers/Navbar'
import Script from 'next/script'

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
    <html lang="pt_BR">
      <head>
        <Script
          id="container-gtag"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
            window.dataLayer  = window.dataLayer  || [];
                function gtag(){
                    dataLayer.push(arguments);
                }
          `,
          }}
        />

        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-TZX294CT');`,
          }}
        />
      </head>
      <body
        className={`${inter.className}  ${montserrat.className} ${lexend.className}  flex flex-col bg-gray-50`}
      >
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-TZX294CT"
            height="0"
            width="0"
            style={{
              display: 'none',
              visibility: 'hidden',
            }}
          ></iframe>
        </noscript>
        {/* End Google Tag Manager (noscript) */}

        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
