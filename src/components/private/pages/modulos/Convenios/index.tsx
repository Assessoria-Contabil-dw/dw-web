"use client";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChangeEvent, useEffect, useRef, useState, useCallback, useContext } from "react";
import { queryClient } from "@/provider/query.provider";
import { User } from "@/hooks/Access/User/useAuth";
import { LucideRefreshCw, LucidePlus } from "lucide-react";
import { api } from "@/lib/api";
import { TableConvenio } from "./Table";
import { useNotify } from "@/components/Toast/toast";
import z from "zod";
import TableFilterConvenio from "./Filter";
import ButtonBase from "@/components/Buttons/ButtonBase";
import React from "react";
import ButtonIcon from "@/components/Buttons/ButtonIcon";
import { AccessContext } from "@/provider/context.provider";
import FormularioConvenio, { FormularioConvenioRef } from "./FormularioConvenio";

let interval: any;

const schema = z.object({
  search: z.string().optional(),
  convenio: z.string().optional(),
});

type FormDataType = z.infer<typeof schema>;

export default function Convenios() {
  const notify = useNotify();

  const user: User = queryClient.getQueryData("authUser") as User;
  const { partyCode, cityCode, stateId } = useContext(AccessContext);

  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [filter, setFilter] = useState<{ search?: string; convenio?: string }>({
    search: "",
    convenio: "",
  });

  const modalFormularioConvenioRef = useRef<FormularioConvenioRef>(null);

  const [data, setData] = useState<any>(null);
  const [page, setPage] = useState(1);
  const [skip, setSkip] = useState(0);
  const [take, setTake] = useState(15);
  const [reload, setReload] = useState(0);

  const prevPage = useCallback(() => {
    setSkip((old) => Math.max(old - take, 0));
    setPage((old) => Math.max(old - 1, 0));
  }, [take]);

  const nextPage = useCallback(() => {
    setSkip((old) => old + take);
    setPage((old) => old + 1);
  }, [take]);

  const fetchData = useCallback(async () => {
    clearInterval(interval);
    interval = setTimeout(() => {
      setIsFetching(true);
      api
        .get(`/convenios`, {
          params: {
            ...filter,
            itensPorPagina: take,
            paginaAtual: page,
          },
        })
        .then((response) => {
          setData(response.data);
          setIsFetching(false);
        })
        .catch((error) => {
          setIsFetching(false);
          notify({ type: "error", message: error.message });
        });
    }, 700);
  }, [filter, take, page, notify]);

  const handleButtonRefreshClick = () => {
    fetchData();
  };

  const handleButtonAddClick = () => {
    modalFormularioConvenioRef.current?.openModal();
    modalFormularioConvenioRef.current?.passIdData(null);
  };

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  async function handleSearchOnChange(
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>
  ) {
    const { name, value } = e.target;
    setFilter((old) => ({ ...old, [name]: value }));
    setPage(1);
  }

  const methods = useForm<FormDataType>({
    mode: "onSubmit",
    resolver: zodResolver(schema),
  });

  return (
    <>
      <FormularioConvenio ref={modalFormularioConvenioRef} />
      <div className="flex flex-col gap-2">
        <div className="flex items-end justify-between gap-4 max-md:justify-center">
          <FormProvider {...methods}>
            <form>
              <TableFilterConvenio onChange={handleSearchOnChange} />
            </form>
          </FormProvider>

          <div className="flex gap-2">
            <ButtonIcon
              className="border-none bg-primary text-black hover:bg-primaryHover hover:text-black"
              title="Atualizar"
              onClick={handleButtonRefreshClick}
              disabled={isFetching}
              loading={isFetching}
              icon={<LucideRefreshCw size={16} className="h-fit w-5" />}
            />

            <ButtonBase
              className="border-none bg-second text-white hover:bg-secondHover hover:text-white"
              title="Novo Convênio"
              onClick={handleButtonAddClick}
              disabled={isFetching}
              loading={isFetching}
              startIcon={<LucidePlus size={16} className="h-fit w-5" />}
            >
              Novo Convênio
            </ButtonBase>
          </div>
        </div>

        <TableConvenio
          role={user?.role ?? "CLIENT"}
          loading={isFetching}
          data={data}
          setData={setData}
          prevPage={prevPage}
          nextPage={nextPage}
          setTake={setTake}
          setSkip={setSkip}
          setPage={setPage}
          page={page}
          fetchData={fetchData}
        />
      </div>
    </>
  );
}