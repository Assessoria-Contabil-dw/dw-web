"use client";
import { ChangeEvent, useState } from "react";
import SelectStatus from "../../../Search/Select/SelectStatus";
import SelectLegend from "../../../Search/Select/SelectLegend";
import InputYear from "../../../Search/Input/InputYear";
import SelectParty from "@/components/private/Form/Selects/SelectParty";
import SelectState from "@/components/private/Form/Selects/SelectState";
import SelectCity from "@/components/private/Form/Selects/SelectCity";

interface FilterSPCProps {
  partyCode?: string;
  cityCode?: string;
  stateId?: string;
  stateName?: string;
  onChange?: (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>
  ) => void;
  spcaChecked?: boolean;
  spceChecked?: boolean;
}

export default function TableFilterSPC({
  partyCode,
  cityCode,
  stateId,
  stateName,
  onChange,
  spcaChecked,
  spceChecked,
}: FilterSPCProps) {
  return (
    <div className="flex gap-2 ">
      {partyCode == null && (
        <SelectParty
          defaultValue=""
          name="partyAbbreviation"
          handleSearchOnChange={onChange}
        >
          <option value="">Todos</option>
        </SelectParty>
      )}
      {stateId == null && cityCode == null && (
        <SelectState
          defaultValue=""
          name="stateName"
          handleSearchOnChange={onChange}
        >
          <option value="">Todos</option>
        </SelectState>
      )}
      {cityCode == null && (
        <SelectCity
          defaultValue=""
          name="cityName"
          stateName={stateName}
          stateId={stateId}
          handleSearchOnChange={onChange}
        >
          <option value="" selected>Todos</option>
        </SelectCity>
      )}

      <SelectStatus name="vigencyStatus" label="Vigência" handleSearchOnChange={onChange} />
      <InputYear name="year" handleSearchOnChange={onChange} />
      <SelectLegend label="Status" name="colorId" onChange={onChange}>
        <option value="">Todos</option>
      </SelectLegend>
      
      <div className="flex items-center gap-4">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            name="spca"
            checked={spcaChecked}
            onChange={onChange}
            className="h-4 w-4 cursor-pointer"
          />
          <span className="text-sm">SPCA</span>
        </label>
        
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            name="spce"
            checked={spceChecked}
            onChange={onChange}
            className="h-4 w-4 cursor-pointer"
          />
          <span className="text-sm">SPCE</span>
        </label>
      </div>
    </div>
  );
}
