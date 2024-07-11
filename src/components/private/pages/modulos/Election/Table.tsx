import { useCallback, useRef, useState } from "react";
// import UpdateSPC, { UpdateSPCRef } from "./ModelUpdate";
// import ViewSPC, { ViewSPCRef } from "./View";
import dayjs from "dayjs";
import { LoadingSecond } from "@/components/Loading/second";
import { TableOptions } from "../../../Tools/TableOptions";
import {
  ElectionAllProps,
  ElectionProps,
  SPCAllProps,
} from "@/hooks/SPC/@type";

interface TableProps {
  role?: string;
  data?: ElectionAllProps[] | null;
  loading?: boolean;
}
export function TableElection({ role, data, loading }: TableProps) {
  const [selectedCheckbox, setSelectedCheckbox] = useState(0);

  const [isLinkTwo, setIsLinkTwo] = useState(false);
  // const modalUpdateRef = useRef<UpdateSPCRef>(null);
  // const modalViewRef = useRef<ViewSPCRef>(null);

  // const handleEditDirectory = useCallback((id: string) => {
  //   modalUpdateRef.current?.openModal(id);
  // }, []);

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

    for (let i = 2018; i <= dayjs().year(); i += 2) {
      const e = elections.find((e) => e.year === String(i) || null);

      electionsArray.push(
        <li key={i} className="relative">
          {e ? (
            <a
              target="blank"
              title={e.legendName}
              style={{
                backgroundColor: `${e.legendHex}`,
              }}
              href={e.link}
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
      {/* <UpdateSPC ref={modalUpdateRef} />
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
              <th>Eleições</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {data ? (
              data?.map((item, index) => (
                <tr key={index}>
                  <td>{item.name}</td>
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
                      isView
                      isEdit
                      isDelete={false}
                      // handleView={() => handleViewModal(item.id.toString())}
                      // handleEdit={() => handleEditDirectory(item.id.toString())}
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="py-6 text-center">
                  Nenhum partido cadastrado
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </fieldset>
    </div>
  );
}
