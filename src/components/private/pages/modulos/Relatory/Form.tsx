"use client";

import { useContext, useState } from "react";
import { AccessContext } from "@/provider/context.provider";
import ButtonPrimary from "@/components/Buttons/ButtonPrimary";
import { useRelatoryListDirectory } from "@/hooks/useRelatory";
import { useForm } from "react-hook-form";

interface Search {
  content: string;
  partyCode: number | undefined;
  stateUf: string | undefined;
  cityCode: string | undefined;
  partyAbbreviation: string | undefined;
  stateName: string | undefined;
  cityName: string | undefined;
  typeOrgId: string | undefined;
  vigencyStatus: string | undefined;
  spcStatusId: string | undefined;
  spcYear?: string,
  dateFirst: string | undefined;
  dateLast: string | undefined;
  isBefore: string | undefined;
  status: string | undefined;
}

interface FormDocumentProps {
  onSubmit: (data: any) => void;
  content: string | undefined;
  editor: boolean;
}

export function FormDocument({ onSubmit, content, editor }: FormDocumentProps) {
  const [search, setSearch] = useState<Search>({} as Search);
  const { partyCode, cityCode, stateId } = useContext(AccessContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { refetch, isFetching } = useRelatoryListDirectory(
    "oi",
    partyCode,
    stateId,
    cityCode,
    search.partyAbbreviation,
    search.stateName,
    search.cityName,
    search.typeOrgId,
    search.vigencyStatus,
    search.spcStatusId,
    search.spcYear,
    search.dateFirst,
    search.dateLast,
    search.isBefore,
    search.status
  );

  async function handleRelatoryDirectory(data: any) {
    console.log("data", data);
    setSearch(data);
    const response = await refetch();
    console.log("contente", response.data);
    onSubmit({ content: response.data });
  }

  return (
    <form
      onSubmit={handleSubmit(handleRelatoryDirectory)}
      className="h-fit w-full rounded-lg border-[1px] bg-white p-1"
    >
      <div className="h-full w-full space-y-2 overflow-y-auto  p-3">
      <label className="text-sm font-semibold">Diretorio</label>

        {!partyCode && (
          <input
            {...register("partyAbbreviation")}
            name="partyAbbreviation"
            type="text"
            className="input-style"
            placeholder="Partido Sigla"
          />
        )}

        {!stateId && (
          <input
            {...register("stateName")}
            name="stateName"
            type="text"
            className="input-style"
            placeholder="Estado"
          />
        )}

        {!cityCode && (
          <input
            {...register("cityName")}
            name="cityName"
            type="text"
            className="input-style"
            placeholder="Cidade"
          />
        )}

        <select
          {...register("typeOrgId")}
          name="typeOrgId"
          className="input-style"
        >
          <option value="" selected disabled>
            Todos
          </option>
          <option value="1">Nacional</option>
          <option value="2">Estadual</option>
          <option value="3">Municipal</option>
        </select>

        <select
          {...register("vigencyStatus")}
          name="vigencyStatus"
          className="input-style"
        >
          <option value="" selected disabled>
            Todos
          </option>
          <option value="true">Vigente</option>
          <option value="false">Não Vigente</option>
        </select>

        <label className="text-sm font-semibold">Vigência</label>
        <input  {...register("dateFirst")} type="date" className="input-style" name="dateFirst" />
        <input  {...register("dateLast")} type="date" className="input-style" name="dateLast" />

        <select {...register("status")} name="status" className="input-style">
          <option value="" selected>
            Todos
          </option>
          <option value="true">Ativo</option>
          <option value="false">Inativo</option>
        </select>

          <input  {...register("isBefore")} type="number" className="input-style" placeholder="Dias" />
        <label className="text-sm font-semibold">SPC</label>
        <input  {...register("spcYear")} type="number" className="input-style" placeholder="Ano"/>

        <select
          {...register("spcStatusId")}
          name="spcStatusId"
          className="input-style"
        >
          <option value="" selected disabled>
            Todos
          </option>
          <option value="1">Pool</option>
          <option value="2">Regente</option>
        </select>


        <ButtonPrimary
          title="Preencher documento"
          type="submit"
          variant="fill"
          loading={isFetching}
          className="w-full justify-center"
          // disabled={!(search.template && search.vigency && search.local)}
        >
          Preencher
        </ButtonPrimary>
      </div>
    </form>
  );
}
