import { FormProvider, useFieldArray, useForm } from "react-hook-form";
import SelectLegend from "@/components/private/Search/Select/SelectLegend";
import { Plus, X } from "lucide-react";
import ButtonPrimary from "@/components/Buttons/ButtonPrimary";
import InputBase from "@/components/private/Search/Input/InputBase";
import { spcCreateSchema, spcCreateType } from "../@types/zod.type";
import { zodResolver } from "@hookform/resolvers/zod";
import { ErrorMessage } from "@hookform/error-message";
import { useCallback } from "react";
import dayjs from "dayjs";
import { useSPCCreate } from "@/hooks/SPC/useSPC";
import FilterDirectory from "../../Document/Form/FilterDirectory";

export default function FormCreateSPC() {
  const methods = useForm<spcCreateType>({
    defaultValues: {
      directoryId: "",
      spcArray: [
        {
          type: "",
          year: "",
          numPge: "",
          colorId: "",
          observation: "",
        },
      ],
    },
    mode: "onSubmit",
    resolver: zodResolver(spcCreateSchema),
  });

  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors },
  } = methods;
  const { fields, append, remove } = useFieldArray({
    control,
    name: "spcArray",
  });

  function addSPC() {
    append({
      type: "",
      year: "",
      numPge: "",
      colorId: "",
      observation: "",
    });
  }

  const memoizedHandleSubmit = useCallback(handleSubmit(onSubmit), [
    methods,
    onSubmit,
  ]);

  const { isFetching, refetch } = useSPCCreate(
    watch("directoryId"),
    watch("spcArray")
  );
  async function onSubmit(data: spcCreateType) {
    console.log("data", data);
    await refetch();
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={memoizedHandleSubmit} className="model-body">
        <div>
          <div className="flex flex-row items-end justify-between gap-4 w-full">
            <FilterDirectory
              partyCode={undefined}
              stateId={undefined}
              cityCode={undefined}
              label="Diretório"
              {...register("directoryId")}
              name="directoryId"
            />

            <ButtonPrimary
              variant="fill"
              title="Adiconar"
              onClick={addSPC}
              startIcon={<Plus size={20} />}
              className="items-center justify-center bg-second text-white hover:bg-secondHover hover:text-white"
            >
              SPC
            </ButtonPrimary>
          </div>
          <ErrorMessage
            errors={errors}
            name="directoryId"
            render={({ message }) => (
              <span className="text-span text-orange-500">{message}</span>
            )}
          />
        </div>

        {fields.map((item, index) => (
          <div
            key={item.id}
            className="flex flex-col gap-4 rounded border-2 p-2"
          >
            <div className="flex justify-between">
              <h5 className="text-h5">SPC {index + 1}</h5>
              <button
                type="button"
                onClick={() => remove(index)}
                className="model-close"
              >
                <X size={20} />
              </button>
            </div>

            <div>
              <div className="flex gap-8">
                <div className="flex gap-2">
                  <input
                    type="radio"
                    value="SPCA"
                    {...register(`spcArray.${index}.type`)}
                    name={`spcArray.${index}.type`}
                  />
                  <label htmlFor="">SPCA</label>
                </div>

                <div className="flex gap-2">
                  <input
                    type="radio"
                    value="SPCE"
                    {...register(`spcArray.${index}.type`)}
                    name={`spcArray.${index}.type`}
                  />
                  <label htmlFor="">SPCE</label>
                </div>
              </div>
              <ErrorMessage
                errors={errors}
                name={`spcArray.${index}.type`}
                render={({ message }) => (
                  <span className="text-span text-orange-500">{message}</span>
                )}
              />
            </div>

            <div className=" flex gap-2">
              <div>
                <InputBase
                  {...register(`spcArray.${index}.year`)}
                  name={`spcArray.${index}.year`}
                  min={watch(`spcArray.${index}.type`) === "SPCA" ? 2017 : 2018}
                  max={dayjs().year()}
                  placeholder={String(dayjs().year())}
                  type="number"
                  label="Ano"
                  step={watch(`spcArray.${index}.type`) === "SPCA" ? 1 : 2}
                />
                <ErrorMessage
                  errors={errors}
                  name={`spcArray.${index}.year`}
                  render={({ message }) => (
                    <span className="text-span text-orange-500">{message}</span>
                  )}
                />
              </div>

            
             <div className="w-full">
             <SelectLegend
                {...register(`spcArray.${index}.colorId`)}
                name={`spcArray.${index}.colorId`}
                label="Status"
                onChange={(e) => {
                  setValue(`spcArray.${index}.colorId`, e.target.value);
                }}
              >
                <option value="" hidden selected>
                  Selecione um status
                </option>
              </SelectLegend>
             <ErrorMessage
                  errors={errors}
                  name={`spcArray.${index}.colorId`}
                  render={({ message }) => (
                    <span className="text-span text-orange-500">{message}</span>
                  )}
                />
             </div>
           
            </div>

            <InputBase
              label="n° PJE"
              {...register(`spcArray.${index}.numPge`)}
              name={`spcArray.${index}.numPge`}
              placeholder="Digite o número"
              type="text"
            />
            <InputBase
              {...register(`spcArray.${index}.observation`)}
              type="text"
              name={`spcArray.${index}.observation`}
              label="Observação"
              placeholder="Digite a observação"
            />
          </div>
        ))}

        <ButtonPrimary
          loading={isFetching}
          variant="fill"
          title="Cadastrar"
          type="submit"
          className="items-center justify-center"
        >
          Cadastrar
        </ButtonPrimary>
      </form>
    </FormProvider>
  );
}
