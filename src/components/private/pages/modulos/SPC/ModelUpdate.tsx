import { Check, Trash, X } from "lucide-react";
import {
  ForwardRefRenderFunction,
  forwardRef,
  useCallback,
  useContext,
  useImperativeHandle,
  useState,
} from "react";
import { LoadingSecond } from "@/components/Loading/second";
import FormUpdateSPC from "./Form/Update";
import { useSPCDirectoryById } from "@/hooks/SPC/useSPC";
import { AccessContext } from "@/provider/context.provider";
import { queryClient } from "@/provider/query.provider";

export interface UpdateSPCRef {
  openModal: (id: string) => void;
  closeModal: () => void;
}

const UpdateSPC: ForwardRefRenderFunction<UpdateSPCRef> = (props, ref) => {
  const [isModalView, setIsModalView] = useState(false);
  const [directoryId, setDirectoryId] = useState("");
  const [id, setId] = useState("");

  const openModal = useCallback((id: string) => {
    setDirectoryId(id);
    setIsModalView(true);
  }, []);

  const closeModal = useCallback(() => {
    console.log("closeModal");
    queryClient.invalidateQueries('spcData')
    setIsModalView(false);
  }, []);

  useImperativeHandle(ref, () => ({
    openModal,
    closeModal,
  }));


  const { partyCode, cityCode, stateId } = useContext(AccessContext);
  const { data: spcData, isLoading } = useSPCDirectoryById(
    directoryId,
    partyCode,
    cityCode,
    stateId
  );

  function handleSelectRow(spcId: string) {
    setId(spcId);
  }

  if (!isModalView) {
    return null;
  }

  return (
    <div className="model-bg">
      <div className="model-size model-size-full">
        <fieldset className="model-card">
          <div className="model-header">
            <div>
              <h4 className="text-h4">Atualizar SPCS</h4>
              <span className="text-span">
                {spcData?.party} - {spcData?.surname}
              </span>
            </div>
            <button onClick={closeModal} className="model-close">
              <X size={20} />
            </button>
          </div>

          {isLoading ? (
            <div className="model-loading">
              <LoadingSecond />
            </div>
          ) : (
            <div className="model-body">
              <div className="flex flex-col gap-2 p-1">
                <div className="rounded-xl border-[1px]">
                  <div className="rounded-t-xl bg-blue-100 p-1">
                    <h5 className="text-h5 text-center text-slate-600">
                      Dados SPCA
                    </h5>
                  </div>
                  <table>
                    <thead>
                      <tr>
                        <th className="text-[10px]">Ano</th>
                        <th className="text-[10px]">Num</th>
                        <th className="text-[10px]">Situação</th>
                        <th className="text-[10px]">Observação</th>
                      </tr>
                    </thead>
                    <tbody>
                      {spcData?.SPCA != null ? (
                        spcData.SPCA.map((s) =>
                          Number(id) === s.id ? (
                            <tr key={s.id}>
                              <td colSpan={4}>
                                <FormUpdateSPC
                                  id={s.id}
                                  year={s.year}
                                  numPge={s.numPge}
                                  colorId={s.colorId}
                                  observation={s.observation}
                                  onClick={setId}
                                />
                              </td>
                            </tr>
                          ) : (
                            <tr
                              key={s.id}
                              onClick={() => handleSelectRow(String(s.id))}
                              className="cursor-pointer"
                            >
                              <td>{s.year}</td>
                              <td>{s.numPge ?? "-"}</td>
                              <td>
                                <div
                                  style={{ backgroundColor: `${s.colorHex}` }}
                                  className=" rounded-md p-1 text-center text-[10px] text-white"
                                >
                                  {s.colorName ?? "-"}
                                </div>
                              </td>
                              <td>{s.observation ?? "-"}</td>
                            </tr>
                          )
                        )
                      ) : (
                        <tr>
                          <td colSpan={4} className="text-center">
                            Não há dados cadastrados
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>

                <div className="rounded-xl border-[1px]">
                  <div className="rounded-t-xl bg-blue-100 p-1">
                    <h5 className="text-h5 text-center text-slate-600">
                      Dados SPCE
                    </h5>
                  </div>
                  <table>
                    <thead>
                      <tr>
                        <th className="text-[10px]">Ano</th>
                        <th className="text-[10px]">Num</th>
                        <th className="text-[10px]">Situação</th>
                        <th className="text-[10px]">Observação</th>
                      </tr>
                    </thead>
                    <tbody>
                      {spcData?.SPCE != null ? (
                        spcData.SPCE.map((s: any) =>
                          id === s.id ? (
                            <tr key={s.id}>
                              <td colSpan={4}>
                                <FormUpdateSPC
                                  id={s.id}
                                  year={String(s.year)}
                                  numPge={s.numPge}
                                  colorId={s.colorId}
                                  observation={s.observation}
                                  onClick={setId}
                                />
                              </td>
                            </tr>
                          ) : (
                            <tr
                              key={s.id}
                              onClick={() => handleSelectRow(s.id)}
                              className="cursor-pointer"
                            >
                              <td>{s.year}</td>
                              <td>{s.numPge ?? "-"}</td>
                              <td>
                                <div
                                  style={{ backgroundColor: `${s.colorHex}` }}
                                  className=" rounded-md p-1 text-center text-[10px] text-white"
                                >
                                  {s.colorName ?? "-"}
                                </div>
                              </td>
                              <td>{s.observation ?? "-"}</td>
                            </tr>
                          )
                        )
                      ) : (
                        <tr>
                          <td colSpan={4} className="text-center">
                            Não há dados cadastrados
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </fieldset>
      </div>
    </div>
  );
};

export default forwardRef(UpdateSPC);
