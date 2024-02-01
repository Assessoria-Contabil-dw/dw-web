import SelectVigency from "@/components/private/Form/Selects/SelectVigency";
import FilterDirectory from "./FilterDirectory";
import { ChangeEvent, useState } from "react";

interface FilterVigencyProps {
  index: number;
  nameVigency: string;
  nameDirectory: string;
  partyCode?: string;
  stateId?: string;
  cityCode?: string;
  handleSearchOnChange?: (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>
  ) => void;
}

export default function FilterVigency({
  index,
  nameVigency,
  nameDirectory,
  partyCode,
  stateId,
  cityCode,
  handleSearchOnChange,
}: FilterVigencyProps) {
  const [directoryId, setDirectoryId] = useState("");

  return (
    <div className="grid grid-flow-col gap-2 max-2xl:grid-rows-2">
      <FilterDirectory
        name={nameDirectory}
        label={`Diretório ${index}`}
        handleSearchOnChange={(e) => setDirectoryId(e.target.value)}
        partyCode={partyCode}
        stateId={stateId}
        cityCode={cityCode}
      />

      <SelectVigency
        defaultValue=""
        name={nameVigency}
        label={`Vigência ${index}`}
        partyCode={partyCode}
        stateId={stateId}
        cityCode={cityCode}
        directoryId={Number(directoryId)}
        handleSearchOnChange={handleSearchOnChange}
      />
    </div>
  );
}
