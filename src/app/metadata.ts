import { Metadata } from "next";

export const METADATA: Metadata = {
    title: 'CDW Contabilidade Partidária',
    description: 'Contabilidade para partidos políticos',    
    openGraph: {
        title: 'CDW | Contabilidade Partidária',
        description: 'Simplifique a contabilidade partidárias, com um sistema que centraliza suas informações.',
        url: process.env.NEXT_PUBLIC_HOST_URL,
        siteName: 'CWD',
        images: [
          {
            url: process.env.NEXT_PUBLIC_HOST_URL + '/og.png',
            width: 800,
            height: 600,
          },
        ],
        locale: 'pt_BR',
        type: 'website',
      },
}