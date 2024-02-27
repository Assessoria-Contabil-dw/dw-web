"use client";

import { useCallback, useContext, useState } from "react";
import { AccessContext } from "@/provider/context.provider";
import ButtonPrimary from "@/components/Buttons/ButtonPrimary";
import { useRelatoryListDirectory } from "@/hooks/useRelatory";
import { FormProvider, useForm } from "react-hook-form";
import SelectParty from "@/components/private/Form/Selects/SelectParty";
import SelectState from "@/components/private/Form/Selects/SelectState";
import SelectCity from "@/components/private/Form/Selects/SelectCity";
import SelectTypeOrg from "@/components/private/Form/Selects/SelectTypeOrg";

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
  spcYear?: string;
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
  const [stateName, setStateName] = useState<string>("");

  const methods = useForm();
  const {
    watch,
    register,
    handleSubmit,
    formState: { errors },
  } = methods;

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

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const memoizedHandleSubmit = useCallback(handleSubmit(handleFormOnSubmit), [
    methods,
    handleFormOnSubmit,
  ]);

  async function handleFormOnSubmit(data: any) {
    console.log("data", data);
    setSearch(data);
    const response = await refetch();
    console.log("contente", response.data);
    onSubmit({ content: response.data });
  }

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={memoizedHandleSubmit}
        className="h-fit w-full rounded-lg border-[1px] bg-white p-1"
      >
        <div className="h-full w-full space-y-2 overflow-y-auto p-3">
          <h4 className="text-h4">Filtrar por</h4>

          <label className="text-sm font-semibold">Diretorio</label>

          {!partyCode && (
            <SelectParty name="partyAbbreviation">
              <option value="" selected>
                Todos
              </option>
            </SelectParty>
          )}

           
          {!stateId && (
            <SelectState name="stateName" onChange={(e) => setStateName(e.target.value)}>
            <option value="" selected>
              Todos
            </option>
          </SelectState>
          )}

          {!cityCode && (
            <SelectCity name="cityName" stateName={stateName} stateId={stateId}>
            <option value="" selected>
              Todos
            </option>
          </SelectCity>
          )}

          <SelectTypeOrg name="typeOrgId">
            <option value="" selected>
              Todos
            </option>
          </SelectTypeOrg>

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
          <input
            {...register("dateFirst")}
            type="date"
            className="input-style"
            name="dateFirst"
          />
          <input
            {...register("dateLast")}
            type="date"
            className="input-style"
            name="dateLast"
          />

          <select {...register("status")} name="status" className="input-style">
            <option value="" selected>
              Todos
            </option>
            <option value="true">Ativo</option>
            <option value="false">Inativo</option>
          </select>

          <input
            {...register("isBefore")}
            type="number"
            className="input-style"
            placeholder="Dias"
          />
          <label className="text-sm font-semibold">SPC</label>
          <input
            {...register("spcYear")}
            type="number"
            className="input-style"
            placeholder="Ano"
          />

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
            Buscar
          </ButtonPrimary>
        </div>
      </form>
    </FormProvider>
  );
}
