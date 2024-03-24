import ButtonPrimary from "@/components/Buttons/ButtonPrimary";
import { LoadingSecond } from "@/components/Loading/second";
import { useNotify } from "@/components/Toast/toast";
import { useCityData } from "@/hooks/Directory/useCityData";
import { usePartyData } from "@/hooks/Directory/usePartyData";
import { useStateData } from "@/hooks/Directory/useStateData";
import { api } from "@/lib/api";
import { queryClient } from "@/provider/query.provider";
import { AdminAccessService } from "@/services/Access/Admin/access.service";
import { ChangeEvent, useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "react-query";

interface FormProps {
  id: string;
  type: "party" | "state" | "city";
  closeModel: () => void;
}

interface ModuleProps {
  id: number;
  name: string;
}

interface Module {
  moduleId: number;
}

interface Search {
  acessType: string | undefined;
  userId: number | undefined;
  partyCode: number | undefined;
  stateId: string | undefined;
  cityCode: string | undefined;
  modules: Module[];
}

export default function FormUpdate({ id, type }: FormProps) {
  const adminService = new AdminAccessService();

  const accessData = useQuery<{
    partyCode: number;
    stateId?: string;
    cityCode?: string;
    modules: {
      id: number;
      name: string;
    }[];
  }>(["accessById", id], async () => adminService.getAccessById(type, id), {
    retry: 1,
    keepPreviousData: true,
    refetchOnWindowFocus: false,
    refetchInterval: 1000 * 60 * 60 * 24, // 24 hours
  });

  const { register, handleSubmit, watch } = useForm();

  const [search, setSearch] = useState<Search>({} as Search);
  const notify = useNotify();

  function handleSearchOnChange(
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>
  ) {
    const { name, value } = e.target;

    if (name === "acessType") {
      if (value === "N") {
        setSearch((old) => ({
          ...old,
          stateId: undefined,
          cityCode: undefined,
        }));
      }
      if (value === "E") {
        setSearch((old) => ({ ...old, cityCode: undefined }));
      }
    }

    if (name === "stateId" && value === "") {
      setSearch((old) => ({ ...old, cityCode: undefined }));
    }

    if (name === "modules") {
      if ("checked" in e.target) {
        if (e.target.checked) {
          if (search.modules === undefined) {
            setSearch((old) => ({
              ...old,
              modules: [{ moduleId: Number(value) }],
            }));
            return;
          }
          const modules = search.modules.filter(
            (module) => module.moduleId !== Number(value)
          );
          setSearch((old) => ({
            ...old,
            modules: [...modules, { moduleId: Number(value) }],
          }));
          return;
        }
        const modules = search.modules.filter(
          (module) => module.moduleId !== Number(value)
        );
        setSearch((old) => ({ ...old, modules }));
      }
      return;
    }

    setSearch((old) => ({ ...old, [name]: value || undefined }));
  }

  const moduleData = useQuery<ModuleProps[]>(
    ["modulesData"],
    async () => {
      const response = await api.get("/modules");
      return response.data;
    },
    {
      retry: 1,
      keepPreviousData: true,
      refetchOnWindowFocus: false,
      refetchInterval: 1000 * 60 * 60 * 24, // 24 hours
    }
  );

  const { mutate, isLoading } = useMutation({
    mutationKey: "updateAccess",
    mutationFn: () =>
      adminService.update(id, {
        partyCode: watch("partyCode"),
        stateId: watch("stateId"),
        cityCode: type === "city" ? watch("cityCode") : undefined,
        modules: watch("modules") ? watch("modules") : undefined,
      }),
    onSuccess: () => {
      notify({ type: "success", message: "Usuário atualizado com sucesso" });
      queryClient.invalidateQueries("accessUserData");
      queryClient.invalidateQueries("accessById");
    },
    onError: (error: any) => {
      if (error.response.data.status === 500) {
        console.error(error);
        return notify({
          type: "error",
          message: "Erro interno, tente novamente mais tarde",
        });
      }
      return notify({
        type: "error",
        message: error.response.data.message,
      });
    },
  });

  const { data: partyData, isLoading: loadingParty } = usePartyData();
  const { data: stateData, isLoading: loadingState } = useStateData();
  const { data: cityData } = useCityData(
    search.stateId ?? accessData.data?.stateId
  );

  async function handleUpdate() {
    console.log(watch("cityCode"));
    mutate();
  }

  return (
    <form onSubmit={handleSubmit(handleUpdate)} className="model-body">
      {!moduleData.isLoading &&
      accessData.data &&
      !loadingParty &&
      !loadingState ? (
        <div className="flex h-full w-full flex-col justify-between gap-6">
          <div className="flex flex-col gap-4">
            <div>
              <label>Partido</label>
              <select
                {...register("partyCode", { required: true })}
                className="input-style"
                name="partyCode"
                onChange={handleSearchOnChange}
                defaultValue={accessData.data?.partyCode}
              >
                <option value="" disabled selected>
                  Selecione um partido
                </option>
                {partyData &&
                  partyData.results !== null &&
                  partyData.results.map((party) => {
                    return (
                      <option key={party.code} value={party.code}>
                        {party.abbreviation}
                      </option>
                    );
                  })}
              </select>
            </div>

            {(type === "state" || type === "city") && (
              <div>
                <label>Estado</label>
                <select
                  {...register("stateId")}
                  className="input-style"
                  name="stateId"
                  onChange={handleSearchOnChange}
                  defaultValue={accessData.data.stateId}
                >
                  <option value="" disabled selected>
                    Selecione um estado
                  </option>
                  {stateData !== null &&
                    stateData?.map((state) => {
                      return (
                        <option key={state.code} value={state.uf}>
                          {state.name}
                        </option>
                      );
                    })}
                </select>
              </div>
            )}
            {type === "city" && (
              <div>
                <label>Cidade</label>
                <select
                  {...register("cityCode")}
                  className="input-style"
                  name="cityCode"
                  onChange={handleSearchOnChange}
                  defaultValue={accessData.data.cityCode}
                >
                  <option value="" selected>
                    Selecione uma cidade
                  </option>
                  {cityData !== null &&
                    cityData?.map((city) => {
                      return (
                        <option key={city.code} value={city.code}>
                          {city.code} - {city.name}
                        </option>
                      );
                    })}
                </select>
              </div>
            )}

            <div>
              <label htmlFor="modules">Módulos</label>
              {moduleData.data?.map((module) => {
                return (
                  <div key={module.id} className="flex gap-2">
                    <input
                      {...register("modules")}
                      type="checkbox"
                      name="modules"
                      defaultChecked={accessData.data?.modules.some(
                        (m: any) => m.id === module.id
                      )}
                      value={module.id}
                      onChange={handleSearchOnChange}
                    />
                    <label className="text-sm font-normal">{module.name}</label>
                  </div>
                );
              })}
            </div>
          </div>

          <ButtonPrimary
            title="Cadastrar"
            className="w-full justify-center"
            type="submit"
            loading={isLoading}
            variant="fill"
          >
            Atualizar
          </ButtonPrimary>
        </div>
      ) : (
        <div className="flex w-full justify-center">
          <LoadingSecond />
        </div>
      )}
    </form>
  );
}
