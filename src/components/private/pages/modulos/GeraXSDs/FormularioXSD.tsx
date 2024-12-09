"use client";

import { X } from "lucide-react"
import { ForwardRefRenderFunction, forwardRef, useCallback, useImperativeHandle, useState, useEffect } from "react"
import { useForm, Controller } from 'react-hook-form'
import { fontes, naturezas, origens, candidaturas, classificacoesReceita, especies, gastos, documentos } from "./@types/interface.type"
import { api } from "@/lib/api"
import { useNotify } from "@/components/Toast/toast"
import { LoadingSecond } from "@/components/Loading/second";

import SelectBase from "@/components/private/Search/Select/SelectBase"
import InputBase from "@/components/private/Search/Input/InputBase";
import ButtonPrimary from "@/components/Buttons/ButtonPrimary"

export interface FormularioXSDRef {
  openModal: () => void;
  closeModal: () => void;
  passIdData: (id: number) => void;
}

const FormularioXSD: ForwardRefRenderFunction<FormularioXSDRef> = (_, ref) => {

  const notify = useNotify();

  const [ isModalView, setIsModalView ] = useState(false);
  const [ isFetching, setIsFetching ] = useState<boolean>(false);
  const [ isLoading, setIsLoading ] = useState<boolean>(false);
  const [ idData, setIdData ] = useState<number | null>(null);

  const { register, handleSubmit, watch, setValue } = useForm()

  const watchOrigem = watch('origem')
  const watchFonte = watch('fonte')
  const watchDocumento = watch('documento')
  const watchTipoLancamento = watch('tipoLancamento')
  const watchDescricaoDocumentoOutro = watch('descricaoDocumentoOutro')
  const watchNotaFiscal = watch('notaFiscal')

  const arrayTipoLancamentos = ['C', 'C', 'C', 'C', 'C', 'C', 'C', 'C', 'D', 'D',]
  const values = watch(['fonte', 'natureza', 'origem', 'candidatura', 'classificacao', 'especie', 'anoEleicao', 'eleicaoSuplementar', 'gasto', 'documento', 'descricaoDocumentoOutro', 'notaFiscal',])
  const criterioChecagem: any = {
    3: [2, 'CA'],
    6: [0, 'FEFC'],
    7: [0, 'FEFC'],
  }

  const isFormFilled = values.every((value, index, arr) => {
    if (arrayTipoLancamentos[index] == watchTipoLancamento && !Object.keys(criterioChecagem).includes(index.toString())) {
      return value && value.trim() !== ''
    }
    if (arrayTipoLancamentos[index] == watchTipoLancamento && Object.keys(criterioChecagem).includes(index.toString()) && values[criterioChecagem[index][0]] === criterioChecagem[index][1]) {
      return value && value.trim() !== ''
    }
    return true
  })

  const openModal = useCallback(() => {
    setIsModalView(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalView(false);
  }, []);

  const passIdData = useCallback((id: number) => {
    setIdData(id);
  }, []);

  useEffect(() => {
    if (idData) {
      setIsLoading(true)
      api.get(`/gera_xsds/${idData}`)
        .then(response => {

          const data = response.data as any;

            setValue('id', data?.ID)
            setValue('contraparte', data?.NM_CONTRAPARTE)
            setValue('partido', data?.SG_PARTIDO)
            setValue('esfera', data?.NM_ESFERA)
            setValue('tipoLancamento', data?.TP_LANCAMENTO)
            setValue('descricao', data?.DS_LANCAMENTO)
            setValue('valor', Number(data?.VR_LANCAMENTO).toFixed(2))
            setValue('fonte', data?.CD_FONTE_RECURSO)
            setValue('natureza', data?.CD_NATUREZA)
            setValue('origem', data?.CD_ORIGEM)
            setValue('candidatura', data?.CD_CANDIDATURA)
            setValue('classificacao', data?.CD_CLASSIFICACAO)
            setValue('especie', data?.CD_ESPECIE)
            setValue('gasto', data?.CD_GASTO)
            setValue('documento', data?.CD_DOCUMENTO)
            setValue('cpfCnpjContraparte', data?.NR_CPF_CNPJ_CONTRAPARTE)
            setValue('notaFiscal', data?.NR_NF)
            setValue('descricaoDocumentoOutro', data?.DS_DOCUMENTO_OUTRO)

          setIsLoading(false)

        })
    }
  }, [idData, setValue])

  useImperativeHandle(ref, () => ({
    openModal,
    closeModal,
    passIdData
  }));

  if (!isModalView) {
    return null;
  }

  const formuladioXSDHandleSubmit = (data: any) => {
    setIsFetching(true)
    api.patch(`/gera_xsds`, data)
      .then(response => {
        notify({ type: "success", message: "Atualização realizado com sucesso!" });
        setIsFetching(false)
        setTimeout(() => closeModal(), 1500)
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
      <div className="model-size model-size-full">
        <div className="model-card">
          <div className="model-header">
            <div className="text-lg font-bold items-center justify-center">
              FORMULÁRIO DADOS XSD {idData}
            </div>
            <button onClick={closeModal} className="model-close">
              <X size={20} />
            </button>
          </div>
          <form onSubmit={handleSubmit(formuladioXSDHandleSubmit)} className="model-body">
            <div>
              <div className="flex flex-col gap-2 w-full">
                <input type="hidden" {...register('id')} />
                <div className="flex gap-2">
                  <InputBase label="Partido" readOnly={true} className="w-32" {...register('partido')} />
                  <InputBase label="Esfera" readOnly={true} className="w-32" {...register('esfera')} />
                  <InputBase label="D/C" readOnly={true} className="w-16 text-center" {...register('tipoLancamento')} />
                  <InputBase label="Valor" readOnly={true} className="w-32 text-right" {...register('valor')} />
                  <div className="flex-1">
                    <InputBase label="Descrição" readOnly={true} {...register('descricao')} />
                  </div>
                </div>
                <div className="flex flex-row gap-2">
                  <div className="basis-3/4">
                    <InputBase label="Contraparte" readOnly={true} {...register('contraparte')} />
                  </div>
                  <div className="basis-1/4">
                    <InputBase label="CPF/CNPJ Contraparte" readOnly={true} {...register('cpfCnpjContraparte')} />
                  </div>
                </div>
                {watchTipoLancamento == 'C' && <SelectBase {...register('fonte')} label="Fonte do Recurso">
                  {fontes.map((v, i) => <option key={i} value={v.codigo}>{v.codigo} - {v.descricao}</option>)}
                </SelectBase>}
                {watchTipoLancamento == 'C' && <SelectBase {...register('natureza')} label="Natureza">
                  {naturezas.map((v, i) => <option key={i} value={v.codigo}>{v.codigo} - {v.descricao}</option>)}
                </SelectBase>}
                {watchTipoLancamento == 'C' && <SelectBase {...register('origem')} label="Origem">
                  {origens.map((v, i) => <option key={i} value={v.codigo}>{v.codigo} - {v.descricao}</option>)}
                </SelectBase>}
                {(watchTipoLancamento == 'C' && watchOrigem == 'CA') && <SelectBase {...register('candidatura')} label="Candidatura">
                  {candidaturas.map((v, i) => <option key={i} value={v.codigo}>{v.codigo} - {v.descricao}</option>)}
                </SelectBase>}
                {watchTipoLancamento == 'C' && <SelectBase {...register('classificacao')} label="Classificação">
                  {classificacoesReceita.map((v, i) => <option key={i} value={v.codigo}>{v.codigo} - {v.descricao}</option>)}
                </SelectBase>}
                {watchTipoLancamento == 'C' && <SelectBase {...register('especie')} label="Espécie">
                  {especies.map((v, i) => <option key={i} value={v.codigo}>{v.codigo} - {v.descricao}</option>)}
                </SelectBase>}
                {(watchTipoLancamento == 'C' && watchFonte == 'FEFC' && watchOrigem == 'CA') && <InputBase type="number" min="2017" max="2100" label="Ano Eleição" {...register('anoEleicao')} />}
                {(watchTipoLancamento == 'C' && watchFonte == 'FEFC' && watchOrigem == 'CA') && <SelectBase {...register('eleicaoSuplementar')} label="Eleição Suplementar">
                  <option value='S'>SIM</option>
                  <option value='N'>NÃO</option>
                </SelectBase>}
                {watchTipoLancamento == 'D' && <SelectBase {...register('gasto')} label="Gasto">
                  {gastos.map((v, i) => <option key={i} value={v.codigo}>{v.codigo} - {v.descricao}</option>)}
                </SelectBase>}
                {watchTipoLancamento == 'D' && <SelectBase {...register('documento')} label="Documento">
                  {documentos.map((v, i) => <option key={i} value={v}>{v}</option>)}
                </SelectBase>}
                {watchTipoLancamento == 'D' && watchDocumento == 'OUTRO' && <InputBase label="Descrição" {...register('descricaoDocumentoOutro')} maxLength={20} />}
                {watchTipoLancamento == 'D' && watchDocumento == 'FISCAL' && <InputBase label="Nº NF" {...register('notaFiscal')} />}
                <div className="flex">
                  <input type="checkbox" id="aplicarConfiguracao" {...register('aplicarConfiguracao')} />
                  &nbsp;<label htmlFor="aplicarConfiguracao">Aplicar esta configuração para os demais registros desta contraparte</label>
                </div>
    
                <ButtonPrimary loading={isFetching} disabled={!isFormFilled} variant="fill" title="Salvar" type="submit" className="items-center justify-center">
                  Salvar
                </ButtonPrimary>

              </div>
            </div>


          </form>
        </div>
      </div>
    </div>
  );
};

export default forwardRef(FormularioXSD);
