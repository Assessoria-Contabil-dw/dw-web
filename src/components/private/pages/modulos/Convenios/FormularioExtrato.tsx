"use client";

import { X } from "lucide-react";
import {
  ForwardRefRenderFunction,
  forwardRef,
  useCallback,
  useImperativeHandle,
  useState,
} from "react";
import { useForm } from "react-hook-form";
import { api } from "@/lib/api";
import { useNotify } from "@/components/Toast/toast";
import InputBase from "@/components/private/Search/Input/InputBase";
import ButtonPrimary from "@/components/Buttons/ButtonPrimary";

export interface FormularioExtratoRef {
  openModal: () => void;
  closeModal: () => void;
  passConvenioId: (id: number) => void;
}

interface ExtratoFormData {
  convenioId: number;
  dataInicio: string;
  dataFim: string;
}

const FormularioExtrato: ForwardRefRenderFunction<FormularioExtratoRef> = (_, ref) => {
  const notify = useNotify();

  const [isModalView, setIsModalView] = useState(false);
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [convenioId, setConvenioId] = useState<number | null>(null);

  const { register, handleSubmit, reset, formState: { errors } } = useForm<ExtratoFormData>();

  const openModal = useCallback(() => {
    setIsModalView(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalView(false);
    reset();
    setConvenioId(null);
  }, [reset]);

  const passConvenioId = useCallback((id: number) => {
    setConvenioId(id);
  }, []);

  useImperativeHandle(ref, () => ({
    openModal,
    closeModal,
    passConvenioId,
  }));

  if (!isModalView) {
    return null;
  }

  const extratoHandleSubmit = (data: ExtratoFormData) => {
    if (!convenioId) {
      notify({ type: "error", message: "ID do convênio não informado" });
      return;
    }

    setIsFetching(true);
    
    api
      .post(`/convenios/${convenioId}/extrato`, {
        dataInicio: data.dataInicio,
        dataFim: data.dataFim,
      })
      .then((response) => {
		console.log(response.data);
        notify({
          type: "success",
          message: "Extrato baixado com sucesso!",
        });
        setIsFetching(false);
        setTimeout(() => closeModal(), 1500);
      })
      .catch((error) => {
        notify({ type: "error", message: error?.response?.data?.message || "Erro ao buscar extrato" });
        setIsFetching(false);
      });
  };

  return (
    <div className="model-bg">
      <div className="model-size model-size-md">
        <div className="model-card">
          <div className="model-header">
            <div className="text-lg font-bold items-center justify-center">
              BAIXAR EXTRATO - CONVÊNIO #{convenioId}
            </div>
            <button onClick={closeModal} className="model-close">
              <X size={20} />
            </button>
          </div>
          <form onSubmit={handleSubmit(extratoHandleSubmit)} className="model-body">
            <div className="flex flex-col gap-4 w-full">
              <InputBase
                label="Data Início"
                type="date"
                {...register("dataInicio", { required: true })}
              />
              
              <InputBase
                label="Data Fim"
                type="date"
                {...register("dataFim", { required: true })}
              />

              {errors.dataInicio && (
                <span className="text-red-500 text-sm">Data de início é obrigatória</span>
              )}
              {errors.dataFim && (
                <span className="text-red-500 text-sm">Data de fim é obrigatória</span>
              )}

              <div className="flex gap-2 justify-end mt-4">
                <ButtonPrimary
                  loading={isFetching}
                  variant="fill"
                  title="Baixar Extrato"
                  type="submit"
                  className="items-center justify-center"
                >
                  Baixar Extrato
                </ButtonPrimary>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default forwardRef(FormularioExtrato);
