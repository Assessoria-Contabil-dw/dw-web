"use client";
import { ChangeEvent} from "react";
import SelectLegend from "../../../Search/Select/SelectLegend";
import SelectParty from "@/components/private/Form/Selects/SelectParty";
import SelectState from "@/components/private/Form/Selects/SelectState";
import SelectCity from "@/components/private/Form/Selects/SelectCity";

interface FilterSPCProps {
  stateName?: string;
  onChange?: (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>
  ) => void;
}

export default function TableFilterSPC({
  stateName,
  onChange,
}: FilterSPCProps) {
  return (
    <div className="flex gap-2 ">
        <SelectParty
          name="partyAbbreviation"
          handleSearchOnChange={onChange}
        >
          <option value="">Todos</option>
        </SelectParty>
        <SelectState
          name="stateName"
          handleSearchOnChange={onChange}
        >
          <option value="">Todos</option>
        </SelectState>
        <SelectCity
          name="cityName"
          stateName={stateName}
          handleSearchOnChange={onChange}
        >
          <option value="" selected>Todos</option>
        </SelectCity>
      <SelectLegend label="Status" name="legendId" onChange={onChange}>
        <option value="">Todos</option>
      </SelectLegend>
    </div>
  );
}
