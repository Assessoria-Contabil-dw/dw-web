import { AccessContext } from '@/provider/context.provider'
import { ChangeEvent, ReactNode, SelectHTMLAttributes, useContext } from 'react'
import SelectBase from './SelectBase'
import { useDirectoryData, useDirectoryFilter } from '@/hooks/useDirectory'

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

  const { data, isLoading } = useDirectoryFilter(
    party,
    state,
    city,
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
      {data == null ? (
        <option selected value="" disabled>
          Não encontrado
        </option>
      ) : (
        <option value="" disabled selected>
          Selecione
        </option>
      )}
      {data !== undefined && data
        ? data.map((directory) => (
            <option
              key={directory.id}
              value={JSON.stringify({
                directoryId: directory.id,
                city: directory.city + '/' + directory.state,
              })}
            >
              {directory.party} -{directory.surname}
            </option>
          ))
        : null}
    </SelectBase>
  )
}
