"use client";
import { TableUser } from "./Table";
import PaddingTable from "@/components/private/Tools/TablePadding";
import { ChangeEvent, useCallback, useRef, useState } from "react";
import { LoadingPrimary } from "@/components/Loading/primary";
import TableFilterUser from "./Filter";
import { useQuery } from "react-query";
import { Page } from "@/interfaces/page";
import { AdminUserService } from "@/services/Access/Admin/user.service";
import { useNotify } from "@/components/Toast/toast";
import Model, { ModelRef } from "@/components/private/components/Modal";
import FormUser from "./FormCreate";
import { RefreshButton } from "@/components/Buttons/ButtonRefresh";
import CreateButton from "@/components/private/components/buttons/ButtonCreate";
import ButtonSecondary from "@/components/Buttons/ButtonSecondary";
import { Plus } from "lucide-react";

interface Search {
  cpf?: string;
  name?: string;
  role?: string;
}

export function User() {
  const userService = new AdminUserService();
  const notify = useNotify();

  const [search, setSearch] = useState<Search>({} as Search);

  const [page, setPage] = useState(1);
  const [skip, setSkip] = useState(0);
  const [take, setTake] = useState(15);

  const prevPage = useCallback(() => {
    setSkip((old) => Math.max(old - take, 0));
    setPage((old) => Math.max(old - 1, 0));
  }, []);

  const nextPage = useCallback(() => {
    setSkip((old) => old + take);
    setPage((old) => old + 1);
  }, []);

  function handleSearchOnChange(
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>
  ) {
    const { name, value } = e.target;
    if (name === "name" && value.length < 3) {
      setSearch((old) => ({ ...old, [name]: undefined }));
      return;
    }
    setPage(1);
    setSkip(0);
    setSearch((old) => ({ ...old, [name]: value || undefined }));
  }

  const { data, isLoading, isFetching, isPreviousData } = useQuery<
    Page<{
      id: number;
      disabled: boolean;
      name: string;
      email: string;
      role: string;
      cpf: string;
    }>
  >(
    ["userData", skip, take, search.name, search.cpf, search.role],
    () => userService.getAll({ skip, take, ...search }),
    {
      keepPreviousData: true,
      staleTime: 1000 * 60 * 60 * 12,
      retry: false,
      refetchOnWindowFocus: false,
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
    }
  );

  const modelRef = useRef<ModelRef>(null);
  const handleRegisterOpenModel = useCallback(() => {
    modelRef.current?.openModel();
  }, []);
  const handleRegisterCloseModel = useCallback(() => {
    modelRef.current?.closeModel();
  }, []);

  if (isLoading) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <LoadingPrimary />
      </div>
    );
  }

  return (
    <>
      <Model title="Cadastrar usuário" ref={modelRef}>
        <FormUser closeModel={handleRegisterCloseModel} />
      </Model>

      <div className="flex w-full flex-col gap-2">
        <div className="flex items-end justify-between gap-4">
          <TableFilterUser onChange={handleSearchOnChange} />

          <div className="flex gap-2">
            <RefreshButton isLoading={isFetching} queryName="userData" />
            <ButtonSecondary
                title="Cadastro de usuário"
                variant="fill"
                type="button"
                startIcon={<Plus size={16} />}
                onClick={handleRegisterOpenModel}
              >
                Cadastrar
              </ButtonSecondary>
          </div>
        </div>
        <TableUser data={data?.results ?? null} />

        {data?.results !== null && (
          <PaddingTable
            onChange={(e) => {
              setTake(Number(e.target.value));
              setSkip(0);
              setPage(1);
            }}
            pages={data?.info?.pages ?? 0}
            page={page}
            isPreviousData={isPreviousData}
            nextPage={nextPage}
            prevPage={prevPage}
            next={data?.info?.next ?? null}
            isFetching={isFetching}
          />
        )}
      </div>
    </>
  );
}
