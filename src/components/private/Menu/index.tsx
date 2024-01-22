"use client";
import { AccessContext } from "@/provider/context.provider";
import ActiveMenu from "./ActiveMenu";
import { useContext } from "react";
import ActiveLinks from "./ActiveLinks";
import { useAccessModuleData } from "@/hooks/useAccess";
import SelectAccess from "./Select";
import NavigationModule from "./NavModule";

export default function MenuPrivate() {
  const { openMenu, setOpenMenu } = useContext(AccessContext);
  const { partyCode, cityCode, stateId } = useContext(AccessContext);

  const { data } = useAccessModuleData(partyCode, stateId, cityCode);

  return (
    <aside className="flex flex-row max-md:absolute max-md:z-10 max-md:h-full">
      <div
        className={`sticky flex h-full min-w-[200px] flex-col justify-between gap-16 overflow-x-auto border-r-[1px] border-zinc-300 bg-white p-4
        ${openMenu ? "block" : "max-md:hidden"}`}
      >
        <div className="flex flex-col gap-2">
          <SelectAccess 
           partyCode={partyCode}
           stateUf={stateId}
           cityCode={cityCode}
           moduleData={data}/>

          <NavigationModule
            modules={data !== null && data !== undefined ? data.modules : []}
          />
        </div>
        <ActiveLinks />
      </div>
      <div className="flex h-full items-center">
        <ActiveMenu openMenu={openMenu} setOpenMenu={setOpenMenu} />
      </div>
    </aside>
  );
}
