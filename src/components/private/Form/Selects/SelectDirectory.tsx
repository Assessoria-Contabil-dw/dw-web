import { ChangeEvent, ReactNode, SelectHTMLAttributes } from 'react'
import SelectBase from './SelectBase'
import { useDirectoryData, useDirectoryFilter } from '@/hooks/useDirectory'
import { useFormContext } from 'react-hook-form'

interface SelectDirectoryProps extends SelectHTMLAttributes<HTMLSelectElement> {
  partyAbbreviation?: string
  stateName?: string
  cityName?: string
  partyCode?: string,
  stateId?: string,
  cityCode?: string,
  children?: ReactNode
  loading?: boolean
  name: string,
  label:string,
  handleSearchOnChange?: (e: ChangeEvent<HTMLSelectElement>) => void
}

export default function SelectDirectory({
  handleSearchOnChange,
  partyAbbreviation,
  stateName,
  cityName,
  partyCode,
  stateId,
  cityCode,
  loading,
  children,
  name,
  label,
  ...atr
}: SelectDirectoryProps) {
  const { data, isLoading, isFetching } = useDirectoryData(
    0,
    undefined,
    partyAbbreviation, 
    stateName, 
    cityName, 
    undefined,
    undefined,
    partyCode, 
    stateId, 
    cityCode
    )
 const {register} = useFormContext()

  return (
    <SelectBase
      {...register(name)}
      name={name}
      label={label}
      loading={isLoading || isFetching || loading}
      onChange={handleSearchOnChange}
      {...atr}
    >
      {children}
      {data == null ? (
        <option hidden value="">
          Não encontrado
        </option>
      ) : (
        <option value="" hidden>
          Selecione
        </option>
      )}
      {data?.results !== undefined && data.results
        ? data.results.map((directory) => (
            <option
              key={directory.id}
              value={directory.id}
            >
              {directory.party} -{directory.surname}
            </option>
          ))
        : null}
    </SelectBase>
  )
}
