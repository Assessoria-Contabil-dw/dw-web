import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { spcFilterSchema, spcUpdateType } from "../@types/zod.type";
import { Check, Trash, X } from "lucide-react";
import dayjs from "dayjs";
import SelectLegend from "@/components/private/Search/Select/SelectLegend";
import ButtonIcon from "@/components/Buttons/ButtonIcon";
import { useCallback,  useRef } from "react";
import DeleteModel, { DeleteRef } from "@/components/private/Model/Delete";
import { useSPCUpdateById } from "@/hooks/SPC/useSPC";
import { spcUpdateProps } from "../../SPC/@types/interface.type";

export default function FormUpdateSPC({
  id,
  year,
  numPge,
  colorId,
  observation,
  onClick,
}: spcUpdateProps) {
  const methods = useForm<spcUpdateType>({
    defaultValues: {
      year: year,
      numPge: numPge,
      colorId: String(colorId),
      observation: observation,
    },
    mode: "onSubmit",
    resolver: zodResolver(spcFilterSchema),
  });

  const { handleSubmit, watch,  setValue, register } =
    methods;

  //deletar spc
  const modalDeleteRef = useRef<DeleteRef>(null);
  const handleDelete = useCallback((id: number, year: string) => {
    modalDeleteRef.current?.openModal(
      String(id),
      "spc",
      `Deseja excluir o SPC ${year}`,
      "spcDirectoryById"
    );
  }, []);

  //atualizar spc
  const { refetch, isFetching } = useSPCUpdateById(
    String(id),
    watch("year"),
    watch("numPge"),
    watch("colorId"),
    watch("observation")
  );

  async function onSubmit(data: spcUpdateType) {
    await refetch();
  }

  return (
    <>
      <DeleteModel ref={modalDeleteRef} />
      <FormProvider {...methods}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid w-full grid-flow-col gap-2 border-none p-0"
        >
          <button
            onClick={() => onClick("")}
            className="w-fit rounded-full p-0 text-gray-300 hover:text-gray-600"
          >
            <X size={18} />
          </button>

          <div className="flex flex-col gap-2">
            <div className="flex items-end gap-2">
              <input
                type="number"
                {...register("year")}
                name="year"
                className="input-style"
                defaultValue={year}
                min={2017}
                max={dayjs().year()}
              />
              <input
                type="text"
                className="input-style"
                defaultValue={numPge}
                {...register("numPge")}
                name="numPge"
              />

              <SelectLegend
                {...register("colorId")}
                label="Status"
                onChange={(e) => setValue("colorId", e.target.value)}
                valueSelect={colorId}
                name="colorId"
              >
                <option hidden value="" selected>Selecione um status</option>
              </SelectLegend>
            </div>

            <div className="flex items-center gap-2">
              <textarea
                className="input-style"
                placeholder="Observação"
                {...register("observation")}
                name="observation"
              >
                {observation}
              </textarea>

              <ButtonIcon
                loading={isFetching}
                icon={<Check size={18} />}
                title="Atualizar"
                className="border-none bg-primary text-white hover:bg-primaryHover"
                type="submit"
              />
              <ButtonIcon
                title="Deletar"
                icon={<Trash size={18} />}
                className="border-none bg-red-400 text-white hover:bg-red-500"
                type="button"
                onClick={() => handleDelete(id, year)}
              />
            </div>
          </div>
        </form>
      </FormProvider>
    </>
  );
}
