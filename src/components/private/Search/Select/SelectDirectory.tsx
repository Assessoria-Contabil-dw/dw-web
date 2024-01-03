import { AccessContext } from '@/provider/context.provider'
import { ChangeEvent, ReactNode, SelectHTMLAttributes, useContext } from 'react'
import SelectBase from './SelectBase'
import { useDirectoryData } from '@/hooks/useDirectoryData'

interface SelectDirectoryProps extends SelectHTMLAttributes<HTMLSelectElement> {
  party?: string
  city?: string
  state?: string
  children?: ReactNode
  loading?: boolean
  handleSearchOnChange: (e: ChangeEvent<HTMLSelectElement>) => void
}

export default function SelectDirectory({
  handleSearchOnChange,
  party,
  city,
  state,
  loading,
  children,
  ...atr
}: SelectDirectoryProps) {
  const { partyCode, cityCode, stateId } = useContext(AccessContext)

  const { data, isLoading } = useDirectoryData(
    undefined,
    undefined,
    party,
    city,
    state,
    undefined,
    partyCode,
    cityCode,
    stateId,
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
      {data !== undefined && data.results ? (
        data.results.map((directory) => (
          <option
            key={directory.id}
            value={JSON.stringify({
              directoryId: directory.id,
              city: directory.city,
            })}
          >
            {directory.surname}
          </option>
        ))
      ) : (
        <option>Não encontrado</option>
      )}
    </SelectBase>
  )
}
