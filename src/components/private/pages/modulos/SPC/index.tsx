"use client";
import { LoadingPrimary } from "@/components/Loading/primary";
import { TableSPC } from "./Table";
import { ChangeEvent, useCallback, useContext, useRef, useState, useEffect } from "react";
import { AccessContext } from "@/provider/context.provider";
import { queryClient } from "@/provider/query.provider";
import PaddingTable from "../../../Tools/TablePadding";
import { RefreshButton } from "@/components/Buttons/ButtonRefresh";
import TableFilterSPC from "./Filter";
import CreateSPCModel, { CreateSPCRef } from "./ModelCreate";
import { FormProvider, useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSPCData } from "@/hooks/SPC/useSPC";
import ButtonIcon from "@/components/Buttons/ButtonIcon";
import { Plus } from "lucide-react";
import { User } from "@/hooks/Access/User/useAuth";

interface SPCProps {
  partyAbbreviation?: string;
  stateName?: string;
  cityName?: string;
  year?: string;
  colorId?: string;
  vigencyStatus?: string;
}

const schema = z.object({
  
  partyAbbreviation: z.string().optional(),
  stateName: z.string().optional(),
  cityName: z.string().optional(),
  year: z.string().optional(),
  colorId: z.string().optional(),
  vigencyStatus: z.string().optional(),
});

type FormDataType = z.infer<typeof schema>;

export default function SPC() {
  const user: User = queryClient.getQueryData("authUser") as User;
  const { partyCode, cityCode, stateId } = useContext(AccessContext);
  const [filter, setFilter] = useState<SPCProps>({});
  const [stateName, setStateName] = useState("");

  const methods = useForm<FormDataType | SPCProps>({
    mode: "onSubmit",
    resolver: zodResolver(schema),
  });

  const modalCreateRef = useRef<CreateSPCRef>(null);
  const handleRegisterSPCModal = useCallback(() => {
    modalCreateRef.current?.openModal();
  }, []);

  const [page, setPage] = useState(1);
  const [skip, setSkip] = useState(0);
  const [take, setTake] = useState(15);

  const { data, isLoading, isFetching, isError, isPreviousData, refetch } =
    useSPCData(
      skip,
      take,
      partyCode,
      stateId,
      cityCode,
      filter.partyAbbreviation,
      filter.stateName,
      filter.cityName,
      filter.year,
      filter.colorId,
      filter.vigencyStatus
    );

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

  useEffect(() => {
    setSkip(take * (page - 1));
  }, [page])

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

  return (
    <>
      <CreateSPCModel ref={modalCreateRef} />
      <div className="flex flex-col gap-2">
        <div className="flex items-end justify-between gap-4">
          <FormProvider {...methods}>
            <form>
              <TableFilterSPC
                partyCode={partyCode}
                cityCode={cityCode}
                stateId={stateId}
                stateName={stateName}
                onChange={handleSearchOnChange}
              />
            </form>
          </FormProvider>

          <div className="flex gap-2">
            <RefreshButton isLoading={isFetching} queryName="spcData" />
            {user?.role === "ADMIN" && (
              <ButtonIcon
                className="border-none bg-second text-white hover:bg-secondHover hover:text-white"
                title="Cadastrar"
                onClick={handleRegisterSPCModal}
                icon={<Plus size={16} className="h-fit w-4" />}
              />
            )}
          </div>
        </div>

        <TableSPC
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
            setPage={setPage}
            next={data?.info?.next ?? null}
            isFetching={isFetching}
          />
        )}
      </div>
    </>
  );
}
