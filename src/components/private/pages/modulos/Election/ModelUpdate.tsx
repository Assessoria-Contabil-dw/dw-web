import { Edit, Trash, X } from "lucide-react";
import {
  ForwardRefRenderFunction,
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { queryClient } from "@/provider/query.provider";
import { ElectionAllProps } from "@/hooks/SPC/@type";
import { Page } from "@/interfaces/page";
import FormUpdate from "./Form/Update";
import DeleteModel, { DeleteRef } from "@/components/private/Model/Delete";

export interface UpdateRef {
  openModal: (id: string) => void;
  closeModal: () => void;
}

const ModelUpdate: ForwardRefRenderFunction<UpdateRef> = (props, ref) => {
  const [isModalView, setIsModalView] = useState(false);
  const [leaderId, setLeaderId] = useState("");
  const [id, setId] = useState("");
  const [electionsData, setElectionsData] = useState<ElectionAllProps>();

  const openModal = useCallback((id: string) => {
    setLeaderId(id);
    setIsModalView(true);
  }, []);

  const closeModal = useCallback(() => {
    // queryClient.invalidateQueries("electionData");
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

      console.log("results", results);
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

  //deletar spc
  const modalDeleteRef = useRef<DeleteRef>(null);
  const handleDelete = useCallback((id: number, year: string) => {
    modalDeleteRef.current?.openModal(
      String(id),
      "election",
      `Deseja excluir o ano ${year}`,
      "electionData"
    );
  }, []);

  if (!isModalView) {
    return null;
  }

  return (
    <>
      <DeleteModel ref={modalDeleteRef} />

      <div className="model-bg z-10">
        <div className="model-size model-size-full p-4">
          <div className="h-full overflow-auto p-1">
            <div className="model-header">
              <div>
                <h4 className="text-h4">Atualizar</h4>
                <span className="text-span">{electionsData?.name}</span>
              </div>
              <button onClick={closeModal} className="model-close">
                <X size={20} />
              </button>
            </div>

            <div className="flex flex-col gap-6  ">
              {electionsData != null ? (
                electionsData?.elections?.map((e) =>
                  id === e.id.toString() ? (
                    <div
                      key={e.id}
                      className="overflow-x-auto rounded-xl border-[1px] p-4"
                    >
                      <FormUpdate
                        id={e.id}
                        year={String(e.year)}
                        numPge={e.numPge}
                        colorId={e.colorId}
                        observation={e.observation}
                        accountOR={e.accountOR}
                        accountFP={e.accountFP}
                        accountFEFC={e.accountFEFC}
                        bank={e.bank}
                        agency={e.agency}
                        cnpj={e.cnpj}
                        stateCode={e.state}
                        cityName={e.city}
                        onClick={setId}
                        onClose={closeModal}
                      />
                    </div>
                  ) : (
                    <div
                      key={e.id}
                      className="overflow-x-auto rounded-xl border-[1px]"
                    >
                      <table id="table-style">
                        <thead>
                          <tr>
                            <th>Ano</th>
                            <th>Num</th>
                            <th>CNPJ</th>
                            <th>Situação</th>
                            <th>UF/Municipio</th>
                            <th></th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr key={e.id}>
                            <td
                              className="cursor-pointer !text-green-500 underline"
                              onClick={() => handleSelectRow(e.id.toString())}
                            >
                              {e.year}
                            </td>
                            <td>{e.numPge ?? "-"}</td>
                            <td className="whitespace-nowrap">
                              {e.cnpj ?? "-"}
                            </td>
                            <td>
                              <div
                                style={{ backgroundColor: `${e.colorHex}` }}
                                className=" rounded-md p-1 text-center text-[10px] text-white"
                              >
                                {e.colorName ?? "-"}
                              </div>
                            </td>

                            <td>{e.city ? e.state + "/" + e.city : "-"}</td>
                            <td className="flex gap-1">
                              <button
                                onClick={() => handleSelectRow(e.id.toString())}
                                className="cursor-pointer rounded-md bg-green-500/20 p-1 text-green-500"
                              >
                                <Edit size={16} />
                              </button>
                              <button
                                className="cursor-pointer rounded-md bg-red-500/20 p-1 text-red-500"
                                onClick={() => handleDelete(e.id, e.year)}
                              >
                                <Trash size={16} />
                              </button>
                            </td>
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
                  )
                )
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

export default forwardRef(ModelUpdate);
