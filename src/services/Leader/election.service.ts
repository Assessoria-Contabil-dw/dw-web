
import { api } from "@/lib/api";
export class ElectionService {

  public async getAll(
    skip: number,
    take?: number,

    leaderName?: string,
    year?: string,
    colorId?: string,
    stateName?: string,
    cityName?: string
  ) {
    const response = await api.get("/elections", {
      params: {
        skip,
        take,
        leaderName,
        year,
        colorId,
        stateName,
        cityName,
      },
    });
    return response.data;
  }

  public async getById(id: string) {
    const response = await api.get(`/elections/${id}`);

    return response.data;
  }

  static async create(
    leaderId: number,
    array: Array<{
      year: string;
      numPge: string;
      candAccount: string;
      observation?: string;
      colorId?: string;
      cityCode?: string;
      cnpj?: string;
      accountOR?: string;
      accountFP?: string;
      accountFEFC?: string;
      bank?: string;
      agency?: string;
    }>
  ) {
    const response = await api.post(`/elections`, {
      leaderId,
      array,
    });

    return response.data;
  }

  public async update(
    id: string,

    data: {
      year: string;
      numPge?: string;
      candAccount?: string;
      colorId?: string;
      cityCode?: string;
      observation?: string;
      cnpj?: string;
      accountOR?: string;
      accountFP?: string;
      accountFEFC?: string;
      bank?: string;
      agency?: string;
    }
  ) {
    const response = await api.put(`/election/${id}`, {
      data
    });
   
    return response.data;
  }
}
