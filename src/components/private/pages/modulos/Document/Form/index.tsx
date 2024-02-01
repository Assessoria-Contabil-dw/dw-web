"use client";

import { ChangeEvent, useCallback, useContext, useState } from "react";
import { AccessContext } from "@/provider/context.provider";
import dayjs from "dayjs";
import ButtonPrimary from "@/components/Buttons/ButtonPrimary";
import { SlidersHorizontal } from "lucide-react";
import { FormProvider, useFieldArray, useForm } from "react-hook-form";
import SelectTemplate from "@/components/private/Form/Selects/SelectTemplate";
import { useDocumentVigency } from "@/hooks/useDocument";
import FilterVigency from "./FilterVigency";
import ItemArray from "./ItemArray";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ErrorMessage } from "@hookform/error-message";
import SelectOffice from "@/components/private/Form/Selects/SelectOffice";
import InputBase from "@/components/private/Search/Input/InputBase";
interface FormInputs {
  date: string | undefined;
  templateId: string | undefined;
  officeId: string | undefined;
  directoryArray: {
    id: string | undefined;
  }[];
  vigencyArray: {
    id: string | undefined;
  }[];
  variablesArray: {
    text: string | undefined;
  }[];
}
const schema = z.object({
  date: z.string().optional(),
  templateId: z.string().min(1, "Selecione um template"),
  office: z.string().optional(),
  directoryArray: z.array(
    z.object({ id: z.string().min(1, "Informe um valor") })
  ),
  vigencyArray: z
    .array(z.object({ id: z.string().min(1, "Informe um valor") }))
    .refine((data) => data.length > 0, {
      message: "Pelo menos um item é necessário em vigencias",
    }),
  variablesArray: z.array(
    z.object({ text: z.string().min(1, "Informe um valor") })
  ),
});

type FormDataType = z.infer<typeof schema>;

interface FormDocumentProps {
  onSubmit: (data: any) => void;
  onSetUrl: (data: string) => void;
  content: string | undefined;
  editor: boolean;
  className?: string;
}

