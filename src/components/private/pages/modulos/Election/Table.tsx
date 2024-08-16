import { useCallback, useRef, useState } from "react";
// import ViewSPC, { ViewSPCRef } from "./View";
import dayjs from "dayjs";
import { LoadingSecond } from "@/components/Loading/second";
import { TableOptions } from "../../../Tools/TableOptions";
import {
  ElectionAllProps,
  ElectionProps,
} from "@/hooks/SPC/@type";
import ModelUpdate, { UpdateRef } from "./ModelUpdate";

interface TableProps {
  role?: string;
  data?: ElectionAllProps[] | null;
  loading?: boolean;
}
export function TableElection({ role, data, loading }: TableProps) {
  const [selectedCheckbox, setSelectedCheckbox] = useState(0);

  const [isLinkTwo, setIsLinkTwo] = useState(false);
  const modalUpdateRef = useRef<UpdateRef>(null);
  // const modalViewRef = useRef<ViewSPCRef>(null);

  const handleEdit = useCallback((id: string) => {
    modalUpdateRef.current?.openModal(id);
  }, []);

  // const handleViewModal = useCallback((id: string) => {
  //   modalViewRef.current?.openModal(id);
  // }, []);

  const handleCheckboxChange = (checkboxId: number) => {
    if (checkboxId === selectedCheckbox) {
      setSelectedCheckbox(0);
      return;
    }
    setSelectedCheckbox(checkboxId);
  };

  const generateElectionList = (elections: ElectionProps[]) => {
    const electionsArray = [];

    for (let i = 2024; i <= dayjs().year() ; i += 2) {
      const e = elections.find((e) => e.year === String(i) || null);

      electionsArray.push(
        <li key={i} className="relative">
          {e ? (
            <a
              target="blank"
              title={e.colorName}
              style={{
                backgroundColor: `${e.colorHex}`,
              }}
              href={e.link1}
            >
              {e.year}
            </a>
          ) : (
            <div className="w-10" />
          )}
          {e?.observation && (
            <>
              <input
                type="checkbox"
                name="observation"
                id={e.id.toString()}
                checked={selectedCheckbox === e.id}
                onChange={() => handleCheckboxChange(e.id)}
                className="peer/popper absolute -right-1 -top-2 z-10 h-3 w-3 cursor-pointer opacity-0"
              />
              <span className="z-1 absolute -right-1 -top-2 flex h-3 w-3 ">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-second opacity-75"></span>
                <span className="relative inline-flex h-3 w-3 rounded-full bg-second"></span>
              </span>
              <div className="break-words absolute z-[5] mt-[2px] hidden  transition duration-1000 peer-checked/popper:block">
                <div className="rounded-md border-[1px] border-zinc-200 bg-white p-2 shadow-lg ">
                  <h2 className="whitespace-normal w-[100px] font-mono text-xs text-slate-700 ">
                    {e.observation}
                  </h2>
                </div>
              </div>
            </>
          )}
        </li>
      );
    }
    return electionsArray;
  };

  return (
    <div>
      <ModelUpdate ref={modalUpdateRef} />
      {/* 
      <ViewSPC ref={modalViewRef} /> */}

      <fieldset className="fieldset">
        <table id="table-style">
          <thead>
            <tr>
              <th>
                <div className="flex gap-2">
                  {loading && <LoadingSecond />} Líder
                </div>
              </th>
              <th>CNPJ</th>
              <th>Estado</th>
              <th>Cidade</th>
              <th>Banco</th>
              <th>Agência</th>
              <th>FEFC</th>
              <th>SPCE</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {data ? (
              data?.map((item, index) => (
                <tr key={index}>
                  <td><a href={item.link} target="_blank" className="cursor-pointer text-secondHover">{item.name}</a></td>
                  <td>{item.cnpjCurrent}</td>
                  <td>{item.stateCurrent}</td>
                  <td>{item.cityCurrent}</td>
                  <td>{item.bankCurrent}</td>
                  <td>{item.agencyCurrent}</td>
                  <td>{item.fefcCurrent}</td>
                  <td className="whitespace-nowrap">
                    <ul>
                      {item.elections !== null && item.elections.length > 0 ? (
                        generateElectionList(item.elections)
                      ) : (
                        <li></li>
                      )}
                    </ul>
                  </td>

                  <td>
                    <TableOptions
                      role={role || ""}
                      isView={false}
                      isEdit
                      isDelete={false}
                      // handleView={() => handleViewModal(item.id.toString())}
                      handleEdit={() => handleEdit(item.id.toString())}
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="py-6 text-center">
                  Nenhum registro encontrado
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </fieldset>
    </div>
  );
}
