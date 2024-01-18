'use client'
import { X } from 'lucide-react'

import {
  FormEvent,
  ForwardRefRenderFunction,
  forwardRef,
  useCallback,
  useImperativeHandle,
  useState,
} from 'react'
// import { CreateFormSPC } from './CreateForm'
import SelectDirectory from '@/components/private/Search/Select/SelectDirectory'
// import InputYear from '@/components/private/Search/Input/InputYear'
import InputBase from '@/components/private/Search/Input/InputBase'
import SelectLegend from '@/components/private/Search/Select/SelectLegend'
import ButtonPrimary from '@/components/Buttons/ButtonPrimary'
import { FormProvider, useFieldArray, useForm } from 'react-hook-form'

export interface CreateSPCRef {
  openModal: () => void
  closeModal: () => void
}
const CreateSPC: ForwardRefRenderFunction<CreateSPCRef> = (props, ref) => {
  const [isModalView, setIsModalView] = useState(false)
  const openModal = useCallback(() => {
    setIsModalView(true)
  }, [])
  const closeModal = useCallback(() => {
    setIsModalView(false)
  }, [])
  useImperativeHandle(ref, () => ({
    openModal,
    closeModal,
  }))

  const spcMethods = useForm();
  const { register, handleSubmit, control } = spcMethods;
  const { fields, append, remove } = useFieldArray({
      control,
      name: "spc",
  });

  function addSPC() {
    append({
      type: "SPCA",
      year: "",
      numPge: "",
      legend: "",
      observation: "",
    });
  }

  function onSubmit(data: any){
    console.log(data)

  }

  if (!isModalView) {
    return null
  }

  

  return (
    <div className="model-bg">
      <div className="model-size model-size-full">
        <div className='model-card'>
          <div className="model-header">
              <div>
                <h4 className="text-h4">Cadastrar PCA</h4>
                <span className="text-span">
                  Cadastre um novo pca de um diretório
                </span>
              </div>
              <button onClick={closeModal} className="model-close">
                <X size={20} />
              </button>
            </div>
            {/* <CreateFormSPC closeModal={closeModal}/> */}
            <FormProvider {...spcMethods}>
              <form onSubmit={handleSubmit(onSubmit)} className='model-body'>
              
              <SelectDirectory handleSearchOnChange={(e)=>console.log(e.target.value)} {...register('directory')}/>
              <button onClick={addSPC}>
                Adcionar
              </button>
              {
                fields.map((item, index) => (
                  <div key={item.id}>
                    {/* <InputYear name={`field.${index}.year`}/> */}
                    <InputBase 
                      label='n° PJE'
                      name={`field.${index}.numPge`} 
                      placeholder='Digite o número' 
                      type='number'
                      />
                    <SelectLegend {...register(`field.${index}.legend`)}/>
                    <InputBase 
                        type='text'  
                        name={`field.${index}.observation`}
                        label='Observação' 
                        />

                    <button
                      type="button"
                      onClick={() => remove(index)}
                      className="w-fit rounded-full p-0 text-gray-300 hover:text-gray-600"
                    >
                      <X size={20} />
                    </button>

                  </div>
                ))
              }
              
              <div>
                <input type='radio' name='type'/>
                <label htmlFor="">SPCA</label>
              </div>
              
              <ButtonPrimary
              variant='container'
              title='Cadastrar'
              type='submit'>
                Cadastrar
              </ButtonPrimary>
              </form>
            </FormProvider>
          
        </div>
      </div>
    </div>
  )
}

export default forwardRef(CreateSPC);
