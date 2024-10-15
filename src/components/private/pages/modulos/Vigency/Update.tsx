"use client";
import { X, Trash2, Plus } from "lucide-react";
import { api } from "@/lib/api";
import { useCallback } from "react";
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
import { useVigencyUpdate } from "@/hooks/Directory/useVigency";
import { Form } from "@/components/Form";
import InputBase from "@/components/private/Form/Inputs/InputBase";
import { useParams } from "next/navigation";
import { UseQueryResult, useQueries, useQuery } from "react-query";
import { Page } from "@/interfaces/page";
import { VigencyService } from "@/services/Directory/vigency.service";

export interface UpdateVigency {
  vigencyId: string;
  closeModal: () => void;
}

export function UpdateVigencyModel({ vigencyId, closeModal }: UpdateVigency) {
  const methods = useForm<vigencyUpdateType>({
    mode: "onSubmit",
    resolver: zodResolver(vigencyUpdateSchema),
  });

  const { handleSubmit, watch, setValue, register, control } = methods;

  const { id } = useParams<{ id: string }>();

  const vigencyById = useQuery<{
    dateFirst: string;
    dateLast: string;
    daysVenciment: number;
    vigencyLeader: {
      leaderId: string;
      officeId: string;
    }[];
    vigencyAdvocate: {
      advocateId: string;
    }[];
    vigencyLawFirm: {
      lawFirmId: string;
    }[];
  }>(
    ["vigencyByIdUpdate", vigencyId],
    async () => VigencyService.getById(vigencyId),
    {
      onSuccess: (data) => {
        setValue("dateFirst", data?.dateFirst || "");
        setValue("dateLast", data?.dateLast || "");
        setValue("vigencyLeader", data?.vigencyLeader);
        setValue("vigencyAdvocate", data?.vigencyAdvocate);
        setValue("vigencyLawFirm", data?.vigencyLawFirm);
      },
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 60,
      retry: 2,
      enabled: !!vigencyId,
    }
  );

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

  const [dataLeaderies, dataOffices, dataAdvocates, dataLawFirm]: [
    UseQueryResult<Page<LeaderProps>>,
    UseQueryResult<OfficesProps[]>,
    UseQueryResult<Page<AdvocateProps>>,
    UseQueryResult<LawFirmProps[]>
  ] = useQueries([
    {
      queryKey: ["leaderies", vigencyId],

      queryFn: async () => {
        const response = await api.get("/leaderies");
        return response.data;
      },
      keepPreviousData: true,
      retry: false,
      refetchOnWindowFocus: false,
    },
    {
      queryKey: ["offices", vigencyId],
      queryFn: async () => {
        const response = await api.get("/offices");
        return response.data;
      },
      keepPreviousData: true,
      retry: false,
      refetchOnWindowFocus: false,
    },
    {
      queryKey: ["advocates", vigencyId],
      queryFn: async () => {
        const response = await api.get("/advocates");
        return response.data;
      },
      keepPreviousData: true,
      retry: false,
      refetchOnWindowFocus: false,
    },
    {
      queryKey: ["lawFirm", vigencyId],
      queryFn: async () => {
        const response = await api.get("/lawFirms");
        return response.data;
      },
      keepPreviousData: true,
      retry: false,
      refetchOnWindowFocus: false,
    },
  ]);

  const vigencyUpdate = useVigencyUpdate(
    vigencyId,
    id,
    watch("dateFirst"),
    watch("dateLast"),
    watch("vigencyLeader"),
    watch("vigencyAdvocate"),
    watch("vigencyLawFirm")
  );

  const onSubmit = async () => {
    await vigencyUpdate.refetch();
  };

  const memoizedHandleSubmit = useCallback(handleSubmit(onSubmit), [
    methods,
    onSubmit,
  ]);

  if (vigencyById.isLoading) {
    return <LoadingSecond />;
  }

  return (
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
                        {dataLeaderies.data?.results && dataLeaderies.data?.results.map((leader, index) => {
                          return (
                            <option key={index} value={leader.id.toString()}>
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
                        {dataOffices.data?.map((office, index) => {
                          return (
                            <option key={index} value={office.id.toString()}>
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
                        {dataAdvocates.data?.results?.map((item, index) => {
                          return (
                            <option key={index} value={item.id.toString()}>
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
                        {dataLawFirm.data?.map((item, index) => {
                          return (
                            <option key={index} value={item.id.toString()}>
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
          <ButtonPrimary variant="ghost" title="Cancelar" onClick={closeModal}>
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
  );
}
