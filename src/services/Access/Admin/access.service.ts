import { api } from "@/lib/api";

export class AdminAccessService {
  public async createAccess(data: {
    id: string;
    partyCode?: string;
    stateId?: string;
    cityCode?: string;
    modules?: {
      moduleId: number;
    }[];
  }) {
    const response = await api.post("/admin/access", data);
    return response.data;
  }

  public async getUserByCpf(cpf: string) {
    const response = await api.get(`/admin/access/user/${cpf}`);
    return response.data;
  }

  public async getAccessById(path: string, id: string) {
    const response = await api.get(`/admin/access/${path}/${id}`);
    return response.data;
  }

  public async update(
    id: string,
    data: {
      partyCode: string;
      stateId?: string;
      cityCode?: string;
      modules?: string[] | string;
  }) {
    if (typeof data.modules === "string") {
      data.modules = [data.modules];
    }

    const response = await api.put(`/admin/access/${id}`, data);
    return response.data;
  }
}
