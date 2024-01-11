'use client'

import { ChangeEvent, useContext, useState } from 'react'
import { AccessContext } from '@/provider/context.provider'
import dayjs from 'dayjs'
import SelectParty from '../../../Search/Select/SelectParty'
import SelectState from '../../../Search/Select/SelectState'
import SelectCity from '../../../Search/Select/SelectCity'
import SelectDirectory from '../../../Search/Select/SelectDirectory'
import SelectVigency from '../../../Search/Select/SelectVigency'
import InputBase from '../../../Search/Input/InputBase'
import ButtonPrimary from '@/components/Buttons/ButtonPrimary'
import SelectTemplate from '../../../Search/Select/SelectTemplate'
import { useTemplateVigencyPDF } from '@/hooks/useTemplate'

interface Search {
  party: string | undefined
  state: string | undefined
  city: string | undefined
  directory: number | undefined
  vigency: string | undefined
  local: string | undefined
  date: string | undefined
  template: number | undefined
  templateContent: string | undefined
}

interface FormDocumentProps {
  onSubmit: (data: any) => void
  content: string | undefined
  editor: boolean
}

export function FormDocument({ onSubmit, content, editor }: FormDocumentProps) {
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
        templateContent: content,
      }))
      return onSubmit({ content })
    }
    setSearch((old) => ({ ...old, [name]: value || undefined }))
  }

  const { refetch, isFetching } = useTemplateVigencyPDF(
    search.vigency,
    editor ? content : search.templateContent,
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
      className="h-fit w-full rounded-lg border-[1px] bg-white p-1 "
    >
      <div className="h-full w-full space-y-2 overflow-y-auto  p-3">
        <h3 className="text-h3">Emitir documento</h3>
        <div className="flex flex-col gap-2 ">
          <SelectTemplate handleSearchOnChange={handleSearchOnChange}>
            <option value="" selected disabled>
              Selecione
            </option>
          </SelectTemplate>
          <div className="flex gap-1 max-2xl:flex-col">
            {partyCode == null && (
              <SelectParty handleSearchOnChange={handleSearchOnChange}>
                <option value="" selected>
                  Todos
                </option>
              </SelectParty>
            )}
            {(stateId == null && cityCode == null) && (
              <SelectState handleSearchOnChange={handleSearchOnChange}>
                <option value="" selected>
                  Todos
                </option>
              </SelectState>
            )}
            {cityCode == null && (
              <SelectCity
                stateId={search.state || stateId}
                handleSearchOnChange={handleSearchOnChange}
              >
                <option value="" selected>
                  Todos
                </option>
              </SelectCity>
            )}
          </div>
          <SelectDirectory
            party={search.party}
            state={search.state}
            city={search.city}
            partyCode={partyCode}
            stateId={stateId}
            cityCode={cityCode}
            handleSearchOnChange={handleSearchOnChange}
          ></SelectDirectory>
          <SelectVigency
           partyCode={partyCode}
           stateId={stateId}
           cityCode={cityCode}
            directoryId={search.directory ?? undefined}
            handleSearchOnChange={handleSearchOnChange}
          >
            <option value="" selected>
              Selecione
            </option>
          </SelectVigency>
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
              defaultValue={search.local}
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
      </div>
    </form>
  )
}
