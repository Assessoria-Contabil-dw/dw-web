"use client";

import { TableElection } from "./Table";

export default function Election() {
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
            // role={user?.role ?? "CLIENT"}
            // loading={isFetching}
            // data={data?.results}
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