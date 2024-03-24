import { useNotify } from "@/components/Toast/toast";
import { Page } from "@/interfaces/page";
import { AdminUserService } from "@/services/Access/Admin/user.service";
import { useRouter } from "next/navigation";
import { useMutation, useQuery } from "react-query";

export function useAdminUserById(id: string) {
  const userService = new AdminUserService();
  const notify = useNotify();
  const router = useRouter();

  const query = useQuery<
    Page<{
      id: number;
      disabled: boolean;
      name: string;
      email: string;
      role: string;
      cpf: string;
    }>
  >([], () => userService.getById(id), {
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

      if (error.response.status === 403) {
        notify({ type: "warning", message: error.response.data.message });
        router.push("/");
      }

      return notify({
        type: "error",
        message: error.response.data.message,
      });
    },
  });

  return query;
}

export function useAdminUserUpdate(
  id: string,
  data: {
    name?: string;
    email: string;
    role: string;
    cpf: string;
    disabled: string;
  }
) {
  const userService = new AdminUserService();
  const notify = useNotify();
  const router = useRouter();

  const query = useMutation({
    mutationKey: "updateUser",
    mutationFn: () => userService.updateUser(id, data),
    onSuccess: () => {
      notify({ type: "success", message: "Usuário atualizado com sucesso" });
    },
    onError: (error: any) => {
      if (error.response.data.status === 500) {
        console.error(error);
        return notify({
          type: "error",
          message: "Erro interno, tente novamente mais tarde",
        });
      }

      if (error.response.status === 403) {
        notify({ type: "warning", message: error.response.data.message });
        router.push("/");
      }

      return notify({
        type: "error",
        message: error.response.data.message,
      });
    },
  });
  return query;
}
