// import ButtonPrimary from "@/components/Buttons/ButtonPrimary";
// import ButtonSecond from "@/components/Buttons/ButtonSecond";
// import { Form } from "@/components/Form";
// import { RadioInput } from "@/components/Form/Radio";
// import SelectDirectory from "@/components/private/Search/Select/SelectDirectory";
// import SelectLegend from "@/components/private/Search/Select/SelectLegend";
// import { zodResolver } from "@hookform/resolvers/zod";
// import dayjs from "dayjs";
// import { X } from "lucide-react";
// import {  useState } from "react";
// import { useForm, FormProvider, useFieldArray} from "react-hook-form";
// import { z } from "zod";


// export interface CreateFormSPCProps {
//     closeModal: () => void
// }


// type SPCFormData = z.infer<typeof spcFormShema>;

// export const CreateFormSPC = ({ closeModal }: CreateFormSPCProps) => {

//     const [selectedDirectory, setSelectedDirectory] = useState("");
//     const [selectedColorStatus, setSelectedColorStatus] = useState("");
//     const [error, setError] = useState("");

//   const createSPCForm = useForm<SPCFormData>({
//     resolver: zodResolver(spcFormShema),
//   });

//   const {
//     handleSubmit,
//     control,
//     formState: { isSubmitting },
//   } = createSPCForm;

//   const useFieldSPC = useFieldArray({
//     control,
//     name: "spc",
//   });


//   function addNewSPC() {
//     useFieldSPC.append({
//       year: "",
//       numPge: "",
//       status: "",
//       observation: "",
//       type: "SPCA",
//     });
//   }
//   async function handleCreateSPC(data: SPCFormData) {
//     return console.log(data);
//   }

//   return (
//     <FormProvider {...createSPCForm}>
//       <form  onSubmit={handleSubmit(handleCreateSPC)}>
//             <div className="model-body">
//                 <div className="flex flex-col gap-3">
//                   <div className="flex gap-4">
                 
//                     {/* <Form.Field>
//                       <Form.SelectInput
//                         onChange={(e) => setSelectedDirectory(e.target.value)}
//                         value={selectedDirectory}
//                         type="text"
//                         placeholder="Selecione o diretório"
//                         name="directoryId"
//                       > */}
//                         {/* { directory && directory..map((directory, index) => {
//                           return (
//                             <option key={index} value={directory.id.toString()}>
//                               {directory.surname}
//                             </option>
//                           )
//                         })} */}
//                       {/* </Form.SelectInput>
//                       <Form.ErrorMessage field="directoryId" />
//                     </Form.Field>
//                      */}
//                     <SelectDirectory 
//                     name="directoryId"
//                       onChange={(e) => setSelectedDirectory(e.target.value)}
//                       value={selectedDirectory}
//                       />  
//                     <ButtonPrimary
//                       variant='container'
//                       title="Adicionar SPC"
//                       type="button"
//                       onClick={addNewSPC}
//                       className=" w-fit bg-gray-100 text-xs text-gray-500"
//                     >
//                       Adicionar SPC
//                     </ButtonPrimary>
//                   </div>

//                   <hr />

//                   {useFieldSPC.fields.map((fieldSPC, index) => {
//                     return (
//                       <fieldset
//                         key={fieldSPC.id}
//                         className="flex flex-col gap-3"
//                       >
//                         <div className="flex">
//                           <Form.Field>
//                             <Form.Label htmlFor={`spc.${index}.type`}>
//                               Tipo
//                             </Form.Label>
//                             <div className="flex gap-4">
//                               <RadioInput
//                                 type="radio"
//                                 value="SPCA"
//                                 label="SPCA"
//                                 name={`spc.${index}.type`}
//                               />
//                               <RadioInput
//                                 type="radio"
//                                 value="SPCE"
//                                 label="SPCE"
//                                 name={`spc.${index}.type`}
//                               />
//                             </div>
//                           </Form.Field>
//                           <Form.ErrorMessage field={`spc.${index}.type`} />
//                           <button
//                             onClick={() => useFieldSPC.remove(index)}
//                             className="w-fit rounded-full p-0 text-gray-300 hover:text-gray-600"
//                           >
//                             <X size={20} />
//                           </button>
//                         </div>

//                         <div className="flex gap-3">
//                           <Form.Field>
//                             <Form.Label htmlFor={`spc.${index}.year`}>
//                               Ano
//                             </Form.Label>
//                             <Form.TextInput
//                               type="number"
//                               min={1999}
//                               max={dayjs().year()}
//                               placeholder={String(dayjs().year())}
//                               name={`spc.${index}.year`}
//                             />
//                             <Form.ErrorMessage field={`spc.${index}.year`} />
//                           </Form.Field>

//                           <Form.Field>
//                             <Form.Label htmlFor={`spc.${index}.numPge`}>
//                               n° PJE
//                             </Form.Label>
//                             <Form.TextInput
//                               type="text"
//                               placeholder="Digite o numero do PJE"
//                               name={`spc.${index}.numPge`}
//                             />
//                             <Form.ErrorMessage field={`spc.${index}.numPge`} />
//                           </Form.Field>

//                           <Form.Field>
//                             <SelectLegend 
//                                 name={`spc.${index}.status`}
//                                 value={selectedColorStatus}
//                                 onChange={(e) =>
//                                 setSelectedColorStatus(e.target.value)
//                               }/>
//                             {/* <Form.SelectInput
//                               type="text"
                              
//                               placeholder="Selecione o status"
//                               name={`spc.${index}.status`}
//                             >
//                               {colorStatus.map((color) => {
//                                 return (
//                                   <option
//                                     key={color.id}
//                                     value={color.id.toString()}
//                                   >
//                                     {color.name}
//                                   </option>
//                                 )
//                               })}
//                             </Form.SelectInput> */}
//                             <Form.ErrorMessage field={`spc.${index}.status`} />
//                           </Form.Field>
//                         </div>

//                         <Form.Field>
//                           <Form.Label htmlFor={`spc.${index}.observation`}>
//                             Observação
//                           </Form.Label>
//                           <Form.TextAreaInput
//                             placeholder="Digite uma observação"
//                             name={`spc.${index}.observation`}
//                           />
//                           <Form.ErrorMessage
//                             field={`spc.${index}.observation`}
//                           />
//                         </Form.Field>
//                       </fieldset>
//                     )
//                   })}
//                 </div>
//               </div>


//             {error && <span className="text-sm text-red-500">{error}</span>}

//             <div className="flex gap-4">
//               <ButtonSecond
//                 title="Cancelar"
//                 variant="cancel"
//                 onClick={closeModal}
//                 type="button"
//               >
//                 Cancelar
//               </ButtonSecond>
//               <ButtonPrimary
//                 title="Cadastrar"
//                 variant="fill"
//                 type="submit"
//                 loading={isSubmitting}
//               >
//                 Cadastrar
//               </ButtonPrimary>
//             </div>
//       </form>
//     </FormProvider>
//   );
// };

