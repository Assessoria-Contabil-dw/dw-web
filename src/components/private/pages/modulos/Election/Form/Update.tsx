import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import dayjs from "dayjs";
import SelectLegend from "@/components/private/Search/Select/SelectLegend";
import { z } from "zod";
import { useElectionUpdate } from "@/hooks/Leader/useElection";
import ButtonPrimary from "@/components/Buttons/ButtonPrimary";
import SelectState from "@/components/private/Search/Select/SelectState";
import SelectCity from "@/components/private/Form/Selects/SelectCity";
import { useCallback, useState } from "react";
import ButtonTertiary from "@/components/Buttons/ButtonTertiary";

export default function FormUpdate({
  id,
  year,
  numPge,
  candAccount,
  colorId,
  observation,
  cnpj,
  accountOR,
  accountFP,
  accountFEFC,
  bank,
  agency,
  stateCode,
  cityName,
  onClick,
  onClose,
}: {
  id: number;
  year: string;
  numPge: string;
  candAccount: string;
  colorId: number;
  cityName: string;
  observation: string;
  cnpj: string;
  accountOR: string;
  accountFP: string;
  accountFEFC: string;
  bank: string;
  agency: string;
  stateCode: string;
  onClick: (id: string) => void;
  onClose: () => void;
}) {
  const [stateId, setState] = useState(stateCode);
  const [cityCode, setCity] = useState("");

  const spcFilterSchema = z.object({
    year: z.string(),
    numPge: z.string().optional(),
    candAccount: z.string().optional(),
    colorId: z.string().optional(),
    cityCode: z.string().optional(),
    stateCode: z.string().optional(),
    observation: z.string().optional(),
    cnpj: z.string().optional(),
    accountOR: z.string().optional(),
    accountFP: z.string().optional(),
    accountFEFC: z.string().optional(),
    bank: z.string().optional(),
    agency: z.string().optional(),
  });

  type spcUpdateType = z.infer<typeof spcFilterSchema>;

  const methods = useForm<spcUpdateType>({
    defaultValues: {
      year: year,
      numPge: numPge ?? "",
      candAccount: candAccount ?? "",
      colorId: String(colorId) ?? "",
      stateCode: stateCode ?? "",
      observation: observation ?? "",
      cnpj: cnpj ?? "",
      accountOR: accountOR ?? "",
      accountFP: accountFP ?? "",
      accountFEFC: accountFEFC ?? "",
      bank: bank ?? "",
      agency: agency ?? "",
    },
    mode: "onSubmit",
    resolver: zodResolver(spcFilterSchema),
  });

  const { handleSubmit, watch, setValue, register } = methods;

  //atualizar spc
  const { mutate, isLoading, isSuccess } = useElectionUpdate(
    String(id),
    watch("year"),
    watch("numPge"),
    watch("candAccount"),
    watch("colorId"),
    cityCode == "" ? undefined : cityCode,
    watch("observation"),
    watch("cnpj"),
    watch("accountOR"),
    watch("accountFP"),
    watch("accountFEFC"),
    watch("bank") == "" ? undefined : watch("bank"),
    watch("agency")
  );

  const memoizedHandleSubmit = useCallback(handleSubmit(onSubmit), [
    methods,
    onSubmit,
  ]);

  async function onSubmit(data: spcUpdateType) {
    mutate();
  }

  if (isSuccess) {
    onClose();
  }

  return (
    <>
      <FormProvider {...methods}>
        <form
          onSubmit={memoizedHandleSubmit}
          className="grid w-full grid-flow-row gap-2 border-none p-0"
        >
          <div className="flex w-full flex-col gap-2 ">
            <div className="flex items-end gap-2">
              <div className="flex w-[50%] flex-col gap-1">
                <div className="flex gap-1">
                  <label className="text-label">Ano</label>
                </div>
                <input
                  type="number"
                  {...register("year")}
                  name="year"
                  className="input-style"
                  defaultValue={year}
                  min={2017}
                  max={dayjs().year()}
                />
              </div>

              <div className="flex w-full flex-col gap-1">
                <div className="flex gap-1">
                  <label className="text-label">N° PGE</label>
                </div>
                <input
                  type="text"
                  className="input-style"
                  defaultValue={numPge}
                  {...register("numPge")}
                  name="numPge"
                  placeholder="Num PGE"
                />
              </div>

              <div className="flex w-full flex-col gap-1">
                <div className="flex gap-1">
                  <label className="text-label">CandContas</label>
                </div>
                <input
                  type="text"
                  className="input-style"
                  defaultValue={numPge}
                  {...register("candAccount")}
                  name="candAccount"
                  placeholder="Num CandContas"
                />
              </div>

              <SelectLegend
                {...register("colorId")}
                label="Status"
                onChange={(e) => setValue("colorId", e.target.value)}
                valueSelect={colorId}
                name="colorId"
                className="w-[70%]"
              >
                <option hidden value="" selected>
                  Selecione um status
                </option>
              </SelectLegend>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex w-full min-w-[90px] flex-col gap-1">
                <div className="flex gap-1">
                  <label className="text-label">CNPJ</label>
                </div>
                <input
                  type="text"
                  className="input-style"
                  defaultValue={cnpj}
                  {...register("cnpj")}
                  name="cnpj"
                  placeholder="CNPJ"
                />
              </div>

              <SelectState
                {...register("stateCode")}
                defaultValue={stateCode}
                name="stateCode"
                onChange={(e) => {
                  setState(e.target.value);
                }}
              >
                <option value="">Todos</option>
              </SelectState>

              <SelectCity
                {...register("cityCode")}
                defaultValue={cityName}
                name="cityCode"
                stateId={stateId}
                cityName={cityName}
                onChange={(e) => {
                  const selectedOption =
                    e.target.options[e.target.selectedIndex].getAttribute(
                      "data-code"
                    );
                  setCity(selectedOption as string);
                }}
              >
                <option value="" selected>
                  Todos
                </option>
              </SelectCity>

             
            </div>

            <div className="flex items-center gap-2">
            <div className="flex w-[70%] flex-col gap-1">
                <div className="flex gap-1">
                  <label className="text-label">Banco</label>
                </div>
                <select className="input-style" {...register("bank")}>
                  <option value="">Selecione um banco</option>
                  <option value="BANCO_DO_BRASIL" className="font-medium">
                    BB
                  </option>
                  <option value="CAIXA" className="font-medium">
                    CAIXA
                  </option>
                  <option value="BRADESCO" className="font-medium">
                    BRADESCO
                  </option>
                  <option value="ITAU" className="font-medium">
                    ITAU
                  </option>
                  <option value="SANTANDER" className="font-medium">
                    SANTANDER
                  </option>
                </select>
              </div>

              <div className="flex w-[60%] flex-col gap-1">
                <div className="flex gap-1">
                  <label className="text-label">Agência</label>
                </div>
                <input
                  type="text"
                  className="input-style"
                  defaultValue={agency}
                  {...register("agency")}
                  name="agency"
                  placeholder="Agência"
                />
              </div>
              <div className="flex w-full min-w-[90px] flex-col gap-1">
                <div className="flex gap-1">
                  <label className="text-label">Conta OR</label>
                </div>
                <input
                  type="text"
                  className="input-style"
                  defaultValue={accountOR}
                  {...register("accountOR")}
                  name="accountOR"
                  placeholder="Conta OR"
                />
              </div>

              <div className="flex w-full min-w-[90px] flex-col gap-1">
                <div className="flex gap-1">
                  <label className="text-label">Conta FP</label>
                </div>
                <input
                  type="text"
                  className="input-style"
                  defaultValue={accountFP}
                  {...register("accountFP")}
                  name="accountFP"
                  placeholder="Conta FP"
                />
              </div>

              <div className="flex w-full min-w-[90px] flex-col gap-1">
                <div className="flex gap-1">
                  <label className="text-label">Conta FEFC</label>
                </div>
                <input
                  type="text"
                  className="input-style"
                  defaultValue={accountFEFC}
                  {...register("accountFEFC")}
                  name="accountFEFC"
                  placeholder="Conta FEFC"
                />
              </div>
            </div>

            <div className="flex items-end justify-end gap-2">
              <div className="flex w-full min-w-[90px] flex-col gap-1">
                <div className="flex gap-1">
                  <label className="text-label">Observação</label>
                </div>
                <textarea
                  className="input-style"
                  placeholder="Observação"
                  {...register("observation")}
                  required={false}
                  name="observation"
                >
                  {observation}
                </textarea>
              </div>
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <ButtonTertiary
              title="Cancelar"
              variant="cancel"
              onClick={() => onClick("")}
            >
              Cancelar
            </ButtonTertiary>
            <ButtonPrimary
              title="Atualizar"
              variant="fill"
              type="submit"
              loading={isLoading}
              className="items-center justify-center"
            >
              Atualizar
            </ButtonPrimary>
          </div>
        </form>
      </FormProvider>
    </>
  );
}
