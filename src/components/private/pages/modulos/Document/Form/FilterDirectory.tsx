import ButtonIcon from "@/components/Buttons/ButtonIcon";
import SelectCity from "@/components/private/Form/Selects/SelectCity";
import SelectDirectory from "@/components/private/Form/Selects/SelectDirectory";
import SelectParty from "@/components/private/Form/Selects/SelectParty";
import SelectState from "@/components/private/Form/Selects/SelectState";
import { FilterIcon } from "lucide-react";
import { ChangeEvent, useState } from "react";

interface FilterDirectoryProps {
  name: string;
  label: string;
  partyCode?: string;
  stateId?: string;
  cityCode?: string;
  handleSearchOnChange: (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>
  ) => void;
}

export default function FilterDirectory({
  name,
  label,
  partyCode,
  stateId,
  cityCode,
  handleSearchOnChange,
}: FilterDirectoryProps) {
  const [search, setSearch] = useState({
    partyAbbreviation: "",
    stateName: "",
    cityName: "",
  });
  const countNonEmptyVariables = Object.values(search).filter(
    (value) => value !== ""
  ).length;

  const [isFilter, setIsFilter] = useState(false);

  return (
    <div className="flex items-end gap-2">
      <SelectDirectory
        defaultValue=""
        name={name}
        label={label}
        partyAbbreviation={search.partyAbbreviation}
        stateName={search.stateName}
        cityName={search.cityName}
        partyCode={partyCode}
        stateId={stateId}
        cityCode={cityCode}
        handleSearchOnChange={handleSearchOnChange}
      />
      <div className="relative ">
        <ButtonIcon
          data-count={countNonEmptyVariables}
          type="button"
          title="Filtrar"
          icon={<FilterIcon size={18} />}
          className=" before:absolute before:-right-1 before:-top-1 before:flex 
                    before:h-[12px] before:w-[12px] before:items-center before:justify-center 
                    before:rounded-full before:bg-primary before:p-2 before:text-[10px] before:font-semibold before:content-[attr(data-count)]"
          onClick={() => setIsFilter(!isFilter)}
        />
        <div
          onMouseLeave={() => setIsFilter(!isFilter)}
          className={`absolute right-0 z-10 mt-1 flex w-52 flex-col gap-1 rounded-md border-[1px] bg-white p-2
              ${isFilter ? "block" : "hidden"}`}
        >
          {partyCode == null && (
            <SelectParty
              defaultValue=""
              name="partyAbbreviation"
              handleSearchOnChange={(e) =>
                setSearch({ ...search, partyAbbreviation: e.target.value })
              }
            >
              <option value="">
                Todos
              </option>
            </SelectParty>
          )}
          {stateId == null && cityCode == null && (
            <SelectState
              defaultValue=""
              name="stateName"
              handleSearchOnChange={(e) =>
                setSearch({ ...search, stateName: e.target.value })
              }
            >
              <option value="">
                Todos
              </option>
            </SelectState>
          )}
          {cityCode == null && (
            <SelectCity
              defaultValue=""
              name="cityName"
              stateName={search.stateName}
              stateId={stateId}
              handleSearchOnChange={(e) =>
                setSearch({ ...search, cityName: e.target.value })
              }
            >
              <option value="">
                Todos
              </option>
            </SelectCity>
          )}
        </div>
      </div>
    </div>
  );
}
