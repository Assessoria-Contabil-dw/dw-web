import { useNotify } from "@/components/Toast/toast";
import { api } from "@/lib/api";

export class AdvocatesService {
  notify = useNotify();

  public async getAll(params: {
    skip?: number;
    take?: number;
    name?: string;
    cpf?: string;
  }) {
    const response = await api.get("/advocates", {
      params: params,
    });
    return response.data;
  }

  public async getById(id: string) {
    try {
      const response = await api.get(`/advocates/${id}`);
      return response.data;
    } catch (error: any) {
      return this.notify({
        type: "warning",
        message: error.response.data.message,
      });
    }
  }
}
