import { Page } from '@/@types/page'
import { DirectoryProps } from '@/@types/types'
import { AccessContext } from '@/provider/context.provider'
import { DirectoryService } from '@/services/directory.service'
import { ChangeEvent, useContext } from 'react'
import { useQuery } from 'react-query'
import { LoadingSecond } from '../Loading/second'

interface SearchDirectoryProps {
  party?: string
  city?: string
  state?: string
  handleSearchOnChange: (e: ChangeEvent<HTMLSelectElement>) => void
}

export default function SearchDirectory({
  handleSearchOnChange,
  party,
  city,
  state,
}: SearchDirectoryProps) {
  const directoryService = new DirectoryService()
  const { partyCode, cityCode, stateId } = useContext(AccessContext)

  const { data, isLoading } = useQuery<Page<DirectoryProps>>(
    ['directories', city, state, party, partyCode, cityCode, stateId],
    () =>
      directoryService.getAll(
        undefined,
        undefined,
        party,
        city,
        state,
        undefined,
        partyCode,
        cityCode,
        stateId,
      ),
    {
      keepPreviousData: true,
      retry: false,
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 60, // 10 minute
    },
  )

  return (
    <div className="flex w-full min-w-[90px] flex-col justify-between gap-1">
      <div className="flex gap-1">
        <label htmlFor="directory" className="text-xs">
          Diretório
        </label>
        {isLoading && <LoadingSecond />}
      </div>

      <select name="directory" onChange={handleSearchOnChange}>
        <option value="">Selecione</option>
        {data !== undefined && data.results
          ? data.results.map((directory) => (
              <option key={directory.id} value={directory.id}>
                {directory.surname}
              </option>
            ))
          : null}
      </select>
    </div>
  )
}
