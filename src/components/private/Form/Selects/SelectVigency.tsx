import { ChangeEvent, ReactNode, SelectHTMLAttributes } from "react";
import { useVigencyData } from "@/hooks/useVigencyData";
import SelectBase from "./SelectBase";
import { useFormContext } from "react-hook-form";

interface SelectVigencyProps extends SelectHTMLAttributes<HTMLSelectElement> {
  directoryId?: number;
  children?: ReactNode;
  loading?: boolean;
  partyCode?: string;
  stateId?: string;
  cityCode?: string;
  name: string;
  label: string;
  handleSearchOnChange?: (e: ChangeEvent<HTMLSelectElement>) => void;
}

export default function SelectVigency({
  handleSearchOnChange,
  directoryId,
  loading,
  partyCode,
  stateId,
  cityCode,
  children,
  name,
  label,
  ...atr
}: SelectVigencyProps) {
  const { data, isLoading, isFetching } = useVigencyData(
    directoryId,
    partyCode,
    stateId,
    cityCode
  );
  const { register } = useFormContext();
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
      {data?.vigencyActive == null && data?.vigencyInactive == null ? (
        <option hidden value="">
          Não encontrado
        </option>
      ) : (
        <option value="" hidden>
          Selecione
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
  );
}
