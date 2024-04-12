"use client";
import { z } from "zod";
import { RadioInput } from "../../../../Form/Radio";
import { Form } from "../../../../Form";
import { api } from "@/lib/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FormProvider } from "react-hook-form";
import { LoadingSecond } from "../../../../Loading/second";
import { advocateFormShema } from "@/interfaces/validation";
import ButtonSecondary from "@/components/Buttons/ButtonSecondary";
import { useMutation, useQueries } from "react-query";
import { AdvocatesService } from "@/services/Leader/advocates.service";
import { useNotify } from "@/components/Toast/toast";
import { queryClient } from "@/provider/query.provider";
interface RegisterLeaderModalProps {
  onClose: () => void;
  id: string;
}

type AdvocateFormData = z.infer<typeof advocateFormShema>;

export function FormUpdate({ onClose, id }: RegisterLeaderModalProps) {
  const notify = useNotify();
  const createAdvocateForm = useForm<AdvocateFormData>({
    resolver: zodResolver(advocateFormShema),
  });

  const {
    handleSubmit,
    watch,
    formState: { isSubmitting },
  } = createAdvocateForm;

  const [dataAdvocate, dataLawFirm, dataUpdate] = useQueries([
    {
      queryKey: ["advocate", id],
      queryFn: async () => {
        const response = await api.get(`/advocate/${id}`);
        return response.data;
      },
    },
    {
      queryKey: "lawFirm",
      queryFn: async () => {
        const response = await api.get("/lawFirms");
        return response.data;
      },
    },
    {
      queryKey: "upload",
      queryFn: async () => {
        const response = await api.get("/upload/assinaturas");
        return response.data;
      },
    },
  ]);

  const { mutate } = useMutation({
    mutationKey: "updateAdvocate",
    mutationFn: async () => {
      const advocateData = createAdvocateForm.getValues();
      const transformedData =  advocateFormShema.safeParse(advocateData);
      if (!transformedData.success) {
        notify({ type: "error", message: "Erro ao cadastrar" });
        return console.error(transformedData.error);
      }

      AdvocatesService.update(id, transformedData.data);
    },
    onSuccess: () => {
      notify({ type: "success", message: "Atualizado com sucesso!" });
      queryClient.invalidateQueries("advocateData");
      queryClient.invalidateQueries("advocate");
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

  async function handleAdvocate() {
    mutate();
  }

  if(dataLawFirm.isLoading || dataUpdate.isLoading || dataAdvocate.isLoading) return <LoadingSecond />
  
  return (
    <FormProvider {...createAdvocateForm}>
      <form
        onSubmit={handleSubmit(handleAdvocate)}
        className="flex h-full w-full flex-col items-end overflow-y-auto p-1"
      >
        <div className="flex h-full w-full flex-col gap-4">
          <div className="flex-1 space-y-2 overflow-y-auto p-2">
            <div className="flex gap-4">
              <Form.Field>
                <Form.Label htmlFor="name">Nome</Form.Label>
                <Form.TextInput
                  type="text"
                  defaultValue={dataAdvocate.data?.name}
                  placeholder="Nome completo"
                  name="name"
                />
                <Form.ErrorMessage field="name" />
              </Form.Field>

              <Form.Field>
                <Form.Label htmlFor="cpf">CPF</Form.Label>
                <Form.TextInput
                  type="text"
                  defaultValue={dataAdvocate.data?.cpf}
                  placeholder="000.000.000-00"
                  name="cpf"
                />
                <Form.ErrorMessage field="cpf" />
              </Form.Field>

              <Form.Field>
                <Form.Label htmlFor="status">Situação Cívil</Form.Label>
                <div className="grid grid-flow-col grid-rows-2 gap-2">
                  <RadioInput
                    checked={dataAdvocate.data?.status === "SOLTEIRO"}
                    type="radio"
                    value="SOLTEIRO"
                    label="Solteiro"
                    name="status"
                  />
                  <RadioInput
                    checked={dataAdvocate.data?.status === "CASADO"}
                    type="radio"
                    value="CASADO"
                    label="Casado"
                    name="status"
                  />
                  <RadioInput
                    checked={dataAdvocate.data?.status === "DIVORCIADO"}
                    type="radio"
                    value="DIVORCIADO"
                    label="Divorciado"
                    name="status"
                  />
                  <RadioInput
                    checked={dataAdvocate.data?.status === "VIÚVO"}
                    type="radio"
                    value="VIÚVO"
                    label="Viúvo"
                    name="status"
                  />
                </div>
              </Form.Field>
            </div>

            <div className="flex gap-4">
              <Form.Field>
                <Form.Label htmlFor="oab">OAB</Form.Label>
                <Form.TextInput
                  type="text"
                  defaultValue={dataAdvocate.data?.oab}
                  placeholder="OAB/UF n° 000000"
                  name="oab"
                />
                <Form.ErrorMessage field="oab" />
              </Form.Field>

              <Form.Field>
                <Form.Label htmlFor="title">Título</Form.Label>
                <Form.TextInput 
                  type="text"
                  defaultValue={dataAdvocate.data?.title}
                  placeholder="Título" name="title" />
                <Form.ErrorMessage field="title" />
              </Form.Field>

              <Form.Field>
                <Form.Label htmlFor="birthday">Data de Nascimento</Form.Label>
                <Form.TextInput type="date" name="birthday" defaultValue={dataAdvocate.data.birthday} />
                <Form.ErrorMessage field="birthday" />
              </Form.Field>
            </div>

            <Form.Field>
              <Form.Label htmlFor="address">Endereço</Form.Label>
              <Form.TextInput
                type="text"
                defaultValue={dataAdvocate.data?.address}
                placeholder="Rua, n°, Bairro, Cidade - UF, CEP"
                name="address"
              />
              <Form.ErrorMessage field="address" />
            </Form.Field>

            <div className="flex gap-4">
              <Form.Field>
                <Form.Label htmlFor="phone">Telefone</Form.Label>
                <Form.TextInput
                  type="text"
                  defaultValue={dataAdvocate.data?.phone}
                  placeholder="(00) 00000-0000"
                  name="phone"
                />
                <Form.ErrorMessage field="phone" />
              </Form.Field>

              <Form.Field>
                <Form.Label htmlFor="email">E-mail</Form.Label>
                <Form.TextInput
                  type="email"
                  defaultValue={dataAdvocate.data?.email}
                  placeholder="Digite o e-mail"
                  name="email"
                />
                <Form.ErrorMessage field="email" />
              </Form.Field>
            </div>

            <div className="flex justify-between gap-8">
              <Form.Field>
                <Form.Label htmlFor="lawFirmId">Escritório</Form.Label>
                <Form.SelectInput
                  type="text"
                  value={watch("lawFirmId")}
                  defaultValue={dataAdvocate.data?.lawFirmId}
                  onChange={(e) => createAdvocateForm.setValue("lawFirmId", e.target.value)}
                  placeholder="Selecione o escritório"
                  name="lawFirmId"
                >
                  {dataLawFirm.data?.map((law:{id: number, name: string}) => {
                    return (
                      <option key={law.id} 
                      selected={dataAdvocate.data.lawFirmId === law.id ? true : false}
                      value={law.id}>
                        {law.name}
                      </option>
                    );
                  })}
                </Form.SelectInput>
                <Form.ErrorMessage field="lawFirmId" />
              </Form.Field>
            </div>

            <div className="pt-4 flex gap-2 flex-col">
              <h4 className="text-h4">Assinatura</h4>
              <Form.SelectInput
                type="text"
                value={watch("signatureUrl")}
                onChange={(e) => createAdvocateForm.setValue("signatureUrl", e.target.value)}
                placeholder="Assinaturas cadastradas"
                name="signatureUrl"
              >
                {dataUpdate.data?.map((item: {
                  name: string;
                }, index: number) => {
                  return (
                    <option key={index} selected={dataAdvocate.data.signatureUrl === item.name ? true : false} value={item.name}>
                      {item.name}
                    </option>
                  );
                })}
              </Form.SelectInput>

              <Form.Field className="h-40">
                <Form.Label htmlFor="file">Anexar assinatura</Form.Label>
                <Form.ImgInput 
                  onClick={() => createAdvocateForm.setValue('signatureUrl', undefined)} 
                  signatureUrl={watch("signatureUrl") || dataAdvocate.data?.signatureUrl} 
                  accept="image/*" 
                  name="file" 
                />
                <Form.ErrorMessage field="file" />
              </Form.Field>
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
              title="Cadastrar"
              type="submit"
              disabled={isSubmitting}
              className="hover:bg-primary-hover bg-primary text-white "
            >
              {isSubmitting ? <LoadingSecond /> : "Cadastrar"}
            </ButtonSecondary>
          </div>
        </div>
      </form>
    </FormProvider>
  );
}
