import { ChangeEvent, useContext, useState } from 'react'
import SearchParty from '@/components/Search/party'
import SearchState from '@/components/Search/state'
import SearchCity from '@/components/Search/city'
import SearchDirectory from '@/components/Search/directory'
import SearchVigency from '@/components/Search/vigency'
import { AccessContext } from '@/provider/context.provider'

interface Search {
  party: string | undefined
  state: string | undefined
  city: string | undefined
  directory: number | undefined
  vigency: string | undefined
  year: string | undefined
}

export function FormDocument() {
  const [search, setSearch] = useState<Search>({} as Search)
  const { partyCode, cityCode, stateId } = useContext(AccessContext)

  // buscar partido
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
    setSearch((old) => ({ ...old, [name]: value || undefined }))
  }

  return (
    <form className="w-3/12 space-y-4 rounded-lg border-[1px] bg-white p-4">
      <h3>Selecionar vigencia</h3>
      <div className="flex flex-col gap-2">
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
      </div>
      <button type="submit" className="button-primary w-full">
        Gerar Relatório
      </button>
    </form>
  )
}
