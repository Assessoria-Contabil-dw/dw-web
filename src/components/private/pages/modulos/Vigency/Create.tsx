"use client";
import { X, Trash2 } from "lucide-react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FormProvider, useFieldArray } from "react-hook-form";
import { api } from "@/lib/api";
import {
  useState,
  ForwardRefRenderFunction,
  forwardRef,
  useImperativeHandle,
  useCallback,
} from "react";
import dayjs from "dayjs";
import {
  AdvocateProps,
  LawFirmProps,
  LeaderProps,
  OfficesProps,
} from "@/interfaces/types";
import { LoadingSecond } from "@/components/Loading/second";
import { virgenciesFormSchema } from "@/interfaces/validation";
import { Form } from "@/components/Form";
import ButtonPrimary from "@/components/Buttons/ButtonPrimary";
import { UseQueryResult, useMutation, useQueries } from "react-query";
import { queryClient } from "@/provider/query.provider";
import { useNotify } from "@/components/Toast/toast";
import { VigencyService } from "@/services/Directory/vigency.service";
import { Page } from "@/interfaces/page";

type VigencyFormData = z.infer<typeof virgenciesFormSchema>;

export interface RegisterVigencyRef {
  openViewModal: (id: string) => void;
  closeViewModal: () => void;
}

const RegisterVigencyModel: ForwardRefRenderFunction<RegisterVigencyRef> = (
  props,
  ref
) => {
  const notify = useNotify();
  const [directoryId, setDirectoryId] = useState("");

  const [isModalView, setIsModalView] = useState(false);

  const [selectedLeader, setSelectedLeader] = useState<Array<string>>([]);
  const [selectedOffice, setSelectedOffice] = useState<Array<number>>([]);
  const [selectedAdvocate, setSelectedAdvocate] = useState<Array<number>>([]);
  const [selectedLawFirm, setSelectedLawFirm] = useState<Array<number>>([]);

  const openViewModal = useCallback((id: string) => {
    setDirectoryId(id);
    setIsModalView(true);
  }, []);

  const closeViewModal = useCallback(() => {
    resetField("dateFirst"),
      resetField("dateLast"),
      useFieldLeader.remove(),
      useFieldAdvocate.remove(),
      useFieldLawFirm.remove(),
      setIsModalView(false);
  }, []);

  useImperativeHandle(ref, () => ({
    openViewModal,
    closeViewModal,
  }));

  const createVigencyForm = useForm<VigencyFormData>({
    resolver: zodResolver(virgenciesFormSchema),
  });

  const {
    handleSubmit,
    control,
    resetField,
    formState: { isSubmitting },
  } = createVigencyForm;

  const useFieldLeader = useFieldArray({
    control,
    name: "vigencyLeader",
  });

  function addNewLeader() {
    useFieldLeader.append({ leaderId: "", officeId: 0 });
  }

  const useFieldAdvocate = useFieldArray({
    control,
    name: "vigencyAdvocate",
  });

  function addNewAdvocate() {
    useFieldAdvocate.append({ advocateId: 0 });
  }

  const useFieldLawFirm = useFieldArray({
    control,
    name: "vigencyLawFirm",
  });

  function addNewLawFirm() {
    useFieldLawFirm.append({ lawFirmId: 0 });
  }

  const [dataLeaderies, dataOffices, dataAdvocates, dataLawFirm]: [
    UseQueryResult<LeaderProps[]>,
    UseQueryResult<OfficesProps[]>,
    UseQueryResult<Page<AdvocateProps>>,
    UseQueryResult<LawFirmProps[]>
  ] = useQueries([
    {
      queryKey: ["leaderies", directoryId],

      queryFn: async () => {
        const response = await api.get("/leaderies");
        return response.data;
      },
      keepPreviousData: true,
      retry: false,
      refetchOnWindowFocus: false,
    },
    {
      queryKey: ["offices", directoryId],
      queryFn: async () => {
        const response = await api.get("/offices");
        return response.data;
      },
      keepPreviousData: true,
      retry: false,
      refetchOnWindowFocus: false,
    },
    {
      queryKey: ["advocates", directoryId],
      queryFn: async () => {
        const response = await api.get("/advocates");
        return response.data;
      },
      keepPreviousData: true,
      retry: false,
      refetchOnWindowFocus: false,
    },
    {
      queryKey: ["lawFirm", directoryId],
      queryFn: async () => {
        const response = await api.get("/lawFirms");
        return response.data;
      },
      keepPreviousData: true,
      retry: false,
      refetchOnWindowFocus: false,
    },
  ]);

  const { mutate } = useMutation({
    mutationKey: "createVigency",
    mutationFn: async () => {
      VigencyService.create(
        dayjs(createVigencyForm.watch("dateFirst")).format(),
        dayjs(createVigencyForm.watch("dateLast")).format(),
        directoryId,
        createVigencyForm.watch("vigencyLeader"),
        createVigencyForm.watch("vigencyAdvocate"),
        createVigencyForm.watch("vigencyLawFirm")
      );
    },
    onSuccess: () => {
      notify({ type: "success", message: "Cadastro realizado com sucesso!" });
      queryClient.invalidateQueries("vigenciesData");
    },
    onError: (error: any) => {
      if (error.response.data.status === 500) {
        console.error(error);
        return notify({
          type: "error",
          message: "Erro interno, tente novamente mais tarde",
        });
      }
      return notify({
        type: "error",
        message: error.response.data.message,
      });
    },
  });

  async function handleVigency(data: VigencyFormData) {
    console.log(data);
    mutate();
  }

  if (!isModalView || dataAdvocates.isLoading || dataLeaderies.isLoading) {
    return null;
  }

  return (
    <div className="model-bg">
      <div className="model-size">
        <FormProvider {...createVigencyForm}>
          <form
            onSubmit={handleSubmit(handleVigency)}
            className="flex h-full w-full flex-col items-end  p-1 py-3"
          >
            <div className="model-card">
              <div className="model-header ">
                <div>
                  <h4 className="text-h4">Cadastrar Vigência</h4>
                </div>
                <button onClick={closeViewModal} className="model-close">
                  <X size={20} />
                </button>
              </div>

              <div className="model-body">
                <div className="flex flex-col gap-3">
                  <div className="flex flex-row gap-3">
                    <Form.Field>
                      <Form.Label htmlFor="dateFirst">Data Inicial</Form.Label>
                      <Form.TextInput type="date" name="dateFirst" />
                      <Form.ErrorMessage field="dateFirst" />
                    </Form.Field>
                    <Form.Field>
                      <Form.Label htmlFor="dateLast">Data Final</Form.Label>
                      <Form.TextInput type="date" name="dateLast" />
                      <Form.ErrorMessage field="dateLast" />
                    </Form.Field>
                  </div>

                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={addNewLeader}
                      className=" w-fit rounded-md bg-gray-200 p-2 font-mono text-sm font-semibold text-gray-600"
                    >
                      Representante
                    </button>

                    <button
                      type="button"
                      onClick={addNewAdvocate}
                      className=" w-fit rounded-md bg-gray-200 p-2 font-mono text-sm font-semibold text-gray-600"
                    >
                      Advogado
                    </button>

                    <button
                      type="button"
                      onClick={addNewLawFirm}
                      className=" w-fit rounded-md bg-gray-200 p-2 font-mono text-sm font-semibold text-gray-600"
                    >
                      Escritório
                    </button>
                  </div>

                  <hr />

                  <Form.Field className="flex flex-col gap-4">
                    {useFieldLeader.fields.map((fieldLeader, index) => {
                      const fleader = `vigencyLeader.${index}.leaderId`;
                      const foffice = `vigencyLeader.${index}.officeId`;

                      return (
                        <Form.Field key={fieldLeader.id}>
                          <Form.Label htmlFor={fleader}>
                            Representante {index + 1}
                          </Form.Label>
                          <div className="flex gap-2">
                            <Form.Field>
                              <Form.SelectInput
                                onChange={(e) => {
                                  const newSelectedLeader = [...selectedLeader];
                                  newSelectedLeader[index] = e.target.value;
                                  setSelectedLeader(newSelectedLeader);
                                }}
                                value={selectedLeader[index] || ""}
                                type="text"
                                placeholder="Selecione representante"
                                name={fleader}
                              >
                                {dataLeaderies.data?.map(
                                  (
                                    leader,
                                    index
                                  ) => {
                                    return (
                                      <option
                                        key={index}
                                        value={leader.id.toString()}
                                      >
                                        {leader.name}
                                      </option>
                                    );
                                  }
                                )}
                              </Form.SelectInput>
                              <Form.ErrorMessage field={fleader} />
                            </Form.Field>

                            <Form.Field>
                              <Form.SelectInput
                                onChange={(e) => {
                                  const newSelectedOffice = [...selectedOffice];
                                  newSelectedOffice[index] = Number(
                                    e.target.value
                                  );
                                  setSelectedOffice(newSelectedOffice);
                                }}
                                type="text"
                                value={String(selectedOffice[index]) || ""}
                                placeholder="Selecione cargo"
                                name={foffice}
                              >
                                {dataOffices.data?.map(
                                  (
                                    office,
                                    index: number
                                  ) => {
                                    return (
                                      <option key={index} value={office.id}>
                                        {office.name}
                                      </option>
                                    );
                                  }
                                )}
                              </Form.SelectInput>
                              <Form.ErrorMessage field={foffice} />
                            </Form.Field>
                            <button
                              onClick={() => useFieldLeader.remove(index)}
                              type="button"
                              className="w-fit text-red-500"
                            >
                              <Trash2 className="w-4" />
                            </button>
                          </div>
                        </Form.Field>
                      );
                    })}
                  </Form.Field>

                  <Form.Field className="flex flex-col gap-4">
                    {useFieldAdvocate.fields.map((fieldAdvocate, index) => {
                      const fadvocate = `vigencyAdvocate.${index}.advocateId`;

                      return (
                        <Form.Field key={fieldAdvocate.id}>
                          <Form.Label htmlFor={fadvocate}>Advogado</Form.Label>
                          <div className="flex gap-2">
                            <Form.SelectInput
                              onChange={(e) => {
                                const newSelectedAdvocate = [
                                  ...selectedAdvocate,
                                ];
                                newSelectedAdvocate[index] = Number(
                                  e.target.value
                                );
                                setSelectedAdvocate(newSelectedAdvocate);
                              }}
                              type="text"
                              value={String(selectedAdvocate[index]) || ""}
                              placeholder="Selecione advogado"
                              name={fadvocate}
                            >
                              {dataAdvocates.data?.results?.map(
                                (advocate) => {
                                  return (
                                    <option
                                      key={advocate.id}
                                      value={advocate.id}
                                    >
                                      {advocate.name}
                                    </option>
                                  );
                                }
                              )}
                            </Form.SelectInput>
                            <button
                              onClick={() => useFieldAdvocate.remove(index)}
                              type="button"
                              className="w-fit text-red-500"
                            >
                              <Trash2 className="w-4" />
                            </button>
                          </div>
                          <Form.ErrorMessage field={fadvocate} />
                        </Form.Field>
                      );
                    })}
                  </Form.Field>

                  <Form.Field className="flex flex-col gap-2">
                    {useFieldLawFirm.fields.map((fieldLawFirm, index) => {
                      const flawFirm = `vigencyLawFirm.${index}.lawFirmId`;
                      return (
                        <Form.Field key={fieldLawFirm.id}>
                          <Form.Label htmlFor={flawFirm}>Escritório</Form.Label>
                          <div className="flex gap-2">
                            <Form.SelectInput
                              onChange={(e) => {
                                const newSelectedLawFirm = [...selectedLawFirm];
                                newSelectedLawFirm[index] = Number(
                                  e.target.value
                                );
                                setSelectedLawFirm(newSelectedLawFirm);
                              }}
                              type="text"
                              value={String(selectedLawFirm[index]) || ""}
                              placeholder="Selecione escritorio"
                              name={flawFirm}
                            >
                              {dataLawFirm.data?.map(
                                (lawFirm) => {
                                  return (
                                    <option key={lawFirm.id} value={lawFirm.id}>
                                      {lawFirm.name}
                                    </option>
                                  );
                                }
                              )}
                            </Form.SelectInput>
                            <button
                              onClick={() => useFieldLawFirm.remove(index)}
                              type="button"
                              className="w-fit text-red-500"
                            >
                              <Trash2 className="w-4" />
                            </button>
                          </div>
                          <Form.ErrorMessage field={flawFirm} />
                        </Form.Field>
                      );
                    })}
                  </Form.Field>
                </div>

                <div className="flex gap-4">
                  <ButtonPrimary
                    variant="ghost"
                    title="Cancelar"
                    onClick={closeViewModal}
                  >
                    Cancelar
                  </ButtonPrimary>
                  <ButtonPrimary
                    variant="fill"
                    title="Cadastrar Vigência"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? <LoadingSecond /> : "Cadastrar"}
                  </ButtonPrimary>
                </div>
              </div>
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
};

export default forwardRef(RegisterVigencyModel);
