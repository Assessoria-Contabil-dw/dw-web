"use client";
import { ChangeEvent } from "react";
import SelectLegend from "../../../Search/Select/SelectLegend";
import InputYear from "../../../Search/Input/InputYear";
import SelectState from "@/components/private/Form/Selects/SelectState";
import SelectCity from "@/components/private/Form/Selects/SelectCity";
import InputBase from "@/components/private/Form/Inputs/InputBase";

interface FilterSPCProps {
  stateName?: string;
  onChange?: (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>
  ) => void;
}

export default function TableFilter({ stateName, onChange }: FilterSPCProps) {
  return (
    <div className="flex gap-2 ">
      <InputBase
        name="leaderName"
        label="Líder"
        className="w-72"
        onChange={onChange}
        type="text"
        placeholder="Digite o nome do líder"
      />

      <SelectState
        defaultValue=""
        name="stateName"
        handleSearchOnChange={onChange}
      >
        <option value="">Todos</option>
      </SelectState>
      <SelectCity
        defaultValue=""
        name="cityName"
        stateName={stateName}
        handleSearchOnChange={onChange}
      >
        <option value="" selected>
          Todos
        </option>
      </SelectCity>

      <InputYear name="year" handleSearchOnChange={onChange} />
      <SelectLegend label="Status" name="colorId" onChange={onChange}>
        <option value="">Todos</option>
      </SelectLegend>
    </div>
  );
}
