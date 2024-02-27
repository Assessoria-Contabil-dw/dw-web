"use client";
import { X, Trash2, Plus } from "lucide-react";

import { api } from "@/lib/api";
import {
  useEffect,
  useState,
  ForwardRefRenderFunction,
  forwardRef,
  useImperativeHandle,
  useCallback,
} from "react";
import {
  AdvocateProps,
  LawFirmProps,
  LeaderProps,
  OfficesProps,
} from "@/interfaces/types";
import { LoadingSecond } from "@/components/Loading/second";
import ButtonIcon from "@/components/Buttons/ButtonIcon";
import ButtonPrimary from "@/components/Buttons/ButtonPrimary";
import { FormProvider, useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { vigencyUpdateSchema, vigencyUpdateType } from "./@type/zod.type";
import { useVigencyById, useVigencyUpdate } from "@/hooks/Directory/useVigency";
import { Form } from "@/components/Form";
import InputBase from "@/components/private/Form/Inputs/InputBase";
import { useParams } from "next/navigation";

export interface UpdateVigencyRef {
  openViewModal: (id: string) => void;
  closeViewModal: () => void;
}

const UpdateVigencyModel: ForwardRefRenderFunction<UpdateVigencyRef> = (
  props,
  ref
) => {
  const [vigencyId, setvigencyId] = useState("");
  const [isModalView, setIsModalView] = useState(false);

  const [leaderies, setLeader] = useState<LeaderProps[]>([]);
  const [offices, setOffice] = useState<OfficesProps[]>([]);
  const [lawFirms, setLawFirm] = useState<LawFirmProps[]>([]);
  const [advocates, setAdvocate] = useState<AdvocateProps[]>([]);

  const methods = useForm<vigencyUpdateType>({
    mode: "onSubmit",
    resolver: zodResolver(vigencyUpdateSchema),
  });

  const { handleSubmit, watch, setValue, register, control } = methods;

  const params = useParams();
  const { id } = params;
  const vigencyById = useVigencyById(vigencyId);
  const vigencyUpdate = useVigencyUpdate(
    vigencyId,
    id,
    watch("dateFirst"),
    watch("dateLast"),
    watch("vigencyLeader"),
    watch("vigencyAdvocate"),
    watch("vigencyLawFirm")
  );

  const openViewModal = useCallback((id: string) => {
    setvigencyId(id);
    vigencyById.refetch()
    setValue("dateFirst", vigencyById.data?.dateFirst || "");
    setValue("dateLast", vigencyById.data?.dateLast || "");
    setValue("vigencyLeader", vigencyById.data?.vigencyLeader);
    setValue("vigencyAdvocate", vigencyById.data?.vigencyAdvocate);
    setValue("vigencyLawFirm", vigencyById.data?.vigencyLawFirm);
    setIsModalView(true);
  }, []);

  const closeViewModal = useCallback(() => {
    setIsModalView(false);
  }, []);

  useImperativeHandle(ref, () => ({
    openViewModal,
    closeViewModal,
  }));

  const useFieldLeader = useFieldArray({
    control,
    name: "vigencyLeader",
  });

  function addNewLeader() {
    useFieldLeader.append({ leaderId: "", officeId: "" });
  }

  const useFieldAdvocate = useFieldArray({
    control,
    name: "vigencyAdvocate",
  });

  function addNewAdvocate() {
    useFieldAdvocate.append({ advocateId: "" });
  }

  const useFieldLawFirm = useFieldArray({
    control,
    name: "vigencyLawFirm",
  });

  function addNewLawFirm() {
    useFieldLawFirm.append({ lawFirmId: "" });
  }

  useEffect(() => {
    Promise.all([
      api.get("/leaderies"),
      api.get("/offices"),
      api.get("/advocates"),
      api.get("/lawFirms"),
    ])
      .then(([leaderies, offices, advocates, lawFirms]) => {
        setLeader(leaderies.data);
        setOffice(offices.data);
        setAdvocate(advocates.data);
        setLawFirm(lawFirms.data);
      })
      .catch((error) => {
        console.log(error);
      });
   
  }, [vigencyId]);

  const onSubmit = async (data: vigencyUpdateType) => {
    await vigencyUpdate.refetch();
  };

  const memoizedHandleSubmit = useCallback(handleSubmit(onSubmit), [
    methods,
    onSubmit,
  ]);

  if (!isModalView) {
    return null;
  }

  return (
    <div className="model-bg">
      <div className="model-size model-size-full">
        <div className="model-card">
          <div className="model-header ">
            <div>
              <h4 className="text-h4">Cadastrar Vigência</h4>
            </div>
            <button
              onClick={closeViewModal}
              className="w-fit rounded-full p-0 text-gray-300 hover:text-gray-600"
            >
              <X size={20} />
            </button>
          </div>
          {vigencyById.isLoading || !vigencyById.data ? (
            <div className="model-loading">
              <LoadingSecond />
            </div>
          ) : (
            <FormProvider {...methods}>
              <form className="model-body" onSubmit={memoizedHandleSubmit}>
                <InputBase
                  {...register("dateFirst")}
                  label="Data Inicial"
                  type="date"
                  name="dateFirst"
                />
                <InputBase
                  {...register("dateLast")}
                  label="Data Final"
                  type="date"
                  name="dateLast"
                />

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <label>Representantes</label>
                    <ButtonIcon
                      title="Adicionar representante"
                      type="button"
                      icon={<Plus size={16} />}
                      onClick={addNewLeader}
                    />
                  </div>
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
                                type="text"
                                placeholder="Selecione representante"
                                name={fleader}
                              >
                                {leaderies.map((leader, index) => {
                                  return (
                                    <option
                                      key={index}
                                      value={leader.id.toString()}
                                    >
                                      {leader.name}
                                    </option>
                                  );
                                })}
                              </Form.SelectInput>
                              <Form.ErrorMessage field={fleader} />
                            </Form.Field>

                            <Form.Field>
                              <Form.SelectInput
                                type="text"
                                placeholder="Selecione cargo"
                                name={foffice}
                              >
                                {offices.map((office, index) => {
                                  return (
                                    <option
                                      key={index}
                                      value={office.id.toString()}
                                    >
                                      {office.name}
                                    </option>
                                  );
                                })}
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
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <label>Advogados</label>
                    <ButtonIcon
                      title="Adicionar advogado"
                      type="button"
                      icon={<Plus size={16} />}
                      onClick={addNewAdvocate}
                    />
                  </div>
                  <Form.Field className="flex flex-col gap-4">
                    {useFieldAdvocate.fields.map((fieldAdvocate, index) => {
                      const fleader = `vigencyAdvocate.${index}.advocateId`;

                      return (
                        <Form.Field key={fieldAdvocate.id}>
                          <Form.Label htmlFor={fleader}>
                            Advogado {index + 1}
                          </Form.Label>
                          <div className="flex gap-2">
                            <Form.Field>
                              <Form.SelectInput
                                type="text"
                                placeholder="Selecione representante"
                                name={fleader}
                              >
                                {advocates.map((item, index) => {
                                  return (
                                    <option
                                      key={index}
                                      value={item.id.toString()}
                                    >
                                      {item.name}
                                    </option>
                                  );
                                })}
                              </Form.SelectInput>
                              <Form.ErrorMessage field={fleader} />
                            </Form.Field>

                            <button
                              onClick={() => useFieldAdvocate.remove(index)}
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
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <label>Escritório</label>
                    <ButtonIcon
                      title="Adicionar escritorio"
                      type="button"
                      icon={<Plus size={16} />}
                      onClick={addNewLawFirm}
                    />
                  </div>
                  <Form.Field className="flex flex-col gap-4">
                    {useFieldLawFirm.fields.map((fieldLawFirm, index) => {
                      const fleader = `vigencyLawFirm.${index}.lawFirmId`;

                      return (
                        <Form.Field key={fieldLawFirm.id}>
                          <Form.Label htmlFor={fleader}>
                            Escritório {index + 1}
                          </Form.Label>
                          <div className="flex gap-2">
                            <Form.Field>
                              <Form.SelectInput
                                type="text"
                                placeholder="Selecione escritorio"
                                name={fleader}
                              >
                                {lawFirms.map((item, index) => {
                                  return (
                                    <option
                                      key={index}
                                      value={item.id.toString()}
                                    >
                                      {item.name}
                                    </option>
                                  );
                                })}
                              </Form.SelectInput>
                              <Form.ErrorMessage field={fleader} />
                            </Form.Field>

                            <button
                              onClick={() => useFieldLawFirm.remove(index)}
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
                    loading={vigencyUpdate.isFetching}
                    variant="fill"
                    title="Atualizar vigencia"
                    type="submit"
                  >
                    Atualizar
                  </ButtonPrimary>
                </div>
              </form>
            </FormProvider>
          )}
        </div>
      </div>
    </div>
  );
};

export default forwardRef(UpdateVigencyModel);
