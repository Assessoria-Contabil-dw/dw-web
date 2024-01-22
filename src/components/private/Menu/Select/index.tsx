import { ChangeEvent, useContext, useState } from "react";
import ActiveInput from "./ActiveInput";
import { AccessModuleData, AccessProps } from "@/interfaces/access.interface";
import { queryClient } from "@/provider/query.provider";
import NavItem from "./NavItens";
import { useAccessModuleData } from "@/hooks/useAccess";
import { AccessContext } from "@/provider/context.provider";
import { useAuth } from "@/hooks/useAuth";

interface SelectAccessProps {
  partyCode: string | undefined;
  stateUf: string | undefined;
  cityCode: string | undefined;
  moduleData: AccessModuleData | undefined;
}

export default function SelectAccess({partyCode, stateUf, cityCode, moduleData}: SelectAccessProps) {
  const user = useAuth();

  const accessData: AccessProps = queryClient.getQueryData(
    "accessData"
  ) as AccessProps;
  const [isSelect, setIsSelect] = useState(false);
  const [accessArray, setAccessArray] = useState<AccessProps>(accessData);

  const {
    setPartyCode,
    setStateId,
    setCityCode,
  } = useContext(AccessContext);

  function handleChange(
    module: AccessModuleData,
    party: string,
    state: string,
    city: string
  ) {
    setPartyCode(party);
    queryClient.setQueryData("accessModuleData", module);

    setIsSelect(false);

    if (!city && !state) {
      setStateId("");
      setCityCode("");
      return;
    }

    if (state) {
      setStateId(state);
      setCityCode("");
      return;
    }
    if (city) {
      setStateId("");
      setCityCode(city);
    }
  }

  function handleFilter(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.value.length < 2) {
      setAccessArray(accessData);
      return;
    }
    const filterParty = accessData?.acessParty?.filter((item) =>
      item.party.startsWith(e.target.value.toUpperCase())
    );

    const filterState = accessData?.acessState?.filter((item) =>
      item.state.startsWith(e.target.value.toUpperCase())
    );

    const filterCity = accessData?.acessCity?.filter((item) =>
      item.city.startsWith(e.target.value.toUpperCase())
    );

    const filterDistrict = accessData?.acessDistrict?.filter((item) =>
      item.city.startsWith(e.target.value.toUpperCase())
    );

    if (!filterParty && !filterState && !filterCity && !filterDistrict) {
      setAccessArray({
        acessCity: null,
        acessParty: null,
        acessState: null,
        acessDistrict: null,
      });
      return;
    }

    setAccessArray({
      acessParty: filterParty?.length ? filterParty : null,
      acessCity: filterCity?.length ? filterCity : null,
      acessState: filterState?.length ? filterState : null,
      acessDistrict: filterDistrict?.length ? filterDistrict : null,
    });
  }

  if(user?.role === "ADMIN") return null;

  return (
    <div className="relative">
      <ActiveInput
        onClick={() => setIsSelect(!isSelect)}
        moduleName={moduleData?.acessName}
      />

      <div
        className={` ${
          isSelect ? "block" : "hidden"
        } absolute z-10 mt-1 rounded border-[1px] border-slate-300 bg-white p-1 shadow-md`}
      >
        <input
          type="text"
          placeholder="Buscar"
          onChange={handleFilter}
          className="input-style"
        />
        <NavItem
          accessArray={accessArray}
          handleChange={handleChange}
          partyCode={partyCode}
          stateUf={stateUf}
          cityCode={cityCode}
        />
      </div>
    </div>
  );
}
