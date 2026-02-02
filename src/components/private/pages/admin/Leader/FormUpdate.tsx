"use client";

import { RadioInput } from "../../../../Form/Radio";
import { z } from "zod";
import { useForm, FormProvider, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "../../../../Form";
import { LoadingSecond } from "../../../../Loading/second";
import { api } from "@/lib/api";
import { leaderFormShema } from "@/interfaces/validation";
import ButtonSecondary from "@/components/Buttons/ButtonSecondary";
import { useNotify } from "@/components/Toast/toast";
import { useMutation, useQueries, useQuery } from "react-query";
import { LeadersService } from "@/services/Leader/leader.service";
import { queryClient } from "@/provider/query.provider";
import ButtonIcon from "@/components/Buttons/ButtonIcon";
import { PlusIcon, TrashIcon } from "lucide-react";
import { useEffect } from "react";

interface RegisterLeaderModalProps {
  id: string;
  onClose: () => void;
}

type LeaderFormData = z.infer<typeof leaderFormShema>;

export function FormUpdateLeader({ id, onClose }: RegisterLeaderModalProps) {
  const notify = useNotify();

  const [ dataLeader, dataUpdate] = useQueries([
    {
      queryKey: ["leader", id],
      queryFn: async () => {
        const response = await LeadersService.getById(id);
        return response;
      },
    },

    {
      queryKey: "upload",
      queryFn: async () => {
        const response = await api.get("/upload/assinaturas");
        return response.data;
      },
      keepPreviousData: true,
      retry: 1
    },
  ]);

  
  const createLeaderForm = useForm<LeaderFormData>({
    resolver: zodResolver(leaderFormShema),
    defaultValues:{
      importantPasswords: []
    }
  });

  const { fields, append, remove } = useFieldArray({
    control: createLeaderForm.control,
    name: "importantPasswords",

  });

  const {
    handleSubmit,
    watch,
    formState: { isSubmitting },
  } = createLeaderForm;


useEffect(() => {
  console.log(dataLeader);
  if(dataLeader.data && !dataLeader.isLoading){
    const mappedData = dataLeader.data?.importantPasswords.map((item: {
      name: string;
      passwordHash: string;
    }) => {
      return {
        name: item.name,
        password: item.passwordHash
      }
    });
    createLeaderForm.setValue("importantPasswords", mappedData);
  }
  
}, [dataLeader.data])

  const { mutate } = useMutation({
    mutationKey: "updateLeader",
    mutationFn: async () => {
      const leaderData = createLeaderForm.getValues();
      const transformedData = leaderFormShema.safeParse(leaderData);
      if (!transformedData.success) {
        notify({ type: "error", message: "Erro ao validar" });
        return console.error(transformedData.error);
      }
      return LeadersService.update(id, transformedData.data);
    },
    onSuccess: () => {
      notify({ type: "success", message: "Atualização realizado com sucesso!" });
      queryClient.invalidateQueries("leaderData");
    },
    onError: (error: any) => {
      console.log("erro")
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

  async function handleAddLeader(data: LeaderFormData) {
    console.log(data);
    mutate();
  }

  if(dataUpdate.isLoading && dataLeader.isLoading) return <LoadingSecond />

  return (
    <FormProvider {...createLeaderForm}>
      <form
        onSubmit={handleSubmit(handleAddLeader)}
        className="flex h-full w-full flex-col items-end overflow-y-auto p-1"
      >
        <div className="flex h-full w-full flex-col gap-4">
          <div className="flex-1 space-y-2 overflow-y-auto p-2">
            <div className="flex gap-3">
              <Form.Field>
                <Form.Label htmlFor="name">Nome</Form.Label>
                <Form.TextInput
                  name="name"
                  type="text"
                  defaultValue={dataLeader.data?.name}
                  placeholder="Digite o nome completo"
                />
                <Form.ErrorMessage field="name" />
              </Form.Field>

              <Form.Field>
                <Form.Label htmlFor="cpf">CPF</Form.Label>
                <Form.TextInput
                  name="cpf"
                  type="text"
                  defaultValue={dataLeader.data?.cpf}
                  placeholder="Digite o nome cpf"
                />
                <Form.ErrorMessage field="cpf" />
              </Form.Field>

              <Form.Field>
                <Form.Label htmlFor="rg">RG</Form.Label>
                <Form.TextInput
                  name="rg"
                  type="text"
                  defaultValue={dataLeader.data?.rg}
                  placeholder="Digite o nome rg"
                />
                <Form.ErrorMessage field="rg" />
              </Form.Field>
            </div>

            <div className="flex gap-3">
              <Form.Field>
                <Form.Label htmlFor="title">Título</Form.Label>
                <Form.TextInput
                  type="text"
                  defaultValue={dataLeader.data?.title}
                  placeholder="Digite o título"
                  name="title"
                />
                <Form.ErrorMessage field="title" />
              </Form.Field>

              <Form.Field>
                <Form.Label htmlFor="phone">Telefone</Form.Label>
                <Form.TextInput
                  type="text"
                  defaultValue={dataLeader.data?.phone}
                  placeholder="Digite o telefone"
                  name="phone"
                />
                <Form.ErrorMessage field="phone" />
              </Form.Field>

              <Form.Field>
                <Form.Label htmlFor="email">E-mail</Form.Label>
                <Form.TextInput
                  type="email"
                  defaultValue={dataLeader.data?.email}
                  placeholder="Digite o e-mail"
                  name="email"
                />
                <Form.ErrorMessage field="email" />
              </Form.Field>
            </div>

            <div className="flex gap-3">
              <Form.Field>
                <Form.Label htmlFor="profession">Profissão</Form.Label>
                <Form.TextInput
                  type="text"
                  defaultValue={dataLeader.data?.profession}
                  placeholder="Digite a profissão"
                  name="profession"
                />
                <Form.ErrorMessage field="profession" />
              </Form.Field>

              <Form.Field>
                <Form.Label htmlFor="birthday">Data de Nascimento</Form.Label>
                <Form.TextInput
                  type="date"
                  defaultValue={dataLeader.data?.birthday}
                  placeholder="Data de nascimento"
                  name="birthday"
                />
                <Form.ErrorMessage field="birthday" />
              </Form.Field>

              <Form.Field>
                <Form.Label htmlFor="status">Situação Cívil</Form.Label>
                <div>
                <RadioInput
                    checked={dataLeader.data?.status === "SOLTEIRO"}
                    type="radio"
                    value="SOLTEIRO"
                    label="Solteiro"
                    name="status"
                  />
                  <RadioInput
                    checked={dataLeader.data?.status === "CASADO"}
                    type="radio"
                    value="CASADO"
                    label="Casado"
                    name="status"
                  />
                  <RadioInput
                    checked={dataLeader.data?.status === "DIVORCIADO"}
                    type="radio"
                    value="DIVORCIADO"
                    label="Divorciado"
                    name="status"
                  />
                  <RadioInput
                    checked={dataLeader.data?.status === "VIÚVO"}
                    type="radio"
                    value="VIÚVO"
                    label="Viúvo"
                    name="status"
                  />
                </div>
              </Form.Field>
            </div>

            <Form.Field>
              <Form.Label htmlFor="address">Endereço</Form.Label>
              <Form.TextInput
                type="text"
                defaultValue={dataLeader.data?.address}
                placeholder="Rua, n°, Bairro, Cidade - UF, CEP"
                name="address"
              />
              <Form.ErrorMessage field="address" />
            </Form.Field>

            <div className="flex flex-col gap-2 pt-4">
              <h4 className="text-h4">Assinatura</h4>
              <Form.SelectInput
                type="text"
                value={watch("signatureUrl")}
                onChange={(e) =>
                  createLeaderForm.setValue("signatureUrl", e.target.value)
                }
                placeholder="Assinaturas cadastradas"
                name="signatureUrl"
              >
                <option value="">Nenhuma</option>
                {dataUpdate.data?.map(
                  (
                    item: {
                      name: string;
                    },
                    index: number
                  ) => {
                    return (
                      <option key={index} value={item.name}
                      selected={dataLeader.data?.signatureUrl === item.name ? true : false}>
                        {item.name}
                      </option>
                    );
                  }
                )}
              </Form.SelectInput>

              <Form.Field className="h-40">
                <Form.Label htmlFor="file">Anexar assinatura</Form.Label>
                <Form.ImgInput
                  onClick={() =>
                    createLeaderForm.setValue("signatureUrl", undefined)
                  }
                  signatureUrl={watch("signatureUrl")}
                  accept="image/*"
                  name="file"
                />
                <Form.ErrorMessage field="file" />
              </Form.Field>
            </div>

            <div className="flex flex-col gap-6">
              <div className="fex-col flex items-center gap-4">
                <h4 className="text-h4">Senhas confidenciais</h4>
                <ButtonIcon
                  title="Adicionar senha"
                  icon={<PlusIcon size={20} />}
                  type="button"
                  onClick={() => append({ name: "", password: "" })}
                />
              </div>

              {fields.map((field, index) => (
                <div className="flex items-end gap-2" key={field.id}>
                  <Form.Field>
                    <Form.Label htmlFor={`importantPasswords[${index}].name`}>
                      Nome
                    </Form.Label>
                    <Form.TextInput
                      type="text"
                      placeholder="Digite a senha"
                      name={`importantPasswords[${index}].name`}
                    />
                    <Form.ErrorMessage
                      field={`importantPasswords[${index}].name`}
                    />
                  </Form.Field>

                  <Form.Field>
                    <Form.Label
                      htmlFor={`importantPasswords[${index}].password`}
                    >
                      Senha
                    </Form.Label>
                    <Form.PasswordInput
                      placeholder="Confirme a senha"
                      name={`importantPasswords[${index}].password`}
                    />
                    <Form.ErrorMessage
                      field={`importantPasswords[${index}].password`}
                    />
                  </Form.Field>

                  <ButtonIcon
                    title="Remover"
                    icon={<TrashIcon size={20} />}
                    type="button"
                    onClick={() => remove(index)}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <ButtonSecondary
              title="Cancelar"
              variant="ghost"
              onClick={onClose}
              type="button"
              className="bg-gray-200 text-gray-500 hover:bg-gray-300 "
            >
              Cancelar
            </ButtonSecondary>
            <ButtonSecondary
              variant="fill"
              title="Atualizar"
              type="submit"
              disabled={isSubmitting}
              className="hover:bg-primary-hover bg-primary text-white "
            >
              {isSubmitting ? <LoadingSecond /> : "Atualizar"}
            </ButtonSecondary>
          </div>
        </div>
      </form>
    </FormProvider>
  );
}
