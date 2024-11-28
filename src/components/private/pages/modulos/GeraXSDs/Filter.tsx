"use client";
import { ChangeEvent, useState } from "react";
import InputYear from "../../../Search/Input/InputYear";
import SelectParty from "@/components/private/Form/Selects/SelectParty";
import SelectBase from "@/components/private/Search/Select/SelectBase"
import InputBase from "@/components/private/Search/Input/InputBase";

interface FilterXSDProps {
  partyCode?: string;
  cityCode?: string;
  stateId?: string;
  stateName?: string;
  onChange?: (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>
  ) => void;
}

export default function TableFilterXSD({
  partyCode,
  cityCode,
  stateId,
  stateName,
  onChange,
}: FilterXSDProps) {
  return (
    <div className="flex gap-2 ">
      {partyCode == null && (
        <SelectParty
          defaultValue=""
          name="partido"
          handleSearchOnChange={onChange}
        >
          <option value="">Todos</option>
        </SelectParty>
      )}
      <SelectBase onChange={onChange} name="tipoLancamento" label="D/C">
        <option value="">Todos</option>
        <option value="D">D</option>
        <option value="C">C</option>
      </SelectBase>

      <InputYear name="ano" handleSearchOnChange={onChange} />
      <InputBase name="cnpj" label="CNPJ Prestador" type="text" onChange={onChange} className="w-40 text-center" />
      <InputBase name="dataInicial" label="Data Inicial" type="date" onChange={onChange} className="w-34 text-center" />
      <InputBase name="dataFinal" label="Data Final" type="date" onChange={onChange} className="w-34 text-center" />
    </div>
  );
}
