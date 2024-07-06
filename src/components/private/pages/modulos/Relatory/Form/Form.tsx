"use client";

import { useCallback, useContext, useState } from "react";
import { AccessContext } from "@/provider/context.provider";
import { useRelatoryListDirectory } from "@/hooks/useRelatory";
import { FormProvider, useForm } from "react-hook-form";

import ButtonPrimary from "@/components/Buttons/ButtonPrimary";
import SelectLegend from "./SelectLegend";
import SelectTypeOrg from "@/components/private/Form/Selects/SelectTypeOrg";
import SelectCity from "@/components/private/Form/Selects/SelectCity";
import SelectState from "@/components/private/Form/Selects/SelectState";
import SelectParty from "@/components/private/Form/Selects/SelectParty";
import ButtonTertiary from "@/components/Buttons/ButtonTertiary";

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
  relatoryOption: number;
  progressBar: (id: number) => void;
}

export function FormDocument({
  onSubmit,
  content,
  editor,
  relatoryOption,
  progressBar,
}: FormDocumentProps) {
  const [search, setSearch] = useState<Search>({} as Search);
  const { partyCode, cityCode, stateId } = useContext(AccessContext);
  const [stateName, setStateName] = useState<string>("");
  const [colors, setColors] = useState<
    {
      name: string;
      id: number;
      hex: string;
    }[]
  >([]);

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
    watch("partyAbbreviation"),
    watch("stateName"),
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
    const colorsId = colors.map((color) => color.id);
    console.log("data", data, colorsId);


    progressBar(3);
    // setSearch(data);
    const response = await refetch();
    // console.log("contente", response.data);
    onSubmit({ content: response.data });
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={memoizedHandleSubmit} className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h2 className="text-h3">
            {relatoryOption === 1
              ? "Diretórios e Status"
              : relatoryOption === 2
              ? "Diretórios com Vigência próxima"
              : relatoryOption === 3
              ? "Diretórios e Representantes"
              : "Diretórios e SPC's"}
          </h2>
          {!partyCode && (
            <SelectParty name="partyAbbreviation">
              <option value="" selected>
                Todos
              </option>
            </SelectParty>
          )}

          <div className="flex gap-2">
            {!stateId && (
              <SelectState
                name="stateName"
                onChange={(e) => setStateName(e.target.value)}
              >
                <option value="" selected>
                  Todos
                </option>
              </SelectState>
            )}

            {!cityCode && (
              <SelectCity
                name="cityName"
                stateName={stateName}
                stateId={stateId}
              >
                <option value="" selected>
                  Todos
                </option>
              </SelectCity>
            )}
          </div>

          <div className="flex gap-2">
            <SelectTypeOrg name="typeOrgId">
              <option value="" selected>
                Todos
              </option>
            </SelectTypeOrg>

            <div>
              <label className="text-h4 text-slate-700">Vigência</label>
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
            </div>
          </div>

          {relatoryOption === 2 && (
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold">
                Dias para vencimento
              </label>

              <input
                {...register("vencimentDate")}
                type="number"
                placeholder="Vigência em dias"
                className="input-style"
                name="vencimentDate"
                min={0}
                max={365}
              />
            </div>
          )}

          {relatoryOption === 4 && (
            <div>
              <SelectLegend
                label="Status"
                name="colorId"
                setColors={setColors}
                colors={colors}
              >
                <option value="">Todos</option>
              </SelectLegend>
            </div>
          )}
        </div>

        <div className="flex w-full justify-between gap-2">
          <ButtonTertiary
            onClick={() => progressBar(1)}
            title="Próximo"
            variant="cancel"
            disabled={relatoryOption === 0}
          >
            Voltar
          </ButtonTertiary>

          <ButtonPrimary
            title="Preencher documento"
            type="submit"
            variant="fill"
            // loading={isFetching}
            className="w-fit justify-center"
            // disabled={!(search.template && search.vigency && search.local)}
          >
            Gerar
          </ButtonPrimary>
        </div>
      </form>
    </FormProvider>
  );
}
