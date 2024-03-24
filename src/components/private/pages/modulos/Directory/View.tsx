import { X } from "lucide-react";
import {
  ForwardRefRenderFunction,
  forwardRef,
  useCallback,
  useContext,
  useImperativeHandle,
  useState,
} from "react";
import { LoadingSecond } from "@/components/Loading/second";
import { AccessContext } from "@/provider/context.provider";
import { useDirectoryById } from "@/hooks/Directory/useDirectory";

export interface ViewRef {
  openModal: (id: string) => void;
  closeModal: () => void;
}

const ViewModel: ForwardRefRenderFunction<ViewRef> = (props, ref) => {
  const [isModalView, setIsModalView] = useState(false);
  const [directoryId, setDirectoryId] = useState("");

  const openModal = useCallback((id: string) => {
    setDirectoryId(id);
    setIsModalView(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalView(false);
  }, []);

  useImperativeHandle(ref, () => ({
    openModal,
    closeModal,
  }));

  const { partyCode, cityCode, stateId } = useContext(AccessContext);
  const { data, isLoading } = useDirectoryById(
    directoryId,
    partyCode,
    stateId,
    cityCode
  );

  if (!isModalView) {
    return null;
  }

  return (
    <div className="model-bg">
      <div className="model-size model-size-full">
        <div className="model-card">
          <div className="model-header">
            <div>
              <h4 className="text-h4">Visualizar Diretório</h4>
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
              <div className="flex h-full flex-col justify-between gap-2 p-1">
                <div className="flex w-full flex-col gap-4  p-3">
                  <div className="flex w-full flex-col gap-4 rounded-md bg-slate-50 p-3">
                    <div className="flex w-full flex-col justify-between gap-4">
                      <div className="grid grid-cols-3 gap-2 lg:grid-cols-4">
                        <div className="flex flex-col gap-1">
                          <h5 className="text-h5">Partido</h5>
                          <p className="text-xs text-slate-500">
                            {data?.party.abbreviation}
                          </p>
                        </div>

                        <div className="flex flex-col gap-1">
                          <h5 className="text-h5">Estado</h5>
                          <p className="text-xs uppercase text-slate-500">
                            {data?.state.name}
                          </p>
                        </div>

                        <div className="flex flex-col gap-1">
                          <h5 className="text-h5">Cidade</h5>
                          <p className="text-xs uppercase text-slate-500">
                            {data?.city.name}
                          </p>
                        </div>

                        <div className="flex flex-col gap-1">
                          <h5 className="text-h5">Tipo de Organização</h5>
                          <p className="text-xs uppercase text-slate-500">
                            {data?.typeOrg.name}
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-4">
                        <div className="flex flex-col gap-1">
                          <h5 className="text-h5">Diretório</h5>
                          <p className="text-xs text-slate-500">
                            {data?.surname}
                          </p>
                        </div>

                        <div className="flex flex-col gap-1">
                          <h5 className="text-h5">Status</h5>
                          <p className="text-xs text-slate-500">
                            {data?.vigencyStatus ? (
                              <span className="rounded-full bg-second px-2 py-1 font-mono text-xs font-bold text-white">
                                Ativo
                              </span>
                            ) : (
                              <span className="rounded-full bg-slate-400 px-2 py-1 font-mono text-xs font-bold text-white">
                                Inativo
                              </span>
                            )}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex w-full flex-col justify-between gap-4">
                    <div className="flex gap-4">
                      <div className="flex flex-col gap-1">
                        <h5 className="text-h5">Endereço</h5>
                        <p className="text-xs text-slate-500">
                          {data?.address ?? "Não informado"}
                        </p>
                      </div>

                      <div className="flex flex-col gap-1">
                        <h5 className="text-h5">CNPJ</h5>
                        <p className="whitespace-nowrap text-xs uppercase text-slate-500">
                          {data?.cnpj ?? "Não informado"}
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-flow-row gap-4 lg:grid-flow-col">
                      <div className="flex flex-col gap-1">
                        <h5 className="text-h5">E-mail</h5>
                        <p className="whitespace-nowrap text-xs text-slate-500">
                          {data?.email ?? "Não informado"}
                        </p>
                      </div>

                      <div className="flex flex-col gap-1">
                        <h5 className="text-h5">Telefone</h5>
                        <p className="whitespace-nowrap text-xs text-slate-500">
                          {data?.phone ?? "Não informado"}
                        </p>
                      </div>
                      <div className="flex flex-col gap-1">
                        <h5 className="text-h5">Correspondência</h5>
                        <p className="text-xs uppercase text-slate-500">
                          {data?.mailingAddress ?? "Não informado"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <ul>
                    {data?._vigencyVeciment && data._vigencyVeciment.map((item) => (
                      <li key={item.id}>
                        <div className="flex gap-4">
                          <div className="flex flex-col gap-1">
                            <h5 className="text-h5">Vigência</h5>
                            <p className="text-xs text-slate-500">
                              {item.dateFirst} - {item.dateLast}
                            </p>
                          </div>

                          <div className="flex flex-col gap-1">
                            <h5 className="text-h5">Dias para Vencimento</h5>
                            <p className="text-xs text-slate-500">
                              {item.daysVenciment} dias
                            </p>
                          </div>
                        </div>

                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex gap-4">
                  <div className="flex w-full flex-col items-center justify-center rounded-md border-[1px] bg-white p-4">
                    <h3 className="font-serif text-lg font-bold text-slate-800">
                      {data?._count.SPC ?? "0"}
                    </h3>
                    <p className="font-serif text-xs text-slate-500">SPCs</p>
                  </div>
                  <div className=" flex w-full flex-col items-center justify-center rounded-md border-[1px] bg-white p-4">
                    <h3 className="font-serif text-lg font-bold text-slate-800">
                      {data?._count.vigencies ?? "0"}
                    </h3>
                    <p className="font-serif text-xs text-slate-500">
                      Vigencias
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default forwardRef(ViewModel);
