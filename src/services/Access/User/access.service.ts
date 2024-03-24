import { api } from "@/lib/api";

export class UserAccessService {
  public async getAll() {
    const response = await api.get("/user/access");
    return response.data;
  }

  public async getModulesById(data: {
    partyCode?: string;
    stateId?: string;
    cityCode?: string;
  }) {
    const response = await api.get("/user/access/modules", {
      params: data,
    });
    return response.data;
  }
}
