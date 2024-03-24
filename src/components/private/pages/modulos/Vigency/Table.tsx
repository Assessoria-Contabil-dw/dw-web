import { Vigency } from "@/interfaces/vigency";
import { TableOptions } from "../../../Tools/TableOptions";
import ViewVigencyModel, { ViewVigencyRef } from "./View";
import DeleteModel, { DeleteRef } from "@/components/private/Model/Delete";
import UpdateVigency, { UpdateVigencyRef } from "./Update";
import { useCallback, useRef } from "react";

interface TableVigencyProps {
  role?: string;
  title: string;
  data?: Vigency[];
  defaultText?: string;
}
export default function TableVigency({
  title,
  data,
  role,
  defaultText,
}: TableVigencyProps) {
  const modalDeleteRef = useRef<DeleteRef>(null);
  const modalUpdateRef = useRef<UpdateVigencyRef>(null);
  const modalViewRef = useRef<ViewVigencyRef>(null);

  const handleUpdateModal = useCallback((id: string) => {
    modalUpdateRef.current?.openViewModal(id);
  }, []);

  const handleDeleteModal = useCallback((id: string, msg: string) => {
    modalDeleteRef.current?.openModal(id, "vigencies", msg, "vigenciesData");
  }, []);

  const handleViewModal = useCallback((id: string) => {
    modalViewRef.current?.openModal(id);
  }, []);

  return (
    <>
      <DeleteModel ref={modalDeleteRef} />
      <UpdateVigency ref={modalUpdateRef} />
      <ViewVigencyModel ref={modalViewRef} />
      <div className="flex flex-col gap-2">
        <h4 className="text-h4">{title}</h4>
        <fieldset className="fieldset">
          <table id="table-style">
            <thead>
              <tr>
                <th>Data Inicial</th>
                <th>Data Final</th>
                <th>Presidente</th>
                <th>Vice Presidente</th>
                <th>Tesoureiro</th>
                <th>Advogados</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {data != null ? (
                data.map((v, index) => (
                  <tr key={index}>
                    <td>{v.dateFirst != null ? v.dateFirst : "-"}</td>
                    <td>
                      {v.dateLast != null ? (
                        <span className="flex items-end gap-2">
                          <p>{v.dateLast}</p>
                          {v.daysVenciment ? (
                            <span className="bg-red-500/30 uppercase text-red-500 px-2 rounded-full" title="Data de vencimento próxima">
                              {v.daysVenciment} dias
                            </span>
                          ) : null}
                        </span>
                      ) : (
                        "-"
                      )}
                    </td>
                    <td>{v.president?.name ? v.president.name : "-"}</td>
                    <td>
                      {v.vicePresident?.name ? v.vicePresident.name : "-"}
                    </td>
                    <td>{v.treasurer?.name ? v.treasurer.name : "-"}</td>
                    <td>
                      <div className="flex flex-col  ">
                        {v.advocates
                          ? v.advocates.map((a, index) => (
                              <span
                                className="max-w-[8rem] overflow-hidden text-ellipsis whitespace-nowrap"
                                key={index}
                              >
                                {a.name}
                              </span>
                            ))
                          : "-"}
                      </div>
                    </td>

                    <td className="text-right">
                      <TableOptions
                        role={role || ""}
                        isView
                        isEdit
                        isDelete
                        handleView={() => handleViewModal(v.id.toString())}
                        handleEdit={() => handleUpdateModal(v.id.toString())}
                        handleDelete={() =>
                          handleDeleteModal(
                            String(v.id),
                            v.dateFirst + " - " + v.dateLast
                          )
                        }
                      />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={10} className="py-4 text-center">
                    {defaultText}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </fieldset>
      </div>
    </>
  );
}
