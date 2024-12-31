import { ChangeEvent, useCallback, useEffect, useRef, useState } from "react";
import { LoadingSecond } from "@/components/Loading/second";
import { api } from "@/lib/api";

import FormularioXSD, { FormularioXSDRef } from "./FormularioXSD";
import PaddingTable from "../../../Tools/TablePadding";

import moment from "moment";

interface TableXSDProps {
  role: string;
  data: { results: any[]; pages: number; count: number; next: boolean, saldo: string, credito: string, debito: string, totalDebito:string, totalCredito: string, totalSaldo:string } | null;
  loading: boolean;
  setData: (data: any) => void;
  prevPage: () => void;
  nextPage: () => void;
  setTake: (data: any) => void;
  setSkip: (data: any) => void;
  setPage: (data: any) => void;
  page: number;
}

export function TableXSD({
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
}: TableXSDProps) {
  const [selectedCheckbox, setSelectedCheckbox] = useState(false);
  const modalFormularioXSDRef = useRef<FormularioXSDRef>(null);

  const salvarNumeroRecibo = (
    e: ChangeEvent<HTMLInputElement>,
    idx: number
  ) => {
    if (data && data.results && data.results.length) {
      const value = { ...data.results[idx], NR_RECIBO: Number(e.target.value) };
      const localData = { ...data };
      localData.results[idx] = value;
      setData(localData);

      api
        .patch(`/gera_xsds/recibo`, { id: value["ID"], recibo: e.target.value })
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => console.log(error));
    }
  };

  useEffect(() => {
    return setSelectedCheckbox(
      data?.results?.filter((v) => v["SELECIONADO"] == false).length == 0
    );
  }, [data]);

  const marcarTodosComoSelecionado = (e: ChangeEvent<HTMLInputElement>) => {
    setSelectedCheckbox(!selectedCheckbox);
    data?.results?.map((v) => {
      return (v["SELECIONADO"] = !selectedCheckbox);
    });

    api
      .patch(`/gera_xsds/selecionar`, {
        ids: data?.results?.map((v) => v["ID"]),
        selecionado: !selectedCheckbox,
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => console.log(error));
  };

  const marcarComoSelecionado = (
    e: ChangeEvent<HTMLInputElement>,
    idx: number
  ) => {
    if (data && data.results && data.results.length) {
      const value = {
        ...data.results[idx],
        SELECIONADO: !data.results[idx]["SELECIONADO"],
      };
      const localData = { ...data };
      localData.results[idx] = value;
      setData(localData);

      api
        .patch(`/gera_xsds/selecionar`, {
          ids: [value["ID"]],
          selecionado: value["SELECIONADO"],
        })
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => console.log(error));
    }
  };

  const handleEditXSD = (index: number, e: any) => {
    if (
      e.target.nodeName != "INPUT" &&
      data &&
      data?.results &&
      data?.results?.length
    ) {
      modalFormularioXSDRef.current?.openModal();
      modalFormularioXSDRef.current?.passIdData(data?.results[index].ID);
    }
  };

  return (
    <>
      <FormularioXSD ref={modalFormularioXSDRef} />
      <div>
        <fieldset className="fieldset">
          <table id="table-style">
            <thead>
              <tr>
                <th>
                  <input
                    type="checkbox"
                    checked={selectedCheckbox}
                    onChange={(e) => marcarTodosComoSelecionado(e)}
                  />
                </th>
                <th>PARTIDO</th>
                <th>DIRETÓRIO</th>
                <th>CNPJ PRESTADOR</th>
                <th>DATA LANÇAMENTO</th>
                <th>Nº RECIBO</th>
                <th>DOCUMENTO</th>
                <th>DESCRIÇÃO LANÇAMENTO</th>
                <th>CPF/CNPJ</th>
                <th>CONTRAPARTE</th>
                <th>VALOR</th>
                <th>D/C</th>
              </tr>
            </thead>
            <tbody>
              {data?.results?.map((reg, idx) => {
                let registroValido = false;
                if (reg.TP_LANCAMENTO == "C") {
                  if (
                    reg.NR_RECIBO &&
                    reg.CD_FONTE_RECURSO &&
                    reg.CD_NATUREZA &&
                    reg.CD_ORIGEM &&
                    reg.CD_CLASSIFICACAO &&
                    reg.CD_ESPECIE &&
                    reg.CD_FONTE_RECURSO.length &&
                    reg.CD_NATUREZA.length &&
                    reg.CD_ORIGEM.length &&
                    reg.CD_CLASSIFICACAO.length &&
                    reg.CD_ESPECIE.length &&
                    (reg.CD_ORIGEM != "CA" ||
                      (reg.CD_ORIGEM == "CA" &&
                        reg.CD_CANDIDATURA &&
                        reg.CD_CANDIDATURA.length)) &&
                    (reg.CD_FONTE_RECURSO != "FEFC" ||
                      (reg.CD_FONTE_RECURSO == "FEFC" &&
                        reg.CD_ORIGEM == "CA" &&
                        reg.AA_ELEICAO &&
                        reg.CD_ELEICAO_SUPLEMENTAR &&
                        reg.CD_ELEICAO_SUPLEMENTAR.length))
                  ) {
                    registroValido = true;
                  }
                }
                if (
                  reg.TP_LANCAMENTO == "D" &&
                  reg.CD_GASTO &&
                  reg.CD_GASTO.length &&
                  reg.CD_DOCUMENTO &&
                  reg.CD_DOCUMENTO.length
                ) {
                  registroValido = true;
                }
                return (
                  <tr
                    onDoubleClick={(e) => handleEditXSD(idx, e)}
                    key={idx}
                    className={`select-none hover:bg-primary cursor-pointer${
                      registroValido ? " bg-lime-300 text-slate-800" : ""
                    }`}
                  >
                    <td>
                      <input
                        type="checkbox"
                        value={reg.ID}
                        checked={reg.SELECIONADO}
                        onChange={(e) => marcarComoSelecionado(e, idx)}
                      />
                    </td>
                    <td>{reg.SG_PARTIDO}</td>
                    <td>{reg.SURNAME}</td>

                    <td>{reg.NR_CNPJ_PRESTADOR_CONTA ?? "-"}</td>
                    <td>
                      {moment(reg.DT_LANCAMENTO).utc().format("DD/MM/YYYY")}
                    </td>
                    <td>
                      {reg.TP_LANCAMENTO == "C" && (
                        <input
                          type="text"
                          value={reg.NR_RECIBO}
                          onChange={(e) => salvarNumeroRecibo(e, idx)}
                          className="m-0 w-16 border border-slate-200 text-center"
                        />
                      )}
                    </td>
                    <td>{reg.NR_DOCUMENTO ?? "-"}</td>
                    <td>{reg.DS_LANCAMENTO}</td>
                    <td>{reg.NR_CPF_CNPJ_CONTRAPARTE}</td>
                    <td>{reg.NM_CONTRAPARTE}</td>
                    <td
                      className={`text-right !font-bold ${
                        reg.TP_LANCAMENTO === "D"
                          ? "!text-red-600"
                          : "!text-sky-600"
                      }`}
                    >
                      {reg.VR_LANCAMENTO}
                    </td>
                    <td>{reg.TP_LANCAMENTO}</td>
                  </tr>
                );
              })}
            </tbody>
            <tfoot>
              <tr>
                <th colSpan={4} className="!text-red-600">Débito: </th>
                <td className="!text-red-600">{data?.debito}</td>

                <th colSpan={2} className="!text-sky-600">Crédito:</th>
                <td className="!text-sky-600">{data?.credito}</td>

                <th colSpan={2}>Saldo:</th>
                <td colSpan={2}>{data?.saldo}</td>
              </tr>
                <tr>
                <th colSpan={4} className="!text-red-600">Débito Total: </th>
                <td className="!text-red-600">{data?.totalDebito}</td>

                <th colSpan={2} className="!text-sky-600">Crédito Total:</th>
                <td className="!text-sky-600">{data?.totalCredito}</td>

                <th colSpan={2}>Saldo Total:</th>
                <td colSpan={2}>{data?.totalSaldo}</td>
              </tr>
            </tfoot>
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
