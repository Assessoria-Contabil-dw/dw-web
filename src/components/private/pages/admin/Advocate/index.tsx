"use client";

import {  Plus } from "lucide-react";
import { useCallback,  useRef,  useState } from "react";
import { LoadingSecond } from "@/components/Loading/second";
import ButtonPrimary from "@/components/Buttons/ButtonPrimary";
import { TableAdvocates } from "./Table";
import { useQuery } from "react-query";
import { AdvocatesService } from "@/services/Leader/advocates.service";
import { useNotify } from "@/components/Toast/toast";
import { Page } from "@/interfaces/page";
import PaddingTable from "@/components/private/Tools/TablePadding";
import { useForm } from "react-hook-form";
import Model, { ModelRef } from "@/components/private/components/Modal";
import { FormCreate } from "./FormCreate";
import { RefreshButton } from "@/components/Buttons/ButtonRefresh";


export function AdvocateTable() {
  const [page, setPage] = useState(1);
  const [skip, setSkip] = useState(0);
  const [take, setTake] = useState(15);
  const notify = useNotify();

  const { register, watch } = useForm({
    mode: "onSubmit",
  })

  const { data, isLoading, isPreviousData, isFetching } = useQuery<
    Page<{
      id: number;
      name: string;
      oab: string;
      birthday: string;
      title: string;
      cpf: string;
      email: string;
      phone: string;
      address: string;
      nationality: string;
      status: string;
      signatureUrl: string;
      lawFirmName: string;
      lawFirmId: string;
    }>
  >(
    ["advocateData", skip, take, watch("name"), watch("cpf")],
    async () => {
      const response = await AdvocatesService.getAll({
        skip: watch("name") || watch("cpf") ? 0 : skip,
        take: watch("name") || watch("cpf") ? 15 : take,
        name: watch("name"),
        cpf: watch("cpf"),
      });
      return response;
    },
    {
      keepPreviousData: true,
      staleTime: 1000 * 60 * 60 * 12,
      retry: false,
      refetchOnWindowFocus: false,
      onError: (error: any) => {
        if (error.response.status === 500) {
          console.log(error);
          return notify({
            type: "error",
            message: "Erro interno no servidor",
          });
        }
        return notify({
          type: "warning",
          message: error.response.data.message,
        });
      },
    }
  );

  const prevPage = useCallback(() => {
    setSkip((old) => Math.max(old - take, 0));
    setPage((old) => Math.max(old - 1, 0));
  }, []);

  const nextPage = useCallback(() => {
    setSkip((old) => old + take);
    setPage((old) => old + 1);
  }, []);

  const modelRef = useRef<ModelRef>(null);
  const handleRegisterOpenModel = useCallback(() => {
    modelRef.current?.openModel();
  }, []);

  const handleRegisterCloseModel = useCallback(() => {
    modelRef.current?.closeModel();
  }, []);

  if (isLoading && !data) {
    return (
      <div className="mt-4 flex items-center justify-center gap-2">
        <LoadingSecond />
        <i className="text-gray-500">Carregando...</i>
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col gap-4">
      <Model title="Cadastrar advogado" ref={modelRef}>
        <FormCreate onClose={handleRegisterCloseModel} />
      </Model>
     

      <div className="flex justify-between">
        <div className="flex w-fit gap-4">
          <input
            type="text"
            className="input-style w-fit"
            placeholder="Buscar por nome"
            {...register("name")}
          />

          <input
            type="text"
            className="input-style w-fit"
            placeholder="Buscar por CPF"
            {...register("cpf")}
          />
        </div>
        <div className="flex gap-3">
          
          <RefreshButton queryName="advocateData" isLoading={isFetching} />

          <ButtonPrimary
            title="Cadastrar"
            variant="fill"
            startIcon={<Plus className="w-4" />}
            onClick={() => handleRegisterOpenModel()}
          >
            Cadastrar
          </ButtonPrimary>
        </div>
      </div>
      <TableAdvocates data={data?.results} />
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
  );
}
