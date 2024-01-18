import ButtonIcon from "@/components/Buttons/ButtonIcon";
import SelectCity from "@/components/private/Search/Select/SelectCity";
import SelectDirectory from "@/components/private/Search/Select/SelectDirectory";
import SelectParty from "@/components/private/Search/Select/SelectParty";
import SelectState from "@/components/private/Search/Select/SelectState";
import { FilterIcon } from "lucide-react";
import { ChangeEvent, useState } from "react";

interface FilterDirectoryProps {
    partyCode?: string
    stateId?: string    
    cityCode?: string
    handleSearchOnChange: (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => void
}

export default function FilterDirectory({partyCode, stateId, cityCode, handleSearchOnChange}: FilterDirectoryProps) {
    const [search, setSearch] = useState({
        party: "",
        state: "",
        city: "",
    })
    const countNonEmptyVariables = Object.values(search).filter(value => value !== "").length;

    const [isFilter, setIsFilter] = useState(false)

    return(
        <div className='flex gap-2 items-end'>
            <SelectDirectory
              party={search.party}
              state={search.state}
              city={search.city}
              partyCode={partyCode}
              stateId={stateId}
              cityCode={cityCode}
              handleSearchOnChange={handleSearchOnChange}
            />
            <div className='relative'>
              <ButtonIcon 
                data-count={countNonEmptyVariables} 
                type='button' 
                title='Filtrar' 
                icon={<FilterIcon size={18}/>} 
                className="before:content-[attr(data-count)] before:bg-primary before:w-[12px] before:h-[12px] 
                    before:absolute before:rounded-full before:-top-1 before:-right-1 
                    before:flex before:text-[10px] before:justify-center before:items-center before:font-semibold before:p-2"
                onClick={()=> setIsFilter(!isFilter)}
              />
              <div className={`flex flex-col z-10 w-52 rounded-md right-0 mt-1 gap-1 absolute bg-white border-[1px] p-2
              ${isFilter ? "block" : "hidden"}`}>
              {partyCode == null && (
                <SelectParty handleSearchOnChange={(e)=> setSearch({...search, party: e.target.value})}>
                  <option value="" selected>
                    Todos
                  </option>
                </SelectParty>
              )}
              {(stateId == null && cityCode == null) && (
                <SelectState handleSearchOnChange={(e)=> setSearch({...search, state: e.target.value})}>
                  <option value="" selected>
                    Todos
                  </option>
                </SelectState>
              )}
              {cityCode == null && (
                <SelectCity
                  stateId={search.state || stateId}
                  handleSearchOnChange={(e)=> setSearch({...search, city: e.target.value})}
                >
                  <option value="" selected>
                    Todos
                  </option>
                </SelectCity>
              )}
            </div>
            </div>
          </div>

    )
}