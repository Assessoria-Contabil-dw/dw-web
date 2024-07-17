"use client";

import { useElectionData } from "@/hooks/Leader/useElection";
import { TableElection } from "./Table";
import { ChangeEvent, useCallback, useState } from "react";
import { User } from "@/hooks/Access/User/useAuth";
import { queryClient } from "@/provider/query.provider";
import PaddingTable from "@/components/private/Tools/TablePadding";
import { LoadingPrimary } from "@/components/Loading/primary";
import { RefreshButton } from "@/components/Buttons/ButtonRefresh";
import { FormProvider, useForm } from "react-hook-form";
import TableFilter from "./Filter";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";


interface ElectionProps {
  leaderName?: string;
  stateName?: string;
  cityName?: string;
  year?: string;
  colorId?: string;
}

export default function Election() {

  const [filter, setFilter] = useState<ElectionProps>({});
  const user: User = queryClient.getQueryData("authUser") as User;
  const [stateName, setStateName] = useState("");

  const schema = z.object({
    leaderName: z.string().optional(),
    stateName: z.string().optional(),
    cityName: z.string().optional(),
    year: z.string().optional(),
    colorId: z.string().optional(),
  });
  
  type FormDataType = z.infer<typeof schema>;
  
  const [page, setPage] = useState(1);
  const [skip, setSkip] = useState(0);
  const [take, setTake] = useState(15);

  const {data, isLoading, isFetching, isError, isPreviousData, refetch} = useElectionData(
    skip,
    take,
    filter.leaderName,
    filter.year,
    filter.colorId,
    filter.stateName,
    filter.cityName,
  )

  const methods = useForm<FormDataType | ElectionProps>({
    mode: "onSubmit",
    resolver: zodResolver(schema),
  });

  async function handleSearchOnChange(
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>
  ) {
    const { name, value } = e.target;

    if (name === "stateName") {
      setStateName(value);
      setFilter((old) => ({ ...old, cityName: undefined }));
    }
    if (name === "year" && value.length < 4) {
      setFilter((old) => ({ ...old, [name]: undefined }));
      return;
    }
    setPage(1);
    setSkip(0);
    setFilter((old) => ({ ...old, [name]: value }));

    console.log(filter);
    await refetch();
  }

  const prevPage = useCallback(() => {
    setSkip((old) => Math.max(old - take, 0));
    setPage((old) => Math.max(old - 1, 0));
  }, []);

  const nextPage = useCallback(() => {
    setSkip((old) => old + take);
    setPage((old) => old + 1);
  }, []);

  if (isLoading) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <LoadingPrimary />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <p className="text-slate-400">Desculpe, parece que algo deu errado!</p>
      </div>
    );
  }


    return(
        <>
        {/* <CreateSPCModel ref={modalCreateRef} /> */}
        <div className="flex flex-col gap-2">
          <div className="flex items-end justify-between gap-4">
            <FormProvider {...methods}>
              <form>
                <TableFilter
                  stateName={stateName}
                  onChange={handleSearchOnChange}
                />
              </form>
            </FormProvider>
  
            <div className="flex gap-2">
            <RefreshButton isLoading={isFetching} queryName="electionData" />
              {/* 
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
    )
}