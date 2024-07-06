import { useCallback, useRef, useState } from "react";
// import UpdateSPC, { UpdateSPCRef } from "./ModelUpdate";
// import ViewSPC, { ViewSPCRef } from "./View";
import dayjs from "dayjs";
import { LoadingSecond } from "@/components/Loading/second";
import { TableOptions } from "../../../Tools/TableOptions";
import { SPCAllProps } from "@/hooks/SPC/@type";

interface TableProps {
  role?: string;
  data?: SPCAllProps[] | null;
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

  const generateSPCAList = (spc: SPCAllProps) => {
    const spcaList = [];

    for (let i = 2017; i <= dayjs().year(); i++) {
      const spca = spc.SPCA?.find((spca) => spca?.year === String(i) || null);

      spcaList.push(
        <li key={i} className="relative">
          {spca ? (
            <a
              target="blank"
              title={spca.status}
              style={{ backgroundColor: `${spca.color}` }}
              href={isLinkTwo ? spca.link2 : spca.link1}
            >
              {spca.year}
            </a>
          ) : (
            <div className="w-10" />
          )}
          {spca?.observation && (
            <>
              <input
                type="checkbox"
                name="observation"
                id={spca.id.toString()}
                checked={selectedCheckbox === spca.id}
                onChange={() => handleCheckboxChange(spca.id)}
                className="peer/popper absolute -right-1 -top-2 z-10 h-3 w-3 cursor-pointer opacity-0"
              />
              <span className="z-1 absolute -right-1 -top-2 flex h-3 w-3 ">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-second opacity-75"></span>
                <span className="relative inline-flex h-3 w-3 rounded-full bg-second"></span>
              </span>
              <div className="break-words absolute z-[5] mt-[2px] hidden  transition duration-1000 peer-checked/popper:block">
                <div className="rounded-md border-[1px] border-zinc-200 bg-white p-2 shadow-lg ">
                  <h2 className="whitespace-normal w-[100px] font-mono text-xs text-slate-700 ">
                    {spca.observation}
                  </h2>
                </div>
              </div>
            </>
          )}
        </li>
      );
    }
    return spcaList;
  };

  const generateSPCEList = (spc: SPCAllProps) => {
    const spceList = [];

    for (let i = 2018; i <= dayjs().year(); i += 2) {
      const spce = spc.SPCE?.find((spce) => spce?.year === String(i) || null);

      spceList.push(
        <li key={i} className="relative">
          {spce ? (
            <a
              target="blank"
              title={spce.status}
              style={{
                backgroundColor: `${spce.color}`,
              }}
              href={spce.link}
            >
              {spce.year}
            </a>
          ) : (
            <div className="w-10" />
          )}
        </li>
      );
    }
    return spceList;
  };

  return (
    <div>
      {/* <UpdateSPC ref={modalUpdateRef} />
      <ViewSPC ref={modalViewRef} /> */}

      <fieldset className="fieldset">
        <table id='table-style'>
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
              data?.map((spc, index) => (
                <tr key={index}>
                  <td>
                    {spc.state} - {spc.party} - {spc.surname}
                  </td>
                  <td>
                    <span
                      className={
                        spc.vigency
                          ? `rounded-xl bg-blue-100 px-2 py-1 text-blue-400`
                          : `rounded-xl bg-zinc-100 px-2 py-1 text-gray-400`
                      }
                    >
                      {spc.vigency ? "Ativa" : "Inativa"}
                    </span>
                  </td>
                  <td className="whitespace-nowrap">
                    <ul>
                      {spc.SPCE !== null && spc.SPCE.length > 0 ? (
                        generateSPCEList(spc)
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
                      // handleView={() => handleViewModal(spc.id.toString())}
                      // handleEdit={() => handleEditDirectory(spc.id.toString())}
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
