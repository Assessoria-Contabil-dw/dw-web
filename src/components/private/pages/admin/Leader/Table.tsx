import { TableOptions } from "@/components/private/Tools/TableOptions";
import { LeaderProps } from ".";
import DeleteModel, { DeleteRef } from "@/components/private/Model/Delete";
import { useCallback, useRef, useState } from "react";
import Model, { ModelRef } from "@/components/private/components/Modal";
import { FormUpdateLeader } from "./FormUpdate";
import { ViewLeader } from "./View";
import useAuth from "@/hooks/Access/User/useAuth";

interface ILeader {
  data: LeaderProps[] | null | undefined;
}

export default function TableLeader({ data }: ILeader) {
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
  
  const modelUpdateRef = useRef<ModelRef>(null);
  const handleUpdateOpenModel = useCallback((id: string) => {
    setId(id);
    modelUpdateRef.current?.openModel();
  }, []);

  const handleUpdateCloseModel = useCallback(() => {
    modelUpdateRef.current?.closeModel();
  }, []);

  const modelViewRef = useRef<ModelRef>(null);
  const handleViewOpenModel = useCallback((id: string) => {
    setId(id);
    modelViewRef.current?.openModel();
  }, []);

  return (
    <fieldset className="fieldset h-auto w-full rounded-lg px-3 py-2">
      <DeleteModel ref={deleteRef} />
      <Model title="Atualizar" ref={modelUpdateRef}>
        <FormUpdateLeader onClose={handleUpdateCloseModel} id={id} />
      </Model>
      <Model title="Visualizar" ref={modelViewRef}>
        <ViewLeader id={id} />
      </Model>
      <table id="table-style">
        <thead>
          <tr>
            <th>Nome</th>
            <th>CPF</th>
            <th>RG</th>
            <th>Título</th>
            <th>Qualificação</th>
            <th>Endereço</th>
            <th>E-mail</th>
            <th>Assinatura</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {data && data.length > 0 ? (
            data.map((leader, index) => (
              <tr key={index}>
                <td>{leader.name}</td>
                <td className="whitespace-nowrap">{leader.cpf ? leader.cpf : "-"}</td>
                <td className="whitespace-nowrap">{leader.rg ? leader.rg : "-"}</td>
                <td className="whitespace-nowrap">{leader.title ? leader.title : "-"}</td>
                <td>{leader.qualification ? leader.qualification : "-"}</td>
                <td>{leader.address ? leader.address : "-"}</td>
                <td>{leader.email ? leader.email : "-"}</td>
                <td>
                  {leader.signatureUrl ? (
                    <picture>
                      <img
                        src={leader.signatureUrl}
                        className="pointer-events-none h-10 w-full bg-slate-200 object-contain"
                        width={50}
                        height={50}
                        alt="Assinatura do representante"
                      />
                    </picture>
                  ) : (
                    "-"
                  )}
                </td>
                <td className="w-16 ">
                  <TableOptions
                    role={"ADMIN"}
                    isView
                    isEdit
                    isDelete
                    handleView={() => handleViewOpenModel(leader.id.toString())}
                    handleEdit={() => handleUpdateOpenModel(leader.id.toString())}
                    handleDelete={() =>
                      handleDeleteModal(
                        leader.id.toString(),
                        "leader",
                        leader.name,
                        "leaderData"
                      )
                    }
                  />
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={10} className="py-6 text-center">
                Nenhum representante cadastrado
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </fieldset>
  );
}
