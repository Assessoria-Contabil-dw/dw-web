"use client";
import AccessParty from "./PartyTable";
import AccessState from "./StateTable";
import AccessCity from "./CityTable";
import { useParams } from "next/navigation";
import { RefreshButton } from "@/components/Buttons/ButtonRefresh";
import { useCallback, useRef, useState } from "react";
import { Plus } from "lucide-react";
import { ButtomBack } from "@/components/Buttons/ButtonBack";
import ActiveOptions from "./ActiveOptions";
import { useQuery } from "react-query";
import { CityData, PartyData, StateData } from "@/interfaces/access.interface";
import { AdminAccessService } from "@/services/Access/Admin/access.service";
import ButtonSecondary from "@/components/Buttons/ButtonSecondary";
import { LoadingPrimary } from "@/components/Loading/primary";
import Model, { ModelRef } from "@/components/private/components/Modal";
import FormCreate from "./FormCreate";

export default function Access() {
  const [option, setOption] = useState(1);
  const [id, setId] = useState("");
  const { cpf } = useParams<{ cpf: string }>()
  const accessService = new AdminAccessService();

  const { data, isLoading, isFetching } = useQuery<{
    id: number;
    name: string;
    role: string;
    partyAccess: PartyData[] | null;
    cityAccess: CityData[] | null;
    stateAccess: StateData[] | null;
    _count: {
      party: number;
      state: number;
      city: number;
    }
  }>(["accessUserData", cpf], () => accessService.getUserByCpf(cpf), {
    keepPreviousData: true,
    staleTime: 1000 * 60 * 60 * 12,
    retry: 2,
    refetchOnWindowFocus: false,
    enabled: !!cpf,
  });


  const modelRef = useRef<ModelRef>(null);
  const handleRegisterOpenModel = useCallback((id: string) => {
    setId(id);
    modelRef.current?.openModel();
  }, []);

  const handleRegisterCloseModel = useCallback(() => {
    modelRef.current?.closeModel();
  }, []);

  if (!data || isLoading) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <LoadingPrimary />
      </div>
    );
  }

  return (
    <>
      <Model title="Cadastrar Acesso" ref={modelRef}>
        <FormCreate closeModel={handleRegisterCloseModel} id={id} />
      </Model>

      <div className="flex w-full flex-col gap-4">
        <div className="flex items-center justify-start gap-4">
          <ButtomBack />
          <div className="flex flex-col">
            <h4 className="text-h4">
              Acessos <span className="text-span">/ {data.name}</span>
            </h4>
            <span className="text-span">{data.role.toUpperCase()}</span>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between gap-4">
            <ActiveOptions _count={data._count} option={option} setOption={setOption} />
            <div className="flex gap-2">
              <RefreshButton isLoading={isFetching} queryName="accessUserData" />
              <ButtonSecondary
                title="Adicionar acesso"
                variant="fill"
                type="button"
                startIcon={<Plus size={16} />}
                onClick={() => handleRegisterOpenModel(String(data.id))}
              >
                Cadastrar
              </ButtonSecondary>
            </div>
          </div>

          <section>
            {option === 1 ? (
              <AccessParty
                data={data.partyAccess}
              />
            ) : option === 2 ? (
              <AccessState
                data={data.stateAccess}
              />
            ) : (
              <AccessCity data={data.cityAccess} />
            )}
          </section>
        </div>
      </div>
    </>
  );
}
