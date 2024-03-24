import { useNotify } from "@/components/Toast/toast";
import { AdminAccessService } from "@/services/Access/Admin/access.service";
import { useMutation } from "react-query";

export function useAdminAccessCreate(data: {
  id: string;
  partyCode?: string;
  stateId?: string;
  cityCode?: string;
  modules?: {
    moduleId: number;
  }[];
}) {
  const accessService = new AdminAccessService();
  const notify = useNotify();

  const query = useMutation({
    mutationKey: "createAccess",
    mutationFn: () => accessService.createAccess(data),
    onSuccess: () => {
      notify({ type: "success", message: "Usuário criado com sucesso" });
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
      }

      return notify({
        type: "error",
        message: error.response.data.message,
      });
    },
  });
  return query;
}
