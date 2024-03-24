"use client";
import { AccessContext } from "@/provider/context.provider";
import { useContext } from "react";
import { useAccessModuleData } from "@/hooks/Access/User/useAccess";
import NavigationModule from "./NavModule";
import ActiveMenu from "./ActiveMenu";

export default function MenuData() {
  const { openMenu, setOpenMenu } = useContext(AccessContext);
  const { partyCode, cityCode, stateId } = useContext(AccessContext);

  const { data, isLoading, isFetching } = useAccessModuleData(partyCode, stateId, cityCode);

  if (isLoading ) {
    return null;
  }

  return (
    <aside className="flex flex-row max-lg:absolute max-lg:z-10 max-lg:h-full">
      <div
        className={`sticky flex h-full min-w-[200px] flex-col justify-between gap-16 overflow-x-auto border-r-[1px] border-zinc-300 bg-white p-4
        ${openMenu ? "block" : "max-lg:hidden"}`}
      >
        <div className="flex flex-col gap-2">
          <NavigationModule
            modules={data !== null && data !== undefined ? data.modules : []}
          />
        </div>
      </div>
      <div className="flex h-full items-center">
        <ActiveMenu openMenu={openMenu} setOpenMenu={setOpenMenu} />
      </div>
    </aside>
  );
}
