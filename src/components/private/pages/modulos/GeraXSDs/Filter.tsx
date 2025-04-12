"use client";
import { ChangeEvent } from "react";
import InputYear from "../../../Search/Input/InputYear";
import SelectParty from "@/components/private/Form/Selects/SelectParty";
import SelectBase from "@/components/private/Search/Select/SelectBase";
import InputBase from "@/components/private/Search/Input/InputBase";

interface FilterXSDProps {
  partyCode?: string;
  onChange?: (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>
  ) => void;
}

export default function TableFilterXSD({
  partyCode,
  onChange,
}: FilterXSDProps) {
  return (
    <div className="flex gap-2 ">
      <div className="flex flex-wrap gap-2 basis-[fit-content]">
        {partyCode == null && (
          <div className="w-44">
            <SelectParty
              defaultValue=""
              name="partyCode"
              type="code"
              handleSearchOnChange={onChange}
            >
              <option value="">Todos</option>
            </SelectParty>
          </div>
        )}
        <div className="flex gap-2 w-44">
          <SelectBase onChange={onChange} name="tipoLancamento" label="D/C">
            <option value="">Todos</option>
            <option value="D">D</option>
            <option value="C">C</option>
          </SelectBase>
          <InputYear name="ano" handleSearchOnChange={onChange} />
        </div>
      </div>

      <div className="flex flex-wrap gap-2 basis-[fit-content]">
        <InputBase
          name="cnpj"
          label="CNPJ Prestador"
          type="text"
          onChange={onChange}
          className="w-40 text-center"
        />
        <InputBase
          name="cpf"
          label="CPF Contratante"
          type="text"
          onChange={onChange}
          className="w-40 text-center"
        />
      </div>
      <div className="flex flex-wrap gap-2 basis-[fit-content]">
        <InputBase
          name="dataInicial"
          label="Data Inicial"
          type="date"
          onChange={onChange}
          className="w-34 text-center"
        />
        <InputBase
          name="dataFinal"
          label="Data Final"
          type="date"
          onChange={onChange}
          className="w-34 text-center"
        />
      </div>
    </div>
  );
}
