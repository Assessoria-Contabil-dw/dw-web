import { ChangeEvent, ReactNode, SelectHTMLAttributes } from 'react'
import { useVigencyData } from '@/hooks/useVigencyData'
import SelectBase from './SelectBase'

interface SelectVigencyProps extends SelectHTMLAttributes<HTMLSelectElement> {
  directoryId?: number
  children?: ReactNode
  loading?: boolean

  handleSearchOnChange: (e: ChangeEvent<HTMLSelectElement>) => void
}

export default function SelectVigency({
  handleSearchOnChange,
  directoryId,
  loading,
  children,
  ...atr
}: SelectVigencyProps) {
  const { data, isLoading, isFetching } = useVigencyData(directoryId)

  return (
    <SelectBase
      name="vigency"
      label="Vigência"
      loading={isLoading || isFetching|| loading}
      onChange={handleSearchOnChange}
      {...atr}
    >
      {children}
      {data?.vigencyActive == null && data?.vigencyInactive == null && (
        <option selected value="" disabled>
          Não encontrado
        </option>
      )}
      {data?.vigencyActive !== undefined && data.vigencyActive !== null
        ? data.vigencyActive.map((vA) => (
            <option key={vA.id} value={vA.id}>
              {vA.dateFirst} - {vA.dateLast}
            </option>
          ))
        : null}
      {data?.vigencyInactive !== undefined && data.vigencyInactive !== null
        ? data.vigencyInactive.map((vI) => (
            <option className="text-slate-600" key={vI.id} value={vI.id}>
              {vI.dateFirst} - {vI.dateLast}
            </option>
          ))
        : null}
    </SelectBase>
  )
}
