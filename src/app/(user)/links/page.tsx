'use client'
import { LoadingSecond } from '@/components/Loading/second'
import { api } from '@/lib/api'
import { Globe } from 'lucide-react'
import { useQuery } from 'react-query'

interface LinkProps {
  url: string
  logoUrl: string
}
export default function LinksPage() {
  const { data, isLoading } = useQuery<LinkProps[]>(
    'links',
    async () => {
      const response = await api.get('/linkSites')
      return response.data
    },
    {
      staleTime: 1000 * 60 * 60 * 24,
      refetchOnWindowFocus: false,
      retry: false,
    },
  )

  if (isLoading) {
    return (
      <div className="mt-4 flex items-center justify-center gap-2">
        <LoadingSecond />
      </div>
    )
  }

  return (
    <main className="h-[calc(100vh-2.6rem)] space-y-10 overflow-y-auto px-32 py-14">
      <div>
        <h2>Esta precisando consultar alguma informação?</h2>
        <span>
          Acesse os links abaixo e encontre o que precisa, caso não encontre,
          entre em contato com a equipe de suporte.
        </span>
      </div>

      <ul className=" mt-4 grid grid-cols-4 items-center justify-center">
        {data !== undefined || data != null ? (
          data.map((item, index) => (
            <li
              key={index}
              className="flex items-center justify-center border-[1px] border-dashed"
            >
              <a href={item.url} target="_blank" rel="noopener noreferrer">
                {item.logoUrl ? (
                  <picture>
                    <img
                      className="h-12 w-24 object-contain"
                      src={item.logoUrl}
                      alt=""
                    />
                  </picture>
                ) : (
                  <Globe className="w-4 text-blue-500" />
                )}
              </a>
            </li>
          ))
        ) : (
          <li className="flex h-full w-full items-center justify-center">
            Sem links cadastrados
          </li>
        )}
      </ul>
    </main>
  )
}
