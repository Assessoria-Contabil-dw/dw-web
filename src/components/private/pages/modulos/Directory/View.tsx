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
              <div className="flex h-full flex-col gap-6 p-4">
                {/* Informações Principais */}
                <div className="rounded-lg border border-slate-200 bg-gradient-to-br from-slate-50 to-slate-100 p-5 shadow-sm">
                  <div className="mb-4 flex items-center justify-between border-b border-slate-300 pb-3">
                    <h5 className="text-base font-semibold text-slate-700">Informações do Diretório</h5>
                    {data?.vigencyStatus ? (
                      <span className="rounded-full bg-green-500 px-3 py-1 text-xs font-semibold text-white shadow-sm">
                        ● Ativo
                      </span>
                    ) : (
                      <span className="rounded-full bg-slate-400 px-3 py-1 text-xs font-semibold text-white shadow-sm">
                        ● Inativo
                      </span>
                    )}
                  </div>

                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
                      <div className="flex flex-col gap-1.5">
                        <span className="text-xs font-medium uppercase tracking-wide text-slate-600">Partido</span>
                        <p className="text-sm font-semibold text-slate-800">
                          {data?.party.abbreviation}
                        </p>
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <span className="text-xs font-medium uppercase tracking-wide text-slate-600">Estado</span>
                        <p className="text-sm font-semibold uppercase text-slate-800">
                          {data?.state.name}
                        </p>
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <span className="text-xs font-medium uppercase tracking-wide text-slate-600">Cidade</span>
                        <p className="text-sm font-semibold uppercase text-slate-800">
                          {data?.city.name}
                        </p>
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <span className="text-xs font-medium uppercase tracking-wide text-slate-600">Tipo de Organização</span>
                        <p className="text-sm font-semibold uppercase text-slate-800">
                          {data?.typeOrg.name}
                        </p>
                      </div>
                    </div>

                    <div className="rounded-md bg-white p-3 shadow-sm">
                      <span className="text-xs font-medium uppercase tracking-wide text-slate-600">Nome do Diretório</span>
                      <p className="mt-1 text-base font-semibold text-slate-800">
                        {data?.surname}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Dados de Contato e Localização */}
                <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
                  <h5 className="mb-4 border-b border-slate-200 pb-3 text-base font-semibold text-slate-700">Dados de Contato</h5>
                  
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                      <div className="flex flex-col gap-1.5 rounded-md bg-slate-50 p-3">
                        <span className="text-xs font-medium uppercase tracking-wide text-slate-600">Endereço</span>
                        <p className="text-sm text-slate-700">
                          {data?.address ?? "Não informado"}
                        </p>
                      </div>

                      <div className="flex flex-col gap-1.5 rounded-md bg-slate-50 p-3">
                        <span className="text-xs font-medium uppercase tracking-wide text-slate-600">CNPJ</span>
                        <p className="whitespace-nowrap text-sm font-mono text-slate-700">
                          {data?.cnpj ?? "Não informado"}
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
                      <div className="flex flex-col gap-1.5 rounded-md bg-slate-50 p-3">
                        <span className="text-xs font-medium uppercase tracking-wide text-slate-600">E-mail</span>
                        <p className="truncate text-sm text-slate-700">
                          {data?.email ?? "Não informado"}
                        </p>
                      </div>

                      <div className="flex flex-col gap-1.5 rounded-md bg-slate-50 p-3">
                        <span className="text-xs font-medium uppercase tracking-wide text-slate-600">Telefone</span>
                        <p className="whitespace-nowrap text-sm font-mono text-slate-700">
                          {data?.phone ?? "Não informado"}
                        </p>
                      </div>

                      <div className="flex flex-col gap-1.5 rounded-md bg-slate-50 p-3">
                        <span className="text-xs font-medium uppercase tracking-wide text-slate-600">Correspondência</span>
                        <p className="text-sm uppercase text-slate-700">
                          {data?.mailingAddress ?? "Não informado"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Vigências */}
                {data?._vigencyVeciment && data._vigencyVeciment.length > 0 && (
                  <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
                    <h5 className="mb-4 border-b border-slate-200 pb-3 text-base font-semibold text-slate-700">Vigências</h5>
                    
                    <div className="space-y-3">
                      {data._vigencyVeciment.map((item) => (
                        <div key={item.id} className="flex items-center justify-between rounded-md border border-slate-200 bg-slate-50 p-4">
                          <div className="flex flex-col gap-1">
                            <span className="text-xs font-medium uppercase tracking-wide text-slate-600">Período</span>
                            <p className="text-sm font-semibold text-slate-800">
                              {item.dateFirst} - {item.dateLast}
                            </p>
                          </div>

                          <div className="flex flex-col items-end gap-1">
                            <span className="text-xs font-medium uppercase tracking-wide text-slate-600">Vencimento</span>
                            <p className="text-sm font-semibold text-slate-800">
                              {item.daysVenciment > 0 ? (
                                <span className="text-orange-600">{item.daysVenciment} dias</span>
                              ) : (
                                <span className="text-red-600">Vencido</span>
                              )}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Estatísticas */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col items-center justify-center rounded-lg border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-white p-6 shadow-sm transition-all hover:shadow-md">
                    <h3 className="text-3xl font-bold text-blue-600">
                      {data?._count.SPC ?? "0"}
                    </h3>
                    <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-slate-600">SPCs Vinculados</p>
                  </div>
                  
                  <div className="flex flex-col items-center justify-center rounded-lg border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-white p-6 shadow-sm transition-all hover:shadow-md">
                    <h3 className="text-3xl font-bold text-purple-600">
                      {data?._count.vigencies ?? "0"}
                    </h3>
                    <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-slate-600">Vigências Registradas</p>
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
