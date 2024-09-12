import { X } from "lucide-react";
import {
  ForwardRefRenderFunction,
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import { queryClient } from "@/provider/query.provider";
import { ElectionAllProps } from "@/hooks/SPC/@type";
import { Page } from "@/interfaces/page";

export interface ViewElectionRef {
  openModal: (id: string) => void;
  closeModal: () => void;
}

const ModelView: ForwardRefRenderFunction<ViewElectionRef> = (props, ref) => {
  const [isModalView, setIsModalView] = useState(false);
  const [leaderId, setLeaderId] = useState("");
  const [id, setId] = useState("");
  const [electionsData, setElectionsData] = useState<ElectionAllProps>();

  const openModal = useCallback((id: string) => {
    setLeaderId(id);
    setIsModalView(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalView(false);
    setId("");
  }, []);

  useImperativeHandle(ref, () => ({
    openModal,
    closeModal,
  }));

  async function electionPullOne(elections: any) {
    if (elections.length > 0) {
      const electionData = elections[
        elections.length - 1
      ][1] as Page<ElectionAllProps>;
      const results = electionData.results?.find(
        (e) => e.id === Number(leaderId)
      );

      if (results === undefined) {
        for (let i = 0; i < elections.length; i++) {
          const electionData = elections[i][1] as Page<ElectionAllProps>;
          const results = electionData.results?.find(
            (e) => e.id === Number(leaderId)
          );
          if (results !== undefined) {
            return results;
          }
        }
        return results;
      }
      return results;
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const elections = queryClient.getQueriesData("electionData");
        const results = await electionPullOne(elections);
        setElectionsData(results as ElectionAllProps);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [isModalView]);

  function handleSelectRow(electionId: string) {
    setId(electionId);
  }

  if (!isModalView) {
    return null;
  }

  return (
    <>
      <div className="model-bg z-10">
        <div className="model-size model-size-full h-fit p-4">
          <div className="h-full overflow-auto p-1">
            <div className="model-header">
              <div>
                <h4 className="text-h4">Visualizar</h4>
                <span className="text-span">{electionsData?.name}</span>
              </div>
              <button onClick={closeModal} className="model-close">
                <X size={20} />
              </button>
            </div>

            <div className="flex flex-col gap-6  ">
              {electionsData != null ? (
                electionsData?.elections?.map((e) => (
                  <div
                    key={e.id}
                    className="overflow-x-auto rounded-xl border-[1px]"
                  >
                    <table id="table-style">
                      <thead>
                        <tr>
                          <th>Ano</th>
                          <th>n° PGE</th>
                          <th>CandContas</th>
                          <th>CNPJ</th>
                          <th>Situação</th>
                          <th>UF/Municipio</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr key={e.id}>
                          <td>{e.year}</td>
                          <td>{e.numPge ?? "-"}</td>
                          <td>{e.candAccount ?? "-"}</td>
                          <td className="whitespace-nowrap">{e.cnpj ?? "-"}</td>
                          <td>
                            <div
                              style={{ backgroundColor: `${e.colorHex}` }}
                              className=" rounded-md p-1 text-center text-[10px] text-white"
                            >
                              {e.colorName ?? "-"}
                            </div>
                          </td>

                          <td>{e.city ? e.state + "/" + e.city : "-"}</td>
                        </tr>
                        <tr>
                          <td colSpan={6}>
                            <table>
                              <thead>
                                <th className="!text-zinc-400">OR</th>
                                <th className="!text-zinc-400">FP</th>
                                <th className="!text-zinc-400">FEFC</th>
                                <th className="!text-zinc-400">Banco</th>
                                <th className="!text-zinc-400">Agência</th>
                                <th className="!text-zinc-400">Observação</th>
                              </thead>
                              <tbody>
                                <tr>
                                  <td className="text-[8px]">
                                    {e.accountOR ?? "-"}
                                  </td>
                                  <td className="text-[8px]">
                                    {e.accountFP ?? "-"}
                                  </td>
                                  <td className="text-[8px]">
                                    {e.accountFEFC ?? "-"}
                                  </td>
                                  <td className="text-[8px]">
                                    {e.bank ?? "-"}
                                  </td>
                                  <td className="text-[8px]">
                                    {e.agency ?? "-"}
                                  </td>
                                  <td className="text-[8px]">
                                    {e.observation ?? "-"}
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                ))
              ) : (
                <p>Nennhum registro encontrado</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default forwardRef(ModelView);
