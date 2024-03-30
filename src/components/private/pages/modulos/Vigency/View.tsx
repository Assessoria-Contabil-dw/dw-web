"use client";
import { X } from "lucide-react";
import React, {
  ForwardRefRenderFunction,
  useCallback,
  useState,
  useImperativeHandle,
  forwardRef,
  useContext,
} from "react";
import { LoadingSecond } from "@/components/Loading/second";
import { AccessContext } from "@/provider/context.provider";
import { useVigencyOne } from "@/hooks/Directory/useVigency";

export interface ViewVigencyRef {
  openModal: (id: string) => void;
  closeModal: () => void;
}

const ViewVigencyModel: ForwardRefRenderFunction<ViewVigencyRef> = (
  props,
  ref
) => {
  const [isModalView, setIsModalView] = useState(false);
  const [vigencyId, setVigencyId] = useState("");

  const openModal = useCallback((id: string) => {
    setVigencyId(id);
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
  const { data: vigencyData, isLoading } = useVigencyOne(
    Number(vigencyId),
    partyCode,
    stateId,
    cityCode
  );

  if (!isModalView) {
    return null;
  }

  return (
    <div className="model-bg">
      <div className="model-size  model-size-full">
        <div className="model-card">
          <div className="model-header">
            <div>
              <h4 className="text-h2">Detalhes da vigência</h4>
              <span className="text-span">
                Visualize os detalhes da vigência
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
              <div className=" flex w-full flex-col gap-6">
                <div className="flex w-full flex-col gap-4 rounded-md bg-slate-50 p-3">
                  <div className="flex w-full flex-col justify-between gap-4 sm:flex-row">
                    <div className="flex flex-col gap-1">
                      <h5 className="text-h5">Período</h5>
                      <p className="text-xs text-slate-500">
                        De {vigencyData?.vigency.dateFirst} à{" "}
                        {vigencyData?.vigency.dateLast}
                      </p>
                    </div>
                    {
                      vigencyData?.vigency.daysVenciment ? (
                        <div className="flex flex-col gap-1">
                          <h5 className="text-h5">Vencimento</h5>
                          <p className="text-xs text-slate-500">
                            {vigencyData?.vigency.daysVenciment}
                          </p>
                        </div>
                      ) : null
                    }
                    <div className="flex flex-col gap-1">
                      <h5 className="text-h5">Status</h5>
                      <p className="text-xs text-slate-500">
                        {vigencyData?.vigency.status ? "Ativo" : "Inativo"}
                      </p>
                    </div>

                    
                  </div>
                  <div className="flex flex-col gap-1">
                      <h5 className="text-h5">Partido</h5>
                      <p className="text-xs text-slate-500">
                        {vigencyData?.vigency.party.abbreviation} -{" "}
                        {vigencyData?.vigency.directory.surname}
                      </p>
                    </div>
                  <div className="flex flex-col gap-1">
                    <h5 className="text-h5">Endereço</h5>
                    {vigencyData?.vigency.directory.address ? (
                      <p className="text-xs text-slate-500">
                        {vigencyData?.vigency.directory.address}
                      </p>
                    ) : (
                      <span className="text-span">Não cadastrado</span>
                    )}
                  </div>
                  <div className="flex flex-col items-start justify-between gap-4 sm:flex-row">
                    <div className="flex flex-col gap-1">
                      <h5 className="text-h5">CNPJ</h5>
                      {vigencyData?.vigency.directory.cnpj ? (
                        <p className="text-xs text-slate-500">
                          {vigencyData?.vigency.directory.cnpj}
                        </p>
                      ) : (
                        <span className="text-span">Não cadastrado</span>
                      )}
                    </div>

                    <div className="flex flex-col gap-1">
                      <h5 className="text-h5">E-mail</h5>
                      {vigencyData?.vigency.directory.email ? (
                        <p className="text-xs text-slate-500">
                          {vigencyData?.vigency.directory.email}
                        </p>
                      ) : (
                        <span className="text-span">Não cadastrado</span>
                      )}
                    </div>

                    <div className="flex flex-col gap-1">
                      <h5 className="text-h5">Telefone</h5>
                      {vigencyData?.vigency.directory.phone ? (
                        <p className="text-xs text-slate-500">
                          {vigencyData?.vigency.directory.phone}
                        </p>
                      ) : (
                        <span className="text-span">Não cadastrado</span>
                      )}
                    </div>
                  </div>
                </div>

                <fieldset className="flex flex-col gap-2 rounded-md border-[1px] p-3">
                  <legend className="text-label">
                    Informações do Presidente
                  </legend>

                  <div className="flex items-start justify-between gap-4 max-sm:flex-col">
                    <div className="flex flex-col gap-1">
                      <h5 className="text-h5">Nome</h5>
                      {vigencyData?.president?.name ? (
                        <p className="text-xs font-semibold text-secondHover">
                          {vigencyData?.president?.name}
                        </p>
                      ) : (
                        <span className="text-span">Não cadastrado</span>
                      )}
                    </div>

                    <div className="flex flex-col gap-1">
                      <h5 className="text-h5">E-mail</h5>
                      {vigencyData?.president?.email ? (
                        <p className="text-xs text-slate-500">
                          {vigencyData?.president?.email}
                        </p>
                      ) : (
                        <span className="text-span">Não cadastrado</span>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col gap-1">
                    <h5 className="text-h5">Endereço</h5>
                    {vigencyData?.president?.address ? (
                      <p className="text-xs text-slate-500">
                        {vigencyData?.president?.address}
                      </p>
                    ) : (
                      <span className="text-span">Não cadastrado</span>
                    )}
                  </div>

                  <div className="flex flex-col items-start justify-between gap-4 sm:flex-row">
                    <div className="flex flex-col gap-1">
                      <h5 className="text-h5">Telefone</h5>
                      {vigencyData?.president?.phone ? (
                        <p className="text-xs text-slate-500">
                          {vigencyData?.president?.phone}
                        </p>
                      ) : (
                        <span className="text-span">Não cadastrado</span>
                      )}
                    </div>

                    <div className="flex flex-col gap-1">
                      <h5 className="text-h5">Status</h5>
                      {vigencyData?.president?.status ? (
                        <p className="text-xs text-slate-500">
                          {vigencyData?.president?.status}
                        </p>
                      ) : (
                        <span className="text-span">Não cadastrado</span>
                      )}
                    </div>

                    <div className="flex flex-col gap-1">
                      <h5 className="text-h5">Profissão</h5>
                      {vigencyData?.president?.profession ? (
                        <p className="text-xs text-slate-500">
                          {vigencyData?.president?.profession}
                        </p>
                      ) : (
                        <span className="text-span">Não cadastrado</span>
                      )}
                    </div>
                  </div>
                </fieldset>

                <fieldset className="flex flex-col gap-2 rounded-md border-[1px] p-3">
                  <legend className="text-label">
                    Informações do Vice-Presidente
                  </legend>

                  <div className="flex items-start justify-between gap-4 max-sm:flex-col">
                    <div className="flex flex-col gap-1">
                      <h5 className="text-h5">Nome</h5>
                      {vigencyData?.vicePresident?.name ? (
                        <p className="text-xs font-semibold text-secondHover">
                          {vigencyData?.vicePresident?.name}
                        </p>
                      ) : (
                        <span className="text-span">Não cadastrado</span>
                      )}
                    </div>

                    <div className="flex flex-col gap-1">
                      <h5 className="text-h5">E-mail</h5>
                      {vigencyData?.vicePresident?.email ? (
                        <p className="text-xs text-slate-500">
                          {vigencyData?.vicePresident?.email}
                        </p>
                      ) : (
                        <span className="text-span">Não cadastrado</span>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col gap-1">
                    <h5 className="text-h5">Endereço</h5>
                    {vigencyData?.vicePresident?.address ? (
                      <p className="text-xs text-slate-500">
                        {vigencyData?.vicePresident?.address}
                      </p>
                    ) : (
                      <span className="text-span">Não cadastrado</span>
                    )}
                  </div>

                  <div className="flex flex-col items-start justify-between gap-4 sm:flex-row">
                    <div className="flex flex-col gap-1">
                      <h5 className="text-h5">Telefone</h5>
                      {vigencyData?.vicePresident?.phone ? (
                        <p className="text-xs text-slate-500">
                          {vigencyData?.vicePresident?.phone}
                        </p>
                      ) : (
                        <span className="text-span">Não cadastrado</span>
                      )}
                    </div>

                    <div className="flex flex-col gap-1">
                      <h5 className="text-h5">Status</h5>
                      {vigencyData?.vicePresident?.status ? (
                        <p className="text-xs text-slate-500">
                          {vigencyData?.vicePresident?.status}
                        </p>
                      ) : (
                        <span className="text-span">Não cadastrado</span>
                      )}
                    </div>

                    <div className="flex flex-col gap-1">
                      <h5 className="text-h5">Profissão</h5>
                      {vigencyData?.vicePresident?.profession ? (
                        <p className="text-xs text-slate-500">
                          {vigencyData?.vicePresident?.profession}
                        </p>
                      ) : (
                        <span className="text-span">Não cadastrado</span>
                      )}
                    </div>
                  </div>
                </fieldset>

                <fieldset className="flex flex-col gap-2 rounded-md border-[1px] p-3">
                  <legend className="text-label">
                    Informações do Tesoureiro
                  </legend>

                  <div className="flex items-start justify-between gap-4 max-sm:flex-col">
                    <div className="flex flex-col gap-1">
                      <h5 className="text-h5 ">Nome</h5>
                      {vigencyData?.treasurer?.name ? (
                        <p className="text-xs font-semibold text-secondHover">
                          {vigencyData?.treasurer?.name}
                        </p>
                      ) : (
                        <span className="text-span">Não cadastrado</span>
                      )}
                    </div>

                    <div className="flex flex-col gap-1">
                      <h5 className="text-h5">E-mail</h5>
                      {vigencyData?.treasurer?.email ? (
                        <p className="text-xs text-slate-500">
                          {vigencyData?.treasurer?.email}
                        </p>
                      ) : (
                        <span className="text-span">Não cadastrado</span>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col gap-1">
                    <h5 className="text-h5">Endereço</h5>
                    {vigencyData?.treasurer?.address ? (
                      <p className="text-xs text-slate-500">
                        {vigencyData?.treasurer?.address}
                      </p>
                    ) : (
                      <span className="text-span">Não cadastrado</span>
                    )}
                  </div>

                  <div className="flex flex-col items-start justify-between gap-4 sm:flex-row">
                    <div className="flex flex-col gap-1">
                      <h5 className="text-h5">Telefone</h5>
                      {vigencyData?.treasurer?.phone ? (
                        <p className="text-xs text-slate-500">
                          {vigencyData?.treasurer?.phone}
                        </p>
                      ) : (
                        <span className="text-span">Não cadastrado</span>
                      )}
                    </div>

                    <div className="flex flex-col gap-1">
                      <h5 className="text-h5">Status</h5>
                      {vigencyData?.treasurer?.status ? (
                        <p className="text-xs text-slate-500">
                          {vigencyData?.treasurer?.status}
                        </p>
                      ) : (
                        <span className="text-span">Não cadastrado</span>
                      )}
                    </div>

                    <div className="flex flex-col gap-1">
                      <h5 className="text-h5">Profissão</h5>
                      {vigencyData?.treasurer?.profession ? (
                        <p className="text-xs text-slate-500">
                          {vigencyData?.treasurer?.profession}
                        </p>
                      ) : (
                        <span className="text-span">Não cadastrado</span>
                      )}
                    </div>
                  </div>
                </fieldset>

                <fieldset className="flex flex-col gap-2 rounded-md border-[1px] p-3">
                  <legend className="text-label">Advogados</legend>

                  {vigencyData?.advocates === null ? (
                    <span className="text-span">Não cadastrado</span>
                  ) : (
                    <ul>
                      {vigencyData?.advocates.map((advocate, index) => (
                        <li key={index} className="rounded bg-slate-100 p-1">
                          <div className="flex gap-4">
                            <div className="flex flex-col gap-1">
                              <h5 className="text-h5 ">Nome</h5>
                              {advocate.name ? (
                                <p className="text-xs text-slate-500">
                                  {advocate.name}
                                </p>
                              ) : (
                                <span className="text-span">
                                  Não cadastrado
                                </span>
                              )}
                            </div>

                            <div className="flex flex-col gap-1">
                              <h5 className="text-h5 ">OAB</h5>
                              {advocate.oab ? (
                                <p className="text-xs text-slate-500">
                                  {advocate.oab}
                                </p>
                              ) : (
                                <span className="text-span">
                                  Não cadastrado
                                </span>
                              )}
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
                </fieldset>

                <fieldset className="flex flex-col gap-2 rounded-md border-[1px] p-3">
                  <legend className="text-label">Escritorios</legend>

                  {vigencyData?.lawFirm === null ? (
                    <span className="text-span">Não cadastrado</span>
                  ) : (
                    <ul>
                      {vigencyData?.lawFirm.map((item, index) => (
                        <li key={index} className="rounded bg-slate-100 p-1">
                          <div className="flex gap-4">
                            <div className="flex flex-col gap-1">
                              <h5 className="text-h5 ">Nome</h5>
                              {item.name ? (
                                <p className="text-xs text-slate-500">
                                  {item.name}
                                </p>
                              ) : (
                                <span className="text-span">
                                  Não cadastrado
                                </span>
                              )}
                            </div>

                            <div className="flex flex-col gap-1">
                              <h5 className="text-h5 ">Advogados</h5>
                              {item.advocates.length > 0  ? (
                              item.advocates.map((advocate, index) => (
                                <p key={index} className="text-xs text-slate-500">
                                  {advocate.name}
                                </p>
                              ))
                              ) : (
                                <span className="text-span">
                                  Não cadastrado
                                </span>
                              )}
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
                </fieldset>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default forwardRef(ViewVigencyModel);
