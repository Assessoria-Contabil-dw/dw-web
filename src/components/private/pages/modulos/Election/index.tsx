"use client";

import { useElectionData } from "@/hooks/Leader/useElection";
import { TableElection } from "./Table";
import { useState } from "react";
import { User } from "@/hooks/Access/User/useAuth";
import { queryClient } from "@/provider/query.provider";

export default function Election() {

  const [filter, setFilter] = useState<{
    leaderName?: string;
    year?: string;
    legendId?: string;
  }>({});
  const user: User = queryClient.getQueryData("authUser") as User;

  const [page, setPage] = useState(1);
  const [skip, setSkip] = useState(0);
  const [take, setTake] = useState(15);

  const {data, isLoading, isFetching, isError, isPreviousData, refetch} = useElectionData(
    skip,
    take,
    filter.leaderName,
    filter.year,
    filter.legendId,
  )

    return(
        <>
        {/* <CreateSPCModel ref={modalCreateRef} /> */}
        <div className="flex flex-col gap-2">
          <div className="flex items-end justify-between gap-4">
            {/* <FormProvider {...methods}>
              <form>
                <TableFilterSPC
                  partyCode={partyCode}
                  cityCode={cityCode}
                  stateId={stateId}
                  stateName={stateName}
                  onChange={handleSearchOnChange}
                />
              </form>
            </FormProvider> */}
  
            <div className="flex gap-2">
              {/* <RefreshButton isLoading={isFetching} queryName="spcData" />
              {user?.role === "ADMIN" && (
                <ButtonIcon
                  className="border-none bg-second text-white hover:bg-secondHover hover:text-white"
                  title="Cadastrar"
                  onClick={handleRegisterSPCModal}
                  icon={<Plus size={16} className="h-fit w-4" />}
                />
              )} */}
            </div>
          </div>
  
          <TableElection
            role={user?.role ?? "CLIENT"}
            loading={isFetching}
            data={data?.results}
          />
  
          {/* {data?.results !== null && (
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
          )} */}
        </div>
      </>
    )
}