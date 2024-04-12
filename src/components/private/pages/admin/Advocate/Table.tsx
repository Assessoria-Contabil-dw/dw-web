import { TableOptions } from "@/components/private/Tools/TableOptions";
import DeleteModel, { DeleteRef } from "@/components/private/Model/Delete";
import { useCallback, useRef, useState } from "react";
import Model, { ModelRef } from "@/components/private/components/Modal";
import { FormUpdate } from "./FormUpdate";


interface IAdvocate {
  data: {
    id: number;
    name: string;
    oab: string;
    birthday: string;
    title: string;
    cpf: string;
    email: string;
    phone: string;
    address: string;
    nationality: string;
    status: string;
    signatureUrl: string;
    lawFirmName: string;
    lawFirmId: string;
  }[]  | null | undefined;
}
export function TableAdvocates({data}: IAdvocate) {

  const [id, setId] = useState("");

  const deleteRef = useRef<DeleteRef>(null);
  function handleDeleteModal(
    id: string,
    path: string,
    msg: string,
    query: string
  ) {
    deleteRef.current?.openModal(id, path, msg, query);
  }

  const modelRef = useRef<ModelRef>(null);
  const handleUpdateOpenModel = useCallback((id: string) => {
    setId(id);
    modelRef.current?.openModel();
  }, []);

  const handleUpdateCloseModel = useCallback(() => {
    modelRef.current?.closeModel();
  }, []);

  return (
    <div>
      <DeleteModel ref={deleteRef} />
      <Model title="Atualizar Advogado" ref={modelRef} >
        <FormUpdate onClose={handleUpdateCloseModel} id={id}/>
      </Model>
      <fieldset className="fieldset h-auto w-full rounded-lg px-3 py-2">
        <table id="table-style">
          <thead>
            <tr>
              <th>Nome</th>
              <th>OAB</th>
              <th>CPF</th>
              <th>Endereço</th>
              <th>Email</th>
              <th>Assinatura</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {data && data?.length > 0 ? (
              data.map((advocate, index) => (
                <tr key={index}>
                  <td>{advocate.name ? advocate.name : "-"}</td>
                  <td>{advocate.oab ? advocate.oab : "-"}</td>
                  <td>{advocate.cpf ? advocate.cpf : "-"}</td>
                  <td>{advocate.address ? advocate.address : "-"}</td>
                  <td>{advocate.email ? advocate.email : "-"}</td>
                  <td>
                    {advocate.signatureUrl ? (
                      <picture>
                        <img
                          className="bg-slate-200 object-contain w-full h-10 pointer-events-none"
                          src={advocate.signatureUrl}
                          width={50}
                          height={50}
                          alt="Logo do advogado"
                        />
                      </picture>
                    ) : (
                      "-"
                    )}
                  </td>
                  <td className="w-16 ">
                  <TableOptions
                      role={"ADMIN"}
                      isView={false}
                      isEdit
                      isDelete
                      // handleView={() => handleViewModal(directory.id)}
                      handleEdit={() => handleUpdateOpenModel(advocate.id.toString())}
                      handleDelete={() =>
                        handleDeleteModal(advocate.id.toString(), "advocate", advocate.name, "advocateData")
                      }
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={10} className="py-6 text-center">
                  Nenhum advogado cadastrado
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </fieldset>
    </div>
  );
}
