import { api } from "@/lib/api";

export class DashboardService {
  public async getAccessCount() {
    try {
      const response = await api.get("/dashboard/count");
      return response.data;
    } catch (error) {
      return error;
    }
  }

  public async getSpc(
    data:{
      partyAbbreviation?: string,
      stateName?: string,
      cityName?: string,
      legendId?: string,
    }
  ) {
    const response = await api.get("/dashboard/spc", { params: data });
    return response.data;
  }
}
