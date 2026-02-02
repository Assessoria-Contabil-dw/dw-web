"use client";

import { X } from "lucide-react";
import {
  ForwardRefRenderFunction,
  forwardRef,
  useCallback,
  useImperativeHandle,
  useState,
  useEffect,
} from "react";
import { useForm, FormProvider } from "react-hook-form";
import { api } from "@/lib/api";
import { useNotify } from "@/components/Toast/toast";
import { LoadingSecond } from "@/components/Loading/second";
import InputBase from "@/components/private/Search/Input/InputBase";
import ButtonPrimary from "@/components/Buttons/ButtonPrimary";
import SelectDirectory from "@/components/private/Form/Selects/SelectDirectory";
import { ConvenioFormData } from "./@types/interface.type";

export interface FormularioConvenioRef {
  openModal: () => void;
  closeModal: () => void;
  passIdData: (id: number | null) => void;
}

const FormularioConvenio: ForwardRefRenderFunction<FormularioConvenioRef> = (_, ref) => {
  const notify = useNotify();

  const [isModalView, setIsModalView] = useState(false);
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(false);
  const [idData, setIdData] = useState<number | null>(null);

  const methods = useForm<ConvenioFormData>();
  const { register, handleSubmit, setValue, reset, formState: { errors } } = methods;

  const openModal = useCallback(() => {
    setIsModalView(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalView(false);
    reset();
    setIdData(null);
  }, [reset]);

  const passIdData = useCallback((id: number | null) => {
    setIdData(id);
  }, []);

  useEffect(() => {
    if (idData) {
      setIsLoading(true);
      api
        .get(`/convenios/${idData}`)
        .then((response) => {
          const data = response.data;
          setValue("id", data.id);
          setValue("diretorio", data.diretorio);
          setValue("convenio", data.convenio);
          setValue("banco", data.banco);
          setValue("agencia", data.agencia);
          setValue("conta", data.conta);
          setValue("dv", data.dv);
          setValue("developer_application_key", data.developer_application_key);
          setValue("client_id", data.client_id);
          setValue("client_secret", data.client_secret);
          setIsLoading(false);
        })
        .catch((error) => {
          notify({ type: "error", message: "Erro ao carregar dados" });
          setIsLoading(false);
        });
    }
  }, [idData, setValue, notify]);

  useImperativeHandle(ref, () => ({
    openModal,
    closeModal,
    passIdData,
  }));

  if (!isModalView) {
    return null;
  }

  const convenioHandleSubmit = (data: ConvenioFormData) => {
    setIsFetching(true);
    
    // Garantir que diretorio seja enviado como número
    const payload = {
      ...data,
      diretorio: Number(data.diretorio)
    };
    
    const request = idData
      ? api.put(`/convenios/${idData}`, payload)
      : api.post(`/convenios`, payload);

    request
      .then((response) => {
        notify({
          type: "success",
          message: idData ? "Atualização realizada com sucesso!" : "Convênio criado com sucesso!",
        });
        setIsFetching(false);
        setTimeout(() => closeModal(), 1500);
      })
      .catch((error) => {
        notify({ type: "error", message: error?.response?.data?.message || "Erro ao salvar" });
        setIsFetching(false);
      });
  };

  if (isLoading) {
    return (
      <div className="model-bg">
        <div className="model-size model-size-full">
          <div className="model-card items-center justify-center">
            <LoadingSecond />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="model-bg">
      <div className="model-size model-size-full">
        <div className="model-card">
          <div className="model-header">
            <div className="text-lg font-bold items-center justify-center">
              {idData ? `EDITAR CONVÊNIO #${idData}` : "NOVO CONVÊNIO"}
            </div>
            <button onClick={closeModal} className="model-close">
              <X size={20} />
            </button>
          </div>
          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(convenioHandleSubmit)} className="model-body">
              <div>
                <div className="flex flex-col gap-4 w-full">
                  <input type="hidden" {...register("id")} />

                  <SelectDirectory
                    name="diretorio"
                    label="Diretório"
                    handleSearchOnChange={(e) => setValue("diretorio", Number(e.target.value))}
                  >
                    <option value="">Selecione um diretório</option>
                  </SelectDirectory>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <InputBase
                    label="Convênio"
                    placeholder="Número do convênio"
                    {...register("convenio")}
                  />
                  <InputBase
                    label="Banco"
                    placeholder="Código do banco"
                    type="number"
                    defaultValue={1}
                    {...register("banco", { valueAsNumber: true })}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <InputBase
                    label="Agência"
                    placeholder="Número da agência"
                    type="number"
                    {...register("agencia", { valueAsNumber: true })}
                  />
                  <InputBase
                    label="Conta"
                    placeholder="Número da conta"
                    type="number"
                    {...register("conta", { valueAsNumber: true })}
                  />
                  <InputBase
                    label="DV"
                    placeholder="Dígito verificador"
                    type="number"
                    maxLength={2}
                    {...register("dv", { valueAsNumber: true })}
                  />
                </div>

                <div className="border-t pt-4">
                  <h3 className="text-md font-semibold mb-3">Credenciais API</h3>
                  
                  <div className="flex flex-col gap-4">
                    <InputBase
                      label="Developer Application Key"
                      placeholder="Chave da aplicação"
                      {...register("developer_application_key")}
                    />
                    <InputBase
                      label="Client ID"
                      placeholder="ID do cliente"
                      {...register("client_id")}
                    />
                    <InputBase
                      label="Client Secret"
                      placeholder="Secret do cliente"
                      type="password"
                      {...register("client_secret")}
                    />
                  </div>
                </div>

                <div className="flex gap-2 justify-end mt-4">
                  <ButtonPrimary
                    loading={isFetching}
                    variant="fill"
                    title="Salvar"
                    type="submit"
                    className="items-center justify-center"
                  >
                    Salvar
                  </ButtonPrimary>
                  </div>
                </div>
              </div>
            </form>
          </FormProvider>
        </div>
      </div>
    </div>
  );
};

export default forwardRef(FormularioConvenio);
