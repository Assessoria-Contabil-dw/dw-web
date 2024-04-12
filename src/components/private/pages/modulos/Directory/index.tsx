"use client";

import { AccessContext } from "@/provider/context.provider";
import TableDirectory from "./Table";
import { ChangeEvent, useCallback, useContext, useRef, useState } from "react";
import PaddingTable from "../../../Tools/TablePadding";
import { LoadingPrimary } from "@/components/Loading/primary";
import { RefreshButton } from "@/components/Buttons/ButtonRefresh";
import { queryClient } from "@/provider/query.provider";
import ButtonIcon from "@/components/Buttons/ButtonIcon";
import { Plus } from "lucide-react";
import RegisterDirectoryModal, { RegisterDirectoryModalProps } from "./Create";
import TableFilterDirectory from "./Filter";
import { FormProvider, useForm } from "react-hook-form";
import { useDirectoryData } from "@/hooks/Directory/useDirectory";
import { User } from "@/hooks/Access/User/useAuth";

interface Search {
  partyAbbreviation?: string;
  stateName?: string;
  cityName?: string;
  typeOrgId?: number;
  status?: string;
}

export default function Directory() {
  const user: User = queryClient.getQueryData("authUser") as User;
  const { partyCode, cityCode, stateId } = useContext(AccessContext);
  const [search, setSearch] = useState<Search>({} as Search);

  const methods = useForm<Search>({
    mode: "onSubmit",
  });

  const [page, setPage] = useState(1);
  const [skip, setSkip] = useState(0);
  const [take, setTake] = useState(15);
  const { data, isLoading, isFetching, isPreviousData } = useDirectoryData(
    skip,
    take,
    search.partyAbbreviation,
    search.stateName,
    search.cityName,
    search.typeOrgId,
    search.status,
    partyCode,
    stateId,
    cityCode
  );

  const prevPage = useCallback(() => {
    setSkip((old) => Math.max(old - take, 0));
    setPage((old) => Math.max(old - 1, 0));
  }, []);

  const nextPage = useCallback(() => {
    setSkip((old) => old + take);
    setPage((old) => old + 1);
  }, []);

  function handleSearchOnChange(
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>
  ) {
    const { name, value } = e.target;
    if (name === "state" && value === "") {
      setSearch((old) => ({ ...old, city: undefined }));
    }
    setPage(1);
    setSkip(0);
    setSearch((old) => ({ ...old, [name]: value || undefined }));
  }

  const registerDirectoryModalRef = useRef<RegisterDirectoryModalProps>(null);
  const handleRegisterDirectory = useCallback(() => {
    registerDirectoryModalRef.current?.openModal();
  }, []);

  if (isLoading && user) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <LoadingPrimary />
      </div>
    );
  }

  return (
    <>
      <RegisterDirectoryModal ref={registerDirectoryModalRef} />
      <div className="flex flex-col gap-2">
        <div className="flex items-end justify-between gap-4">
          <FormProvider {...methods}>
            <form>
              <TableFilterDirectory
                partyCode={partyCode}
                cityCode={cityCode}
                stateId={stateId}
                stateName={search.stateName}
                onChange={handleSearchOnChange}
              />
            </form>
          </FormProvider>

          <div className="flex gap-2">
            <RefreshButton isLoading={isFetching} queryName="directoryData" />
            {user?.role === "ADMIN" && (
              <ButtonIcon
                className="border-none bg-second text-white hover:bg-secondHover hover:text-white"
                title="Cadastrar"
                onClick={handleRegisterDirectory}
                icon={<Plus size={16} className="h-fit w-4" />}
              />
            )}
          </div>
        </div>

        <TableDirectory
          role={user?.role ?? "CLIENT"}
          loading={isFetching}
          data={data?.results}
          partyCode={partyCode}
          stateId={stateId}
          cityCode={cityCode}
        />
          {data?.results !== null && (
            <PaddingTable
              onChange={(e) => {
                setTake(Number(e.target.value));
                setSkip(0);
                setPage(1);
              }}
              pages={data?.info?.pages ?? 0}
              page={page}
              result={data?.info?.result ?? 0}
              count={data?.info?.count ?? 0}
              isPreviousData={isPreviousData}
              nextPage={nextPage}
              prevPage={prevPage}
              next={data?.info?.next ?? null}
              isFetching={isFetching}
            />
          )}
      </div>
    </>
  );
}
