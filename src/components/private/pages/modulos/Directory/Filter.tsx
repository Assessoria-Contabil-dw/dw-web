import { ChangeEvent } from "react";
import SelectStatus from "../../../Search/Select/SelectStatus";
import SelectCity from "@/components/private/Form/Selects/SelectCity";
import SelectState from "@/components/private/Form/Selects/SelectState";
import SelectParty from "@/components/private/Form/Selects/SelectParty";

interface FilterDirectoryProps {
  partyCode?: string;
  cityCode?: string;
  stateId?: string;
  stateName?: string;
  onChange: (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>
  ) => void;
}

export default function TableFilterDirectory({
  partyCode,
  cityCode,
  stateId,
  stateName,
  onChange,
}: FilterDirectoryProps) {
  return (
    <div className="flex gap-2">
      {!partyCode && (
        <SelectParty
          defaultValue=""
          name="partyAbbreviation"
          handleSearchOnChange={onChange}
        >
          <option value="">Todos</option>
        </SelectParty>
      )}

      {!stateId && (
        <SelectState
          defaultValue=""
          name="stateName"
          handleSearchOnChange={onChange}
        >
          <option value="">Todos</option>
        </SelectState>
      )}

      {!cityCode && (
        <SelectCity
          defaultValue=""
          name="cityName"
          stateName={stateName}
          stateId={stateId}
          handleSearchOnChange={onChange}
        >
          <option value="" selected>
            Todos
          </option>
        </SelectCity>
      )}

      <SelectStatus
        name="status"
        label="Status"
        handleSearchOnChange={onChange}
      />
    </div>
  );
}
