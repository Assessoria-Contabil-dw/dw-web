import { ChangeEvent, useRef } from "react";
import { LoadingSecond } from "@/components/Loading/second";
import { api } from "@/lib/api";
import FormularioConvenio, { FormularioConvenioRef } from "./FormularioConvenio";
import FormularioExtrato, { FormularioExtratoRef } from "./FormularioExtrato";
import PaddingTable from "../../../Tools/TablePadding";
import { LucideEdit, LucideTrash2, LucideDownload } from "lucide-react";
import { useNotify } from "@/components/Toast/toast";
import { Convenio, ConvenioListResponse } from "./@types/interface.type";

interface TableConvenioProps {
  role: string;
  data: ConvenioListResponse | null;
  loading: boolean;
  setData: (data: any) => void;
  prevPage: () => void;
  nextPage: () => void;
  setTake: (data: any) => void;
  setSkip: (data: any) => void;
  setPage: (data: any) => void;
  page: number;
  fetchData: () => void;
}

export function TableConvenio({
  role,
  data,
  loading,
  setData,
  prevPage,
  nextPage,
  setTake,
  setSkip,
  setPage,
  page,
  fetchData,
}: TableConvenioProps) {
  const modalFormularioConvenioRef = useRef<FormularioConvenioRef>(null);
  const modalFormularioExtratoRef = useRef<FormularioExtratoRef>(null);
  const notify = useNotify();

  const handleEditConvenio = (id: number) => {
    modalFormularioConvenioRef.current?.openModal();
    modalFormularioConvenioRef.current?.passIdData(id);
  };

  const handleDownloadExtrato = (id: number) => {
    modalFormularioExtratoRef.current?.openModal();
    modalFormularioExtratoRef.current?.passConvenioId(id);
  };

  const handleDeleteConvenio = async (id: number) => {
    if (confirm("Deseja realmente excluir este convênio?")) {
      try {
        await api.delete(`/convenios/${id}`);
        notify({ type: "success", message: "Convênio excluído com sucesso!" });
        fetchData();
      } catch (error) {
        notify({ type: "error", message: "Erro ao excluir convênio" });
      }
    }
  };

  return (
    <>
      <FormularioConvenio ref={modalFormularioConvenioRef} />
      <FormularioExtrato ref={modalFormularioExtratoRef} />
      <div>
        <fieldset className="fieldset">
          <table id="table-style">
            <thead>
              <tr>
                <th>ID</th>
                <th>Convênio</th>
                <th>Banco</th>
                <th>Agência</th>
                <th>Conta</th>
                <th>DV</th>
                <th>Client ID</th>
                <th className="text-center">Ações</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={8} className="text-center py-8">
                    <LoadingSecond />
                  </td>
                </tr>
              ) : data?.results && data.results.length > 0 ? (
                data.results.map((convenio: Convenio, idx: number) => (
                  <tr
                    key={idx}
                    className="select-none hover:bg-primary cursor-pointer"
                    onDoubleClick={() => handleEditConvenio(convenio.id)}
                  >
                    <td>{convenio.id}</td>
                    <td>{convenio.convenio}</td>
                    <td>{convenio.banco}</td>
                    <td>{convenio.agencia}</td>
                    <td>{convenio.conta}</td>
                    <td>{convenio.dv || "-"}</td>
                    <td>{convenio.client_id ? "●●●●●" : "-"}</td>
                    <td className="text-center">
                      <div className="flex gap-2 justify-center">
                        <button
                          onClick={() => handleDownloadExtrato(convenio.id)}
                          className="text-green-600 hover:text-green-800"
                          title="Baixar Extrato"
                        >
                          <LucideDownload size={18} />
                        </button>
                        <button
                          onClick={() => handleEditConvenio(convenio.id)}
                          className="text-blue-600 hover:text-blue-800"
                          title="Editar"
                        >
                          <LucideEdit size={18} />
                        </button>
                        {role === "ADMIN" && (
                          <button
                            onClick={() => handleDeleteConvenio(convenio.id)}
                            className="text-red-600 hover:text-red-800"
                            title="Excluir"
                          >
                            <LucideTrash2 size={18} />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8} className="text-center py-8">
                    Nenhum convênio encontrado
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </fieldset>

        {data?.results && data?.results.length > 0 && (
          <div className="mt-5">
            <PaddingTable
              onChange={(e) => {
                setTake(Number(e.target.value));
                setSkip(0);
                setPage(1);
              }}
              pages={data.pages ?? 0}
              page={page}
              count={data.count}
              isPreviousData={false}
              nextPage={nextPage}
              prevPage={prevPage}
              setPage={setPage}
              next={data.next}
              isFetching={loading}
            />
          </div>
        )}
      </div>
    </>
  );
}
