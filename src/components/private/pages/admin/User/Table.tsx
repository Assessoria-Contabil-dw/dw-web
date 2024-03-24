"use client";
import { Circle, KeyIcon } from "lucide-react";
import { useCallback, useRef, useState } from "react";
import Link from "next/link";
import { TableOptions } from "@/components/private/Tools/TableOptions";
import DeleteModel, { DeleteRef } from "@/components/private/Model/Delete";
import Model, { ModelRef } from "@/components/private/components/Modal";
import FormUpdate from "./FormUpdate";
import FormPassword from "./FormPassword";

interface TableUserProps {
  loading?: boolean;
  data: {
    id: number;
    disabled: boolean;
    name: string;
    email: string;
    role: string;
    cpf: string;
  }[] | null;
}
export function TableUser({ loading, data }: TableUserProps) {
 
  const [id, setId] = useState("");

  const modelUpdateRef = useRef<ModelRef>(null);
  const handleUpdateOpenModal = useCallback((id: string) => {
    setId(id);
    modelUpdateRef.current?.openModel();
  }, []);

  const handleUpdateCloseModal = useCallback(() => {
    modelUpdateRef.current?.closeModel();
  }, []);

  const modelPassordRef = useRef<ModelRef>(null);
  const handlePasswordOpenModal = useCallback((id: string) => {
    setId(id);
    modelPassordRef.current?.openModel();
  }, []);

  const handlePasswordCloseModal = useCallback(() => {
    modelPassordRef.current?.closeModel();
  }, []);


  const modelDeleteRef = useRef<DeleteRef>(null);
  const handleDeleteUser = (id: string, name: string) => {
    modelDeleteRef.current?.openModal(
      id,
      "admin/user",
      `Deseja excluir o usuário ${name}?`,
      "userData"
    );
  };

  return (
    <div className="flex flex-col gap-2">
      <Model title="Atualizar usuário" ref={modelUpdateRef}>
       <FormUpdate id={id} closeModal={handleUpdateCloseModal} />
      </Model>

      <Model title="Mudar senha" className="h-fit w-fit" ref={modelPassordRef}>
        <FormPassword id={id} closeModal={handlePasswordCloseModal} />
      </Model>

      <DeleteModel ref={modelDeleteRef} />
      <fieldset className="fieldset">
        <table id="table-style">
          <thead>
            <tr>
              <th></th>
              <th>Nome</th>
              <th>Nível</th>
              <th>CPF</th>
              <th>Email</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {data !== null ? (
              data.map((user, index) => (
                <tr key={index}>
                  <td
                    className="cursor-pointer"
                    title={user.disabled ? "Ativo" : "Inativo"}
                  >
                    <Circle
                      className={
                        user.disabled
                          ? `fill-second text-second`
                          : ` fill-slate-300  text-slate-300`
                      }
                      size={12}
                    />
                  </td>
                  <td>
                    {user.role === "Administrador" ? (
                      <h2>{user.name}</h2>
                    ) : (
                      <Link
                      className="text-secondHover"
                      href={{
                        pathname: `/admin/clientes/acessos/${user.cpf}`,
                      }}
                    >
                      {user.name}
                    </Link>
                    )}
                    
                  </td>
                  <td>{user.role}</td>
                  <td className="whitespace-nowrap">{user.cpf}</td>
                  <td>{user.email}</td>

                  <td>
                    <TableOptions
                      role="ADMIN"
                      isView={false}
                      isEdit
                      isDelete
                      handleEdit={() => handleUpdateOpenModal(String(user.id))}
                      handleDelete={() => handleDeleteUser(String(user.id), user.name)}
                    >
                      <button
                        onClick={() => handlePasswordOpenModal(String(user.id))}
                        className="h-full px-1 hover:text-second"
                      >
                        <KeyIcon size={16} />
                      </button>
                    </TableOptions>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="py-6 text-center">
                  Nenhum partido encontrado
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </fieldset>
    </div>
  );
}
