"use client";

import { X } from "lucide-react"
import { ChangeEvent, ForwardRefRenderFunction, forwardRef, useCallback, useImperativeHandle, useState, useEffect, useRef } from "react"
import { useForm, Controller } from 'react-hook-form'
import { api } from "@/lib/api"
import { useNotify } from "@/components/Toast/toast"
import { LoadingSecond } from "@/components/Loading/second";
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod";

import InputBase from "@/components/private/Search/Input/InputBase";
import ButtonPrimary from "@/components/Buttons/ButtonPrimary"

const formUploadSchema = z.object({
  cnpj: z.string().regex(new RegExp(/^(\d{14})?$/, "i")),
  tipoLancamento: z.string().regex(new RegExp(/^[CD]{0,1}$/)),
  dataInicial: z.string().optional(),
  dataFinal: z.string().optional(),
  arquivoCSV: z.instanceof(FileList).refine((files) => files.length > 0)
})

type FormUploadData = z.infer<typeof formUploadSchema>;

export interface FormularioUploadRef {
  openModal: () => void;
  closeModal: () => void;
}

function fileToBase64(file: any) {
  return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onloadend = () => {
          resolve(reader.result); // Remove o prefixo 'data:<MIME-type>;base64,'
      };

      reader.onerror = () => {
          reject(new Error("Erro ao ler o arquivo"));
      };

      reader.readAsDataURL(file);
  });
}

const FormularioUpload: ForwardRefRenderFunction<FormularioUploadRef> = (_, ref) => {

  const notify = useNotify();

  const [ isModalView, setIsModalView ] = useState(false);
  const [ isFetching, setIsFetching ] = useState<boolean>(false);
  const [ isLoading, setIsLoading ] = useState<boolean>(false);

  const { register, handleSubmit, formState: { errors, isValid }, } = useForm<FormUploadData>({
    resolver: zodResolver(formUploadSchema),
    mode: "onChange",
  })

  const openModal = useCallback(() => {
    setIsModalView(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalView(false);
  }, []);

  useImperativeHandle(ref, () => ({
    openModal,
    closeModal,
  }));

  if (!isModalView) {
    return null;
  }

  const formuladioUploadCSVHandleSubmit = async (data: FormUploadData) => {

    const formData = new FormData();
    for (const [key, value] of Object.entries(data)) {
      if (typeof(value) == 'string') {
        formData.append(key, value)
      }
    }
    formData.append("file", data.arquivoCSV[0])

    setIsFetching(true)
    api.post(`/gera_xsds/csv`, formData)
      .then(response => {
        setIsFetching(false)
        notify({ type: "success", message: 'Upload concluído com sucesso !' })
      })
      .catch(error => {
        setIsFetching(false)
        notify({ type: "error", message: error.message })
      })
  }

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
      <div className="model-size h-96">
        <div className="model-card">
          <div className="model-header">
            <div className="text-lg font-bold items-center justify-center">
              FORMULÁRIO UPLOAD CSV
            </div>
            <button onClick={closeModal} className="model-close">
              <X size={20} />
            </button>
          </div>
          <form onSubmit={handleSubmit(formuladioUploadCSVHandleSubmit)} className="model-body ">
            <div>
              <div className="flex flex-col gap-2 w-full">
                <div className="flex flex-row gap-2">
                  <InputBase label="CNPJ Prestador" type="text" className="w-44 text-center" {...register('cnpj')} />
                  <InputBase label="D/C" type="text" className="w-16 text-center" {...register('tipoLancamento')} />
                  <InputBase label="Data Inicial" type="date" className="w-40 text-center" {...register('dataInicial')} />
                  <InputBase label="Data Final" type="date" className="w-40 text-center" {...register('dataFinal')} />
                </div>
                <InputBase
                  accept=".csv"
                  label="Arquivo CSV"
                  type="file"
                  {...register('arquivoCSV')}
                />
                <ButtonPrimary loading={isFetching} disabled={!isValid || isFetching} variant="fill" title="Upload CSV" type="submit" className="items-center justify-center">
                  Upload CSV
                </ButtonPrimary>

              </div>
            </div>


          </form>
        </div>
      </div>
    </div>
  );
};

export default forwardRef(FormularioUpload);
