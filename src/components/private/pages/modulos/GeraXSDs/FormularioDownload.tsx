"use client";

import { X } from "lucide-react"
import { ForwardRefRenderFunction, forwardRef, useCallback, useImperativeHandle, useState, useEffect } from "react"
import { useForm, Controller } from 'react-hook-form'
import { fontes, naturezas, origens, candidaturas, classificacoesReceita, especies, gastos, documentos } from "./@types/interface.type"
import { api } from "@/lib/api"
import { useNotify } from "@/components/Toast/toast"
import { LoadingSecond } from "@/components/Loading/second";
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod";

import InputBase from "@/components/private/Search/Input/InputBase";
import ButtonPrimary from "@/components/Buttons/ButtonPrimary"

const formDownloadSchema = z.object({
  cnpj: z.string().regex(new RegExp(/^\d{14}$/, "i")),
  tipoLancamento: z.string().regex(new RegExp(/^[CD]{1}$/)),
  dataInicial: z.string().length(10),
  dataFinal: z.string().length(10),
})

type FormDownloadData = z.infer<typeof formDownloadSchema>;

export interface FormularioDownloadRef {
  openModal: () => void;
  closeModal: () => void;
}

const FormularioDownload: ForwardRefRenderFunction<FormularioDownloadRef> = (_, ref) => {

  const notify = useNotify();

  const [ isModalView, setIsModalView ] = useState(false);
  const [ isFetching, setIsFetching ] = useState<boolean>(false);
  const [ isLoading, setIsLoading ] = useState<boolean>(false);

  const { register, handleSubmit, formState: { errors, isValid }, } = useForm<FormDownloadData>({
    resolver: zodResolver(formDownloadSchema),
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

  const formuladioDownloadXSDHandleSubmit = (data: FormDownloadData) => {
    setIsFetching(true)
    api.post('/gera_xsds_por_data', data, { responseType: 'blob' })
      .then(response => {
        const url = window.URL.createObjectURL(new Blob([response.data], { type: 'application/xml' }))
        const link = document.createElement('a')
        link.href = url
        link.setAttribute('download', `${data.tipoLancamento == 'D' ? 'AplicacaoRecurso' : 'OrigemRecurso'}.xsd`)
        document.body.appendChild(link)
        link.click()
        link.remove()
        setIsFetching(false)
      })
     .catch(error => console.log(error))
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
              FORMULÁRIO DOWNLOAD XSD
            </div>
            <button onClick={closeModal} className="model-close">
              <X size={20} />
            </button>
          </div>
          <form onSubmit={handleSubmit(formuladioDownloadXSDHandleSubmit)} className="model-body ">
            <div>
              <div className="flex flex-col gap-2 w-full">
                <div className="flex flex-row gap-2">
                  <InputBase label="CNPJ Prestador" type="text" className="w-44 text-center" {...register('cnpj')} />
                  <InputBase label="D/C" type="text" className="w-16 text-center" {...register('tipoLancamento')} />
                  <InputBase label="Data Inicial" type="date" className="w-40 text-center" {...register('dataInicial')} />
                  <InputBase label="Data Final" type="date" className="w-40 text-center" {...register('dataFinal')} />
                </div>

                <ButtonPrimary loading={isFetching} disabled={!isValid} variant="fill" title="Download XSD" type="submit" className="items-center justify-center">
                  Download XSD
                </ButtonPrimary>

              </div>
            </div>


          </form>
        </div>
      </div>
    </div>
  );
};

export default forwardRef(FormularioDownload);
