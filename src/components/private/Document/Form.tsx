'use client'

import { ChangeEvent, useContext, useState } from 'react'
import { AccessContext } from '@/provider/context.provider'
import dayjs from 'dayjs'
import SelectParty from '../Search/Select/SelectParty'
import SelectState from '../Search/Select/SelectState'
import SelectCity from '../Search/Select/SelectCity'
import SelectDirectory from '../Search/Select/SelectDirectory'
import SelectVigency from '../Search/Select/SelectVigency'
import InputBase from '../Search/Input/InputBase'
import ButtonPrimary from '@/components/Buttons/ButtonPrimary'
import SelectTemplate from '../Search/Select/SelectTemplate'
import { useTemplateVigencyPDF } from '@/hooks/useTemplateData'

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

  const { refetch, isFetching } = useTemplateVigencyPDF(
    search.vigency,
    content,
    search.local,
    search.date,
  )

  async function handleSearchOnSubmit(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault()
    const response = await refetch()
    onSubmit({ content: response.data })
  }

  return (
    <form
      onSubmit={handleSearchOnSubmit}
      className="h-fit w-3/12 space-y-4 rounded-lg border-[1px] bg-white p-4 max-xl:min-w-[200px]"
    >
      <h3 className="text-h3">Emitir documento</h3>
      <div className="flex flex-col gap-2">
        <SelectTemplate handleSearchOnChange={handleSearchOnChange}>
          <option value="" selected disabled>
            Selecione
          </option>
        </SelectTemplate>
        <div className="grid grid-flow-col gap-1 max-2xl:grid-rows-3">
          {!partyCode && (
            <SelectParty handleSearchOnChange={handleSearchOnChange}>
              <option value="" disabled selected>
                Selecione
              </option>
            </SelectParty>
          )}
          {!stateId && (
            <SelectState handleSearchOnChange={handleSearchOnChange}>
              <option value="" disabled selected>
                Selecione
              </option>
            </SelectState>
          )}
          {!cityCode && (
            <SelectCity
              stateId={search.state}
              handleSearchOnChange={handleSearchOnChange}
            >
              <option value="" disabled selected>
                Selecione
              </option>
            </SelectCity>
          )}
        </div>
        <SelectDirectory
          city={search.city}
          party={search.party}
          state={search.state}
          handleSearchOnChange={handleSearchOnChange}
        >
          <option value="" disabled selected>
            Selecione
          </option>
        </SelectDirectory>
        <SelectVigency
          directoryId={search.directory ?? undefined}
          handleSearchOnChange={handleSearchOnChange}
        />
        <div className="grid grid-flow-col gap-1 max-2xl:grid-rows-2">
          <InputBase
            label="Data da emissão"
            type="date"
            name="date"
            defaultValue={dayjs().format('YYYY-MM-DD')}
            onChange={handleSearchOnChange}
          />
          <InputBase
            label="Local"
            type="text"
            name="local"
            className="capitalize"
            placeholder="Local"
            defaultValue={search.local?.toLowerCase() || ''}
            onChange={handleSearchOnChange}
          />
        </div>
      </div>

      <ButtonPrimary
        title="Preencher documento"
        type="submit"
        variant="container"
        loading={isFetching}
        className="w-full justify-center"
        disabled={!(search.template && search.vigency && search.local)}
      >
        Preencher
      </ButtonPrimary>
    </form>
  )
}
