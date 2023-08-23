'use client'
import { api } from '@/lib/api'
import { Globe } from 'lucide-react'
import { useEffect, useState } from 'react'

interface LinkProps {
  url: string
  logoUrl: string
}
export function Links() {
  const [links, setLinks] = useState<LinkProps[]>([])

  async function loadLinks() {
    try {
      const response = await api.get('/linkSites')
      setLinks(response.data)
      console.log(response.data)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    loadLinks()
  }, [])

  return (
    <div>
      <ul className="grid grid-cols-4">
        {links.map((item, index) => (
          <li
            key={index}
            className="flex items-center justify-center border-[1px] border-dashed"
          >
            <a href={item.url} target="_blank" rel="noopener noreferrer">
              {item.logoUrl ? (
                <picture>
                  <img
                    className="h-6 w-12 object-cover"
                    src={item.logoUrl}
                    alt=""
                  />
                </picture>
              ) : (
                <Globe className="w-4 text-blue-500" />
              )}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}
