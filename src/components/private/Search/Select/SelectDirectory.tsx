import { AccessContext } from '@/provider/context.provider'
import { ChangeEvent, ReactNode, SelectHTMLAttributes, useContext } from 'react'
import SelectBase from './SelectBase'
import { useDirectoryData } from '@/hooks/useDirectoryData'

interface SelectDirectoryProps extends SelectHTMLAttributes<HTMLSelectElement> {
  party?: string
  state?: string
  city?: string
  children?: ReactNode
  loading?: boolean
  handleSearchOnChange: (e: ChangeEvent<HTMLSelectElement>) => void
}

export default function SelectDirectory({
  handleSearchOnChange,
  party,
  state,
  city,
  loading,
  children,
  ...atr
}: SelectDirectoryProps) {
  const { partyCode, cityCode, stateId } = useContext(AccessContext)

  const { data, isLoading } = useDirectoryData(
    undefined,
    undefined,
    party,
    state,
    city,
    undefined,
    partyCode,
    stateId,
    cityCode,
  )

  return (
    <SelectBase
      name="directory"
      label="Diretório"
      loading={isLoading || loading}
      onChange={handleSearchOnChange}
      {...atr}
    >
      {children}
      {data?.results == null ? (
        <option selected value="" disabled>
          Não encontrado
        </option>
      ) : (
        <option value="" disabled selected>
          Selecione
        </option>
      )}
      {data !== undefined && data.results
        ? data.results.map((directory) => (
            <option
              key={directory.id}
              value={JSON.stringify({
                directoryId: directory.id,
                city: directory.city,
              })}
            >
              {directory.party} -{directory.surname}
            </option>
          ))
        : null}
    </SelectBase>
  )
}
