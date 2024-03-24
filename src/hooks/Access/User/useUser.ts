import { useNotify } from "@/components/Toast/toast";
import { UserService } from "@/services/Access/User/user.service";
import { useMutation, useQuery } from "react-query";


export function useGetUser() {
  const userService = new UserService();
  const notify = useNotify();

  const query = useQuery({
    queryKey: "user",
    queryFn: () => userService.get(),
    onError: (error: any) => {
      if (error.response.data.status === 500) {
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

  return query;

}

export function useUpdateUser(name?: string, email?: string) {
  const userService = new UserService();
  const notify = useNotify();

  const query = useMutation({
    mutationKey: "updateUser",
    mutationFn: () => userService.put({ name, email }),
    onSuccess: () => {
      notify({ type: "success", message: "Usuário atualizado com sucesso!" });
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

  return query;
}