export function FormDocument({
  onSubmit,
  content,
  editor,
  onSetUrl,
  className,
}: FormDocumentProps) {
  const { partyCode, cityCode, stateId } = useContext(AccessContext);
  const [isTools, setIsTools] = useState(false);

  const methods = useForm<FormInputs | FormDataType>({
    defaultValues: {
      date: dayjs().format("YYYY-MM-DD"),
      templateId: "",
      officeId: "",
      vigencyArray: [
        {
          id: "",
        },
      ],
    },
    mode: "onChange",
    resolver: zodResolver(schema),
  });

  const {
    handleSubmit,
    control,
    watch,
    formState: { errors, isSubmitting },
  } = methods;

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const memoizedHandleSubmit = useCallback(handleSubmit(handleFormOnSubmit), [
    methods,
    handleFormOnSubmit,
  ]);

  const methodsVigency = useFieldArray({
    control,
    name: "vigencyArray",
  });

  const methodsVariables = useFieldArray({
    control,
    name: "variablesArray",
  });

  const [template, setTemplate] = useState({
    id: undefined,
    content: undefined,
  });

  const { refetch, isFetching } = useDocumentVigency(
    watch("vigencyArray").map((item) => item.id),
    content,
    watch("date"),
    partyCode,
    stateId,
    cityCode,
    watch("variablesArray")?.map((item) => item.text),
    watch("officeId")
  );

  function handleSearchOnChange(
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>
  ) {
    const { name, value } = e.target;
    const { id, content } = JSON.parse(value);

    setTemplate({
      id,
      content,
    });

    onSetUrl("");
    onSubmit({ content });
    return;
  }

  async function handleFormOnSubmit(data: any) {
    console.log(data);

    const response = await refetch();
    onSetUrl("");
    onSubmit({ content: response.data });
  }

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={memoizedHandleSubmit}
        className={`h-full w-full rounded-lg border-[1px] bg-white p-1 ${className}`}
      >
        <div className="flex h-full flex-col gap-2">
          <div className="flex h-full w-full overflow-y-auto p-3">
            <div className="space-y-2">
              <div className=" flex items-center justify-between">
                <h4 className="text-h4">Emitir documento</h4>
                <div className="relative">
                  <button
                    type="button"
                    className="rounded-md p-1 transition-all duration-200 hover:bg-slate-100"
                    onClick={() => setIsTools((old) => !old)}
                  >
                    <SlidersHorizontal size={18} className="text-slate-600" />
                  </button>

                  <div
                    onMouseLeave={() => setIsTools(!isTools)}
                    className={`absolute right-0 z-10 mt-1 flex w-52 flex-col rounded-md border-[1px] bg-white
                  ${
                    isTools ? "block" : "hidden transition-all  duration-1000"
                  }`}
                  >
                    <div className="m-3">
                      <h5 className="text-h4">Campos</h5>
                    </div>
                    <hr />
                    <div className="m-3 flex flex-col gap-3">
                      <ItemArray
                        label="Diretório"
                        count={methodsVigency.fields.length}
                        append={() =>
                          methodsVigency.fields.length === 4
                            ? ""
                            : methodsVigency.append({
                                id: undefined,
                              })
                        }
                        remover={() => {
                          methodsVigency.fields.length === 1
                            ? ""
                            : methodsVigency.remove(
                                methodsVigency.fields.length - 1
                              );
                        }}
                      />

                      <ItemArray
                        label="Variável Extra"
                        count={methodsVariables.fields.length}
                        append={() =>
                          methodsVariables.append({
                            text: undefined,
                          })
                        }
                        remover={() => {
                          methodsVariables.fields.length === 0
                            ? ""
                            : methodsVariables.remove(
                                methodsVariables.fields.length - 1
                              );
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-5">
                <div className="grid grid-flow-col gap-2 max-2xl:grid-rows-3">
                  <div>
                    <SelectTemplate
                      defaultValue=""
                      name="templateId"
                      handleSearchOnChange={handleSearchOnChange}
                    >
                      <option value="" hidden>
                        Selecione
                      </option>
                    </SelectTemplate>
                    <ErrorMessage
                      errors={errors}
                      name="templateId"
                      render={({ message }) => (
                        <span className="text-span text-orange-500">
                          {message}
                        </span>
                      )}
                    />
                  </div>
                  <SelectOffice defaultValue="" name="officeId">
                    <option value="" >
                      Todos
                    </option>
                  </SelectOffice>
                  <InputBase
                    {...methods.register("date")}
                    label="Data da emissão"
                    type="date"
                    name="date"
                    defaultValue={dayjs().format("YYYY-MM-DD")}
                  />

                 
                </div>

                <div>
                  <h4 className="text-h4 mb-2">Vigências</h4>
                  {methodsVigency.fields.map((field, index) => (
                    <>
                      <FilterVigency
                        key={field.id}
                        index={index + 1}
                        nameVigency={`vigencyArray.${index}.id`}
                        nameDirectory={`directoryArray.${index}.id`}
                        partyCode={partyCode}
                        stateId={stateId}
                        cityCode={cityCode}
                        handleSearchOnChange={() =>
                          onSubmit({ content: template.content })
                        }
                      />
                      <ErrorMessage
                        errors={errors}
                        name={`vigencyArray.${index}.id`}
                        render={({ message }) => (
                          <span className="text-span text-orange-500">
                            {message}
                          </span>
                        )}
                      />
                    </>
                  ))}
                </div>

                <div>
                  <h4 className="text-h4">Variáveis Extras</h4>
                  {methodsVariables.fields.length > 0 ? (
                    methodsVariables.fields.map((field, index) => (
                      <div className="mt-2" key={field.id}>
                        <InputBase
                          {...methods.register(`variablesArray.${index}.text`)}
                          label=""
                          type="text"
                          name={`variablesArray.${index}.text`}
                          placeholder={`Variável ${index + 1}`}
                        />
                        <ErrorMessage
                          errors={errors}
                          name={`variablesArray.${index}.text`}
                          render={({ message }) => (
                            <span className="text-span text-orange-500">
                              {message}
                            </span>
                          )}
                        />
                      </div>
                    ))
                  ) : (
                    <span className="text-span">Adicionar variáveis extra</span>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="px-3 pb-2">
            <ButtonPrimary
              title="Preencher documento"
              type="submit"
              variant="fill"
              loading={isFetching}
              className="w-full justify-center"
              disabled={isSubmitting || editor}
            >
              {editor ? "Salve..." : "Preencher"}
            </ButtonPrimary>
          </div>
        </div>
      </form>
    </FormProvider>
  );
}
