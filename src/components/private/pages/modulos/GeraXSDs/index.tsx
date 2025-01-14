"use client";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChangeEvent, useEffect, useRef, useState, useCallback } from "react";
import { queryClient } from "@/provider/query.provider";
import { User } from "@/hooks/Access/User/useAuth";
import {
  LucideDownloadCloud,
  LucideRefreshCw,
  LucideDelete,
  LucideTrash2,
  LucideUploadCloud,
} from "lucide-react";
import { api } from "@/lib/api";
import { TableXSD } from "./Table";
import FormularioDownload, {
  FormularioDownloadRef,
} from "./FormularioDownload";
import FormularioUpload, { FormularioUploadRef } from "./FormularioUpload";
import { useNotify } from "@/components/Toast/toast";
import z from "zod";
import TableFilterXSD from "./Filter";
import ButtonBase from "@/components/Buttons/ButtonBase";
import React from "react";
import ButtonIcon from "@/components/Buttons/ButtonIcon";

let interval: any;

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

export default function GeraXSDs() {
  const notify = useNotify();

  const user: User = queryClient.getQueryData("authUser") as User;

  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [filter, setFilter] = useState<{ ano: string | null; partido: string }>(
    {
      ano: null,
      partido: "",
    }
  );

  const modalFormularioDownloadRef = useRef<FormularioDownloadRef>(null);
  const modalFormularioUploadRef = useRef<FormularioUploadRef>(null);

  const [data, setData] = useState<any>([]);
  const [page, setPage] = useState(1);
  const [skip, setSkip] = useState(0);
  const [take, setTake] = useState(15);
  const [reload, setReload] = useState(0);

  const prevPage = useCallback(() => {
    setSkip((old) => Math.max(old - take, 0));
    setPage((old) => Math.max(old - 1, 0));
  }, []);

  const nextPage = useCallback(() => {
    setSkip((old) => old + take);
    setPage((old) => old + 1);
  }, []);

  const fetchData = async () => {
    clearInterval(interval);
    interval = setTimeout(() => {
      setIsFetching(true);
      api
        .post(`/gera_xsds`, {
          ...filter,
          itensPorPagina: take,
          paginaAtual: page,
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
  };

  const handleButtonDeleteClick = async () => {
    setIsFetching(true);
    const registros = data.results
      .filter((v: any) => v.SELECIONADO)
      .map((v: any) => v.ID);
    if (registros.length) {
      await api.post(`/gera_xsds/deletar`, { ids: registros });
      await fetchData();
    } else {
      alert("Selecione pelo menos um registro.");
      setIsFetching(false);
    }
  };

  const handleButtonRefreshClick = () => {
    fetchData();
  };

  useEffect(() => {
    fetchData();
  }, [filter, page, take, reload]);

  async function handleSearchOnChange(
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>
  ) {
    const { name, value } = e.target;
    setFilter((old) => ({ ...old, [name]: value }));
    setPage(1);
    await fetchData();
  }

  const methods = useForm<FormDataType | SPCProps>({
    mode: "onSubmit",
    resolver: zodResolver(schema),
  });

  return (
    <>
      <FormularioDownload ref={modalFormularioDownloadRef} />
      <FormularioUpload ref={modalFormularioUploadRef} />
      <div className="flex flex-col  gap-2">
        <div className="flex   items-end justify-between gap-4 max-md:justify-center">
          <FormProvider {...methods}>
            <form>
              <TableFilterXSD onChange={handleSearchOnChange} />
            </form>
          </FormProvider>

          <div className="flex gap-2">
            {user?.role === "ADMIN" && (
              <>
                <ButtonIcon
                  icon={<LucideTrash2 size={16} className="h-fit w-5" />}
                  title="Excluir"
                  onClick={handleButtonDeleteClick}
                  disabled={isFetching}
                  loading={isFetching}
                  className="border-none bg-primary text-black hover:bg-primaryHover hover:text-black"
                />

                <ButtonIcon
                  className="border-none bg-primary text-black hover:bg-primaryHover hover:text-black"
                  title="Atualizar"
                  onClick={handleButtonRefreshClick}
                  disabled={isFetching}
                  loading={isFetching}
                  icon={<LucideRefreshCw size={16} className="h-fit w-5" />}
                />

                <ButtonBase
                  className="border-none bg-primary text-black hover:bg-primaryHover hover:text-black"
                  title="Download XSD"
                  onClick={() =>
                    modalFormularioDownloadRef.current?.openModal()
                  }
                  disabled={isFetching}
                  loading={isFetching}
                  startIcon={
                    <LucideDownloadCloud size={16} className="h-fit w-5" />
                  }
                >
                  XSD
                </ButtonBase>
                <ButtonBase
                  className="border-none bg-second text-white hover:bg-secondHover hover:text-white"
                  title="Upload CSV"
                  onClick={() => modalFormularioUploadRef.current?.openModal()}
                  disabled={isFetching}
                  loading={isFetching}
                  startIcon={
                    <LucideUploadCloud size={16} className="h-fit w-5" />
                  }
                >
                  CSV
                </ButtonBase>
              </>
            )}
          </div>
        </div>

        <TableXSD
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
        />
      </div>
    </>
  );
}
