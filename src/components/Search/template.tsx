import { ChangeEvent } from 'react'
import { useQuery } from 'react-query'
import { LoadingSecond } from '../Loading/second'
import { api } from '@/lib/api'

interface TemplateProps {
  id: number
  name: string
  content: string
}
interface SearchPartyProps {
  handleSearchOnChange: (e: ChangeEvent<HTMLSelectElement>) => void
}

export default function SearchTemplate({
  handleSearchOnChange,
}: SearchPartyProps) {
  const { data, isLoading } = useQuery<TemplateProps[]>(
    'templateSelect',
    async () => {
      const response = await api.get('/templates')

      if (response.data.length === 0) {
        return []
      }
      return response.data
    },
  )

  return (
    <div className="flex h-full w-full min-w-[90px] flex-col justify-between gap-1">
      <div className="flex gap-1">
        <label htmlFor="party" className="text-xs">
          Template
        </label>
        {isLoading && <LoadingSecond />}
      </div>

      <select name="template" onChange={handleSearchOnChange}>
        <option value="" disabled selected>
          Escolha um modelo
        </option>
        {data !== undefined && data !== null
          ? data.map((item) => (
              <option
                key={item.id}
                value={JSON.stringify({
                  id: item.id,
                  name: item.name,
                  content: item.content,
                })}
              >
                {item.name}
              </option>
            ))
          : null}
      </select>
    </div>
  )
}
