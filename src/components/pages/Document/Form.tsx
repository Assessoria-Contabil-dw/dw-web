'use client'

import { ChangeEvent, useContext, useState } from 'react'
import SearchParty from '@/components/private/Search/party'
import SearchState from '@/components/private/Search/state'
import SearchCity from '@/components/private/Search/city'
import SearchDirectory from '@/components/private/Search/directory'
import SearchVigency from '@/components/private/Search/vigency'
import { AccessContext } from '@/provider/context.provider'
import dayjs from 'dayjs'
import SearchTemplate from '@/components/private/Search/template'
import { api } from '@/lib/api'
import { useQuery } from 'react-query'
import { LoadingSecond } from '@/components/Loading/second'

interface Search {
  party: string | undefined
  state: string | undefined
  city: string | undefined
  directory: number | undefined
  vigency: string | undefined
  local: string | undefined
  date: string | undefined
  template: number | undefined
}

interface FormDocumentProps {
  onSubmit: (data: any) => void
  content: string | undefined
}

export function FormDocument({ onSubmit, content }: FormDocumentProps) {
  const [search, setSearch] = useState<Search>({} as Search)
  const { partyCode, cityCode, stateId } = useContext(AccessContext)

  function handleSearchOnChange(
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>,
  ) {
    const { name, value } = e.target

    if (name === 'name' && value.length < 3) {
      setSearch((old) => ({ ...old, [name]: undefined }))
      return
    }

    if (name === 'state' && value === '') {
      setSearch((old) => ({ ...old, city: undefined }))
    }

    if (name === 'directory') {
      const { directoryId, city } = JSON.parse(value)
      return setSearch((old) => ({
        ...old,
        directory: directoryId,
        local: city,
      }))
    }

    if (name === 'template') {
      const { id, content } = JSON.parse(value)

      setSearch((old) => ({
        ...old,
        template: id,
      }))
      return onSubmit({ content })
    }
    setSearch((old) => ({ ...old, [name]: value || undefined }))
  }

  const { refetch, isFetching } = useQuery(
    'document',
    async () => {
      const response = await api.get(
        `/template/vigency/${String(search.vigency)}`,
        {
          params: {
            content,
            local: search.local,
            date: search.date,
          },
        },
      )
      onSubmit({ content: response.data })
      return response.data
    },
    {
      enabled: false,
      retry: 1,
    },
  )

  async function handleSearchOnSubmit(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault()
    await refetch()
  }

  return (
    <form
      onSubmit={handleSearchOnSubmit}
      className="h-fit  w-3/12 space-y-4 rounded-lg border-[1px] bg-white p-4 max-xl:min-w-[200px]"
    >
      <h3>Emitir documento</h3>
      <div className="flex flex-col gap-2">
        <SearchTemplate handleSearchOnChange={handleSearchOnChange} />
        <div className="grid grid-flow-col gap-1 max-xl:grid-rows-3">
          {!partyCode && (
            <SearchParty handleSearchOnChange={handleSearchOnChange} />
          )}
          {!stateId && (
            <SearchState handleSearchOnChange={handleSearchOnChange} />
          )}
          {!cityCode && (
            <SearchCity
              stateId={search.state}
              handleSearchOnChange={handleSearchOnChange}
            />
          )}
        </div>
        <SearchDirectory
          city={search.city}
          party={search.party}
          state={search.state}
          handleSearchOnChange={handleSearchOnChange}
        />
        <SearchVigency
          directoryId={search.directory}
          handleSearchOnChange={handleSearchOnChange}
        />

        <div className="grid grid-flow-col gap-1 max-xl:grid-rows-2">
          <div className="w-full min-w-[90px] gap-1">
            <div>
              <label htmlFor="date" className="text-xs">
                Data da emissão
              </label>
            </div>
            <input
              type="date"
              name="date"
              id="date"
              defaultValue={dayjs().format('YYYY-MM-DD')}
              className="rounded-md border-[1px] border-gray-300 p-2"
              onChange={handleSearchOnChange}
            />
          </div>
          <div className="w-full min-w-[90px] gap-1">
            <div>
              <label htmlFor="local" className="text-xs">
                Local
              </label>
            </div>
            <input
              type="text"
              name="local"
              id="local"
              onChange={handleSearchOnChange}
              defaultValue={search.local?.toLowerCase() || ''}
              className="rounded-md border-[1px] border-gray-300 p-2 capitalize"
            />
          </div>
        </div>
      </div>

      <button
        type="submit"
        className="button-primary w-full"
        disabled={!(search.template && search.vigency && search.local)}
      >
        {isFetching && <LoadingSecond />}
        Preencher
      </button>
    </form>
  )
}
